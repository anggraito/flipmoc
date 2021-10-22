import axios from 'axios'
import constants from '../../config/constants'

const getListTransaction = () => {
  return async () => {
    try {
      const url = `${constants.URL}`
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      return response
    }
    catch (e) {
      return e
    }
  }
}