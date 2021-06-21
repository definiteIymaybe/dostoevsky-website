/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import classes from "./FullDatasetPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography";
import Button from "src/components/ui-kit/Button";
import { useModal } from "src/components/ui-kit/Modal";
import SinglePageLayout from "src/components/SinglePageLayout";
import { T, useLocale } from "react-targem";
import { OptionTypeBase, GroupedOptionsType } from "react-select";
import axios from "axios";
import metricsData from "content/metriсs.json";
import Table from "src/components/Table";
import FullDatasetSelect from "./FullDatasetSelect";
import FullDatasetDownloadModal from "src/components/FullDatasetDownloadModal";
import Loading from "src/components/ui-kit/Loading";
import { Helmet } from "react-helmet";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { api } = require("../../../gatsby-config").siteMetadata;
const { base, token } = api;

const BREAKDOWN_OPTIONS = [
  { value: "year", label: "Год" },
  { value: "part", label: "Статья" },
];

const METRICS_OPTIONS = metricsData.map((m) => ({
  value: m.key,
  label: m.title,
}));
METRICS_OPTIONS.unshift({ value: "all-metrics", label: "Выбрать все" });

const createTableData = (
  dataset: object[] | null,
  metricsValue: OptionTypeBase
) => {
  if (!dataset || !dataset.length || !metricsValue) return;
  const parseMetrics = metricsValue.find(
    (m: OptionTypeBase) => m.value === "all-metrics"
  )
    ? metricsData
    : metricsValue.map((m: OptionTypeBase) => ({
        title: m.label,
        key: m.value,
      }));
  const tableData = {
    rows: dataset.map((r: any) => {
      return {
        key: `${r.year}-${r.part}`,
        values: [
          { key: "year", value: r.year },
          { key: "part", value: r.part },
          { key: "name", value: r.name },
          ...parseMetrics.map((m: { key: any }) => {
            return {
              key: m.key,
              value: r[m.key] !== null ? r[m.key] : <T message="Нет данных" />,
              helpText:
                r[m.key] === null
                  ? "1) таких данных на сайте Суд. депа нет за этот год. <br /> 2) мы считаем некорректным складывать данные по доп. составу, поскольку у одного человека может быть несколько доп. статей и при сложении может получиться завышенное число человек."
                  : undefined,
            };
          }),
        ],
      };
    }),
    columns: [
      {
        title: "Год",
        key: "year",
      },
      {
        title: "Статья",
        key: "part",
      },
      {
        title: "Название",
        key: "name",
      },
      ...parseMetrics,
    ],
  };
  return [tableData];
};

const AUTH_AXIOS_OPTIONS = {
  headers: {
    Authorization: "Token " + token,
  },
};

