var r = require('rethinkdbdash')({
	port: 28015,
	host: 'localhost',
	db: 'SitePoint'
});


r.table("Employee")
.insert({
    name: "Adelson",
    company: "Sprinklr"
})
.run()
.then(function(response){
	console.log('Success ',response);
})
.error(function(err){
	console.log('error occurred ',err);
})
