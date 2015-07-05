var GameoverLayer = cc.Layer.extend({
	score:false,
	
	ctor:function(score){
		this._super();
		//this.retain()
		this.score = score;
		this.init();
	},
	init:function () {
		var size = cc.winSize;

		var layerbg=new cc.LayerColor(cc.color(0,0,0,100),size.width,size.height);   
		this.addChild(layerbg, 0);
		
		var bg_gameover = new cc.Sprite("res/bg_gameover.png");
		bg_gameover.attr({
			x: size.width/2,
			y: size.height*2/3,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(bg_gameover);  
		
		//分数显示
		
		
		var continueItem = new cc.MenuItemImage(
				"res/button_AGAIN.png",
				"res/button_AGAIN.png",
				this.onContinue,this
		);
		var backItem = new cc.MenuItemImage(
				"res/button_menu.png",
				"res/button_menu.png",
				this.onBackToMain,this
		);

		var menu = new cc.Menu(continueItem, backItem);
		menu.alignItemsHorizontallyWithPadding(size.width/5);
		menu.x = size.width/2;	
		menu.y = size.height/4;	
		this.addChild(menu,1);
	},
	onContinue:function() {
		Sound.getInstance().play_snd_btn();
		cc.director.runScene(new GameScene(this.getParent()._model));	
		
		
	},
	onBackToMain:function() {
		Sound.getInstance().play_snd_btn();
		cc.director.runScene(new GameSelectScene());
		
	}
});
