# webpack-project
1. Data structure

├ - - app (app folder)
├ - - webpack
| ├ - - config (webpack configure file)
| | ├ - - base.js
| | ├ - - develop.js
| | ├ - - deploy.js
| ├ - - command
├ - - dist

2. Useage

node webpack/webpack.js -h

ex:
node webpack/webpack.js develop {app name}
node webpack/webpack.js deploy {app name}
