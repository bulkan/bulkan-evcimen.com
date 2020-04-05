module.exports = {
  siteMetadata: {
    title: `Bulkan Evcimen`,
    name: `Narative`,
    siteUrl: `https://bulkan-evcimen.com`,
    description: `This is my blog`,
    hero: {
      heading: `Welcome to my blog.`,
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
      }
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        sources: {
          local: true,
          contentful: false
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
        trackingId: "",
      },
    },
  ],
};
