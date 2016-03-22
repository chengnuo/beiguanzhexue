jQuery(function($){

/*主要的选项卡*/
	var mainbody = $(".mainbody");
	var drybar = $(".drybar");
	var oWindow = $(window);
    var mainbar = $(".mainbar");

	oWindow.on("resize",function(){
		//slider();
	});

	

    function indexBannerRemove(){
        $(".index-banner div").each(function(index){
            var attr = $(".index-banner div").eq(index).attr("data-class");
            $(".index-banner div").eq(index).removeClass(attr);
        });
    }
    function indexBanner(){
        $(".index-banner div").each(function(index){
            var attr = $(".index-banner div").eq(index).attr("data-class");
            $(".index-banner div").eq(index).addClass(attr);
        });
    }
	slider();
	function slider(){
        mainbar.css({
            "width":oWindow.width(),
            "overflow":"hidden"
        });
		drybar.css({
			"width":oWindow.width()
		});
		mainbody.css({
			"width": drybar.width() * drybar.size()
		});
		$('.headerbar .centerbar a').on('click',function(){
            
			var __this = $(this);
			__this.addClass('active').siblings().removeClass('active');
			mainbody.animate({
				"position":"absolute",
				"left":-drybar.width()*__this.index()
				//"left":-drybar.width()*4
			});
		});

	}
    
    $('.headerbar .centerbar a').on('click',function(){
        indexBannerRemove();
    });
    
    $("#homepage").on("click",function(){
        indexBanner();
    }).click();
/*选项卡 end*/
	//.menu-bd
	/*
	$(".menu-bd").on("click",function(){
		$(".menu-bd").css({
			"overflow-y":"scroll"
		});
	});
	*/
	
	$(".menu-hd").on("click",function(e){
		if( $(".menu-bd").is(":hidden") ){
			$(".menu-hd").addClass("active");
			$(".menu-bd").show();
		}else{
            $(".menu-bd ul").css({
                "overflow":"hidden"
            });
            $(".menu-fd").show();
			$(".menu-hd").removeClass("active");
			$(".menu-bd").hide();
		}
        e.stopPropagation();
	});
    $(".menu-bd").on("click",function(e){
        e.stopPropagation();
    });
	$(".menu-bd ul").on("mousewheel",function(){
        /*
		$(".menu-bd ul").css({
			"overflow-y":"scroll"
		});
        $(".menu-fd").hide();
        */
	});
    $(".menu-bd ul").mCustomScrollbar({
        live:true,
        theme:"inset-dark"
    });

    $(".menu-fd").on("click",function(){
        $(".menu-bd ul").css({
            "overflow-y":"scroll"
        });
        $(".menu-bd ul").scrollTop(999999999);
        $(".menu-fd").hide();
    });

    //右键事件
    $(window).on("contextmenu",function(e){
        $(".contextmenu").show();

        if( $(".contextmenu").width() + e.pageX > $(window).width() ){
            $(".contextmenu").css({
                "position":"absolute",
                "zIndex":"999",
                "left":e.pageX-$(".contextmenu").width(),
                "top":e.pageY
            });
        }else{
            
            $(".contextmenu").css({
                "position":"absolute",
                "zIndex":"999",
                "left":e.pageX,
                "top":e.pageY
            });
        }


        if( $(".contextmenu").height() + e.pageY > $(window).height() ){
            $(".contextmenu").css({
                "position":"absolute",
                "zIndex":"999",
                "left":e.pageX,
                "top":e.pageY-$(".contextmenu").height()
            });
        }
        
        e.preventDefault();
    });
    $(".contextmenu").on("click",function(e){
        e.stopPropagation();
    });
    $(window).on("click",function(){
        $(".contextmenu").hide();
        $(".menu-bd").hide();
        $(".menu-hd").removeClass("active");
    });

    //


});


