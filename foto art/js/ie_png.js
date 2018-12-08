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
		styleSheet.addRule(this.ns + '\\:shape', 'position:absolute;');
		styleSheet.addRule('img.' + this.ns + '_sizeFinder', 'behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;'); 
		this.styleSheet = styleSheet;
	},
