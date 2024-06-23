const { z } = require("zod");

const createSchema = z.object({
    creator: z.string().trim().min(1).default('wzm'), // 后面去掉 后台程序取登录用户id
    name: z.string().trim().min(1),
    confilct: z.string().trim().min(1).array().transform(v => [...new Set(v)]).optional(),
    color: z.string().trim(),
    bgColor: z.string().trim(),
    icon: z.string().trim(),
}).refine(tag => !tag.confilct?.includes(tag.name), {
    message: '冲突标签不能包含自己',
    path: ['confilct'],
});

const updateSchema = createSchema;

module.exports = {
    createSchema,
    updateSchema,
}