//hover
$(function() {


    function hoverDir(obj, ev) {
        var w = obj.width();
        var h = obj.height();

        var x = obj.offset().left + w / 2 - ev.pageX;
        var y = obj.offset().top + h / 2 - ev.pageY;
        return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4;
    }


    $('.demo_link').on('mouseenter', function(ev) {
        var _this = $(this);



        n = hoverDir(_this, ev);


        switch (n) {
            case 0:


                _this.find('span.items-mask').css({
                    'top': 0,
                    'left': 200
                })
                _this.find('span.items-mask').stop().animate({
                    'left': 0
                })
                break;
            case 1:


                _this.find('span.items-mask').css({
                    'top': 200,
                    'left': 0
                })
                _this.find('span.items-mask').stop().animate({
                    'top': 0
                })
                break;
            case 2:

                _this.find('span.items-mask').css({
                    'top': 0,
                    'left': -200
                })
                _this.find('span.items-mask').stop().animate({
                    'left': 0
                })
                break;
            case 3:

                _this.find('span.items-mask').css({
                    'top': -200,
                    'left': 0
                })
                _this.find('span.items-mask').stop().animate({
                    'top': 0
                })
                break;
        }


    })



    $('.demo_link').on('mouseleave', function(ev) {
        var _this = $(this);



        n = hoverDir(_this, ev);


        switch (n) {
            case 0:
                //oBox.innerHTML='从右面移出';
                _this.find('span.items-mask').stop().animate({
                    'left': 200
                });
                break;
            case 1:
                //oBox.innerHTML='从下面移出';
                _this.find('span.items-mask').stop().animate({
                    'top': 200
                });
                break;
            case 2:
                //oBox.innerHTML='从左边移出';
                _this.find('span.items-mask').stop().animate({
                    'left': -200
                });
                break;
            case 3:
                //oBox.innerHTML='从上面移出';
                _this.find('span.items-mask').stop().animate({
                    'top': -200
                });
                break;
        }


    });
});


function offsetTop( elements ){ 
    var top = elements.offsetTop; 
    var parent = elements.offsetParent; 
    while( parent != null ){ 
    top += parent.offsetTop; 
    parent = parent.offsetParent; 
    }; 
    return top; 
}; 
function offsetLeft( elements ){ 
    var left = elements.offsetLeft; 
    var parent = elements.offsetParent; 
    while( parent != null ){ 
    left += parent.offsetLeft; 
    parent = parent.offsetParent; 
    }; 
    return left; 
}; 
//分页
$(function(){

            
            var oBtn = document.getElementById('pagebtn1');
            var oUl = document.getElementById('listpage');
            var aLi = oUl.getElementsByTagName('a');

            var aPos=[];




            oBtn.onclick=function(){

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
                }
                var i = 0;
                var timer = setInterval(function(){
                    (function(index){

                        startMove(aLi[i],{ width:0, height:0, opacity:0, left:offsetLeft(oBtn), top:offsetTop(oBtn)},{end:function(){

                            if(index==aLi.length-1)
                            {
                                i=aLi.length-1;
                                timer=setInterval(function(){
                                    startMove(aLi[i],{width:200, height:200, opacity:1,left:aPos[i].left, top:aPos[i].top});
                                    i--;
                                    if(i==-1)
                                    {
                                        clearInterval(timer);
                                    }
                                }, 30);
                            }

                        }});

                    })(i);
                    i++;

                    if(i==aLi.length)
                    {
                        clearInterval(timer);
                    }

                }, 30);

                

            };



});

