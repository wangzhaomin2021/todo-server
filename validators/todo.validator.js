const { z } = require("zod");
// const { objectIdSchema } = require('../middlewares/validator.middleware');

const createSchema = z.object({
    content: z.string().trim().min(1),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    tags: z.array(z.string().trim().min(1)).optional(),
    // importance: z.enum(['low', 'medium', 'high']).optional(),
    // urgency: z.enum(['low', 'medium', 'high']).optional(),
    tip: z.boolean().optional(),
});

const updateSchema = createSchema.partial();

module.exports = {
    createSchema,
    updateSchema,
}