//设置层
var PauseLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		//this.retain();
		this.init();
	},
	init:function () {
		//var _this=this;
		var size = cc.winSize;

		//半透明遮罩背景
		var bgLayer = new cc.LayerColor(cc.color(0,0,0,200), size.width, size.height);
		this.addChild(bgLayer, 1);
 

		var pause_Bg1 = new cc.Sprite("res/pause_Bg.png");
		pause_Bg1.attr({
			x: this.width/4,
			y: 20,
			anchorX: 0.5,
			anchorY: 0,
			scale: 1
		});
		this.addChild(pause_Bg1,2); 

		var pause_Bg2 = new cc.Sprite("res/pause_Bg.png");
		pause_Bg2.attr({
			x: this.width*3/4,
			y: 20,
			anchorX: 0.5,
			anchorY: 0,
			scale: 1
		});
		this.addChild(pause_Bg2,2); 
		
		
		var pause_Bg3 = new cc.Sprite("res/pause_b.png");
		pause_Bg3.attr({
			x: this.width/2,
			y: size.height/2,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(pause_Bg3,3); 
		
		
		
		
		//添加继续游戏按钮
		var item1 = new cc.MenuItemImage(
				"res/button_menu.png",
				"res/button_menu.png",
				this.backtomap,this
		);
		
		
		var item2 = new cc.MenuItemImage(
				"res/button_continue.png",
				"res/button_continue.png",
				this.oncontinue,this
		);
		
		
		
		var menu = new cc.Menu(item1,item2);
		menu.x = size.width/2;	
		menu.y = pause_Bg3.y-pause_Bg3.getBoundingBox().height/2-40;	
		menu.alignItemsHorizontallyWithPadding(size.width/4); 
		this.addChild(menu,100);
//		
//		
//
//
//		//添加返回地图按钮
//		var aboutitem1 = new cc.MenuItemImage(
//				"#backtomap_btn.png",
//				"#backtomap_btn2.png",
//				this.backtomap,this
//		);
//
//		aboutitem1.x=bgLayer2.getBoundingBox().width/2;	
//		aboutitem1.y=bgLayer2.getBoundingBox().height/7;
//
//		var aboutmenu = new cc.Menu(aboutitem1);
//		aboutmenu.x = 0;	
//		aboutmenu.y = 0;	
//		bgLayer2.addChild(aboutmenu,2);





	},

	backtomap:function () {
		Sound.getInstance().play_snd_btn();
		cc.director.runScene(new GameSelectScene());
	},

	oncontinue:function () {
		Sound.getInstance().play_snd_btn();
		this.setVisible(false);
		this.y=-2000;
		cc.eventManager.resumeTarget(this.getParent(),true);
		
		this.getParent().moderesume();
	}








});
