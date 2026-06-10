/**
 * Debug script to test Google Maps API key and autocomplete endpoint
 * Run: node debug-maps.js
 */

const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

const apiKey = process.env.GOOGLE_MAPS_API;

console.log('=== Google Maps API Debug ===\n');

// Step 1: Check if API key is loaded
console.log(`[1] API Key loaded: ${apiKey ? 'YES' : 'NO'}`);
console.log(`[1] API Key value: "${apiKey}"`);
console.log(`[1] API Key length: ${apiKey ? apiKey.length : 0}`);
console.log(`[1] Has leading/trailing spaces: ${apiKey !== apiKey?.trim() ? 'YES ⚠️' : 'NO'}`);
console.log('');

if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    console.log('❌ API key is missing or still a placeholder. Update your .env file.');
    process.exit(1);
}

// Step 2: Test Places Autocomplete API
async function testAutocomplete() {
    const input = 'Delhi';
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    console.log(`[2] Testing Places Autocomplete API with input: "${input}"`);
    console.log(`[2] URL: ${url.replace(apiKey, 'API_KEY_HIDDEN')}`);

    try {
        const response = await axios.get(url);
        console.log(`[2] HTTP Status: ${response.status}`);
        console.log(`[2] API Status: ${response.data.status}`);

        if (response.data.status === 'OK') {
            console.log(`[2] ✅ Autocomplete works! Got ${response.data.predictions.length} suggestions:`);
            response.data.predictions.forEach((p, i) => {
                console.log(`    ${i + 1}. ${p.description}`);
            });
        } else {
            console.log(`[2] ❌ API returned error status: ${response.data.status}`);
            console.log(`[2] Error message: ${response.data.error_message || 'none'}`);
            console.log('\n--- Common causes ---');
            if (response.data.status === 'REQUEST_DENIED') {
                console.log('• Places API is not enabled in your Google Cloud project');
                console.log('• API key restrictions are blocking this request');
                console.log('• Billing is not enabled on your Google Cloud account');
            } else if (response.data.status === 'OVER_QUERY_LIMIT') {
                console.log('• You have exceeded your API quota');
            } else if (response.data.status === 'INVALID_REQUEST') {
                console.log('• The input parameter is missing or invalid');
            }
        }
    } catch (err) {
        console.log(`[2] ❌ HTTP request failed: ${err.message}`);
    }
}

// Step 3: Test Geocoding API
async function testGeocoding() {
    const address = 'New Delhi, India';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    console.log(`\n[3] Testing Geocoding API with address: "${address}"`);

    try {
        const response = await axios.get(url);
        console.log(`[3] API Status: ${response.data.status}`);

        if (response.data.status === 'OK') {
            const loc = response.data.results[0].geometry.location;
            console.log(`[3] ✅ Geocoding works! Coordinates: ${loc.lat}, ${loc.lng}`);
        } else {
            console.log(`[3] ❌ API error: ${response.data.status} — ${response.data.error_message || 'no message'}`);
        }
    } catch (err) {
        console.log(`[3] ❌ Request failed: ${err.message}`);
    }
}

// Step 4: Test Distance Matrix API
async function testDistanceMatrix() {
    const origin = 'New Delhi, India';
    const dest = 'Mumbai, India';
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(dest)}&key=${apiKey}`;

    console.log(`\n[4] Testing Distance Matrix API: "${origin}" → "${dest}"`);

    try {
        const response = await axios.get(url);
        console.log(`[4] API Status: ${response.data.status}`);

        if (response.data.status === 'OK') {
            const el = response.data.rows[0].elements[0];
            console.log(`[4] ✅ Distance Matrix works!`);
            console.log(`[4] Distance: ${el.distance.text}, Duration: ${el.duration.text}`);
        } else {
            console.log(`[4] ❌ API error: ${response.data.status} — ${response.data.error_message || 'no message'}`);
        }
    } catch (err) {
        console.log(`[4] ❌ Request failed: ${err.message}`);
    }
}

(async () => {
    await testAutocomplete();
    await testGeocoding();
    await testDistanceMatrix();
    console.log('\n=== Debug Complete ===');
})();
