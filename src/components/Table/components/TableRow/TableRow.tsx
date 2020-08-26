import React, { PureComponent } from "react";
import classes from "./TableRow.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { WithLocale, withLocale } from "react-targem";

interface TableRowProps extends WithLocale {
  values: {
    value: React.ReactNode;
    key: string;
  }[];
  isAccordion: boolean;
  columnsCount: number;
  isOpened: boolean;
  onClick: () => void;
}

class TableRow extends PureComponent<TableRowProps> {
  render(): React.ReactNode {
    const { values, columnsCount, isAccordion, onClick, isOpened } = this.props;

    return (
      <tr
        onClick={isAccordion ? onClick : undefined}
        className={cn({
          [classes.rowAccordion]: isAccordion,
          [classes.isOpened]: isOpened,
        })}
      >
        {values.map((v) => (
          <td key={v.key} colSpan={isAccordion ? columnsCount : undefined}>
            {this.getAccrodionButton()}
            <Typography isUpperCased={Boolean(isAccordion)} component="span">
              {isAccordion ? <b>{v.value}</b> : v.value}
            </Typography>
          </td>
        ))}
      </tr>
    );
  }

  getAccrodionButton = (): React.ReactNode => {
    const { isOpened, t, isAccordion } = this.props;
    if (!isAccordion) {
      return null;
    }
    return isOpened ? (
      <button
        tabIndex={-1}
        title={t("Close hidden content")}
        className={cn(classes.collapseIconButton)}
      >
        <img src={require("./assets/minus.svg")} alt={t("Minus icon")} />
      </button>
    ) : (
      <button
        tabIndex={-1}
        title={t("Open hidden content")}
        className={cn(classes.collapseIconButton)}
      >
        <img src={require("./assets/plus.svg")} alt={t("Plus icon")} />
      </button>
    );
  };
}

export default withLocale(TableRow);
