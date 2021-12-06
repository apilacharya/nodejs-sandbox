import fs from 'fs'
import colors from 'colors'
import path from 'path'

const __dirname = path.resolve()

// Load models 
import {Bootcamp} from './models/Bootcamp.js'
import {Course} from './models/Course.js'

// Connect to DB
import connectDB from './config/db.js'


connectDB()

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))


// Import into DB
const importData = async () => {
  try{
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    console.log('Data Imported...'.green.inverse)
    process.exit()
  }
  catch(err){
    console.error(err)
  }
}

// Delete data
const deleteData = async() =>{
  try{
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    console.log('Data Destroyed'.red.inverse)
    process.exit()
  }
  catch(err) {
    console.error(err)
  }
}

if(process.argv[2] === '-i'){
  importData()
} else if(process.argv[2] === '-d'){
  deleteData()
}