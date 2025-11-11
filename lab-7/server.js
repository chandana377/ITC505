const express = require('express')
const logger = require('morgan')
const path = require('path')

const server = express()
server.use(express.urlencoded({ extended: true }))
server.use(logger('dev'))

// Serve all files from /public
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// Optional: A test route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// 🧠 YOUR MAD LIB POST HANDLER
server.post('/ITC505/lab-7', (req, res) => {
  const { adjective, pluralNoun, verb, place, animal } = req.body

  // Validation — ensure all fields are filled
  if (!adjective || !pluralNoun || !verb || !place || !animal) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `)
    return
  }

  // 🎨 Construct your Mad Lib story
  const story = `
    <h1>🤣 Your Mad Lib Story 🤣</h1>
    <p>
      Once upon a time in <strong>${place}</strong>, there lived some 
      <strong>${adjective}</strong> <strong>${pluralNoun}</strong>. 
      Every morning, they would <strong>${verb}</strong> joyfully with a 
      <strong>${animal}</strong> by their side!
    </p>
    <a href="/ITC505/lab-7/index.html">Go Back</a>
  `
  res.send(story)
})

// Port setup
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}

server.listen(port, () => console.log('✅ Ready on localhost!'))
