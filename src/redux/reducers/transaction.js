import constants from "../../config/constants"

const initialState = {
  data: [],
  isLoading: false,
  isFound: false
}

export default transactionReducer = (state=initialState, action) => {
  // console.log('iniii', action.payload)
  const { type, payload } = action
  switch (type) {
    case constants.LIST_TRANSACTION:
      return { ...state , isLoading: true }
    case constants.LIST_TRANSACTION_SUCCESS:
      return { ...state , data: payload.results, isLoading: false, isFound: true }
    case constants.LIST_TRANSACTION_FAILURE:
      return { ...state , isLoading: false, isFound: false }
    default:
      return state
  }
}