const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.post("/getRooms",(req, res) => {
	const { x, y, roomType } = req.body;
	const nearestHotel = getNearestHotel(x, y);
	console.log(nearestHotel);
	const availableRooms = getAvailableRooms(nearestHotel.id, roomType);
	console.log(availableRooms);
	if (availableRooms?.length === 0 || availableRooms === undefined) {
		return res.status(404).json({ message: "No available rooms found" });
	}
	return res.json({
		hotelId: availableRooms.id,
		hotelCoordinates: {
			x: nearestHotel.coordinateX,
			y: nearestHotel.coordinateY,
		},
		roomId: availableRooms.roomType,
	});
});

function getNearestHotel(x, y) {
	const hotels = [
		{
			id: "h1",
			name: "Hotel 1",
			coordinateX: 10,
			coordinateY: 20,
		},
		{
			id: "h2",
			name: "Hotel 2",
			coordinateX: 30,
			coordinateY: 40,
		},
		{
			id: "h3",
			name: "Hotel 3",
			coordinateX: 50,
			coordinateY: 60,
		},
	];

	// Calculate the distance between the user's coordinates and each hotel's coordinates
	const distances = hotels.map((hotel) => {
		const dx = hotel.coordinateX - x;
		const dy = hotel.coordinateY - y;
		return { id: hotel.id, distance: Math.sqrt(dx * dx + dy * dy) };
	});

	// Sort the hotels by distance in ascending order
	distances.sort((a, b) => a.distance - b.distance);

	// Return the nearest hotel
	return hotels.find((hotel) => hotel.id === distances[0].id);
}

function getAvailableRooms(hotelId, roomType) {
	console.log(hotelId, roomType);
	const rooms = [
		{
			id: "r1",
			hotelId: "h1",
			roomType: "Deluxe",
		},
		{
			id: "r2",
			hotelId: "h1",
			roomType: "Business",
		},
		{
			id: "r3",
			hotelId: "h2",
			roomType: "Prime",
		},
	];
	return rooms.find((room) => {
		console.log(room);
		return room.hotelId === hotelId && room.roomType === roomType;
	});
}

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
