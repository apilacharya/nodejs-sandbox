import {readFile} from 'fs/promises'

// traditional method using callbacks that is async
// readFile(new URL('app.s', import.meta.url), 'utf-8', (err, data) => {
//   if(err) {
//     // handle the error
//     throw err
//     console.log(err)
//   }else{
//     // play with the data
//   }
// })


// Promise based error handling
// try{
//   const result = await readFile(new URL('app.s', import.meta.url), 'utf-8')

// }
// catch(e) {
// throw(e)
//   console.log('error')
// }




  const result = await readFile(new URL('./index.html', import.meta.url), 'utf-8')
  
  console.log(result)
  console.log('k cha')

console.log('hello')