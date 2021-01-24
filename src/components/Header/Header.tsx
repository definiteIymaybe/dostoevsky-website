import React, { useState } from "react";
import { Link } from "gatsby";
import cn from "clsx";
import classes from "./Header.module.css";
import { Menu, MenuLink } from "src/components/Menu";
import { T, useLocale } from "react-targem";
import Typography from "../ui-kit/Typography";
import Button from "../ui-kit/Button";
import { getLinkForLocale } from "src/utils/locales";
interface HeaderProps {
  location: Location;
}

const Header: React.FC<HeaderProps> = ({ location }: HeaderProps) => {
  const [menuActive, setMenuActive] = useState(false);
  const [langSelectorActive, setLangSelector] = useState(false);
  const { locale, t } = useLocale();
  const localeName = locale.split("-")[0];
  function toggleMenu() {
    setMenuActive(!menuActive);
  }
  function toggleLangSelector() {
    setLangSelector(!langSelectorActive);
  }

  return (
    <nav className={cn(classes.container)}>
      <div className={cn(classes.headerWrapper)}>
        <Link to="/" className={cn(classes.logo)}>
          <img src={require("./assets/logo.svg")} alt={t("Достоевский")} />
        </Link>
        <div className={cn(classes.callMenuBar)}>
          <Button onClick={toggleLangSelector}>
            <img
              src={require("./assets/lang.svg")}
              alt={t('Иконка "Земной шар"')}
            />{" "}
            <Typography
              color="inverted"
              variant="span"
              className={cn(classes.localeName)}
            >
              {localeName}
            </Typography>
          </Button>
          <div className="test" onClick={toggleMenu}>
            <img
              src={require("./assets/hamburger.svg")}
              alt={t('Иконка "Меню"')}
            />
          </div>
        </div>
        <div
          className={cn({
            [cn(classes.mobileMenuHolder)]: true,
            [cn(classes.isActive)]: menuActive,
          })}
        >
          <div className={cn(classes.mobileMenuHolder__header)}>
            <div>
              <Link to="/">
                <img
                  src={require("./assets/logo-mobile.svg")}
                  alt={t("Логотип проекта Достоевский")}
                />
              </Link>
            </div>
            <div className={cn(classes.mobileMenu__close)} onClick={toggleMenu}>
              <img
                src={require("./assets/close.svg")}
                alt={t('Иконка "Закрыть"')}
              />
            </div>
          </div>
          <div className={cn(classes.mobileMenu__listener)}>
            <Menu variant="onBlackBackground">
              <MenuLink activeUrls={[/^\/\d\d\d/]} to="/clauses" size="normal">
                <T message="каталог статей ук рф" />
              </MenuLink>
              <MenuLink partiallyActive to="/articles" size="normal">
                <T message="Аналитика" />
              </MenuLink>
              <MenuLink to="/faq" size="normal">
                <T message="о датасете" />
              </MenuLink>
              <MenuLink to="/about" size="normal">
                <T message="о проекте" />
              </MenuLink>
              <MenuLink to="/full" size="normal">
                <T message="полный датасет" />
              </MenuLink>
            </Menu>
          </div>
        </div>
      </div>
      <div
        className={cn({
          [cn(classes.mobileMenuHolder)]: true,
          [cn(classes.isActive)]: langSelectorActive,
        })}
      >
        <div className={cn(classes.mobileMenuHolder__header)}>
          <div>
            <Link to="/">
              <img
                src={require("./assets/logo-mobile.svg")}
                alt={t("Достоевский")}
              />
            </Link>
          </div>
          <div
            className={cn(classes.mobileMenu__close)}
            onClick={toggleLangSelector}
          >
            <img
              src={require("./assets/close.svg")}
              alt={t("Иконка 'Закрыть'")}
            />
          </div>
        </div>
        <div className={cn(classes.mobileMenu__listener)}>
          <Menu variant="onBlackBackground">
            <MenuLink
              activeUrls={[/^\/ru/]}
              to={getLinkForLocale("ru", location.pathname, location.search)}
              size="normal"
            >
              Русский
            </MenuLink>
            <MenuLink
              activeUrls={[/^\/en-GB/]}
              to={getLinkForLocale("en-GB", location.pathname, location.search)}
              size="normal"
            >
              English
            </MenuLink>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
