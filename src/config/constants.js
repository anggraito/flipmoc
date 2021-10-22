import config from "."

const constants = {}

constants.LIST_TRANSACTION = 'LIST_TRANSACTION'

constants.URL = config.URL[config.environment]

export default constants