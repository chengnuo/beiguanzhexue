/**
 * @name jquery-smart3d.js
 * @author Kotelnitskiy Evgeniy (http://4coder.info)
 * @version 0.2
 * @date December 18, 2009
 * @category jQuery plugin
 * @license GPL
 * @example Visit http://4coder.info/en/jquery-smart3d-en/ for more informations about this jQuery plugin
**/

(function($) {
	$.fn.smart3d = function(frame_width, first_is_static, last_is_static) {
		var jQueryMatchedObj = this;
		var width = jQueryMatchedObj.width();
		var offset = frame_width - width;
		if (last_is_static == undefined) 
			last_is_static = false;
		if (first_is_static == undefined) 
			first_is_static = false;
		
		jQueryMatchedObj.css('padding', '0');
		jQueryMatchedObj.css('overflow', 'hidden');
		jQueryMatchedObj.css('position', 'relative');
		jQueryMatchedObj.css('list-style', 'none');
				
		var lis = jQueryMatchedObj.find('li');
		lis.css('padding', '0');
		lis.css('margin', '0');
		lis.css('position', 'absolute');
		lis.css('top', '0');
		lis.css('width', frame_width);
		lis.css('left', (width - frame_width) / 2);
		jQueryMatchedObj.pos = 0;
		
		jQueryMatchedObj.mousemove(function(e){
			var x = e.clientX - jQueryMatchedObj.offset().left;
			jQueryMatchedObj.pos = x / width * offset - offset / 2;
		});
		
		function _jpvol_animate(){
			for (var i=1; i<=lis.length; i++){
				if ((last_is_static) && (i == lis.length))
					continue;
				if ((first_is_static) && (i == 1))
					continue;
				
				var cur_l = parseFloat(jQuery(lis[i-1]).css('left'));
				var new_l = jQueryMatchedObj.pos * (i / lis.length) - offset / 2;
				//if (Math.abs(cur_l - new_l) > 1)
					jQuery(lis[i-1]).css('left', (new_l + cur_l*6) / 7);
			}
		}
		setInterval(_jpvol_animate, 40);
		return this;
	};
})(jQuery); 