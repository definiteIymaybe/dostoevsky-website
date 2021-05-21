import React from "react";
import { Link } from "gatsby";
import cn from "clsx";
import { useLocale } from "react-targem";

import Typography from "src/components/ui-kit/Typography";
import Container from "src/components/ui-kit/Container";
import type { Article } from "../ArticleFullPage/ArticleFullPage";
import classes from "./ArticlesPage.module.css";

interface FeedPageMoreProps {
  articles: Array<Article>;
}

const getArticleBackground = (type?: Article["tag"]) => {
  switch (type) {
    case "Аналитика":
      return require("./assets/analytics-square.svg");
    case "Блог":
      return require("./assets/blog-square.svg");
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ArticlesFeedPageMore = (props: FeedPageMoreProps) => {
  const { t } = useLocale();
  const { articles } = props;
  return (
    <Container>
      <div className={classes.articlesPageMore}>
        {articles.map((d: Article, i) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const type = t(d.tag!);
          return (
            <div
              key={i}
              className={cn(classes.moreItem, {
                [classes.moreItemBlog]: d.tag === "Блог",
                [classes.moreItemAnalytics]: d.tag === "Аналитика",
              })}
              style={{
                backgroundImage: `url(${getArticleBackground(d.tag)})`,
              }}
            >
              {type ? (
                <Typography
                  className={classes.moreItemType}
                  size="small"
                  isUpperCased
                  color="inverted"
                >
                  {type}
                </Typography>
              ) : null}
              <Link
                className={classes.moreItemInner}
                to={`/${d.locale}${d.slug}` || "#"}
              >
                <Typography variant="h2" font="serif">
                  <b>{d.title || ""}</b>
                </Typography>
                <Typography className={classes.moreItemDescription}>
                  {d.teaser || ""}
                </Typography>
                <div className={classes.moreItemBottom}>
                  <Typography size="small" isUpperCased>
                    <b>{d.author || ""}</b>
                  </Typography>
                  <Typography
                    size="small"
                    isUpperCased
                    className={classes.moreItemDate}
                  >
                    <b>{d.date || ""}</b>
                  </Typography>
                </div>
              </Link>
              <div className={classes.moreItemInnerBack} />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default ArticlesFeedPageMore;
