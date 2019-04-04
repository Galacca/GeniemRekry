const presets = [
  [
    "@babel/env",
    {
      targets: {
       node: "current"
      },
      useBuiltIns: "usage",
    },
  ],
  "stage-1"
];

module.exports = { presets };