//拖拽
window.onload=function(){
    var oUl=document.getElementById('listpage');
    var aLi=oUl.children;
    
    
    var zIndex=2;
    var aPos=[];
    for(var i=0; i<aLi.length; i++){
        aPos[i]={left:aLi[i].offsetLeft, top:aLi[i].offsetTop};
        aLi[i].style.left=aPos[i].left+'px';
        aLi[i].style.top=aPos[i].top+'px';
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
            var oEvent=ev || event;
            
            var disX=oEvent.clientX-obj.offsetLeft;
            var disY=oEvent.clientY-obj.offsetTop;
            
            obj.style.zIndex=999;
            
            document.onmousemove=function(ev){
                var oEvent=ev || event;
                
                obj.style.left=oEvent.clientX-disX+'px';
                obj.style.top=oEvent.clientY-disY+'px';
                
                
                var oNear=findNearest(obj);
                if(oNear && obj!=oNear){
                    var n=obj.index;
                    var m=oNear.index;
                    
                    if(n<m){  //n+1->m  --
                        for(var i=0; i<aLi.length; i++){
                            if(aLi[i].index>=n+1 && aLi[i].index<=m){
                                aLi[i].index--;
                                startMove(aLi[i],aPos[aLi[i].index]);   
                            }
                        }
                        obj.index=m;
                        
                    }else{  //m -> n-1  ++
                        for(var i=0; i<aLi.length; i++){
                            if(aLi[i].index>=m && aLi[i].index<=n-1){
                                aLi[i].index++;
                                startMove(aLi[i],aPos[aLi[i].index]);   
                            }
                        }
                        obj.index=m;    
                    }
                }   
            }
            document.onmouseup=function(){
                obj.style.zIndex=998;
                document.onmousemove=null;
                document.onmouseup=null;    
                obj.releaseCapture && obj.releaseCapture();
                startMove(obj,aPos[obj.index]);
            }
            obj.setCapture && obj.setCapture();
            return false;   
        }   
    }
    
    
    function findNearest(obj){
        var iMin=new Date().getTime();
        var iMinIndex=-1;
        
        for(var i=0; i<aLi.length; i++){
            //if(obj==aLi[i])continue; //?
            if(collTest(obj,aLi[i])){
                var dis=getDis(obj,aLi[i]);
                if(dis<iMin){
                    iMin=dis;
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
        
        var l2=aPos[obj2.index].left;
        var r2=aPos[obj2.index].left+obj2.offsetWidth;
        var t2=aPos[obj2.index].top;
        var b2=aPos[obj2.index].top+obj2.offsetHeight;
        
        if(r1<l2 || l1>r2 || b1<t2 || t1>b2){
            return false;
        }else{
            return true;
        }
    }
    
    function getDis(obj,obj2){
        var a=obj.offsetLeft-obj2.offsetLeft;
        var b=obj.offsetTop-obj2.offsetTop;
        return Math.sqrt(a*a+b*b);
    }
};


//bing导航
//
$(function(){
    var listA = $("#listpage a");
    var oNowA=null;

    
    listA.on("dblclick",function(){
        var _this = $(this);
        if(  _this.attr("href")=='javascript:;'){
            //$("#add-box").show();
            
            $.colorbox({
                html: '<div class="" id="add-box" style="">'+
'       <div class="add-box">'+
'           <div class="info" id="info">'+
'               网站名称<input type="text" placeholder="例如：必应" id="t1"><a href="javascript:;" id="add-btn">添加</a>'+
'               <p>&nbsp;</p>'+
'               网站连接<input type="text" id="t2" placeholder="cn.bing.com"><input type="hidden" value="">'+
'           </div>'+
'           <div class="tab">'+
'               <div id="tab-hd" class="tab-hd">'+
'                   <a href="javascript:;" class="now">必应推荐</a>'+
'                   <a href="javascript:;">经常使用</a>'+
'               </div>'+
'               <div id="tab-bd" class="tab-bd">'+
'                   <ul>'+
'                       <li><a href="javascript:;"><span>优酷视频</span><span>http://www.youku.com/</span><span class="hide">youku</span></a></li>'+
'                       <li><a href="javascript:;"><span>爱齐艺视频</span><span>http://www.iqiyi.com/</span><span class="hide">iqiyi</span></a></li>'+
'                       <li><a href="javascript:;"><span>土豆网</span><span>http://www.tudou.com/</span><span class="hide">tudou</span></a></li>'+
'                       <li><a href="javascript:;"><span>凤凰网军事</span><span>http://news.ifeng.com/mil/</span><span class="hide">ifeng</span></a></li>'+
'                       <li><a href="javascript:;"><span>腾讯视频</span><span>http://v.qq.com/</span><span class="hide">vqq</span></a></li>'+
'                       <li><a href="javascript:;"><span>搜狐视频</span><span>http://tv.sohu.com/</span><span class="hide">souhu</span></a></li>'+
'                       <li><a href="javascript:;"><span>乐视网</span><span>http://www.letv.com/</span><span class="hide">leshi</span></a></li>'+
'                       <li><a href="javascript:;"><span>迅雷视频</span><span>http://www.xunlei.com/</span><span class="hide">xunlei</span></a></li>'+
'                   </ul>'+
'                   <ul><li class="nodata">内有记录。。。</li></ul>'+
'               </div>'+
'           </div>'+
'       </div>'+
'   </div>',
                title: "bing导航",
                scrolling: !1
            });
            
            
            oNowA=_this;
        } 
    });
    



    $("body").on("click","#add-btn",function(){

        var oWebName = $("#t1");
        var oWebHref = $("#t2");
        var name=oWebName.val();
        var href=oWebHref.val();

        if( href == "" ){
            alert("网站链接不得为空");
            return false;
        }
        //$("#add-box").hide();



        oNowA.attr("href",'http://'+href);
        oNowA.find(".face_text").html(name);
        oNowA.find(".items-mask").html(name);
        oNowA.parent().addClass('ico');

        $.fn.colorbox.close();

        oWebName.val('');
        oWebHref.val('');

    });
});

//背景
$(function(){
    /*
    $(".btn-close").on("click",function(){
        $("#layer-upload-bg").hide();
    });

    $(".personal").on("click",function(){
        $("#layer-upload-bg").show();
    });
    */
    
    
    $(".personal").on("click",function(){
        $.colorbox({
            html:'<div class="work-upload-inner">'+
'                <!-- 上传tab S -->'+
'                <div class="work-upload-bd">'+
'                    <div class="j-main-wrap j-scroll">'+
'                        <div class="j-scroll-scrollbar disable" style="height: 452px;">'+
'                            <div class="j-scroll-track" style="height: 452px;">'+
'                                <div class="j-scroll-thumb" style="height: 452px;"></div>'+
'                            </div>'+
'                        </div>'+
'                        <div class="j-scroll-viewport">'+
'                            <div class="j-scroll-overview" style="top: 0px;">'+
'                                <div class="j-cont-wrap"><!-- 第一步 上传框 S -->'+
'                                    <div class="upload-box"><!-- 初始 S -->'+
'                                        <div class="upload-main j-upload-main grid-list">'+
'                                            <ul class="upload-list clearfix" id="j-preview-list">'+
'                                               <!--'+
'                                                <li class="upload-item j-upload-swf">'+
'                                                    <div class="upload-area">'+
'                                                        <div id="file_upload" class="uploadify">'+
'                                                            <a id="file_upload-button" class="uploadify-button upload" href="javascript:void(0);"><span class="uploadify-button-text"><i class="mod-icon mod-icon-upload-img"></i></span></a></div>'+
'                                                        <p class="tips-txt">添加图片</p>'+
'                                                        <p class="size-txt">JPEG/GIF/PNG，大小不超过8M</p>'+
'                                                    </div>'+
'                                                </li>'+
'                                               -->'+
'                                               <li class="upload-item j-upload-item upload-item-bg"><img src="images/bg/wuzi.jpg"></li>'+
'                                               <li class="upload-item j-upload-item upload-item-bg"><img src="images/bg/tuose.jpg"></li>'+
'                                               <li class="upload-item j-upload-item upload-item-bg"><img src="images/bg/tiankongzhicheng.jpg"></li>'+
'                                               <li class="upload-item j-upload-item upload-item-bg"><img src="images/bg/haizeiwang-nvdi.png"></li>'+
'                                               <li class="upload-item j-upload-swf">'+
'                                                   <div class="upload-area">'+
'                                                       <div id="file_upload" class="uploadify" style="height: 82px;">'+
'                                                           <a id="file_upload-button" class="uploadify-button upload" href="javascript:void(0);">'+
'                                                               <span class="uploadify-button-text"><i class="mod-icon mod-icon-upload-img"></i></span>'+
'                                                           </a>'+
'                                                       </div>'+
'                                                       <p class="tips-txt">继续添加图片</p>'+
'                                                       <p class="size-txt" style="display: none;">JPEG/GIF/PNG，大小不超过8M</p>'+
'                                                   </div>'+
'                                               </li>'+
'                                            </ul>'+
'                                        </div>'+
'                                    </div>'+
'                                </div>'+
'                            </div>'+
'                        </div>'+
'                    </div>'+
'                    <div class="j-cover-wrap"></div>'+
'                    <div class="j-info-wrap"></div>'+
'                </div>'+
'                <div class="upload-op clearfix j-upload-op">'+
'                    <div class="j-op-side"><!-- 模式选择 S -->'+
'                        <div class="img-mode"><a href="javascript:void(0);" class="mode-item mode-cur" list-type="0" title="列表模式"><i class="icon-mode icon-grid"></i></a><a href="javascript:void(0);" class="mode-item j-switch-view" list-type="1" title="单列模式"><i class="icon-mode icon-row"></i></a></div>'+
'                        <!-- 模式选择 E --></div>'+
'                    <!-- 按钮 S -->'+
'                    <div class="btn-box btn-box-left j-btn-left" style="display: none"><a href="javascript:void(0);" class="mod-btn mod-btn-gray">上一步</a></div>'+
'                    <div class="cover-list j-cover-list"></div>'+
'                    <!-- 按钮 E --><!-- 按钮 S -->'+
'                    <div class="btn-box j-btn-next"><a href="javascript:void(0);" class="mod-btn">完成</a></div>'+
'                    <span class="role-upload j-role-upload "><i class="mod-icon checkbox-select-little"></i>同意<a href="javascript:void(0);">原创馆服务规则</a></span><!-- 按钮 E --></div>'+
'                </div>',
            title:"更换背景"
        });
    });
    

    $("body").on("click",".upload-item-bg",function(){
        var layoutBg = $(".layout-bg");
        var __this = $(this);
        var src = __this.find("img").attr("src");

        layoutBg.attr("src",src);
    });
});

//漂亮的背景
$(function(){
    
    var $body = $('body'),
        $fullScreen = $('.full-screen'),
        $loadArea = $('.loading-area');
    var $layout = $(".layout");

    
    
    var trunShow = function (model) {
        $body.removeClass().addClass(model);
        $fullScreen.show();
        setTimeout(function() {$fullScreen.addClass('current');},100)
    }
    var trunHide = function () {
        $fullScreen.removeClass('current');
        setTimeout(function() {$fullScreen.hide();},1370)
    }

    trunShow("about");


    setTimeout(function() {
        trunHide();
    },1500);

    /*
    $(".headerbar .centerbar a").on("click",function(){
        trunShow("css");
        setTimeout(function() {
            trunHide();
        },1500);
    });
    */

});

//第二页
$(function(){
    
    $(".headerbar .centerbar a").on("click",function(){
        $("#revolution-slider div.tp-caption").each(function(index){
            var attr = $("#revolution-slider div.tp-caption").eq(index).attr("data-class");
            $("#revolution-slider div.tp-caption").eq(index).removeClass(attr);
        });
    });

    $("#html5page").on("click",function(){
        $("#revolution-slider div.tp-caption").each(function(index){
            var attr = $("#revolution-slider div.tp-caption").eq(index).attr("data-class");
            $("#revolution-slider div.tp-caption").eq(index).addClass(attr);
        });
    });
});


$(function(){
    $(".logo").on("click",function(){
        var a = 1;
        var g = 2;
        $.colorbox({
            html: '<div id="changeCityBox" class="popup changeCityBox"><div class="changeCity_header"><strong>亲爱的用户您好：</strong><p class="tips">切换城市分站，让我们为您提供更准确的职位信息。</p></div><p class="checkTips">点击进入<a class="tab focus" href="javascript:void(0);">' + a + '站</a>or 切换到以下城市</p><ul class="clearfix">' + g + '</ul><p class="changeCity_footer">其他城市正在开通中，敬请期待～</p></div>',
            title: "切换城市",
            scrolling: !1
        });
    });
})