import config from "."

const constants = {}

constants.LIST_TRANSACTION = 'LIST_TRANSACTION'
constants.LIST_TRANSACTION_SUCCESS = 'LIST_TRANSACTION_SUCCESS'
constants.LIST_TRANSACTION_FAILURE = 'LIST_TRANSACTION_FAILURE'

constants.URL = config.URL[config.environment]

export default constants