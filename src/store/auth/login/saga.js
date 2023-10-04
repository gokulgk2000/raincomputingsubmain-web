import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN, UPDATE_PROFILE } from './actionTypes';
import { apiError, loginSuccess, logoutUserSuccess, profileSuccess } from './actions';
import { putProfileUpdate } from '../../../helpers/backend_helper';
import { postLogin } from '../../../helpers/backend_helper';

// Placeholder for Firebase backend
const fireBaseBackend = {
    loginUser: (email, password) => {
        console.log('Firebase backend - Login:', email, password);
        // Simulate a response
        return Promise.resolve({ success: true });
    },
    logout: () => {
        console.log('Firebase backend - Logout');
        // Simulate a response
        return Promise.resolve({ success: true });
    },
};

function* loginUser({ payload: { user, history } }) {
    try {
    // Replace this with your actual login logic
        const response = yield call(postLogin, {
            email: user.email,
            password: user.password,
        });
        if (response?.success) {
            localStorage.setItem('authUser', JSON.stringify(response));
            yield put(loginSuccess(response));
        } else {
            yield put(apiError(response?.msg));
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        localStorage.removeItem('authUser');

        // Replace this with your actual logout logic
        const response = yield call(fireBaseBackend.logout);
        yield put(logoutUserSuccess(response));
        history.push('/');
    } catch (error) {
        yield put(apiError(error));
    }
}

function* socialLogin({ payload: { data, history, type } }) {
    try {
    // Replace this with your actual social login logic
    } catch (error) {
        yield put(apiError(error));
    }
}

function* updateProfile({ payload: { user } }) {
    try {
    // Replace this with your actual profile update logic
        const response = yield call(putProfileUpdate, user);
        yield put(profileSuccess(response));
    } catch (error) {
    // Handle error
    }
}

function* authSaga() {
    yield takeEvery(LOGIN_USER, loginUser);
    yield takeLatest(SOCIAL_LOGIN, socialLogin);
    yield takeEvery(LOGOUT_USER, logoutUser);
    yield takeEvery(UPDATE_PROFILE, updateProfile);
}

export default authSaga;
