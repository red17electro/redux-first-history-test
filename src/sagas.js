import { LOCATION_CHANGE } from "redux-first-history";
import { takeEvery } from "redux-saga/effects";

function* changeLocation({ payload }) {
  const { location, action } = payload;
  // eslint-disable-next-line
  yield console.log("LOCATION_CHANGE", location, action);
}

export default function* rootSaga() {
  yield takeEvery(LOCATION_CHANGE, changeLocation);
}
