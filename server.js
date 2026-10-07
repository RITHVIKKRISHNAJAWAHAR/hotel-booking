require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Read form data
app.use(express.urlencoded({ extended: true }));

// Display HTML form
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// POST request
app.post("/book", (req, res) => {

    const { guestName, phone, checkInDate, rooms } = req.body;

    const bookingDetails =
        `Guest Name: ${guestName}\n` +
        `Phone Number: ${phone}\n` +
        `Check-in Date: ${checkInDate}\n` +
        `Number of Rooms: ${rooms}\n` +
        `--------------------------\n`;

    // Append booking without overwriting old bookings
    fs.appendFile("bookings.txt", bookingDetails, (err) => {

        if (err) {
            console.log(err);
            return res.send("Error saving booking!");
        }

        res.send("<h2>Hotel Booking Successful!</h2>");
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});