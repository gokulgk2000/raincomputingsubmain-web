import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import { FORGET_PASSWORD } from './actionTypes';
import { userForgetPasswordSuccess, userForgetPasswordError } from './actions';

// Placeholder function for Firebase backend
const fireBaseBackend = {
    forgetPassword: (email) => {
        console.log('Firebase backend - Forget Password for:', email);
        return Promise.resolve(true); // Simulating a successful response
    }
};

// Placeholder function for JWT API call
const postJwtForgetPwd = (url, data) => {
    console.log('JWT API - Forget Password:', data);
    return Promise.resolve(true); // Simulating a successful response
};

// Placeholder function for Fake API call
const postFakeForgetPwd = (url, data) => {
    console.log('Fake API - Forget Password:', data);
    return Promise.resolve(true); // Simulating a successful response
};

function* forgetUser({ payload: { user, history } }) {
    try {
        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            const response = yield call(fireBaseBackend.forgetPassword, user.email);
            if (response) {
                yield put(
                    userForgetPasswordSuccess(
                        'Reset link has been sent to your mailbox. Please check there.'
                    )
                );
            }
        } else if (process.env.REACT_APP_DEFAULTAUTH === 'jwt') {
            const response = yield call(postJwtForgetPwd, '/jwt-forget-pwd', {
                email: user.email,
            });
            if (response) {
                yield put(
                    userForgetPasswordSuccess(
                        'Reset link has been sent to your mailbox. Please check there.'
                    )
                );
            }
        } else {
            const response = yield call(postFakeForgetPwd, '/fake-forget-pwd', {
                email: user.email,
            });
            if (response) {
                yield put(
                    userForgetPasswordSuccess(
                        'Reset link has been sent to your mailbox. Please check there.'
                    )
                );
            }
        }
    } catch (error) {
        yield put(userForgetPasswordError(error));
    }
}

export function* watchUserPasswordForget() {
    yield takeEvery(FORGET_PASSWORD, forgetUser);
}

function* forgetPasswordSaga() {
    yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
