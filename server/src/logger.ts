const log4js = require('log4js');

export function setup(): void {
    log4js.configure({
        appenders: [
            { type: 'console' }
        ]
    });
}

export function logger(): any {
    return log4js.getLogger();
}
