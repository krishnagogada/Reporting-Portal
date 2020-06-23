module.exports = {
  plugins: [
    // ...
    require("tailwindcss")("./src/tailwind.ts"),
    require("autoprefixer")
    // ...
  ]
};
