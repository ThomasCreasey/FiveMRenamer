const fs = require('fs');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is the current spawncode ? ", function(current) {
    rl.question("What do you want to change the spawncode to be ? ", function(choice) {
        if (/\s/.test(choice)) {
            return console.log('Your spawncode cannot have spaces!')
        }
        console.log(`${current} -> ${choice}`);

        const allfiles = fs.readdirSync('./car', (err) => {
            if(err) console.log(err);
        });
        var i;
        for (i = 0; i < allfiles.length; i++) {
            const thisfile = allfiles[i];
            if(thisfile.indexOf('.meta')>=0) {
                let contents = fs.readFileSync(`./car/${thisfile}`).toString();
                const re = new RegExp(current, 'g');
                contents = contents.replace(re,choice);
                fs.writeFileSync(`./car/${thisfile}`, contents, (err) => {
                    if(err) console.log(err)
                })

            }
        }

        const streamfiles = fs.readdirSync('./car/stream', (err) => {
            if(err) console.log(err);
        });


        var e;
        for (e = 0; e < streamfiles.length; e++) {
            const thisfile = streamfiles[e];
            if(thisfile.indexOf('.yft')>=0) {
                if(thisfile.split('_')[1] === 'hi.yft') {
                    fs.rename(`./car/stream/${thisfile}`, `./car/stream/${choice}_hi.yft`, (err) => {
                        if(err) console.log(err)
                    })
                }
                else {
                    fs.rename(`./car/stream/${thisfile}`, `./car/stream/${choice}.yft`, (err) => {
                        if(err) console.log(err)
                    })
                }
           }
        }

        var f;
        for (f = 0; f < streamfiles.length; f++) {
           const thisfile = streamfiles[f];
           if(thisfile.indexOf('.ytd')>=0) {
            if(thisfile.split('_')[1] === 'hi.yft') {
                fs.rename(`./car/stream/${thisfile}`, `./car/stream/${choice}_hi.ytd`, (err) => {
                    if(err) console.log(err)
                })
            }
            else {
                fs.rename(`./car/stream/${thisfile}`, `./car/stream/${choice}.ytd`, (err) => {
                    if(err) console.log(err)
                })
            }
            }
        }


        rl.close();
    });
});