module.exports = {
  siteMetadata: {
    title: `Bulkan Evcimen`,
    name: ``,
    siteUrl: `https://bulkan-evcimen.com`,
    description: ``,
    hero: {
      heading: `Software Engineer that plays the Ney.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/bulkanevcimen`,
      },
      {
        name: `github`,
        url: `https://github.com/bulkan`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/bulkan.evcimen`,
      },
    ],
  },
  plugins: [
    "gatsby-plugin-netlify-cache",
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        sources: {
          local: true,
          contentful: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bulkan Evcimen`,
        short_name: `Blog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/pixelman.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-1620638-6",
      },
    },
  ],
};
