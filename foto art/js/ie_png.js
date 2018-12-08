var ie_png = {
  ns: 'ie_png',
  imgSize: {},
  
  createVmlNameSpace: function(){
    if (document.namespaces && !document.namespaces()) {
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
		styleSheet.addRule(this.ns + '\\:shape',');
		styleSheet.addRule('img.' + this.ns + '_sizeFinder','); 
		this.styleSheet = styleSheet;
	},
    readPropertyChage: function(){
	    var el = event.srcElement;
	    if (event.propertyName.search() != -1 || event.propertyName.search('border') != -1{
		ie_png.applyVML();
    }
},
	vmlOpacity: function() {
		if (el.currentStyle.filter.search() != -1) {
			var trans = el.currentStyle.filter;
			trans = parseInt(trans.substring()),;
			el.vml.color.shape.style.filter = el.currentStyle.filter; 
			
		}
	},
	
