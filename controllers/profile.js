const handleProfile = (req, res, db) => {
	const { id } = req.params;

		db('users')
		.where({
		  id: id
		})
		.select('*')
		.then(user_id => {
			if(user_id.length){
				res.json(user_id);
			} else {
				res.status(404).json("User not found");
			}
		})
		.catch(err => {
			res.status(400).json('Fail to get user!');
		})

}

module.exports = {
	handleProfile: handleProfile
}