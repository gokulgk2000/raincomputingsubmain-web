import { fork,all} from "redux-saga/effects"

// Login Redux States
export function* watchProfile() {
 
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
