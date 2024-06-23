const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const logMiddleware = require('./middlewares/log.middleware');
const responseMiddleware = require('./middlewares/response.middleware');
require('dotenv').config(); // 环境变量配置
require('./db/connect');

const routerRegister = require('./routes/index');

// error handler
onerror(app);

// 跨域处理
app.use(cors({
  origin: function (ctx) { //设置允许来自指定域名请求
    const whiteList = ['http://localhost:8848', 'http://127.0.0.1:8848']; //可跨域白名单
    let url = ctx.header.referer?.slice(0, ctx.header.referer.length - 1);
    if (whiteList.includes(url)) {
      return url; //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
    }
    return 'http://localhost::3000' //默认允许本地请求3000端口可跨域
  }
}))

app.use(logMiddleware); // 注册主题打印中间件
app.use(responseMiddleware); // 注册回复中间件

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

// 注册路由
routerRegister(app);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
