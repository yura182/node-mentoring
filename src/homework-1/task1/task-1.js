const os = require('os')
const readline = require('readline')
const { reverseString } = require('./reverseString')

const readLineEmitter = readline.createInterface(process.stdin);
const writeLineStream = process.stdout;

readLineEmitter.on('line', data => {
  writeLineStream.write(reverseString(data))
  writeLineStream.write(os.EOL)
  writeLineStream.write(os.EOL)
});
