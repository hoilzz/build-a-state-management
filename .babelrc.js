module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        useBuiltIns: "usage",
        targets: "> 0.25%, not dead"
      }
    ],
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
  ]
};
