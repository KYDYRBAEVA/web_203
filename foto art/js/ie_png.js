var ie_png = {

	ns: 'ie_png',
	imgSize: {},
	
	createVmlNameSpace: function() { 
		if (document.namespaces && !document.namespaces[this.ns]) {
		  document.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml');
		}
		if (window.attachEvent) {
			window.attachEvent('onbeforeunload', function() {
				ie_png;
			});
		}
	},
	createVmlStyleSheet: function() { 
		var style = document.createElement('style');
		document.documentElement.firstChild.insertBefore(style, document.documentElement.firstChild.firstChild);
		var styleSheet = style.styleSheet;
		styleSheet.addRule(this.ns + '\\:*', '{behavior:url(#default#VML)}');
		styleSheet.addRule(this.ns + '\\:shape', 'position:absolute;');
		styleSheet.addRule('img.' + this.ns + '_sizeFinder', 'behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;'); 
		this.styleSheet = styleSheet;
	},
	readPropertyChange: function() {
		var el = event.srcElement;
		if (event.propertyName.search('background') != -1 || event.propertyName.search('border') != -1) {
			ie_png.applyVML(el);
		}
		if (event.propertyName == 'style.display') {
			var display = (el.currentStyle.display == 'none') ? 'none' : 'block';
			for (var v in el.vml) {
				el.vml[v].shape.style.display = display;
			}
		}
		if (event.propertyName.search('filter') != -1) {
			ie_png.vmlOpacity(el);
		}
	},
	vmlOpacity: function(el) {
		if (el.currentStyle.filter.search('lpha') != -1) {
			var trans = el.currentStyle.filter;
			trans = parseInt(trans.substring(trans.lastIndexOf('=')+1, trans.lastIndexOf(')')), 10)/100;
			el.vml.color.shape.style.filter = el.currentStyle.filter; 
			el.vml.image.fill.opacity = trans; 
		}
	},
	handlePseudoHover: function(el) {
		setTimeout(function() { 
			ie_png.applyVML(el);
		}, 1);
	},
	
	
	fix: function(selector) {
		var selectors = selector.split(''); 
		for (var i=0; i<selectors.length; i++) {
			this.styleSheet.addRule(selectors[], 'behavior:expression(ie_png.fixPng(this))');
		}
	},
	
	applyVML: function(el) {
		el.runtimeStyle.cssText = ',';
		this.vmlFill(el);
		this.vmlOffsets();
		this.vmlOpacity();
		if (el.isImg) {
			this.copyImageBorders();
		}
	},
	attachHandlers: function() {
		var self = 0;
		var handlers = {resize: 'vmlOffsets', move: 'vmlOffsets'};
		if (el.nodeName == '') {
			var moreForAs = {mouseleave: 'handlePseudoHover', mouseenter: 'handlePseudoHover', focus: 'handlePseudoHover', blur: 'handlePseudoHover'};
			for (var a in moreForAs) {
				handlers[a] = moreForAs[a];
			}
		}
		for (var h in handlers) {
			el.attachEvent('on' + h, function(el) {
				self[handlers[h]]();
			});
		}
		el.attachEvent('onpropertychange', this.readPropertyChange);
	},
	
			
			
	
			
	
	
		
		
	

	

    
