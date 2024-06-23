module.exports = async function responseMiddleware(ctx, next) {
    if (!ctx.st && !ctx.rp) {
        ctx.st = (statu) => {
            ctx.status = statu;
            return ctx;
        }; // 设置状态码
        ctx.rp = (code, msg, data) => {
            if (code >= 400) {
                ctx.body = { code, msg, reason: data };
            } else {
                ctx.body = { code, msg, data };
            }
            return ctx;
        }
    } else {
        console.log(error('ctx.st or ctx.rp is used...'));
    }

    await next();
}