import assert from 'assert'
import {add} from './myLib.js'

console.log('add()\nShould add two numbers')
try{
  assert.strictEqual(add(1, 2), 3)
} catch(e) {
  console.log('FAIL')
  console.error(e)
}