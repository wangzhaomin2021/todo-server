const path = require('node:path');
const router = require('koa-router')({ prefix: '/upload' });
const multer = require('multer');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');
const { readDir } = require('../utils/file')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = mime.extension(file.mimetype)
    const filename = uuidv4() + '.' + ext
    cb(null, filename)
  }
})

const upload = multer({ storage })

const singleWrapperUpload = async (ctx, next) => {
  await upload.single('file')(ctx.req, ctx.res, next)
}

// 表单其他文本... 做一些逻辑
// 将文件内容hash 盘重 path hash owner type【文件类型】 statu 私有的、公开的  存数据库里

router.post('/public', singleWrapperUpload, async (ctx, next) => {
  console.log(ctx.req.file)
  if (ctx.req.file) {
    // 存入数据库
    // 启用一个线程？？ 似乎需要立即计算才能避免重复文件  读取文件内容 hash 到数据库中
    ctx.body = '上传成功'
    return
  }
})

// 上传为私有的 仅自己可见
router.post('/private', async (ctx, next) => {

})

router.get('/', async (ctx, next) => {
  await readDir(path.join(__dirname, '../uploads'))
  .then(res => {
    ctx.body = {
      code: 200,
      msg: 'success',
      data: res
    }
  })
  .catch(err => {
    ctx.log.error(err.message);
    ctx.status = 400;
    ctx.body = {
      code: 400,
      msg: err.message,
      data: null
    }
  })

  await next();
})

module.exports = router