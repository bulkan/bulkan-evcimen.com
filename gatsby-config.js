module.exports = {
  siteMetadata: {
    title: `Bulkan Evcimen`,
    name: `Bulkan`,
    siteUrl: `https://bulkan-evcimen.com`,
    description: ``,
    author: {
      name: `Bulkan Evcimen`,
      summary: `Software Engineer that plays the Ney.`
    },
    siteUrl: `https://bulkan-evcimen.com/`,
    // hero: {
    //   heading: `Software Engineer that plays the Ney.`,
    //   maxWidth: 652,
    // },
    social: {
      twitter: "bulkanevcimen"
    }
    // social: [
    //   {
    //     name: `github`,
    //     url: `https://github.com/bulkan`,
    //   },
    //   {
    //     name: `instagram`,
    //     url: `https://instagram.com/bulkan.evcimen`,
    //   },
    // ],
  },
  plugins: [
    "gatsby-plugin-netlify",
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              // linkImagesToOriginal: false,
              // quality: 80,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-1620638-6",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Software Engineer that plays the Ney.`,
        name: `Bulkan Evcimen`,
        short_name: `Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/pixelman.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { secret: { ne: true } } }
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      slug
                      hero {
                        src
                        alt
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      }
    }
  ],
};
