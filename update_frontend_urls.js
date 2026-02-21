const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

try {
    const files = walk(path.join(__dirname, 'frontend/src'));
    const backendUrl = 'https://mvp-gilt-iota.vercel.app';
    let count = 0;

    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let updated = false;

        if (content.includes('http://localhost:5001')) {
            content = content.replace(/http:\/\/localhost:5001/g, backendUrl);
            updated = true;
        }

        if (content.includes('http://localhost:5000')) {
            content = content.replace(/http:\/\/localhost:5000/g, backendUrl);
            updated = true;
        }

        if (updated) {
            fs.writeFileSync(file, content);
            console.log(`Updated URLs in ${file}`);
            count++;
        }
    });

    console.log(`Total files updated: ${count}`);
} catch (error) {
    console.error('Error updating files:', error);
}
