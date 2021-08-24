# vue3-webpack

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

provide / inject 用于非父子组件之间共享数据
比如一些深度嵌套的组件  子组件想要获取父组件的部分内容
如果按照props 沿着组件链逐级传递下去  就十分麻烦

无论层级结构有多深  父组件都可以作为其所有子组件的以来提供者
父组件有一个provide 选项提供数据
子组件有一个 inject 选项来开始使用这些数据

实际上 可以将依赖主语看做是long range props  
除了父组件不需要知道哪些子组件使用他的provide  选项来提供数据
子组件不需要 inject的property来自哪里

app.vue -> home.vue -> homeContent.vue

如果Provide 中提供的一些数据是来打data  

todo 如果不用computed 