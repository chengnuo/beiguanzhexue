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
        if (this.data[key] == null) {
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
    this.each = function(fn) {
        if (typeof fn != 'function') {
            return;
        }
        var len = this.keys.length;
        for (var i = 0; i < len; i++) {
            var k = this.keys[i];
            fn(k, this.data[k], i);
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
                key: this.keys[i],
                value: this.data[i]
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
    this.size = function() {
        return this.keys.length;
    };

    /** 
     * 重写toString
     */
    this.toString = function() {
        var s = "{";
        for (var i = 0; i < this.keys.length; i++, s += ',') {
            var k = this.keys[i];
            s += k + "=" + this.data[k];
        }
        s += "}";
        return s;
    };
}

$(function() {
    var lrc_list_map = new Map();
    /*
    var playlist = [{
        title: "最长的电影",
        artist: "周杰伦",
        mp3: "http://sc.111ttt.com/up/mp3/21567/82A1E2ED54A07B173CDEAFD38DF63C4F.mp3",
        poster: "http://www.sucaijiayuan.com/uploads/file/contents/2014/09/541438e7cd272.gif"
    }, {
        title: "喜欢你",
        artist: "邓紫棋",
        mp3: "http://sc1.111ttt.com/2014/1/09/12/2121908298.mp3",
        poster: "images/yqB0erk.jpg"
    }, {
        title: "泡沫",
        artist: "男生版",
        mp3: "http://sc.111ttt.com/up/mp3/325955/BEBEB47B017439208D11F62558E9A9D1.mp3",
        poster: "http://www.sucaijiayuan.com/uploads/file/contents/2014/09/540847298c9e0.gif"
    }];
    */
    var playlist = [
        {
            "title": "洋葱",
            "mp3": "mp3/yangcong.mp3",
            "lrc": "yangcong.lrc",
            "free": true,
            "poster":"http://www.sucaijiayuan.com/uploads/file/contents/2014/09/541438e7cd272.gif",
            "artist": "杨宗纬"
        },
        {
            "title": "预感",
            "mp3": "mp3/yu_gan.mp3",
            "lrc": "yu_gan.lrc",
            "free": true,
            "poster": "http://www.sucaijiayuan.com/uploads/file/contents/2014/09/540847298c9e0.gif",
            "artist": "李玖哲"
        },
        {
            "title": "以后的以后",
            "mp3": "mp3/yi_hou_de_yi_hou.mp3",
            "lrc": "yi_hou_de_yi_hou.lrc",
            "free": true,
            "poster":"http://www.sucaijiayuan.com/uploads/file/contents/2014/09/541438e7cd272.gif",
            "artist": "庄心妍"
        },
        {
            "title": "听说爱情回来过",
            "mp3": "mp3/tingshuoaiqinghuilaiguo.mp3",
            "lrc": "tingshuoaiqinghuilaiguo.lrc",
            "free": true,
            "poster": "http://www.sucaijiayuan.com/uploads/file/contents/2014/09/540847298c9e0.gif",
            "artist": "杨宗纬"
        }
    ]

    var cssSelector = {
        jPlayer: "#jquery_jplayer",
        cssSelectorAncestor: ".music-player"
    };

    var options = {
        ready: function(event) {

        },
        timeupdate: function(event) {

            
            if (event.jPlayer.status.currentTime == 0) {
                time = 0;
            } else {
                time = event.jPlayer.status.currentTime;
            }
        },
        play: function(event) {

            //点击开始方法调用lrc.start歌词方法 返回时间time
            var lrc = myPlaylist.playlist[myPlaylist.current].lrc;
            //console.log(myPlaylist.current)
            if (lrc_list_map.get(lrc) != null && lrc_list_map.get != undefined) {
                if (time == 0) {
                    $.lrc.start(lrc_list_map.get(lrc), function() {
                        return time;
                    });
                }
            } else if (lrc_list_map.get(lrc) == "error") {
                showNoLrcInfo();
            } else {
                //加载字幕;
                $.lrc.stop();
                $("#lrc_list").empty();
                $.ajax({
                    type: 'get',
                    url: 'lrc/' + lrc,
                    data: {},
                    success: function(results) {
                        
                        lrc_list_map.put(lrc, results);
                        $.lrc.start(results, function() {
                            return time;
                        });

                    },
                    error: function(results) {
                        lrc_list_map.put(lrc, "error");

                    }
                })
            }
        },
        swfPath: "flash/Jplayer.swf",
        solution: 'html, flash',
        supplied: "ogv, m4v, oga, mp3",
        verticalVolume:true,
        playlistOptions: {
            enableRemoveControls: true
        },
        smoothPlayBar: false,
        keyEnabled: true,
        audioFullScreen: true

        //playlistOptions 删除
        //smoothPlayBar 进度条动画

        //playlistOptions: {
        //    enableRemoveControls: true
        //}
        //smoothPlayBar: true
    };

    var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);




    //声音
    function soundBox(){
        //清除冒泡。
        $("#soundBox").on("click",function(e){
            e.stopPropagation();
        });
        //点击声音显示和隐藏
        $("#wp_mute").on("click",function(){
            var isHidden = $(this).find("#soundBox").is(":hidden");
            if(isHidden){
                $("#wp_mute").find("#soundBox").show();
            }else{
                $("#wp_mute").find("#soundBox").hide();
            }
        });
        //声音滚动
        $("#progreeBar").slider({
            animate: true, //代表在点击滑动条时滑动块的移动是否有动画效果；
            max:100,         //取值的最大和最小范围；
            min:0,
            range:false,      //是否显示范围区间，如果为false，则显示如下效果：
            orientation: 'auto', //水平还是垂直显示 'horizontal' 或 'vertical'.
            slide:function(event, ui) {
                //alert(ui.value);
                $("#jquery_jplayer").jPlayer("playHead",ui.value);  //改变MP3播放位置
             }
        });
            
        $('#progreeBar a').hover(function(){
             $(this).addClass("ui-slider-handle-hover");
        },function(){
             $(this).removeClass("ui-slider-handle-hover");
        });


        
    };
    //列表
    function musicList(){
        $(".menu").on("click",function(){
            var isHidden = $("#playList").is(":hidden");
            if(isHidden){
                $("#playList").show();
            }else{
                $("#playList").hide();
            }
        });
        $(".listNum span").on("click",function(){
            $("#playList").hide();
        });
        //播放列表数量
        $(".listNum p").text("播放列表("+(myPlaylist.playlist.length)+")");
        $("body").on("click",".jp-playlist-item-remove",function(){
            $(".listNum p").text("播放列表("+(myPlaylist.playlist.length-1)+")");
        });
    }



    //门面模式 音乐开始musicStart
    (function musicStart(){ 
        //声音
        soundBox();
        //列表
        musicList();
    })();


})