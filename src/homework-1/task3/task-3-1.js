import os from 'os'
import readline from 'readline'
import reverseString from './reverseString'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

rl.on('line', function (data) {
  this.output.write(reverseString(data))
  this.output.write(os.EOL)
  this.output.write(os.EOL)
})