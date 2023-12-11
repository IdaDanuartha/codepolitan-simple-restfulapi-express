const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Dummy data
const posts = [
  { title: 'Post 1', category: 'Sports', author: 'John'},
  { title: 'Post 2', category: 'Daily Life', author: 'Juna'},
  { title: 'Post 3', category: 'Healthy', author: 'Ahmad'},
]

app.get('/posts', (req, res) => {
  res.render('posts/index', { posts })
})

app.get('/posts/create', (req, res) => {
  res.render('posts/create')
})

app.post('/posts', (req, res) => {
  
})

app.listen(8080, () => [
  console.log('listening on http://localhost:8080')
])