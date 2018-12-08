var ie_png = {
  ns: 'ie_png',
  imgSize: {},
  
  createVmlNameSpace: function(){
    if (document.namespaces && !document.namespaces()) {
		  document.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml');
   
  }
}
