;$(function (){

	var $_navLi = $('.navlist li');
	var $_contentBox = $('#content .box');
	var index = 0;
	var page = 0;
	
	var innerWidth = $(window).innerWidth();
	var innerHeight = $(window).innerHeight();
	var headerWidth = $('#header').width();


	//窗口
	$(window).on('resize load',function(){
		var innerWidth = $(window).innerWidth();
		var innerHeight = $(window).innerHeight();
		$_contentBox.css({
			'width':innerWidth,
			'height':innerHeight
		});
	});


	//导航
	scrollMenu();
	function scrollMenu(){
		$('.navlist li').on('click',function(){
			if( $('#content:animated').length )return;
			page = $(this).index();
			$('html,body').stop(false,true).animate({
				'scrollTop':$_contentBox.eq( $(this).index()  ).offset().top +'px'
			},2000)
			$('.navlist li a').removeClass('active').eq(page).addClass('active');

			

		});

		$('.navlist li').on('mouseover',function(){
			page = $(this).index();
			$('.bgSlider').stop(false).animate({
				'left':$_navLi.eq( $(this).index() ).offset().left
			},800,'easeInOutQuint');
			$('.navlist li a').removeClass('active').eq(page).addClass('active');
		});


		

		$('#wanp').css({
			'height':$_contentBox.height()*$_contentBox.length +'px'
		})

		
	};



	//section 1
	slider()
	function slider(){
		var $_slider = $('#slider');
		var $_sliderUl = $('#slider ul');
		var $_sliderUlLi = $('#slider ul li');
		var $_sliderOlLi = $('#slider ol li');
		var $_sliderSpan = $('#slider ol span');
		var iNow=0;


		$_sliderUl.css({
			'width':$_sliderUlLi.width()*$_sliderUlLi.length
		})

		

		next();
		function next(){
			$_sliderSpan.each(function(index,value){
				$_sliderSpan.eq(index).css({
					'width':0
				})
			})
			$_sliderSpan.eq(iNow).animate({
				'width':80
			},5000,'easeInCubic',function(){
				iNow++;
				if(iNow == $_sliderSpan.length){
					iNow=0;
				}
			}).delay(5000)

			$_sliderUl.animate({
				'left':-iNow*$_sliderUlLi.width()
			},5000,'easeInCubic',function (){
				next();
			}).delay(5000)
		}

	}
	

























	
});

//section 2
$(function(){
	var oWinTop;
	var oContentH = $(".content").height();
	var oContentLen = $(".content").length;
	var vIndex = 0;
	$(".article").css("height",oContentH*oContentLen);
	$(".content:eq("+vIndex+")").addClass("content-focus");

	$(window).scroll(function(){
		parallax();
		oWinTop = $(window).scrollTop();
		$(".slidecount li").removeClass("focus");
		$(".content").removeClass("content-focus");
		if(oWinTop >= 0 && oWinTop < oContentH){
			vIndex = 0;
			$(".slidecount li:eq("+vIndex+")").addClass("focus");
			$(".content:eq("+vIndex+")").addClass("content-focus");
		}
	});

	function parallax(){
		var toped = $(window).scrollTop();
		$('.section-1').css({top:(0-(toped*1.75))+'px'});
		$('.section-2').css({top:(0-(toped*0.35))+'px'});
		$('.section-3').css({top:(0-(toped*1.35))+'px'});
	}
	parallax();

});

//section 3

$(function(){
	
	
	function hoverDir(obj,ev){
		var w = obj.width();
		var h = obj.height();

		var x = obj.offset().left+w/2-ev.pageX;
		var y = obj.offset().top+h/2-ev.pageY;
		return Math.round( (Math.atan2(y,x)*180/Math.PI+180)/90 )%4;
	}
	

	$('#moveToggle li').on('mouseenter',function(ev){
		var _this=$(this);
		
		
		
		n=hoverDir(_this,ev);
		

		switch(n)
			{
				case 0:
					
					
					_this.find('span').css({
						'top':0,
						'left':200
					})
					_this.find('span').stop().animate({
						'left':0
					})
					break;
				case 1:
			
					
					_this.find('span').css({
						'top':200,
						'left':0
					})
					_this.find('span').stop().animate({
						'top':0
					})
					break;
				case 2:
				
					_this.find('span').css({
						'top':0,
						'left':-200
					})
					_this.find('span').stop().animate({
						'left':0
					})
					break;
				case 3:
				
					_this.find('span').css({
						'top':-200,
						'left':0
					})
					_this.find('span').stop().animate({
						'top':0
					})
					break;
			}


	})

	

	$('#moveToggle li').on('mouseleave',function(ev){
		var _this=$(this);
		
		
		
		n=hoverDir(_this,ev);
		

		switch(n){
				case 0:
					//oBox.innerHTML='从右面移出';
					_this.find('span').stop().animate({
						'left':200
					})
					break;
				case 1:
					//oBox.innerHTML='从下面移出';
					_this.find('span').stop().animate({
						'top':200
					})
					break;
				case 2:
					//oBox.innerHTML='从左边移出';
					_this.find('span').stop().animate({
						'left':-200
					})
					break;
				case 3:
					//oBox.innerHTML='从上面移出';
					_this.find('span').stop().animate({
						'top':-200
					})
					break;
			}


	})



});


//section 4

