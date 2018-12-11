var ie_png = {

	ns: 'ie_png',
	imgSize: {},
	
	createVmlNameSpace: function() { 
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
	vmlOpacity: function() {
		if (el.currentStyle.filter.search('lpha') != -1) {
			var trans = el.currentStyle.filter;
			trans = parseInt(trans.substring(trans.lastIndexOf('=')+1, trans.lastIndexOf(')')), 10)/100;
			el.vml.color.shape.style.filter = el.currentStyle.filter; 
			el.vml.image.fill.opacity = trans; 
		}
	},
	
			
			
	
			
	
	
		
		
	

	

    
