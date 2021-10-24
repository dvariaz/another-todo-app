const CracoAlias = require("craco-alias");

module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        require("postcss-nested"),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
