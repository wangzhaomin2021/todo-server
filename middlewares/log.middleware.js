const chalk = require('chalk');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const info = chalk.blue;

module.exports = async function logMiddleware(ctx, next) {
    if (!ctx.log) {
        ctx.log = {
            error: msg => console.log(error(msg)),
            warning: msg => console.log(warning(msg)),
            info: msg => console.log(info(msg))
        }
    } else {
        console.log(error('ctx.log is used...'));
    }

    await next();
}