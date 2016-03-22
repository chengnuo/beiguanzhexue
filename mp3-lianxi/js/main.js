
function Map() {  
    /** 存放键的数组(遍历用到) */  
    this.keys = new Array();  
    /** 存放数据 */  
    this.data = new Object();  
      
    /** 
     * 放入一个键值对 
     * @param {String} key 
     * @param {Object} value 
     */  
    this.put = function(key, value) {  
        if(this.data[key] == null){  
            this.keys.push(key);  
        }  
        this.data[key] = value;  
    };  
      
    /** 
     * 获取某键对应的值 
     * @param {String} key 
     * @return {Object} value 
     */  
    this.get = function(key) {  
        return this.data[key];  
    };  
      
    /** 
     * 删除一个键值对 
     * @param {String} key 
     */  
    this.remove = function(key) {  
        this.keys.remove(key);  
        this.data[key] = null;  
    };  
      
    /** 
     * 遍历Map,执行处理函数 
     *  
     * @param {Function} 回调函数 function(key,value,index){..} 
     */  
    this.each = function(fn){  
        if(typeof fn != 'function'){  
            return;  
        }  
        var len = this.keys.length;  
        for(var i=0;i<len;i++){  
            var k = this.keys[i];  
            fn(k,this.data[k],i);  
        }  
    };  
      
    /** 
     * 获取键值数组(类似Java的entrySet()) 
     * @return 键值对象{key,value}的数组 
     */  
    this.entrys = function() {  
        var len = this.keys.length;  
        var entrys = new Array(len);  
        for (var i = 0; i < len; i++) {  
            entrys[i] = {  
                key : this.keys[i],  
                value : this.data[i]  
            };  
        }  
        return entrys;  
    };  
      
    /** 
     * 判断Map是否为空 
     */  
    this.isEmpty = function() {  
        return this.keys.length == 0;  
    };  
      
    /** 
     * 获取键值对数量 
     */  
    this.size = function(){  
        return this.keys.length;  
    };  
      
    /** 
     * 重写toString  
     */  
    this.toString = function(){  
        var s = "{";  
        for(var i=0;i<this.keys.length;i++,s+=','){  
            var k = this.keys[i];  
            s += k+"="+this.data[k];  
        }  
        s+="}";  
        return s;  
    };  
} 
//<![CDATA[

$(document).ready(function(){
	var lrc_list_map = new Map();
	var myPlaylist = new jPlayerPlaylist({
			jPlayer: "#jquery_jplayer_1",
			cssSelectorAncestor: "#jp_container_1"
		},
		[
			{title:"洋葱",mp3: "yangcong.mp3",lrc:'yangcong.lrc', free:true},
            {title:"预感",mp3: "yu_gan.mp3",lrc:'yu_gan.lrc', free:true},
            {title:"以后的以后",mp3: "yi_hou_de_yi_hou.mp3",lrc:'yi_hou_de_yi_hou.lrc', free:true},
            {title:"听说爱情回来过",mp3: "tingshuoaiqinghuilaiguo.mp3",lrc:'tingshuoaiqinghuilaiguo.lrc', free:true}
			
			//free:true会在列表中此条音乐名称右边出现格式选择
		],
		{
			ready: function(event) {
			},
			timeupdate: function(event) {
				if(event.jPlayer.status.currentTime==0){
					time = 0;
				}else {
					time = event.jPlayer.status.currentTime;
				}
			},
			play: function(event) {
			//点击开始方法调用lrc.start歌词方法 返回时间time
			var lrc=myPlaylist.playlist[myPlaylist.current].lrc;
			//console.log(myPlaylist.current)
			if(lrc_list_map.get(lrc)!=null && lrc_list_map.get!=undefined){
				if(time==0) {
				$.lrc.start(lrc_list_map.get(lrc), function() {

				return time;
				});
				}
				
			}else if(lrc_list_map.get(lrc)=="error"){
				showNoLrcInfo();
			}else{
				//加载字幕;
				$.lrc.stop();
				$("#lrc_list").empty();
				$.ajax({
				type: 'get',
				url: 'lrc/'+lrc,
				data: {},
				success: function(results){
					lrc_list_map.put(lrc,results);
					$.lrc.start(results, function() {
						
						return time;
					});
				
				},
				error: function(results){
					lrc_list_map.put(lrc,"error");
				
				}
				})
			}
			},
			swfPath: "flash", //存放jplayer.swf的决定路径
			solution:"html, flash", //规定用什么方式播放媒体优先。
			supplied: "mp3",
			smoothPlayBar: false,
			keyEnabled: true,
			audioFullScreen: true
		});
});

//]]>
