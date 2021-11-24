import fs from 'fs'
import csv from 'csvtojson'
import { pipeline } from 'stream'

const readStream = fs.createReadStream('./resources/books.csv')
const writeStream = fs.createWriteStream('./resources/books.txt')

pipeline(
  readStream,
  csv(),
  writeStream,
  processFinishedPipeline
)

function processFinishedPipeline (error) {
  if (error) {
    console.error(error)
  } else {
    console.log('File was processed successfully')
  }
}
