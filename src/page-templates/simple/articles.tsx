/* eslint-disable no-console */
import { graphql } from "gatsby";
import React from "react";
import { ArticlesPageQuery } from "../../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import ArticlesPage from "src/templates/ArticlesPage/ArticlesPage";
import type { Article } from "src/templates/ArticleFullPage/ArticleFullPage";

interface ArticlesPageProps {
  data: ArticlesPageQuery;
  location: Location;
}

const ArticlesIndex: React.FC<ArticlesPageProps> = ({
  data,
  location,
}: ArticlesPageProps) => {
  const meta = data.site?.meta;
  const all = data.allMdx || [];
  const articles = all.edges.map(({ node }) => {
    const a = { ...node.frontmatter };
    return a;
  });
  return (
    <Layout location={location}>
      <Meta site={meta} />
      <ArticlesPage articles={articles as Article[]} />
    </Layout>
  );
};

export default ArticlesIndex;

export const pageQuery = graphql`
  query ArticlesPage($locale: String) {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { locale: { eq: $locale } } }
    ) {
      edges {
        node {
          body
          frontmatter {
            slug
            title
            author
            date
            tag
            teaser
            locale
          }
        }
      }
    }
  }
`;
