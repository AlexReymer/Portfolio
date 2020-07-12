const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const router = express.Router();
const { Project } = require('./models/project')

app.use(express.static(path.join(__dirname, 'build')))

console.log('Server started!')

mongoose.connect("mongodb://localhost:27017/PortfolioAPI", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const connection = mongoose.connection

connection.once("open", function() {
    console.log("Connection with MongoDB was successful");
})

app.use('/', router)
app.listen(process.env.PORT || 8080)


/*
 * GET Route: Gets a list of all projects.
 */
router.route('/getProjects').get(function(req, res) {
  Project.find().then(projects => {
      res.send(projects);
    }).catch(error => {
      res.status(500).send(error)
    })
})


/*
 * GET Route: Gets the project with the given title.
 */
router.route('/getProjectsByTitle/:title').get((req, res) => {
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
router.route('/getProjectsByTag/:tag').get((req, res) => {
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

export {}