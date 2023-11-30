const fs = require('fs');
const papa = require('papaparse');
const path = require('path');

const file = "amd_november.csv";
const main_folder = 'ahmedabad';

// Get the absolute path to the CSV file
const csvFilePath = path.resolve(__dirname, main_folder, 'old_' + main_folder + '_data', file);

// Read the CSV file
const csvData = fs.readFileSync(csvFilePath, 'utf8');


// Parse the CSV data
const { data: records, meta } = papa.parse(csvData, { header: true });

// Calculate Midnight values
records.forEach((record) => {

    const maghribTime = parseTime(record.Maghrib);
    const fajrTime = parseTime(record.Fajr);

    const midnightTime = calculateMidnightTime(fajrTime, maghribTime);
    // console.log('midnightTime: ', midnightTime);

    // Update the Midnight column
    record.Midnight = formatTime(midnightTime);
});


// Convert records back to CSV format
const updatedCsvData = papa.unparse({ data: records, fields: meta.fields });

const outputFilePath = path.resolve(__dirname, main_folder, main_folder + '_data', file);
fs.writeFileSync(outputFilePath, updatedCsvData, 'utf8');

console.log('Updated CSV saved to:', outputFilePath);

// Function to parse time in HH:mm AM/PM format
function parseTime(timeString) {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    return {
        hours: hours + (period === 'PM' && hours !== 12 ? 12 : 0),
        minutes,
    };
}

// Function to format time as HH:mm AM/PM
function formatTime(time) {
    const period = time.hours < 12 ? 'PM' : 'AM';
    const hours = time.hours % 12 || 12;

    return `${hours}:${String(time.minutes).padStart(2, '0')} ${period}`;
}

// Function to calculate Midnight time
// Function to calculate Midnight time
function calculateMidnightTime(fajrTime, maghribTime) {
    // Convert both times to minutes
    const fajrMinutes = fajrTime.hours * 60 + fajrTime.minutes;
    const maghribMinutes = maghribTime.hours * 60 + maghribTime.minutes;

    // Calculate midnight time in minutes
    let midnightMinutes = (maghribMinutes - fajrMinutes) / 2 + fajrMinutes;

    // Handle cases where midnightMinutes goes below 0
    if (midnightMinutes < 0) {
        midnightMinutes += 24 * 60; // Add 24 hours in minutes
    }

    // Convert back to hours and minutes
    const midnightHours = Math.floor(midnightMinutes / 60) % 12 || 12; // Ensure it's in 12-hour format
    const midnightMinutesRemainder = midnightMinutes % 60;


    return {
        hours: midnightHours,
        minutes: Math.round(midnightMinutesRemainder),
    };
}

// function calculateMidnightTime(fajrTime, maghribTime) {
//     var midnightHours = (maghribTime.hours - fajrTime.hours) / 2 + fajrTime.hours;
//     var midnightMinutes = (maghribTime.minutes - fajrTime.minutes) / 2 + fajrTime.minutes;

//     // Handle cases where midnightMinutes goes below 0
//     if (midnightMinutes < 0) {
//         midnightHours--;
//         midnightMinutes += 60;
//     }

//     return {
//         hours: midnightHours % 12 || 12, // Ensure it's in 12-hour format
//         minutes: midnightMinutes,
//     };
// }
