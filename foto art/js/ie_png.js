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

}
	createVmlStyleSheet: function() { 
		var style = document.createElement();
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

	

    
