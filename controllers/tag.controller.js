const moduleService = require("../services/tag.service");

class ModuleController {
  name = "tag";
  title = "标签";

  async getAll(ctx, next) {
    // 完善查询条件
    await moduleService
      .getAll({})
      .then((res) => {
        ctx.rp(200, `获取${this.title}成功`, res);
      })
      .catch((err) => {
        ctx.log.error(err.message);
        ctx.st(400).rp(400, `获取${this.title}失败`, err.message);
      });

    await next();
  }

  async getOneById(ctx, next) {
    await moduleService
      .getOneById(ctx.params.id)
      .then((res) => {
        if (!res) {
          return ctx
            .st(400)
            .rp(400, `获取指定${this.title}失败`, `指定${this.title}不存在`);
        }
        ctx.rp(200, `获取指定${this.title}成功`, res);
      })
      .catch((err) => {
        ctx.log.error(err.message);
        ctx.st(400).rp(400, `获取指定${this.title}失败`, err.message);
      });

    await next();
  }

  async create(ctx, next) {
    // 1.判重
    const {name, creator} = ctx.request.body; // 后续creator由游湖信息提供
    const result = await moduleService.getByNameAndCreator(name, creator);
    if (result && result.length > 0) {
      return ctx.st(400).rp(400, `新增${this.title}失败`, `${name}标签已存在`);
    }
    // 2.创建
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
    const { name, creator } = ctx.request.body;
    const id = ctx.params.id;
    const result = await moduleService.getByNameAndCreator(name, creator);
    if (result && result.length > 0 && result.some(item => item._id !== id)) {
      return ctx.st(400).rp(400, `新增${this.title}失败`, `${name}标签已存在`);
    }

    await moduleService
      .update(id, ctx.request.body)
      .then((res) => {
        if (!res) {
          return ctx
            .st(400)
            .rp(400, `更新${this.title}失败`, `指定${this.title}不存在`);
        }
        ctx.rp(200, `更新${this.title}成功`, res);
      })
      .catch((err) => {
        ctx.log.error(err.message);
        ctx.st(400).rp(400, `更新${this.title}失败`, err.message);
      });

    await next();
  }

  async remove(ctx, next) {
    const id = ctx.params.id;
    await moduleService
      .remove(id)
      .then((res) => {
        if (!res) {
          return ctx
            .st(400)
            .rp(400, `删除${this.title}失败`, `指定${this.title}不存在`);
        }
        ctx.rp(200, `删除${this.title}成功`, res);
      })
      .catch((err) => {
        ctx.log.error(err.message);
        ctx.st(400).rp(400, `删除${this.title}失败`, err.message);
      });

    await next();
  }
}

module.exports = new ModuleController();
