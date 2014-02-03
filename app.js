
/**
 * Module dependencies.
 */

var express = require('express')
,http = require('http')
,path = require('path')
,app = express()
,pagenav = require('pagenavjs')
,opts = {
  itemPerPage: 10     //items to show per page
  ,maxLinkShow:  8    //how many links to render max
  ,itemTotal: 256      //how many items in total
  ,page: 1           //the page number 
  ,lang: {          // lang
      page: 'page'
      ,afterCurrentPage: ', '
      ,intotal: 'in total'
      ,Prev: 'Prev'
      ,Next: 'Next'
      ,more:'...'
  }
}

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(require('stylus').middleware(path.join(__dirname, 'lib')))
app.use(express.static(path.join(__dirname, 'lib')))

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

/*app.get('/', routes.index)
app.get('/users', user.list)*/
app.get('/pagenav', function(req, res) {
	var htm = pagenav(opts)
	console.log(htm)
	res.send(htm)
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
