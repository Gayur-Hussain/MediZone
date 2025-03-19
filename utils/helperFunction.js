// Function to format the date
export const formatDate = (isoDate) => {
	const date = new Date(isoDate); // Convert ISO string to Date object

	// Format the date as 'Day, Month Day, Year Hour:Minute AM/PM'
	return date.toLocaleString("en-US", {
		weekday: "long", // Full name of the day (e.g., 'Monday')
		month: "long", // Full name of the month (e.g., 'March')
		day: "numeric", // Day of the month (e.g., '1')
		year: "numeric", // Year (e.g., '2025')
		hour: "numeric", // Hour in 12-hour format
		minute: "numeric", // Minute
		second: "numeric", // Second
		hour12: true, // Use 12-hour time (AM/PM)
	});
};
