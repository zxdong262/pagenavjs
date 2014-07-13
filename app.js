
/**
 * Module dependencies.
 */

var 

//module
express = require('express')
,bodyParser = require('body-parser')
,_ = require('underscore')
,pagenavSetting = {
	itemPerPage: 10     //items to show per page
	,maxLinkShow: 7   //how many links to render max
	,itemTotal: 520      //how many items in total
	,pageParam: 'p'
	,noFirstPageParam: true
}
,pagenav = require('./pagenav')

//user setting
,port = 4567

// all environments
,app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

//static files
app.use(express.static(__dirname + '/test/res'))

//view engine
app.set('view engine', 'jade')
app.set('views', __dirname + '/test/views')

//routes
app.get('/', function(req, res) {
	var pageNo = parseInt(req.query.p, 10) || 1
	,pageHtml = pagenav(_.extend(pagenavSetting, {
		page: pageNo
		,url: '/'
	}))

	res.render('test', _.extend(pagenavSetting, {
		pageHtml: pageHtml
	}))

})

app.listen(port, function() {
	console.log('Magic happens on port ' + port)
})
