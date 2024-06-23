const koaRouter = require('koa-router');
const controller = require('../controllers/todo.controller');
const { createValidatorMiddlewareBySchema } = require('../middlewares/validator.middleware');
const { createSchema, updateSchema } = require('../validators/todo.validator');
const { objectIdSchema } = require('../middlewares/validator.middleware');

const router = koaRouter({ prefix: '/todos' });

router
    .get('/', controller.getAll.bind(controller))
    .get('/:id', createValidatorMiddlewareBySchema([objectIdSchema], [{ rewrite: false, path: ['params', 'id'] }]), controller.getOneById.bind(controller))
    .post('/', createValidatorMiddlewareBySchema([createSchema]), controller.create.bind(controller))
    .put('/:id', createValidatorMiddlewareBySchema(
        [objectIdSchema, updateSchema],
        [{ rewrite: false, path: ['params', 'id'] }, { rewrite: true, path: ['request', 'body'] }]
    ),
        controller.update.bind(controller))
    .delete('/:id', createValidatorMiddlewareBySchema([objectIdSchema], [{ rewrite: false, path: ['params', 'id'] }]), controller.remove.bind(controller))

module.exports = router;