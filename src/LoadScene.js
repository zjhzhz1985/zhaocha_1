
var LoadLayer = cc.Layer.extend({

	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();

		/////////////////////////////
		// 2. add a menu item with "X" image, which is clicked to quit the program
		//    you may modify it.
		// ask the window size
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
		
		
		//设置loading图案
		var loading_sprite = new cc.Sprite("res/loading.png");
		loading_sprite.attr({
			x: size.width/2,
			y: size.height/4,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(loading_sprite); 
		

	   //可以在这个场景进行广告植入	
		
		
		var action0=cc.delayTime(1.0);
		var action1=cc.callFunc(this.gameStart, this);
		this.runAction(cc.sequence(action0,action1));
		

		
		
		return true;
	},
	gameStart:function(){
		var scene = new cc.Scene();
		scene.addChild(new GameSelectScene());
		cc.director.runScene(new cc.TransitionFade(1.2,scene));		
	}
});

var LoadScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new LoadLayer();
		this.addChild(layer);
	}
});

