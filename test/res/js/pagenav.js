/* ------
 * pagenav
 * by ZHAO Xudong, zxdong@gmail.com
 * http://html5beta.com/pagenavjs/
-------*/

;(function() {
		
		//default
		var root = this
		,func = function(opts) {
			var o = {
				itemPerPage: opts.itemPerPage || 10     //items to show per page
				,maxLinkShow: opts.maxLinkShow || 5    //how many links to render max
				,itemTotal: opts.itemTotal || 0      //how many items in total
				,page: opts.page || 1           //the page number 
				,lang: opts.lang || {          // lang
						page: 'page'
						,afterCurrentPage: ', '
						,intotal: 'in total'
						,Prev: 'Prev'
						,Next: 'Next'
						,more:'...'
				}
				,url: opts.url || 'javascript:;' 
				,pageParam: opts.pageParam || 'p'
				,noFirstPageParam: opts.noFirstPageParam || false
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
				res = '<span class="pagenav-wrapper' + (pageTotal === 1?' only-one-page':'') + '"><span class="pagenav-desc">' + o.lang.page + '<span class="pagenav-current">' + page + '</span><span class="pagenav-acp">' + o.lang.afterCurrentPage + '</span><span class="pagenav-total">' + pageTotal + '</span> ' + o.lang.intotal + '</span><span class="pagenav-units">'
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
			else res = ''
			var len0 = temp.length
			,item
			,i0 = 0
			,ct
			,ht1 = ''
			,ctb = false
			,ht2 = ''
			,hasJs = /javascript\:/.test(o.url)
			,and = /\?|#/.test(o.url)
			,url0 = ''
			for(;i0 < len0;i0 ++) {
				ct = temp[i0]
				url0 = hasJs?
				o.url
				:
				o.url + 
				(o.noFirstPageParam && ct.index === 1?'':(and?'&':'?')  + o.pageParam + '=' + ct.index)

				if(i0 >0) ctb = temp[i0-1]
				ht1 = (ct.isCurrent?'<span ':'<a href="' + url0 + '" ') +
				'data-page="' + ct.index + '" ' +
				'class="page-' + ct.index + ' ' + ct.cls + '">' + ct.text + '</' +
				(ct.isCurrent?'span>':'a>')
				if(ctb && (ctb.index < ct.index -1) ) res += '<span class="pagenav-more">' + o.lang.more + '</span>'
				res += ht1 
			}
			res += res? '</span></span>':''
			//return
			return res
		}

		//this trick from underscore.js
		if (typeof exports !== 'undefined') {
			if (typeof module !== 'undefined' && module.exports) {
				exports = module.exports = func
			}
			exports.pagenav = func
		} else {
			root.pagenav = func
		}
		
}).call(this)