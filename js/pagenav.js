/* ------
 * pagenav
 * by ZHAO Xudong, zxdong@gmail.com
 * http://html5beta.com/pagenavjs/
-------*/
(function() {
    
    //default
    var defaults = {
        itemPerPage: 10    //items to show per page
        ,maxLinkShow: 5    //how many links to render max
        ,itemTotal: 0      //how many items in total
        ,page: 1           //the page number 
        ,lang: {          // lang
            'page': 'page'
            ,'intotal': 'in total'
            ,'Prev': 'Prev'
            ,'Next': 'Next'
        }
    }
    //jquery.extend
    ,extend = function() {
    	var src, copyIsArray, copy, name, options, clone,
    		target = arguments[0] || {},
    		i = 1,
    		length = arguments.length,
    		deep = false
    	if ( typeof target === "boolean" ) {
    		deep = target
    		target = arguments[1] || {}
    		i = 2
    	}
    	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
    		target = {}
    	}
    
    	// extend jQuery itself if only one argument is passed
    	if ( length === i ) {
    		target = this
    		--i
    	}
    
    	for ( ; i < length; i++ ) {
    		if ( (options = arguments[ i ]) != null ) {
    			for ( name in options ) {
    				src = target[ name ]
    				copy = options[ name ]
    				if ( target === copy ) continue
    				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
    					if ( copyIsArray ) {
    						copyIsArray = false
    						clone = src && jQuery.isArray(src) ? src : []
    					} else clone = src && jQuery.isPlainObject(src) ? src : {}
    					target[ name ] = jQuery.extend( deep, clone, copy )
    				} else if ( copy !== undefined ) target[ name ] = copy
    			}
    		}
    	}
    	return target
    }
    ,root = this
    ,res = function(opts) {
        var o = extend(defaults, opts, true)
        ,result = {
            currentPage: o.page
            ,totalItems: o.itemTotal
        }
        , i, n, res = '', currentPageItemCount, temp=[]
		,perPage = o.itemPerPage
		,page = o.page
		,total = o.itemTotal
		,maxLink = o.maxLinkShow	
		,y1 = total%perPage
		,y2 = Math.floor(total/perPage)
		,pageTotal = y1? y2+1:y2
		
		if(total <= 0) currentPageItemCount = 0
		else if(page < pageTotal) currentPageItemCount = perPage
		else currentPageItemCount = y1?y1:perPage
		
		if(pageTotal>0) {
			res = '<span class="pagenav-desc">[' + o.lang['page'] + '<span class="pagenav-current">' + page + '</span>，<span class="pagenav-total">' + pageTotal + '</span> ' + o.lang['intotal'] + ']</span>'
			if(pageTotal <= maxLink) {
				for(i = 1;i <= pageTotal;i++ ) {
					var cls, isC, it
					if(page == i) {
						cls = 'pagenav-current-link pagenav-link'
						isC = true
					}
					else {
						cls = 'pagenav-link'
						isC = false
					}
					it = {
						text:i
						,index:i
						,isCurrent:isC
						,cls:cls
					}
					temp.push(it)
				}
			}
			else if (pageTotal > maxLink) {
				var x0 = maxLink-3
				if(page >= pageTotal-1 || page <= 2) x0 ++
				var x1 = Math.floor(x0/2)
				,x2 = x0 - x1
				,x3 = page - 1
				,x4 = pageTotal - page
				,before
				if(page - 1 > x1) temp.push({
					text:o.lang['Prev']
					,index:page - 1
					,isCurrent:false
					,cls:'pagenav-link pagenav-link-prev'
				})
				if(x4 <= x2) {
					before = x0 - x4
					temp.push({
						text:1
						,index:1
						,isCurrent:false
						,cls:'pagenav-link'
					})
				}
				else if(x3 > x1) {
					before = x1
					temp.push({
						text:1
						,index:1
						,isCurrent:false
						,cls:'pagenav-link'
					})
				}
				else before = x3
				var after = x0 - before
				for(i = 0;i < before;i ++) {
					var it = {
						text:page - before + i
						,index:page - before + i
						,isCurrent: false
						,cls: 'pagenav-link'
					}
					temp.push(it)
				}
				temp.push({
					text:page
					,index:page
					,isCurrent:true
					,cls:'pagenav-link pagenav-current-link'
				})
				for(i = 1;i <= after;i ++ ) {
					var it = {
						text:page + i
						,index:page + i
						,isCurrent:false
						,cls:'pagenav-link'
					}
					temp.push(it)
				}
				if (x4 > after) temp.push({
					text:pageTotal
					,index:pageTotal
					,isCurrent:page==pageTotal?true:false
					,cls:page==pageTotal?'pagenav-link pagenav-current-link':'pagenav-link'
				})
				if (x4 > x2) temp.push({
					text:o.lang['Next']
					,index:page + 1
					,isCurrent:false
					,cls:'pagenav-link pagenav-link-next'
				})
			}
			
		}
		else res=''
		for (x in temp) {
			var ct = temp[x]
			,ht1 = (ct.isCurrent?'<span ':'<a href="javascript:;" ') +
			'data-page="' + ct.index + '" ' +
			'class="page-' + ct.index + ' ' + ct.cls + '">[' + ct.text + ']</' +
			(ct.isCurrent?'span>':'a>')
			res += ht1
		}
		result.navHtml = res
        //return
        return result
    }
    
    root.pagenav = res
}).call(this)


