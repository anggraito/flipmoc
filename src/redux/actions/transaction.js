import axios from 'axios'
import constants from '../../config/constants'

const actionsAPI = {}

actionsAPI.getListTransaction = () => {
  return async () => {
    try {
      const url = `${constants.URL}`
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      return response.data
    }
    catch (err) {
      return err.response.data
    }
  }
}

export default actionsAPI;