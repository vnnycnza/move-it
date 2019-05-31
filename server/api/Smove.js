/**
 *  Smove.js
 *  Requests to Smove API
 */

const axios = require('axios');
const sendAPIRequest = (options) => axios.request(options);

class Smove {
    constructor () {
      this._url = `https://challenge.smove.sg/availability`;
    }

    async _callApi(params) {
      try {
        const response = await sendAPIRequest(params);
        if (!response.data) {
            throw new Error('`No response body');
        }
        return response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status && error.response.status >= 500) {
              throw new Error(`API Server Error: ${error.response.status}  ${JSON.stringify(error.response.data)}`);
          } else {
              const err = new Error(`API Response Error: ${error.response.status} ${JSON.stringify(error.response.data)}`);
              throw err;
          }
        } else if (error.request) {
            throw new Error(`API Request Error: ${error.response.status}`);
        } else {
            throw new Error(`Request Error: ${error.response.status}`);
        }
      }
    }

    async getAvailability(start, end) {
      const requestDetails = {
        url: `${this._url}?startTime=${start}&endTime=${end}`,
        method: 'GET'
      };

      try {
        const response = await this._callApi(requestDetails);
        if (!response.data || !response.data.length) {
          throw new Error('No Smove Data Fetched');
        }
        return response.data;
      } catch (error) {
        throw error;
      }
    }
}

module.exports = Smove;