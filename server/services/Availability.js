/**
 *  Availability.js
 *  Service for getting availability
 */

const GoogleMaps = require('../api/GoogleMaps');
const Smove = require('../api/Smove');

class Availability {
  constructor () {
    this._smoveApi = new Smove();
    this._googleMapsApi = new GoogleMaps({ apiKey: process.env.GOOGLE_API_KEY });
  }

  async _getBookingAvailability(start, end) {
    return await this._smoveApi.getAvailability(start, end);
  }

  async _getBookingLocation(coordinates) {
    return await this._googleMapsApi.getLocation(coordinates);
  }

  async getFormattedAvailabilty(params) {
    const smoveData = await this._getBookingAvailability(params.startTime, params.endTime);
    const results = {
      bookings: []
    };

    console.log(`[Server] Fetched ${smoveData.length} results from Smove API`);
    for (const item of smoveData) {
      
      // Let's not include those with no available cars
      if (item.available_cars === 0) {
        continue;
      }
    
      let formattedLocation = await this._getBookingLocation(item.location.join());
      console.log(`[Server] Query location from Google API (${item.location.join()}): ${formattedLocation}`);

      let formattedData = {
        id: item.id,
        location: formattedLocation,
        coordinates: item.location.join(),
        dropoff_count: item.dropoff_locations.length,
        available_cars: item.available_cars,
        dropoff_locations: item.dropoff_locations.reduce((result, loc) => {
          if (loc.id !== item.id) {
            result.push({
              id: loc.id,
              latitude: loc.location[0],
              longitude: loc.location[1]
            });
          }
          return result;
        }, [])
      };

      results.bookings.push(formattedData);
    }
    return results;
  }
}

module.exports = new Availability()