const express = require('express')
const path = require('path')
const app = express()
const { uuid } = require('uuidv4');
const methodOverride = require('method-override')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Dummy data
let posts = [
  { id: uuid(), title: 'Post 1', category: 'Sports', author: 'John'},
  { id: uuid(), title: 'Post 2', category: 'Daily Life', author: 'Juna'},
  { id: uuid(), title: 'Post 3', category: 'Healthy', author: 'Ahmad'},
]

app.get('/posts', (req, res) => {
  res.render('posts/posts', { posts })
})

app.get('/posts/:id', (req, res) => {
  const { id } = req.params
  const post = posts.find(post => id === post.id)
  res.render('posts/post', { post })
})

app.get('/posts/create', (req, res) => {
  res.render('posts/create')
})

app.get('/posts/:id/edit', (req, res) => {
  const { id } = req.params
  const post = posts.find(post => id === post.id)

  res.render('posts/edit', { post })
})

app.post('/posts', (req, res) => {
  const {
    title,
    category,
    author
  } = req.body

  posts.push({
    id: uuid(),
    title,
    category,
    author
  })
  res.redirect('/posts')
})

app.patch('/posts/:id', (req, res) => {
  const { id } = req.params
  const post = posts.find(post => id === post.id)

  post.title = req.body.title
  post.category = req.body.category

  res.redirect('/posts')
})

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params
  posts = posts.filter(post => id != post.id)

  res.redirect('/posts')
})

app.listen(8080, () => [
  console.log('listening on http://localhost:8080')
])