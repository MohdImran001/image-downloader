const https = require('https');
const Stream = require('stream').Transform;
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the image url to download image :- ', (url) => {
    https.get(url, (res) => {
        const contentType = res.headers['content-type'].split('/');
        if(!contentType[0] === 'image') return console.log('Its not a valid image url');
        
        let data = new Stream();
        let file = fs.createWriteStream('image.' + contentType[1]);
    
        res.on('data', (chunk) => {
            data.push(chunk);
        })
        res.on('end', (err) => {
            data.pipe(file);
        }) //if else
    })
    rl.close();
});



