
var GameSelectLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();

        var size = cc.winSize;

        //设置背景图案
        var layerbg = new cc.Sprite("res/bg_main.jpg");
        layerbg.attr({
        	x: 0,
        	y: 0,
        	anchorX: 0,
        	anchorY: 0,
        	scale: 1
        });
        this.addChild(layerbg); 
        
        //设置中间显示文字
        
        
        
        //设置菜单

        var item0= new cc.MenuItemImage(
        		"res/button_time.png",
        		"res/button_time.png",
        		this.onClickStart,this
        );

        
        var item1 = new cc.MenuItemImage(
        		"res/button_count.png",
        		"res/button_count.png",
        		this.onClickStart2,this
        );
        
        var item2 = new cc.MenuItemImage(
        		"res/button_more.png",
        		"res/button_more.png",
        		this.onClickStart,this
        );
        
        var item3= new cc.MenuItemImage(
        		"res/button_rate.png",
        		"res/button_rate.png",
        		this.onClickStart,this
        );
        

        
        
        var menu = new cc.Menu(item0,item1,item2,item3);
        menu.x = size.width/2;	
        menu.y = size.height/6;	
        
        menu.alignItemsHorizontallyWithPadding(20); 
        this.addChild(menu,1);
        
  
        
        
        return true;
    },
    onClickStart:function() {
    	Sound.getInstance().play_snd_btn();
    	var scene = new cc.Scene();
    	scene.addChild(new GameScene(0));
    	cc.director.runScene(new cc.TransitionFade(1.2,scene));			
    },
    onClickStart2:function() {
    	Sound.getInstance().play_snd_btn();
    	var scene = new cc.Scene();
    	scene.addChild(new GameScene(1));
    	cc.director.runScene(new cc.TransitionFade(1.2,scene));			
    }
});

var GameSelectScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameSelectLayer();
        this.addChild(layer);
    }
});

