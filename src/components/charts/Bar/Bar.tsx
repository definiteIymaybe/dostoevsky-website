import React, { PureComponent } from "react";
import ChartWrapper from "src/components/ChartWrapper";
import Chartist, { IChartistStepAxis, ChartDrawData } from "chartist";
import classes from "./Bar.module.css";
import cn from "clsx";
import he from "he";
import Typography from "src/components/ui-kit/Typography";
import {
  centerXLabel,
  styleVerticalGrid,
  removeHorizontalGridExceptLast,
} from "src/utils/chartist";

interface BarProps extends React.ComponentProps<typeof ChartWrapper> {
  charts: {
    groups: {
      values: number[];
      title: string;
    }[];
    title?: React.ReactNode;
    tooltipDescription: {
      [key: string]: string;
    };
    labels: string[];
  }[];
  maxLabelsCount: number;
  areLabelsRotated?: boolean;
  isIframeMode?: boolean;
  chartType: "partsByPunishment" | "dynamicsPunishment";
}

const ROW_HEIGHT = 50;
const Y_LABEL_MARGIN = 15;

class Bar extends PureComponent<BarProps> {
  private chartRefs: React.RefObject<HTMLDivElement>[];

  public constructor(props: BarProps) {
    super(props);
    this.chartRefs = [];
    for (let i = 0; i < props.charts.length; i++) {
      this.chartRefs[i] = React.createRef<HTMLDivElement>();
    }
  }

  public componentDidMount(): void {
    const { charts, areLabelsRotated, chartType } = this.props;
    for (let i = 0; i < charts.length; i++) {
      const { groups, tooltipDescription, labels } = charts[i];

      const series: { value: number }[][] = groups.map((g) =>
        g.values
          .slice()
          .map((v, i) => ({
            value: v,
            meta: {
              tooltip: tooltipDescription,
              sum:
                chartType === "partsByPunishment"
                  ? groups.reduce((a, c) => {
                      a += c.values[i];
                      return a;
                    }, 0)
                  : null,
            },
          }))
          .reverse()
      );

      const chartLabels: string[] = labels.slice().reverse();

      const plugins = [];

      if (typeof window !== `undefined`) {
        require("chartist-plugin-tooltips");
        plugins.push(
          Chartist.plugins.tooltip({
            appendToBody: true,
            tooltipFnc: this.getTooltipText,
          })
        );
      }

      const chart = new Chartist.Bar(
        this.chartRefs[i].current,
        {
          labels: chartLabels,
          series,
        },
        {
          stackBars: true,
          horizontalBars: true,
          axisX: {
            onlyInteger: true,
            showGrid: true,
            labelOffset: {
              y: areLabelsRotated ? 10 : 15,
            },
          },
          axisY: {
            stretch: true,
            showGrid: true,
            labelOffset: {
              x: 0,
              y: -20,
            },
            offset: 0,
            fullWidth: true,
          } as IChartistStepAxis,
          chartPadding: {
            right: chartType === "partsByPunishment" ? 50 : 0,
            bottom: areLabelsRotated ? 20 : 0,
          },
          plugins,
        }
      );

      chart.on("draw", (data: ChartDrawData) => {
        centerXLabel(data, areLabelsRotated);
        styleVerticalGrid(data, Y_LABEL_MARGIN);
        removeHorizontalGridExceptLast(data);
        if (chartType === "partsByPunishment") {
          this.getBarSum(data, series.length);
        }
      });
    }
  }

  render(): React.ReactNode {
    const {
      charts,
      areLabelsRotated,
      maxLabelsCount,
      chartType,
      ...wrapperProps
    } = this.props;

    const wrapperHeight =
      chartType === "partsByPunishment" && charts.length
        ? 60 * charts[0].labels.length + 50
        : maxLabelsCount * ROW_HEIGHT;

    return (
      <ChartWrapper {...wrapperProps} labels={this.getLabels()} isFullWidth>
        {charts.map((c, i) => (
          <div key={i} style={{ width: `${100 / charts.length}%` }}>
            {chartType !== "partsByPunishment" ? (
              <Typography className={cn(classes.chartTitle)} isUpperCased>
                <b>
                  <small>{c.title}</small>
                </b>
              </Typography>
            ) : null}
            <div
              ref={this.chartRefs[i]}
              className={cn({
                [`ct-chart-${String.fromCharCode(97 + i)}`]: charts.length > 1,
                [classes.areLabelsRotated]: areLabelsRotated,
                [classes.barPartsByPunishment]:
                  chartType === "partsByPunishment",
              })}
              style={{
                height: wrapperHeight,
              }}
            ></div>
          </div>
        ))}
      </ChartWrapper>
    );
  }

  private getLabels = () => {
    const { charts } = this.props;
    if (charts.length === 1) {
      return charts[0].groups.map((g) => g.title);
    }
    return undefined;
  };

  private getTooltipText = (meta: string, value: number) => {
    let metaDeserialized: {
      data: {
        tooltip: {
          [key: string]: string;
        };
      };
    };
    try {
      metaDeserialized = JSON.parse(he.decode(meta));
    } catch (e) {
      console.error(e);
      return '<span class="chartist-tooltip-meta">Error</span>';
    }
    const lines = [];
    for (const [lineKey, lineValue] of Object.entries(
      metaDeserialized.data.tooltip
    )) {
      lines.push(`${lineKey}: ${lineValue.replace("%%", value.toString())}`);
    }
    return `<span class="chartist-tooltip-meta">${lines.join("<br>")}</span>`;
  };

  private getBarSum = (data: ChartDrawData, seriesLength: number) => {
    if (data.type === "bar" && data.seriesIndex === seriesLength - 1) {
      const foreignObject = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
      );
      foreignObject.setAttribute("x", data.x2 + 7);
      foreignObject.setAttribute("y", String(data.y2 - 12));
      foreignObject.setAttribute("width", "100");
      foreignObject.setAttribute("height", "100");

      const div = document.createElement("span");
      div.innerHTML = data.meta.sum;
      div.setAttribute("class", "ct-bar-sum");

      foreignObject.appendChild(div);
      data.element._node.parentElement.appendChild(foreignObject);
    }
  };
}

export default Bar;
