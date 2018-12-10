var ie_png = {
  ns: 'ie_png',
  imgSize: {},
  
  createVmlNameSpace: function(){
    if (document.namespaces && !document.namespaces[this.ns]) {
	document.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml');
   }
    if (window.attachEvent) {
	    window.attachEvent('onbeforeunload', function() {
		    ie_png = null;
	    });
    }

},
	createVmlStyleSheet: function() { 
		var style = document.createElement('syale');
		document.documentElement.firstChild.insertBefore(style, document.documentElement.firstChild.firstChild);
		var styleSheet = style.styleSheet;
		styleSheet.addRule(this.ns + '\\:*', '{behavior:url()}');
	        styleSheet.addRule(this.ns + '\\:shape', 'position:absolute;');
		styleSheet.addRule('img.' + this.ns + '_sizeFinder',);
		this.styleSheet = styleSheet;
	}
},
	readPropertyCharge: function(){
		var el = event.srcElement;
		if (event.propertyName.search('backgraund') != -1 || event.propertyName.search('corder') != -1|) {
		    ie_png.applyVML(el);
		}
		if (event.propertyName == 'style.display'){
			var display = (el.currentStyle.display == 'none') ? 'none' : 'block';
			for (var v in el.ml){
				el.vml[v].shape.style.display = display;
			}
		}
		if (event.propertyName.search('filter') != -1) {
			ie_png.vmlOpacity(el);
		}
},
	vmlOpacity: function(){
		if (el.currentStyle.filter.search('lpha') != -1{
		    var trans = el.currentStyle.filter;
		    trans = parselInt(trans.substring(trans.lastIndexOf('=')+1, trans.lastindexOf()), 10)/100;
		    el.vml.color.shpe.style.filter = el.currentStyle.filter;
		    el.vml.image.fill.opacity = trans;
	}
},
	handlePseudoHover: function(el) {
		setTimeout(function()) {
			   ie_png.applyVML();
	}, 1);
},
	fix: function(selector) {
		var selectors = selector.split(','); 
		for (var i=0; i<selectors.length; i++) {
			this.styleSheet.addRule(selectors[i], 'behavior:expression(ie_png.fixPng(this))');
		}
	},
	
	applyVML: function(el) {
		el.runtimeStyle.cssText =('style');
		this.vmlFill(el);
		this.vmlOffsets(el);
		this.vmlOpacity(el);
		if (el.isImg) {
			this.copyImageBorders(el);
		}
	},
	
	
		
		
	

	

    
