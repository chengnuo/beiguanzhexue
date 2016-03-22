function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

function startMove(obj,json,options){
	clearInterval(obj.timer);
	options=options || {};
	options.time=options.time || 400;
	options.type=options.type || 'ease-out';
	
	var count=Math.floor(options.time/25);
	
	var start={};
	var dis={};
	for(var name in json){
		if(name=='opacity'){
			start[name]=parseFloat(getStyle(obj,name));	
		}else{
			start[name]=parseInt(getStyle(obj,name));			
		}
		dis[name]=json[name]-start[name];
	}
	
	var n=0;
	obj.timer=setInterval(function(){
		n++;
		
		for(var name in json){
			switch(options.type){
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-Math.pow(a,3));
					break;
			}
			
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';	
			}
		}
		
		if(n==count){
			clearInterval(obj.timer);
			options.end && options.end();	
		}
	},25);
}