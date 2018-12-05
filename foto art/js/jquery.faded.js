if(typeof jQuery != "undefined") {
	jQuery(function($) {
		$.fn.extend({
			faded: function(options) {
				var settings = $.extend({}, $.fn.faded.defaults, options);
				return this.each(
					function() {
						if($.fn.jquery < "1.3.1") {return;}
						var $t = $(this);
						var $c = $t.children(":nth-child(1)");
						var o = $.metadata ? $.extend({}, settings, $t.metadata()) : settings;
						var total = $c.children().size();
						var next = 0, prev = 0, number = 0, currentitem = 0, restart = 0, restartinterval = 0;
						var loaded,active,imgSrc,clicked,current;
						if (o.random) {
							$.fn.reorder = function(callback) {
								function randOrd() { return(Math.round(Math.random())-0.5); }
									return($(this).each(function() {
									var $this = $(this);
									var $children = $this.children();
									var childCount = $children.length;
									if (childCount > 1) {
										$children.hide();
										var indices = new Array();
										for (i=0;i<childCount;i++) { indices[indices.length] = i; }
										indices = indices.sort(randOrd);
										$.each(indices,function(j,k) { 
											var $child = $children.eq(k);
											var $clone = $child.clone(true);
											$clone.show().appendTo($this);
											if (callback !== undefined) {
												callback($child, $clone);
													}
										$child.remove();
									});
									}
								}));
							};
							$c.reorder();
						}
						function pause() {
							clearInterval(autoplay);
							clearTimeout(restart);
							restart = setTimeout(function() {
								autoplay = setInterval(function(){
									animate("next");
								},o.autoplay);
							},o.autorestart);			
						}
						$c.css({position:"relative"});			
						$c.children().css({
							position:"absolute",
							top: 0, 
							left: 0,
							zIndex: 0,
							display:"none"
						 });
						if (o.autoheight) {
							$c.animate({height: $c.children(":eq(0)").outerHeight()},o.autoheight);
						}
						if (o.pagination) {
							if (o.autopagination) {
								$t.append("<ul class="+o.pagination+"></ul>");
								$c.children().each(function(){
									$("."+o.pagination+"",$t).append("<li><a rel="+number+" href=\"#\" >"+(number+1)+"</a></li>");
									number++;
								});
							}