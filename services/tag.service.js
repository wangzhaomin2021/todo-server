const ModuleModel = require("../models/tag.model");

class ModuleService {
  // 通用

  getModel() {
    return ModuleModel;
  }

  getAll(query = {}, opt = {}) {
    return ModuleModel.find(query, opt).exec();
  }

  getOneById(id, opt = {}) {
    return ModuleModel.findById(id, opt).exec();
  }

  create(data, opt = {}) {
    const newData = new ModuleModel(data);
    if (opt.session) {
      newData.$session(opt.session);
    }
    return newData.save(opt);
  }

  update(id, data, opt = {}) {
    data.updatedAt = Date.now();
    // 更新时 runValidators: true 指定要走验证器 不然默认不走  new: true 返回更新后的数据
    return ModuleModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      ...opt,
    }).exec();
  }

  remove(id, opt = {}) {
    return ModuleModel.findByIdAndDelete(id, opt).exec();
  }

  getByNameAndCreator(name, creator, projection = null, opt = {}) {
    return ModuleModel.find({ name, creator }, projection, opt).exec();
  }
}

module.exports = new ModuleService();
