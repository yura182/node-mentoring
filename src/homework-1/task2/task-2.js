const fs = require('fs')
const csv = require('csvtojson')

const readStream = fs.createReadStream('./resources/books.csv')
const writeStream = fs.createWriteStream('./resources/books.txt')

csv()
  .fromStream(readStream)
  .on('data', data => writeStream.write(data, 'utf-8'))
  .on('done', error => processFinishedHandler(error))
  .then()

function processFinishedHandler (error) {
  if (error) {
    console.error(error)
  } else {
    console.log('File was processed successfully')
  }
}
