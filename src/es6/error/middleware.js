import Counter from './counter.js';
import { ERROR_REPORT } from './action.js';

const createErrorReport = function createErrorReport(device){
    let counter = new Counter(device);
    return store => next => action => {
        if(ERROR_REPORT === action.type){
            counter.report(action.code);
        }
        next(action);
    };
};

export default createErrorReport;
