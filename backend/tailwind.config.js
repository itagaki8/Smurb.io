module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js",
    "./views/**/*.ejs"
  ],
  theme: {
    extend: {
      backgroundImage:{
        'back':"url(/public/assets/back.jpg)",
      },
    },
  },
  plugins: [],
}
