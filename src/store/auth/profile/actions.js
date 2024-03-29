import { PROFILE_ERROR,RESET_PROFILE_FLAG } from './actionTypes';





export const profileError = error => {
    return {
        type: PROFILE_ERROR,
        payload: error,
    };
};

export const resetProfileFlag = error => {
    return {
        type: RESET_PROFILE_FLAG,
    };
};
