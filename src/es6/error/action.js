export const ERROR_REPORT = 'ERROR_REPORT';

export function reportError(code){
    return {
        type: ERROR_REPORT,
        code: code
    };
}