//section 4
$(function(){
	var oBtn=document.getElementById('tupianbtn');
	var oUl=document.getElementById('dragimg');
	var aLi=oUl.children;
	
	var aPos=[];
	
	//点击按钮
	oBtn.onclick=function(){
		aPos.sort(function(){
			return Math.random()-0.5;	
		});
		for(var i=0; i<aLi.length; i++){
			/*aLi[i].style.left=aPos[aLi[i].index].left+'px';
			aLi[i].style.top=aPos[aLi[i].index].top+'px';*/
			startMove(aLi[i],aPos[aLi[i].index]);
		}
	};
	
	//布局转化
	for(var i=0; i<aLi.length; i++){
		aPos[i]={left:aLi[i].offsetLeft, top:aLi[i].offsetTop};
		aLi[i].style.left=aLi[i].offsetLeft+'px';
		aLi[i].style.top=aLi[i].offsetTop+'px';
	}
	for(var i=0; i<aLi.length; i++){
		aLi[i].style.position='absolute';
		aLi[i].style.margin=0;
	}
	//拖拽
	for(var i=0; i<aLi.length; i++){
		drag(aLi[i]);
		aLi[i].index=i;
	}
	
	function drag(obj){
		obj.onmousedown=function(ev){
			clearInterval(obj.timer);
			var oEvent=ev || event;
			
			var disX=oEvent.clientX-obj.offsetLeft;
			var disY=oEvent.clientY-obj.offsetTop;
			obj.style.zIndex=2;
			
			document.onmousemove=function(ev){
				var oEvent=ev || event;
				
				obj.style.left=oEvent.clientX-disX+'px';
				obj.style.top=oEvent.clientY-disY+'px';	
				
				
				for(var i=0; i<aLi.length; i++){
					aLi[i].className='';
				}
				//检测碰撞
				var oNear=findNearest(obj);
				
				if(oNear){
					oNear.className='on';	
				}
			}
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;	
				obj.releaseCapture && obj.releaseCapture();
				obj.style.zIndex=1;
				
				//换位置
				var oNear=findNearest(obj);
				if(oNear){
					/*oNear.style.left=aPos[obj.index].left+'px';
					oNear.style.top=aPos[obj.index].top+'px';
					obj.style.left=aPos[oNear.index].left+'px';
					obj.style.top=aPos[oNear.index].top+'px';*/
					startMove(oNear,aPos[obj.index],{time:1000});
					startMove(obj,aPos[oNear.index],{time:1000});
					oNear.className='';
					
					//索引也需要换
					var car;
					car=obj.index;
					obj.index=oNear.index;
					oNear.index=car;
				}else{
					/*obj.style.left=aPos[obj.index].left+'px';
					obj.style.top=aPos[obj.index].top+'px';	*/
					startMove(obj,aPos[obj.index],{time:1000});
				}
			}
			obj.setCapture && obj.setCapture();
			return false;	
		}	
	}
	
	function findNearest(obj){
		var iMin=new Date().getTime();
		var iMinIndex=-1;
		for(var i=0; i<aLi.length; i++){
			if(obj==aLi[i])continue;
			if(collTest(obj,aLi[i])){
				//最近的
				var n=getDis(obj,aLi[i]);
				if(n<iMin){
					iMin=n;	
					iMinIndex=i;
				}	
			}
		}
		
		if(iMinIndex==-1){
			return null;
		}else{
			return aLi[iMinIndex];	
		}
	}
	
	function collTest(obj,obj2){
		var l1=obj.offsetLeft;
		var r1=obj.offsetLeft+obj.offsetWidth;
		var t1=obj.offsetTop;
		var b1=obj.offsetTop+obj.offsetHeight;
		
		var l2=obj2.offsetLeft;
		var r2=obj2.offsetLeft+obj2.offsetWidth;
		var t2=obj2.offsetTop;
		var b2=obj2.offsetTop+obj2.offsetHeight;
		
		if(r1<l2 || l1>r2 || b1<t2 || t1>b2){
			return false;
		}else{
			return true;
		}
	}
	
	function getDis(obj,obj2){
		var a=obj.offsetLeft-obj2.offsetLeft;
		var b=obj.offsetTop-obj2.offsetTop;
		return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
	}
})

//section 5
$(function(){
			var oBtn = document.getElementById('pagebtn');
			var oUl = document.getElementById('listpage');
			var aLi = oUl.getElementsByTagName('li');

			var aPos=[];

			for(var i=0;i<aLi.length;i++)
			{
				aPos.push({
					'left':aLi[i].offsetLeft,
					'top':aLi[i].offsetTop
				})
				aLi[i].style.left = aPos[i].left +'px';
				aLi[i].style.top = aPos[i].top +'px';
			

			}
			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].style.position='absolute';
				aLi[i].style.margin = 0;
				aLi[i].innerHTML = i;
			}

			oBtn.onclick=function(){
				var i = 0;
				var timer = setInterval(function(){
					(function(index){

						startMove(aLi[i],{ width:0, height:0, opacity:0, left:0, top:0},{end:function(){

							if(index==aLi.length-1)
							{
								i=aLi.length-1;
								timer=setInterval(function(){
									startMove(aLi[i],{width:100, height:100, opacity:1,left:aPos[i].left, top:aPos[i].top})
									i--
									if(i==-1)
									{
										clearInterval(timer)
									}
								}, 30);
							}

						}})

					})(i);
					i++;

					if(i==aLi.length)
					{
						clearInterval(timer)
					}

				}, 30);

				

			};


})

