const os = require('os')
const readline = require('readline')
const { reverseString } = require('./reverseString')

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
