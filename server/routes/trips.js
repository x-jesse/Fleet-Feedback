const express = require("express");
const Trip = require("../models/Trip.js");
const Incident = require("../models/Incident.js");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { tripId, duration, offences, driverId } = req.body;
    const trip = new Trip({
      tripId,
      duration,
      offences,
      driverId,
    });
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding trip" });
  }
});

router.get("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;
    const trips = await Trip.find({ driverId: driverId });
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving trips" });
  }
});

router.get("/incidents/:tripId", async (req, res) => {
  try {
    const { tripId } = req.params;
    const incidents = await Incident.find({ tripId: tripId });
    res.status(200).json(incidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving trip incidents" });
  }
});

router.post("/incidents/add", async (req, res) => {
  try {
    const { tripId, incidentType, latitude, longitude, driverId, videoId } = req.body;

    const newIncident = new Incident({
      tripId,
      incidentType,
      latitude,
      longitude,
      driverId,
      videoId, // This is optional as per the schema
    });

    // Save the new incident to the database
    await newIncident.save();
    res.status(201).send(newIncident);
  } catch (error) {
    console.error("Error adding incident:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
