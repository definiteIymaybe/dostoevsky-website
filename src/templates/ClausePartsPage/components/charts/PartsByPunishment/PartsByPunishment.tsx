import React, { PureComponent } from "react";
import Bar from "src/components/charts/Bar";
import { getClauseLink } from "src/config/routes";
import { withLocale, WithLocale } from "react-targem";

const byPunishmentLabels = [
  "пожизненное лишение свободы",
  "условное осуждение к лишению свободы",
  "арест",
  "ограничение свободы",
  "ограничение свободы/ограничение по военной службе, содержание в дисциплинарной воинской части",
  "исправительные работы",
  "обязательные работы",
  "принудительные работы",
  "штраф",
  "лишение права занимать определенные должности",
  "условное осуждение к иным мерам",
  "содержание в дисциплинарной воинской части",
  "ограничение по военной службе",
  "лишение свободы",
];

interface PartsByPunishmentProps extends WithLocale {
  isIframeMode?: boolean;
  clauseNumber: number;
  year: number;
  parts: {
    part: string;
    primaryLifeSentence: number;
    primarySuspended: number;
    primaryArrest: number;
    primaryRestrain: number;
    primaryRestrain2009: number;
    primaryCorrectionalLabour: number;
    primaryCommunityService: number;
    primaryForcedLabour: number;
    primaryFine: number;
    primaryDisqualification: number;
    primaryOther: number;
    primaryMilitaryDisciplinaryUnit: number;
    primaryRestrictionsInMilitaryService: number;
    primaryImprisonment: number;
  }[];
}

class PartsByPunishment extends PureComponent<PartsByPunishmentProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts, isIframeMode, locale, t } = this.props;

    return (
      <Bar
        isIframeMode={isIframeMode}
        chartType="partsByPunishment"
        title={`Виды наказаний по частям статьи ${clauseNumber}`}
        downloadFilename={`${clauseNumber}-${year}-parts-by-punishment`}
        areLabelsFiltered
        charts={[
          {
            groups: parts.map((p) => ({
              title: p.part,
              values: [
                p.primaryLifeSentence,
                p.primarySuspended,
                p.primaryArrest,
                p.primaryRestrain,
                p.primaryRestrain2009,
                p.primaryCorrectionalLabour,
                p.primaryCommunityService,
                p.primaryForcedLabour,
                p.primaryFine,
                p.primaryDisqualification,
                p.primaryOther,
                p.primaryMilitaryDisciplinaryUnit,
                p.primaryRestrictionsInMilitaryService,
                p.primaryImprisonment,
              ],
            })),
            labels: byPunishmentLabels,
            tooltipDescription: {
              [t("Состав")]: `${clauseNumber} ${t("основной состав")}`,
              [t("Год")]: `${year}`,
              [t("Число человек")]: "%%",
            },
          },
        ]}
        iframePath={getClauseLink(
          locale,
          clauseNumber.toString(),
          year.toString(),
          "parts",
          "iframe-parts-by-punishment"
        )}
      />
    );
  }
}

export default withLocale(PartsByPunishment);
