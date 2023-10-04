import { call, put, takeEvery } from 'redux-saga/effects';

// Crypto Redux States
import {
    GET_PROJECTS,
    GET_PROJECT_DETAIL,
    ADD_NEW_PROJECT,
    DELETE_PROJECT,
    UPDATE_PROJECT,
    GET_ATTORNEY_DETAIL,
} from './actionTypes';
import {
    getProjectsSuccess,
    getProjectsFail,
    getProjectDetailSuccess,
    getProjectDetailFail,
    addProjectFail,
    addProjectSuccess,
    updateProjectSuccess,
    updateProjectFail,
    deleteProjectSuccess,
    deleteProjectFail,
} from './actions';
import { getAttorneyByID } from '../../../src/helpers/backend_helper';

// Placeholder API functions
const getProjectsApi = () => {
    // Simulate API call
    return Promise.resolve([]);
};

const getProjectDetailsApi = (projectId) => {
    // Simulate API call
    return Promise.resolve({ project: {} });
};

const updateProjectApi = (project) => {
    // Simulate API call
    return Promise.resolve({ success: true });
};

const deleteProjectApi = (project) => {
    // Simulate API call
    return Promise.resolve({ success: true });
};

const addNewProjectApi = (project) => {
    // Simulate API call
    return Promise.resolve({ success: true });
};

function* fetchProjects() {
    try {
        const response = yield call(getProjectsApi);
        yield put(getProjectsSuccess(response));
    } catch (error) {
        yield put(getProjectsFail(error));
    }
}

function* fetchProjectDetail({ projectId }) {
    try {
        const response = yield call(getProjectDetailsApi, projectId);
        yield put(getProjectDetailSuccess(response));
    } catch (error) {
        yield put(getProjectDetailFail(error));
    }
}

function* onUpdateProject({ payload: project }) {
    try {
        const response = yield call(updateProjectApi, project);
        yield put(updateProjectSuccess(response));
    } catch (error) {
        yield put(updateProjectFail(error));
    }
}

function* onDeleteProject({ payload: project }) {
    try {
        const response = yield call(deleteProjectApi, project);
        yield put(deleteProjectSuccess(response));
    } catch (error) {
        yield put(deleteProjectFail(error));
    }
}

function* onAddNewProject({ payload: project }) {
    try {
        const response = yield call(addNewProjectApi, project);
        yield put(addProjectSuccess(response));
    } catch (error) {
        yield put(addProjectFail(error));
    }
}

function* onGetAttorneyByID({ payload: user }) {
    try {
        const response = yield call(getAttorneyByID, { objectId: user.user.objectId });
        yield put(getProjectDetailSuccess(response));
    } catch (error) {
    // Handle the error appropriately
    }
}

function* projectsSaga() {
    yield takeEvery(GET_PROJECTS, fetchProjects);
    yield takeEvery(GET_PROJECT_DETAIL, fetchProjectDetail);
    yield takeEvery(ADD_NEW_PROJECT, onAddNewProject);
    yield takeEvery(UPDATE_PROJECT, onUpdateProject);
    yield takeEvery(DELETE_PROJECT, onDeleteProject);
    yield takeEvery(GET_ATTORNEY_DETAIL, onGetAttorneyByID);
}

export default projectsSaga;
