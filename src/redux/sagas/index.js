import { all } from 'redux-saga/effects'
import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import constants from '../../config/constants'

function* fetchListTransaction() {
  yield takeEvery(constants.LIST_TRANSACTION, sagaItems)
}

function* sagaItems() {
  try {
    const response = yield call(axios.get, `${constants.URL}`)
    yield put({type: constants.LIST_TRANSACTION_SUCCESS, payload: response.data})
  } catch (err) {
    const error = err.response.data
    yield put({type: constants.LIST_TRANSACTION_FAILURE})
  }
}

export default function* rootSaga() {
  yield all([
    fetchListTransaction(),
  ])
}