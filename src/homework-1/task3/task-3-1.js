import os from 'os'
import readline from 'readline'
import reverseString from './reverseString'

const rl = readline.createInterface(process.stdin)
const writeLineStream = process.stdout

rl.on('line', data => {
  writeLineStream.write(reverseString(data))
  writeLineStream.write(os.EOL)
  writeLineStream.write(os.EOL)
})
