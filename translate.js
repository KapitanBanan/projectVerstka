const fs = require('fs');
const readline = require('readline');
var csv = require("csvtojson");

const LANGUAGES = ['ru', 'en', 'es', 'fr', 'de', 'ch', 'it'];

async function getCopyrighting(language) {
    const filePath = `./copy/${language}.csv`
    const jsonArray = await csv().fromFile(filePath);
    const filtered = jsonArray.filter(row => {
        return !isNaN(row.id);
    });

    const result = {};
    for (const row of filtered) {
        result[row.id] = row['Готовый текст'];
    }

    return result;
}

async function run() {
    for (const language of LANGUAGES) {
        const translatedDirPath = `./${language}`
        if (!fs.existsSync(translatedDirPath)) {
            fs.mkdirSync(translatedDirPath);
        }

        const copy = await getCopyrighting(language);

        fs.readdir('.', 'utf8', (err, files) => {
            if (err) {
                return console.log(err);
            }

            files.forEach(file => {
                if (!file.endsWith('.html')) {
                    return;
                }

                const translatedPath = `${translatedDirPath}/${file}`;

                const rl = readline.createInterface({
                    input: fs.createReadStream(file),
                    output: fs.createWriteStream(translatedPath),
                    terminal: false
                });

                rl
                  .on('line', function(line) {
                    const translater = function(_match, id) {
                        return copy[id];
                    };
                
                    const newStr = line.replace(/\${(\d+)}/g, translater);

                    this.output.write(`${newStr}\n`);
                  })
                  .on('close', function() {
                    console.log(`Created "${this.output.path}"`);
                  });
            });
        });
    }
}

run();

