import constants from "../../config/constants"

const initialState = {
  data: [],
  isLoading: false
}

export default transactionReducer = (state=initialState, action) => {
  // console.log('iniii', action.payload)
  const { type, payload } = action
  switch (type) {
    case constants.LIST_TRANSACTION:
      return { ...state , isLoading: true }
    default:
      return state
  }
}