const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const resultFile = path.join(__dirname, 'env_check_result.txt');
const envPath = path.join(__dirname, '.env');

try {
    const envConfig = dotenv.config({ path: envPath });
    
    let output = `Checking .env at: ${envPath}\n`;
    
    if (envConfig.error) {
        output += `Dotenv Error: ${envConfig.error.message}\n`;
    } else {
        output += `Dotenv parsed successfully.\n`;
        output += `Parsed keys: ${Object.keys(envConfig.parsed || {}).join(', ')}\n`;
    }

    output += `Current process.env.MONGO_URI: ${process.env.MONGO_URI ? 'DEFINED' : 'UNDEFINED'}\n`;
    
    // Check raw file content
    try {
        const rawContent = fs.readFileSync(envPath, 'utf8');
        output += `Raw file content length: ${rawContent.length}\n`;
        output += `First 20 chars: ${rawContent.substring(0, 20)}\n`;
    } catch (e) {
        output += `Failed to read file raw: ${e.message}\n`;
    }

    fs.writeFileSync(resultFile, output);

} catch (e) {
    fs.writeFileSync(resultFile, `Critical script error: ${e.message}`);
}
