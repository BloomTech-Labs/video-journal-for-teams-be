const db = require("../database/dbConfig.js");

module.exports = {
	find,
	findById,
	findByUserId,
	findFeedbackByVideoId,
	insert,
	insertFeedback,
	update,
	updateViewedFeedbackByVideoId,
};

function find() {
	return db("videos").select("*");
}

function findById(video_id) {
	return db("videos")
		.join("users", "videos.owner_id", "users.id")
		.join("prompts", "videos.prompt_id", "prompts.id")
		.where("videos.id", video_id)
		.first()
		.select(
			"videos.id",
			"videos.owner_id as owner_id",
			"videos.title as video_title",
			"videos.description as video_description",
			"videos.video_url",
			"videos.created_at",
			"prompts.question as prompt_question"
		)
		.columns(db.raw("users.first_name || ' ' || users.last_name as owner_name"));
}
//hi

function findByUserId(user_id, organization_id) {
	return db("videos")
		.join("organizations_users","organizations_users.user_id","videos.owner_id")
		.where({"videos.owner_id":user_id, "organizations_users.organization_id":organization_id})
		.select("videos.*","organizations_users.organization_id")
		.orderBy("videos.created_at", "videos.desc")
		.then(videos => {
			console.log("video model", videos)
			return Promise.all(videos.map(async video => {
				const feedback =  await db('feedback')
										.join('users', 'users.id','feedback.owner_id')
										.join('videos','videos.id','feedback.video_id')
										.select('feedback.*','users.first_name','users.last_name','videos.title as video_title')
						.where('feedback.video_id',video.id)
				return {
					...video,feedback
				}
			}))
		})
}
// function findByUserId(user_id) {
// 	return db
// 		.select("*")
// 		.from("videos")
// 		.orderBy("created_at", "desc")
// 		.where({ owner_id: user_id })
// 		.then(videos => {
// 			return Promise.all(videos.map(async video => {
// 				const feedback =  await db('feedback')
// 										.join('users', 'users.id','feedback.owner_id')
// 										.join('videos','videos.id','feedback.video_id')
// 										.select('feedback.*','users.first_name','users.last_name','videos.title as video_title')
						
// 						.where('feedback.video_id',video.id)
// 				return {
// 					...video,feedback
// 				}
// 			}))
			
// 		})
		

	// return db("videos")
	// 	.leftJoin('feedback', 'feedback.video_id','videos.id')
	// 	.select("*")
	// 	.groupBy('videos.video_url')
	// 	// .orderBy("created_at", "desc")
	// 	.where( "videos.owner_id", user_id );
// }



// function findByUserId(user_id) {
// 	return db("videos")
// 		.join('users', 'users.id','videos.owner_id')
// 		.join('prompts', 'prompts.id', 'videos.prompt_id')
// 		.join('teams', 'teams.id', 'prompts.team_id')
// 		.select("*")
// 		//.orderBy("created_at", "desc")
// 		.where({ owner_id: user_id, organization_id: 5})
// 		.then(videos => {
// 			console.log(videos)
// 			return Promise.all(videos.map(async video => {
// 				const feedback =  await db('feedback')
// 										.join('users', 'users.id','feedback.owner_id')
// 										.join('videos','videos.id','feedback.video_id')
// 										.select('feedback.*','users.first_name','users.last_name','videos.title as video_title')
// 						.where('feedback.video_id',video.id)
// 				return {
// 					...video,feedback
// 				}
// 			}))
// 		})
// 	}




function findFeedbackByVideoId(video_id) {
	return db("feedback")
		.join("users", "feedback.owner_id", "users.id")
		.where("feedback.video_id", video_id)
		.select(
			"feedback.id",
			"feedback.post",
			"feedback.video_id",
			"feedback.owner_id",
			"feedback.created_at",
			"feedback.updated_at"
		)
		.orderBy("feedback.created_at", "desc")
		.columns(db.raw("users.first_name || ' ' || users.last_name as owner_name"));
}

function updateViewedFeedbackByVideoId(video_id, user_id){
	return db("feedback")
	.where("feedback.video_id", video_id)
	.update({viewed: true})
	.then(count => {
		return findByUserId(user_id)
	})
}

function insert(vidObj) {
	vidObj.created_at = vidObj.updated_at = new Date(Date.now());
	return db("videos").insert(vidObj, "id");
}

function insertFeedback(feedback) {
	feedback.created_at = feedback.updated_at = new Date(Date.now());
	return db("feedback").insert(feedback, "id");
}

function update(changes) {
	const id = changes.id;
	return db("videos")
		.where({ id })
		.update(changes)
		.then((ct) => {
			return findById(id);
		});
}
