const { z } = require('zod');

const mongoose = require('mongoose');

/**
 * 这里schemas 和 paths 可以合成一个对象形式传入
 * @param {*} schemas 校验的schemas
 * @param {*} paths   校验体的路径， 需与schemas一一对应
 * @returns 
 */
function createValidatorMiddlewareBySchema(schemas, paths = [{ rewrite: true, path: ['request', 'body'] }]) {
    const getValue = (ctx, path) => {
        return path.reduce((acc, curr) => acc[curr], ctx);
    }

    const setValue = (ctx, path, value) => {
        path.reduce((acc, curr, index) => {
            if (index === path.length - 1) {
                acc[curr] = value;
            }
            return acc[curr];
        }, ctx);
    }

    if (schemas.length !== paths.length) throw new Error('schemas 与 paths 需一一对应');

    return async (ctx, next) => {
        const errors = [];
        const parsedValues = [];
        for (let i = 0; i < schemas.length; i++) {

            const value = getValue(ctx, paths[i].path);
            // const parsedValue = z.preprocess(value => (typeof value === 'string' ? JSON.parse(value) : value), schemas[i]).safeParse(value);
            const parsedValue = schemas[i].safeParse(value);
            parsedValues.push(parsedValue);
            if (!parsedValue.success) {
                // 处理验证失败的情况
                errors.push(parsedValue.error.format());
            }
        }

        if (errors.length) return ctx.st(400).rp(400, '参数校验失败', errors);

        paths.forEach((path, i) => {
            if (path.rewrite) {
                setValue(ctx, path.path, parsedValues[i].data); // 将解析后的值设置回上下文
            }
        })

        await next();
    }
}

const objectIdSchema = z.string().or(z.object()).refine((value) => mongoose.Types.ObjectId.isValid(value), { message: '无效ID' });

module.exports = {
    createValidatorMiddlewareBySchema,
    objectIdSchema,
}