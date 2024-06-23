const ModuleModel = require('../models/todo.model')

class ModuleService {

  getAll(query = {}) {
    return ModuleModel.find(query).exec();
  }

  getOneById(id) {
    return ModuleModel.findById(id).exec();
  }

  create(todo) {
    const newTodo = new ModuleModel(todo)
    const errors = newTodo.validateSync()
    if (errors) {
      return Promise.reject(errors)
    }
    return newTodo.save()
  }

  update(id, todo) {
    todo.updatedAt = Date.now()
    return ModuleModel.findByIdAndUpdate(id, todo, { new: true }).exec();
  }

  remove(id) {
    return ModuleModel.findByIdAndDelete(id).exec();
  }
}

module.exports = new ModuleService()