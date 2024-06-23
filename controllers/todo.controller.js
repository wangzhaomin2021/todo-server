const moduleService = require('../services/todo.service');

class ModuleController {
  name = 'todo';
  title = '待办';

  async getAll(ctx, next) {
    // 完善查询条件
    await moduleService.getAll({}).then(res => {
      ctx.rp(200, `获取${this.title}成功`, res);
    }).catch(err => {
      ctx.log.error(err.message);
      ctx.st(400).rp(400, `获取${this.title}失败`, err.message);
    })

    await next();
  }

  async getOneById(ctx, next) {
    await moduleService.getOneById(ctx.params.id)
      .then(res => {
        if (!res) {
          return ctx.st(400).rp(400, `获取指定${this.title}失败`, `指定${this.title}不存在`);
        }
        ctx.rp(200, `获取指定${this.title}成功`, res);
      })
      .catch(err => {
        ctx.log.error(err.message);
        ctx.st(400).rp(400, `获取指定${this.title}失败`, err.message);
      })

    await next();
  }

  async create(ctx, next) {
    await moduleService.create(ctx.request.body)
      .then(res => {
        ctx.rp(201, `新增${this.title}成功`, res);
      })
      .catch(err => {
        ctx.log.error(err.message);
        ctx.st(400).rp(400, `新增${this.title}失败`, err.message);
      })

    await next();
  }

  async update(ctx, next) {
    await moduleService.update(ctx.params.id, ctx.request.body)
      .then(res => {
        if (!res) {
          return ctx.st(400).rp(400, `更新${this.title}失败`, `指定${this.title}不存在`);
        }
        ctx.rp(200, `更新${this.title}成功`, res);
      })
      .catch(err => {
        ctx.log.error(err.message);
        ctx.st(400).rp(400, `更新${this.title}失败`, err.message);
      })

    await next();
  }

  async remove(ctx, next) {
    const id = ctx.params.id;
    await moduleService.remove(id)
      .then(res => {
        if (!res) {
          return ctx.st(400).rp(400, `删除${this.title}失败`, `指定${this.title}不存在`);
        }
        ctx.rp(200, `删除${this.title}成功`, res);
      })
      .catch(err => {
        ctx.log.error(err.message);
        ctx.st(400).rp(400, `删除${this.title}失败`, err.message);
      })

    await next();
  }

}

module.exports = new ModuleController();