module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            components: "./src/components",
            screens: "./src/screens",
            api: "./src/api",
            context: "./src/context",
            services: "./src/services"
          }
        }
      ]
    ]
  };
};
