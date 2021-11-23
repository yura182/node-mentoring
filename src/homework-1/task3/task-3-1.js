import os from 'os'
import readline from 'readline'
import reverseString from './reverseString'

const readLineEmitter = readline.createInterface(process.stdin)
const writeLineStream = process.stdout

readLineEmitter.on('line', data => {
  writeLineStream.write(reverseString(data))
  writeLineStream.write(os.EOL)
  writeLineStream.write(os.EOL)
});