const FullDatasetPage: React.FC = () => {
  const { t } = useLocale();
  const [yearsOptions, setYearsOptions] = useState<
    GroupedOptionsType<OptionTypeBase>
  >([]);
  const [yearsValue, setYearsValue] = useState<OptionTypeBase>([]);

  const [partsOptions, setPartsOptions] = useState<
    GroupedOptionsType<OptionTypeBase>
  >([]);
  const [partsValue, setPartsValue] = useState<OptionTypeBase>([]);

  const [breakdownValue, setBreakdownValue] = useState<OptionTypeBase>([]);

  const [metricsValue, setMetricsValue] = useState<OptionTypeBase>([]);

  const [dataset, setDataset] = useState(null);

  const [loadingDataset, setLoadingDataset] = useState(false);
  const [showError, setShowError] = useState(false);

  const { isShowing, toggle } = useModal();

  useEffect(() => {
    (async function () {
      const filtersResult = await axios.get(
        base + "/filters/",
        AUTH_AXIOS_OPTIONS
      );
      const yearsOptionsData = filtersResult.data.year;
      const newYearsOptions = yearsOptionsData
        .sort((y1: number, y2: number) => y2 - y1)
        .map((y: number) => ({
          value: y.toString(),
          label: y.toString(),
        }));
      newYearsOptions.unshift({ value: "all-years", label: "Выбрать все" });
      setYearsOptions(newYearsOptions);

      const partsOptionsData = filtersResult.data.part;
      const newPartsOptions = partsOptionsData.map((p: string) => ({
        value: p,
        label: p,
      }));
      newPartsOptions.unshift({ value: "all-parts", label: "Выбрать все" });
      setPartsOptions(newPartsOptions);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (
        yearsValue &&
        yearsValue.length &&
        partsValue &&
        partsValue.length &&
        metricsValue &&
        metricsValue.length
      ) {
        setShowError(false);
        setLoadingDataset(true);

        const allYearsSelected = yearsValue.find(
          (y: OptionTypeBase) => y.value === "all-years"
        );
        const allPartsSelected = partsValue.find(
          (p: OptionTypeBase) => p.value === "all-parts"
        );
        const allMetricsSelected = metricsValue.find(
          (p: OptionTypeBase) => p.value === "all-metrics"
        );

        const dataResult = await axios
          .post(
            base + "/aggregated_data/",
            {
              year: (allYearsSelected
                ? yearsOptions.filter(
                    (y: OptionTypeBase) => y.value !== "all-years"
                  )
                : yearsValue
              ).map((m: OptionTypeBase) => parseInt(m.value)),
              param: (allMetricsSelected
                ? METRICS_OPTIONS.filter(
                    (m: OptionTypeBase) => m.value !== "all-metrics"
                  )
                : metricsValue
              )
                .map((m: OptionTypeBase) => m.value)
                .filter((m: string) => m !== "name"),
              part: (allPartsSelected
                ? partsOptions.filter(
                    (p: OptionTypeBase) => p.value !== "all-parts"
                  )
                : partsValue
              ).map((p: OptionTypeBase) => p.value),
              breakdowns: breakdownValue
                ? breakdownValue.map((b: OptionTypeBase) => b.value)
                : [],
            },
            {
              ...AUTH_AXIOS_OPTIONS,
            }
          )
          .catch(() => {
            setDataset(null);
            setShowError(true);
          })
          .finally(() => {
            setLoadingDataset(false);
          });
        if (dataResult && dataResult.data) {
          setDataset(dataResult.data);
        }
      } else {
        setDataset(null);
      }
    })();
  }, [
    yearsValue,
    partsValue,
    breakdownValue,
    metricsValue,
    yearsOptions,
    partsOptions,
  ]);

  const handleChangeYears = (data: OptionTypeBase) => {
    const allYearsAlreadySelected =
      yearsValue && yearsValue.value === "all-years";

    const allYearsSelected =
      data && data.find((y: OptionTypeBase) => y.value === "all-years");

    if (allYearsAlreadySelected) {
      const dataWithoutAllYears = data
        ? data.filter((y: OptionTypeBase) => y.value !== "all-years")
        : null;
      setYearsValue(dataWithoutAllYears);
    } else {
      if (allYearsSelected) {
        setYearsValue([{ value: "all-years", label: "Все" }]);
      } else {
        setYearsValue(data);
      }
    }
  };

  const handleChangeParts = (data: OptionTypeBase) => {
    const allPartsAlreadySelected =
      partsValue && partsValue.value === "all-parts";

    const allPartsSelected =
      data && data.find((p: OptionTypeBase) => p.value === "all-parts");

    if (allPartsAlreadySelected) {
      const dataWithoutAllParts = data
        ? data.filter((p: OptionTypeBase) => p.value !== "all-parts")
        : null;
      setPartsValue(dataWithoutAllParts);
    } else {
      if (allPartsSelected) {
        setPartsValue([{ value: "all-parts", label: "Все" }]);
      } else {
        setPartsValue(data);
      }
    }
  };

  const handleChangeMetrics = (data: OptionTypeBase) => {
    const allMetricsAlreadySelected =
      metricsValue && metricsValue.value === "all-metrics";

    const allMetricsSelected =
      data && data.find((m: OptionTypeBase) => m.value === "all-metrics");

    if (allMetricsAlreadySelected) {
      const dataWithoutAllMetrics = data
        ? data.filter((m: OptionTypeBase) => m.value !== "all-metrics")
        : null;
      setMetricsValue(dataWithoutAllMetrics);
    } else {
      if (allMetricsSelected) {
        setMetricsValue([{ value: "all-metrics", label: "Все" }]);
      } else {
        setMetricsValue(data);
      }
    }
  };

  const tables = createTableData(dataset, metricsValue);

  if (yearsOptions.length === 0) {
    return (
      <main className={cn(classes.container)}>
        <Container>
          <SinglePageLayout title={<T message="Полный датасет" />}>
            <Loading hasVerticalMargin />
          </SinglePageLayout>
        </Container>
      </main>
    );
  }

  return (
    <main className={cn(classes.container)}>
      <Container>
        <Helmet defer={false}>
          <title>{t("Полный датасет")}</title>
          <meta
            name="description"
            content={t(
              "Скачать полный датасет о статистике преступлений и наказаний в России"
            )}
          />
        </Helmet>
        <SinglePageLayout title={<T message="Полный датасет" />}>
          <FullDatasetSelect
            label="год"
            options={yearsOptions}
            value={yearsValue}
            onChange={handleChangeYears}
          />
          <FullDatasetSelect
            label="статья"
            options={partsOptions}
            value={partsValue}
            onChange={handleChangeParts}
          />
          <FullDatasetSelect
            label="разбивка"
            options={BREAKDOWN_OPTIONS}
            value={breakdownValue}
            onChange={setBreakdownValue}
          />
          <FullDatasetSelect
            label="набор метрик"
            options={METRICS_OPTIONS}
            value={metricsValue}
            onChange={handleChangeMetrics}
          />
          {showError ? (
            <div className={cn(classes.errorBlock)}>
              <Typography>
                <T message="Произошла ошибка. Пожалуйста, измените параметры поиска." />
              </Typography>
            </div>
          ) : null}
          {loadingDataset || tables ? (
            <Button
              className={cn(classes.downloadButton)}
              color="secondary"
              onClick={toggle}
            >
              <T
                message={loadingDataset ? "Загрузка..." : "Выгрузить данные"}
              />
            </Button>
          ) : null}
          {tables ? (
            <Table
              title={t("Полный датасет")}
              tables={tables}
              hideEmbed
              isNotPaddedLeft
              isEqualWidth
              isScrollable
            />
          ) : null}
        </SinglePageLayout>
      </Container>
      <FullDatasetDownloadModal
        isShowing={isShowing}
        type="full"
        filename={t("Полный датасет")}
        toggle={toggle}
        loadingDataset={loadingDataset}
        tables={tables}
      />
    </main>
  );
};

export default FullDatasetPage;
