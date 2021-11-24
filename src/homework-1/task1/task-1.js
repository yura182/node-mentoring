const os = require('os')
const readline = require('readline')
const { reverseString } = require('./reverseString')

const rl = readline.createInterface(process.stdin);
const writeLineStream = process.stdout;

rl.on('line', data => {
  writeLineStream.write(reverseString(data))
  writeLineStream.write(os.EOL)
  writeLineStream.write(os.EOL)
});
