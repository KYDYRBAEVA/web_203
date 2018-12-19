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
		var selectors = selector.split(','); 
		for (var i=0; i<selectors.length; i++) {
			this.styleSheet.addRule(selectors[i], 'behavior:expression(ie_png.fixPng(this))');
		}
	},
	
	applyVML: function(el) {
		el.runtimeStyle.cssText = '';
		this.vmlFill(el);
		this.vmlOffsets(el);
		this.vmlOpacity(el);
		if (el.isImg) {
			this.copyImageBorders(el);
		}
	},
	
	attachHandlers: function(el) {
		var self = this;
		var handlers = {resize: 'vmlOffsets', move: 'vmlOffsets'};
		if (el.nodeName == 'A') {
			var moreForAs = {mouseleave: 'handlePseudoHover', mouseenter: 'handlePseudoHover', focus: 'handlePseudoHover', blur: 'handlePseudoHover'};
			for (var a in moreForAs) {
				handlers[a] = moreForAs[a];
			}
		}
		for (var h in handlers) {
			el.attachEvent('on' + h, function() {
				self[handlers[h]](el);
			});
		}
		el.attachEvent('onpropertychange', this.readPropertyChange);
	},
	
	giveLayout: function(el) {
		el.style.zoom = 1;
		if (el.currentStyle.position == 'static') {
			el.style.position = 'relative';
		}
	},
	
	copyImageBorders: function(el) {
		var styles = {'borderStyle':true, 'borderWidth':true, 'borderColor':true};
		for (var s in styles) {
			el.vml.color.shape.style[s] = el.currentStyle[s];
		}
	},
	
	vmlFill: function(el) {
		if (!el.currentStyle) {
			return;
		} else {
			var elStyle = el.currentStyle;
		}
		for (var v in el.vml) {
			el.vml[v].shape.style.zIndex = elStyle.zIndex;
		}
		el.runtimeStyle.backgroundColor = '';
		el.runtimeStyle.backgroundImage = '';
		var noColor = (elStyle.backgroundColor == 'transparent');
		var noImg = true;
		if (elStyle.backgroundImage != 'none' || el.isImg) {
			if (!el.isImg) {
				el.vmlBg = elStyle.backgroundImage;
				el.vmlBg = el.vmlBg.substr(5, el.vmlBg.lastIndexOf('")')-5);
			}
			else {
				el.vmlBg = el.src;
			}
			var lib = this;
			if (!lib.imgSize[el.vmlBg]) { 
				var img = document.createElement('img');
				lib.imgSize[el.vmlBg] = img;
				img.className = lib.ns + '_sizeFinder';
				img.runtimeStyle.cssText = 'behavior:none; position:absolute; left:-10000px; top:-10000px; border:none;'; 
				img.attachEvent('onload', function() {
					this.width = this.offsetWidth; 
					this.height = this.offsetHeight;
					lib.vmlOffsets(el);
				});
				img.src = el.vmlBg;
				img.removeAttribute('width');
				img.removeAttribute('height');
				document.body.insertBefore(img, document.body.firstChild);
			}
			el.vml.image.fill.src = el.vmlBg;
			noImg = false;
		}
		el.vml.image.fill.on = !noImg;
		el.vml.image.fill.color = 'none';
		el.vml.color.shape.style.backgroundColor = elStyle.backgroundColor;
		el.runtimeStyle.backgroundImage = 'none';
		el.runtimeStyle.backgroundColor = 'transparent';
	},
	
	
	vmlOffsets: function(el) {
		var thisStyle = el.currentStyle;
		var size = {'W':el.clientWidth+1, 'H':el.clientHeight+1, 'w':this.imgSize[el.vmlBg].width, 'h':this.imgSize[el.vmlBg].height, 'L':el.offsetLeft, 'T':el.offsetTop, 'bLW':el.clientLeft, 'bTW':el.clientTop};
		var fudge = (size.L + size.bLW == 1) ? 1 : 0;
		
		
		var makeVisible = function(vml, l, t, w, h, o) {
			vml.coordsize = w+','+h;
			vml.coordorigin = o+','+o;
			vml.path = 'm0,0l'+w+',0l'+w+','+h+'l0,'+h+' xe';
			vml.style.width = w + 'px';
			vml.style.height = h + 'px';
			vml.style.left = l + 'px';
			vml.style.top = t + 'px';
		};
		makeVisible(el.vml.color.shape, (size.L + (el.isImg ? 0 : size.bLW)), (size.T + (el.isImg ? 0 : size.bTW)), (size.W-1), (size.H-1), 0);
		makeVisible(el.vml.image.shape, (size.L + size.bLW), (size.T + size.bTW), (size.W), (size.H), 1);
		
		var bg = {'X':0, 'Y':0};
		var figurePercentage = function(axis, position) {
			var fraction = true;
			switch(position) {
				case 'left':
				case 'top':
					bg[axis] = 0;
					break;
				case 'center':
					bg[axis] = .5;
					break;
				case 'right':
				case 'bottom':
					bg[axis] = 1;
					break;
				default:
					if (position.search('%') != -1) {
						bg[axis] = parseInt(position)*.01;
					}
					else {
						fraction = false;
					}
			}
			var horz = (axis == 'X');
			bg[axis] = Math.ceil(fraction ? ( (size[horz?'W': 'H'] * bg[axis]) - (size[horz?'w': 'h'] * bg[axis]) ) : parseInt(position));
			if (bg[axis] == 0) {
				bg[axis]++;
			}
		};
		for (var b in bg) {
			figurePercentage(b, thisStyle['backgroundPosition'+b]);
		}
		
		el.vml.image.fill.position = (bg.X/size.W) + ',' + (bg.Y/size.H);
		
		var bgR = thisStyle.backgroundRepeat;
		var dC = {'T':1, 'R':size.W+fudge, 'B':size.H, 'L':1+fudge};
		var altC = { 'X': {'b1': 'L', 'b2': 'R', 'd': 'W'}, 'Y': {'b1': 'T', 'b2': 'B', 'd': 'H'} };
		if (bgR != 'repeat') {
			var c = {'T':(bg.Y), 'R':(bg.X+size.w), 'B':(bg.Y+size.h), 'L':(bg.X)}; 
			if (bgR.search('repeat-') != -1) { 
				var v = bgR.split('repeat-')[1].toUpperCase();
				c[altC[v].b1] = 1;
				c[altC[v].b2] = size[altC[v].d];
			}
			if (c.B > size.H) {
				c.B = size.H;
			}
			el.vml.image.shape.style.clip = 'rect('+c.T+'px '+(c.R+fudge)+'px '+c.B+'px '+(c.L+fudge)+'px)';
		}
		else {
			el.vml.image.shape.style.clip = 'rect('+dC.T+'px '+dC.R+'px '+dC.B+'px '+dC.L+'px)';
		}
	},
	
	fixPng: function(el) {
		el.style.behavior = 'none';
		if (el.nodeName == 'BODY' || el.nodeName == 'TD' || el.nodeName == 'TR') { 
			return;
		}
		el.isImg = false;
		if (el.nodeName == 'IMG') {
			if(el.src.toLowerCase().search(/\.png$/) != -1) {
				el.isImg = true;
				el.style.visibility = 'hidden';
			}
			else {
				return;
			}
		}
		else if (el.currentStyle.backgroundImage.toLowerCase().search('.png') == -1) {
			return;
		}
		var lib = ie_png;
		el.vml = {color: {}, image: {}};
		var els = {shape: {}, fill: {}};
		for (var r in el.vml) {
			for (var e in els) {
				var nodeStr = lib.ns + ':' + e;
				el.vml[r][e] = document.createElement(nodeStr);
			}
			el.vml[r].shape.stroked = false;
			el.vml[r].shape.appendChild(el.vml[r].fill);
			el.parentNode.insertBefore(el.vml[r].shape, el);
		}
		el.vml.image.shape.fillcolor = 'none'; 
		el.vml.image.fill.type = 'tile';
		el.vml.color.fill.on = false; 
		
		lib.attachHandlers(el);
		
		lib.giveLayout(el);
		lib.giveLayout(el.offsetParent);
		
		
		lib.applyVML(el);
	}
	
};
try {
	document.execCommand("BackgroundImageCache", false, true);
} catch(r) {}
ie_png.createVmlNameSpace();
ie_png.createVmlStyleSheet();
