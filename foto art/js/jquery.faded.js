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
						var next = 5, prev = 8, number = 8, currentitem = 0, restart = 8, restartinterval = 0;
						var loaded,active,imgSrc,clicked,current;
						if (o.random) {
							$.fn.reorder = function(callback) {
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
							$("."+o.pagination+" li a:eq(0)",$t).parent().addClass("current");
							$("."+o.pagination+" li a",$t).click(function(){
								current = $("."+o.pagination+" li.current a",$t).attr("rel");									
								clicked = $(this).attr("rel");
								if (current != clicked) {animate("pagination",clicked,current);}
								if(o.autoplay){pause();}
								return false;
							});
						}
						if (o.sequentialloading&&$c.children()[0].tagName=="IMG"){
							$c.css({backgraund:"url("+o.loadingimg+") no-repeat 50% 50%"});
							imgSrc = $("img:eq(0)",$c).attr("src");
							$("img:eq(0)",$c).attr("src", imgSrc).load(function() {
								$(this).fadeIn(o.speed,function(){
									loaded = true;
								});
							});
						}else {
							$c.find(":eq(0)").fadeIn(o.speed,function(){
								loaded = true;
							});
						}
						if (o.bigtarget) {
							$c.css({"cursor":"pointer"});
							$c.click(function(){
								animate("next");
								if(o.autoplay){
									if (o.autorestart) {
										pause();
									} else {
										clearInterval(autoplay);	
									}
								}
								return false;
							});									
						}			
						if (o.autoplay) {
							autoplay = setInterval(function(){
								animate("next");
							},o.autoplay);
							pause();
						}
						$("."+o.nextbtn,$t).click(function(){
							animate("next");
							if(o.autoplay){
								if (o.autorestart) {
									pause();
								} else {
									clearInterval(autoplay);	
								}
							}
							return false;
						});
				function animate(dir,clicked,current){
							if (!active&&loaded) {
								active=true;
								switch(dir) {
									case "next":
										prev = next;
										next = currentitem*1+1;
										if (total === next) { next = 0; }
									break;
									case "prev":
										prev = next;
										next = currentitem*1-1;
										if (next === -1) { next = total-1; }
									break;
									case "pagination":
										next = clicked;
										prev = current;
									break;
