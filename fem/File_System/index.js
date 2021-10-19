import {readFile, writeFile} from 'fs/promises'

let template = await readFile(new URL('./index.html', import.meta.url), 'utf-8')

// import.meta.url --> Traces the current filepath since esbuild module don't support __dirname for the trace as one by common js module
// ./index.html is the relative path

const data = {
  title: 'Learn Node.js',
  body: 'This is the final HTML'
}

for (const [k, v] of Object.entries(data)) {
  template = template.replace(`{${k}}`, v)
}

// write --> basically replaces the entire content of the index.html file with the template that we modified that was just fetched using read promise

await writeFile(new URL('./index.html', import.meta.url), template)