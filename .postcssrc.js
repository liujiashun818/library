const autoprefixer = require('autoprefixer');
module.exports = {
  plugins: {
    'autoprefixer': {browsers: 'last 5 version'},
  }
}

// module.exports = {
//   plugins: [
//     require('autoprefixer')({
//       browsers: 'last 5 version'
//     }),
//     require('post-css-smartImport')({
//     }),
//     require('precss')({
//     }),
//   ]
// }