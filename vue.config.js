module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'GitHub repos explorer';
        return args;
      });
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/styles/_variables.scss";
            @import "@/styles/_mixins.scss";
          `
      },
    },
  },
};