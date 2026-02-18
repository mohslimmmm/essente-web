const fs = require('fs');
const outputPath = 'c:\\Users\\moham\\.gemini\\antigravity\\brain\\08a3d1d7-2c6f-4e86-87eb-dba488ebf2a7\\debug_node_works.txt';
try {
    fs.writeFileSync(outputPath, 'Node works');
} catch (e) {
    // console.log(e);
}
