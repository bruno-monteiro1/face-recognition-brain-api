const Clarifai = require('clarifai');

const app = new Clarifai.App({
 	apiKey: process.env.CLARIFAI_KEY
});

const handleApiCall = (req, res) => {
	app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
    	res.json(data);
    })
    .catch(err => {
    	res.status(400).json('Unable to get answer from API')
    })
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries);
	  })
	  .catch(err => {
	  	res.status(400).json('failed to get entries')
	  })

}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}