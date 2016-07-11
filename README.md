# webpack-project

### Data structure

```
.  
├── app (app folder)  
├── webpack  
│   ├── config (webpack configure file)  
│   │   ├── base.js  
│   │   ├── develop.js  
│   │   └── deploy.js  
│   └── command  
└──  dist
```

### Useage

```bash
babel-node webpack/webpack.js -h  

ex:  
babel-node webpack/webpack.js develop {app name}  
babel-node webpack/webpack.js deploy {app name}  
```
