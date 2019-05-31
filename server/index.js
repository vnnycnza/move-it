const express = require('express');
const path = require('path');
const Availability = require('./services/Availability');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(path.dirname(__dirname), '/client/build')));

// Backend API
app.get('/v1/availability', async (req, res) => {
  console.log(`[Server] Request to get bookings for ${req.query.startTime} - ${req.query.endTime}`)
  try {
    if (!req.query.startTime || !req.query.endTime) {
      throw new Error('Invalid Parameters');
    }
    const data = await Availability.getFormattedAvailabilty(req.query);
    console.log(`[Server] Total bookings: ${data.bookings.length}`)
    return res.json(data);
  } catch (e) {
    console.log(`[Server] Encountered error ${e}`)
    return res.json(400, { error: e.message});
  }
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(path.dirname(__dirname), '/client/build/index.html'));
});

app.listen(3001, () => {
  console.log('[Server] Express server is running on localhost:3001')
});


