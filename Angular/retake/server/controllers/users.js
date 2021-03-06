const mongoose = require("mongoose")
const User = mongoose.model("User")
const Question = mongoose.model("Question")

module.exports = {
	login: (req, res) => {
        console.log('login')
		User.findOne({name: req.body.name})
			.then(data => {
				if(data){
					req.session.user_id = data._id
					res.json(data._id)
				} else {
					let new_user = new User({name: req.body.name})
					new_user.save()
						.then(() => {
							req.session.user_id = new_user._id
							res.json(new_user._id)
						})
						.catch(err => res.status(500).json(err))
				}
			})
			
	},
	// index: (req, res) => {
	// 	User.find()
	// 		.then(data => res.json(data))
	// 		.catch(err => res.status(500).json(err))
	// },
	// get_logged_in_user: (req, res) => {
	// 	if(req.session.user_id){
	// 		User.findOne({_id: req.session.user_id})
	// 			.then(user => res.json(user))
	// 			.catch(err => res.status(500).json(err))
	// 	} else {
	// 		res.json(false)
	// 	}
	// },
	// logout: (req, res) => {
	// 	req.session.destroy()
	// 	res.redirect("/")
	// }
}