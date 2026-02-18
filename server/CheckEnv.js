const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

try {
    // Try reading as UTF-16LE (likely if user edited in Notepad/VSCode with default settings on Windows)
    let content = fs.readFileSync(envPath, 'utf16le');
    if (content.includes('MONGO_URI') && !content.includes('\0')) { // Check for valid content
        console.log('--- UTF-16LE DETECTED ---');
        console.log(content);
    } else {
        // Fallback to UTF-8
        content = fs.readFileSync(envPath, 'utf8');
        console.log('--- UTF-8 DETECTED ---');
        console.log(content);
    }
} catch (e) {
    console.error("Error reading .env:", e);
}
