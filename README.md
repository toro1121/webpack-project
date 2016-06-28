# webpack-project

### Data structure

.  
├── app (app folder)  
├── webpack  
│   ├── config (webpack configure file)  
│   │   ├── base.js  
│   │   ├── develop.js  
│   │   └── deploy.js  
│   └── command  
└──  dist


### Useage

```bash
node webpack/webpack.js -h  

ex:  
node webpack/webpack.js develop {app name}  
node webpack/webpack.js deploy {app name}  
```
