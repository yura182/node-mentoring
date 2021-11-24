const fs = require('fs')
const csv = require('csvtojson')
const { pipeline } = require('stream')

const sourceFile = './resources/books.csv'
const targetFile = './resources/books.txt'

pipeline(
  fs.createReadStream(sourceFile),
  csv(),
  fs.createWriteStream(targetFile),
  (err) => processFinishedPipeline(err)
)

function processFinishedPipeline (error) {
  if (error) {
    console.error(error)
  } else {
    console.log('File was processed successfully')
  }
}
