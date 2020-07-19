const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080;

// Load the Project model
const { Project } = require('./src/models/project')

// Connect to the MongoDB Atlas database
const mongoose = require('mongoose')
const uri = process.env.PROD_MONGODB || 'mongodb://localhost:27017/PortfolioAPI'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const connection = mongoose.connection

connection.once('open', () => console.log('Connection with MongoDB was successful'))

// Serve any static files
app.use(express.static(path.join(__dirname, 'build')))
    
// Send index.html to render the website
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

/*
 * GET Route: Gets a list of all projects.
 */
app.get('/getProjects', (req, res) => {
  Project.find().then(projects => {
      res.send(projects);
    }).catch(error => {
      res.status(500).send(error)
    })
})


/*
 * GET Route: Gets the project with the given title.
 */
app.get('/getProjectsByTitle/:title', (req, res) => {
  Project.find().then(projects => {
    if (!projects){
      res.satus(404).send('Cant find projects.')
    }else{
      const target: any = projects.filter(p => p.title === req.params.title)
      res.send(target);
    }
  }).catch((error) => {
    res.status(500).send(error)
  })
})

/*
 * GET Route: Gets projects with a matching tag.
 */
app.get('/getProjectsByTag/:tag', (req, res) => {
	Project.find().then((projects) => {
    if (!projects) {
			res.status(404).send()
		} else {
			const target = projects.filter(p => p.tags.includes(req.params.tag))
			if (target.length >= 0){
				res.send(target)	
			}else{
				res.status(404).send()
			}
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

app.listen(port, () => console.log(`Listening on port ${port}`))

export {}