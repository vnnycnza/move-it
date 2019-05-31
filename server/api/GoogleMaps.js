/**
 *  Google.js
 *  Requests to Google API
 */

const axios = require('axios');
const _ = require('lodash');
const querystring = require('querystring');
const sendAPIRequest = (options) => axios.request(options);

class GoogleMaps {
    constructor (options) {
      this._url = 'https://maps.googleapis.com/maps/api/geocode/json?';
      this._apiKey = options.apiKey;
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

    async getLocation(langlat) {
      const data = {
        latlng: langlat,
        location_type: 'ROOFTOP',
        result_type: 'street_address',
        key: this._apiKey
      };

      const requestDetails = {
        url: `${this._url}${querystring.stringify(data)}`,
        method: 'GET',
      };

      try {
        const response = await this._callApi(requestDetails);
        return _.get(response, 'results[0].formatted_address', 'No street address available yet');
      } catch (error) {
        throw error;
      }
    }
}

module.exports = GoogleMaps;