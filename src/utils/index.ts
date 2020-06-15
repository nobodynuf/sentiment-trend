type LoggerType = 'log' | 'warn' | 'error'

export function $debug(type : LoggerType,...content: any |any[]) {
    //const msg = [`%c `,...content, 'background: #689F38; color: #000000'];
    let msg = {color : 'background: #3F51B5; color: #ffffff; font-weight: bold; font-size: 16px<'};

    if(process.env.NODE_ENV === 'development'){
        switch(type){
            case 'log':
                console.log('%c 📔[DEBUG] ', msg.color, ...content); break;
            case 'error':
                console.error(...content); break;
            case 'warn':
                console.warn(...content); break;
        }
    }
    
}