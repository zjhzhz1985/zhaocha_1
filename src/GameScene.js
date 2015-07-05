var GameLayer = cc.Layer.extend({
	_model:null,//模式
	_level:0,//关卡
	_pscore:0,//分数
	_showscore:0,//显示分数
	_score_item:null,//分数
	_ProgressBar:null,//进度条
	_kuang_left:null,//左框
	_kuang_right:null,//右框
	_pic_right:null,
	_pic_left:null,
	_rectangle:null,//画矩形框画布
	picId:0,//图片id
	_difRects:[],//找茬的错误区域  5个	
	_twopicDistance:null,//左右图片同一点的距离	
	_mode0Time:1200,//模式一 起始时间
	_timeLabel:null,//模式一  时间显示label
	_gamelasttime:null,//模式一 时间记录
	_PauseLayer:null,//暂停界面	
	_GameoverLayer:null,//结束界面	
	_difnum:0,//找茬数量 找足5个即此局过关
	 
	_levelLabelItem:null,//模式0显示关卡数
	_issoundinshedule:true,//单步控制
	initData:function() {
	//this.pscore=0;
	this._mode0Time=1200;
	this._difnum=0;
	
	},

	init:function (model) {
		this._super();
		//初始化模式  model＝0 时间模式（20分钟） model＝1 闯过模式 100秒
		this._model=model;
		
		var size=cc.winSize;

		//设置背景图案
		var layerbg = new cc.Sprite("res/bg_main2.jpg");
		layerbg.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0,
			scale: 1
		});
		this.addChild(layerbg); 
		
		// 屏幕顶部菜单栏
		//计时器
		var timeleftTitle = new cc.Sprite("res/text_timeleft.png");
		timeleftTitle.attr({
			x: this.width/4,
			y: this.height-33,
			anchorX: 0.5,
			anchorY: 0,
			scale: 1
		});
		this.addChild(timeleftTitle); 
		
	//根据两种模式设置ui
	if(this._model==1)
	{
		//进度条外框
		var jindukuang_Sprite = new cc.Sprite("res/bg_log.png");
		jindukuang_Sprite.attr({
		x: timeleftTitle.x,
		y: timeleftTitle.y-33,
		anchorX: 0.5,
		anchorY: 0.5,
		scale: 1
		});
		this.addChild(jindukuang_Sprite);
		
		//进度条
		//设置方块显示遮罩层
		var clippingPanel=new cc.ClippingNode();
		clippingPanel.x=5;
		clippingPanel.y=0;
		jindukuang_Sprite.addChild(clippingPanel, 1);

		this._ProgressBar = new cc.Sprite("res/log2.png");
		this._ProgressBar.attr({
		x: 0,
		y: 0,
		anchorX: 0,
		anchorY: 0
		});
		clippingPanel.addChild( this._ProgressBar);

		var clippingstencil=new cc.Sprite("res/log2.png");
		clippingstencil.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0
		});
		clippingPanel.setAlphaThreshold(0);
		clippingPanel.stencil=clippingstencil;
		
		
		
		//分数
		var scoreTitle = new cc.Sprite("res/text_score.png");
		scoreTitle.attr({
			x: this.width/2+scoreTitle.getBoundingBox().width/2+60,
			y: this.height-33,
			anchorX: 0.5,
			anchorY: 0,
			scale: 1
		});
		this.addChild(scoreTitle); 

		this._score_item = new cc.LabelAtlas("0","res/gamenumfont.png",32,33,"0");
		this._score_item .attr({
			x: scoreTitle.x,
			y: scoreTitle.y-33,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(this._score_item);
	
	}else {
		//时间段显示 20分钟 1200秒
		this._timeLabel= new cc.LabelTTF(""+this.formatSeconds(this._mode0Time), "Arial",30 );
		this._timeLabel.attr({
			x: timeleftTitle.x,
			y: timeleftTitle.y-33,
			anchorX: 0.5,
			anchorY: 0.5
		});    
		this.addChild(this._timeLabel);
		
		//添加关卡显示
		var passGameSprite = new cc.Sprite("res/bg_stage.png");
		passGameSprite.attr({
			x: size.width/2,
			y: timeleftTitle.y-33,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 0.4
		});
		this.addChild(passGameSprite);


		this._levelLabelItem = new cc.LabelAtlas(this._level,"res/stage_num.png",70,80,"0");
		this._levelLabelItem.attr({
			x: 393,
			y: 85,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		passGameSprite.addChild(this._levelLabelItem);
		
		
		
		
		

	}	
	
	//开启游戏计时	
	this.modestart();
		
			

		//道具
		var hintsTitle = new cc.Sprite("res/text_hint.png");
		hintsTitle.attr({
			x: this.width*3/4-20,
			y: this.height-33,
			anchorX: 0.5,
			anchorY: 0,
			scale: 1
		});
		this.addChild(hintsTitle); 
			
		var item0= new cc.MenuItemImage(
				"res/hint.png",
				"res/hint.png",
				this.onhint,this
		);
		item0.x=hintsTitle.x-item0.getBoundingBox().width*3/2;
		item0.y=hintsTitle.y-33;
		
		var item1= new cc.MenuItemImage(
				"res/hint.png",
				"res/hint.png",
				this.onhint,this
		);
		item1.x=hintsTitle.x;
		item1.y=hintsTitle.y-33;
			
		var item2= new cc.MenuItemImage(
				"res/hint.png",
				"res/hint.png",
				this.onhint,this
		);
		item2.x=hintsTitle.x+item2.getBoundingBox().width*3/2;
		item2.y=hintsTitle.y-33;
		
		//声音
		var soundTitle = new cc.Sprite("res/text_sound.png");
		soundTitle.attr({
			x: this.width*7/8-20,
			y: this.height-33,
			anchorX: 0.5,
			anchorY: 0,
			scale: 1
		});
		this.addChild(soundTitle); 
		
		var item_on= new cc.MenuItemImage(
				"res/sound.png",
				"res/sound.png");
		
		var item_off= new cc.MenuItemImage(
				"res/sound_off.png",
				"res/sound_off.png");
	
		var item3= new cc.MenuItemToggle(
				item_on,
				item_off,
				this.onSound,this
		);
		item3.x=soundTitle.x;
		item3.y=soundTitle.y-33;
		
		// 添加暂停按钮
		var pauseTitle = new cc.Sprite("res/text_pause.png");
		pauseTitle.attr({
			x: this.width-35,
			y: this.height-33,
			anchorX: 0.5,
			anchorY: 0,
			scale: 1
		});
		this.addChild(pauseTitle); 
			
		var item4= new cc.MenuItemImage(
				"res/pause.png",
				"res/pause.png",
				this.onClickPause,this
		);
		item4.x=pauseTitle.x;
		item4.y=pauseTitle.y-33;
				
		var menu = new cc.Menu(item0,item1,item2,item3,item4);
		menu.x = 0;	
		menu.y = 0;	
		this.addChild(menu,99);
		
		//放左右双图picId
		//框架
		this._kuang_left = new cc.Sprite("res/bg_image.png");
		this._kuang_left.attr({
			x: this.width/4,
			y: 20,
			anchorX: 0.5,
			anchorY: 0,
			scale: 1
		});
		this.addChild(this._kuang_left,10); 
			
		this._pic_left = new cc.Sprite("res/p"+this.picId+"_0.jpg");
		this._pic_left.attr({
			x: this._kuang_left.getBoundingBox().width/2,
			y: this._kuang_left.getBoundingBox().height/2,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this._kuang_left.addChild(this._pic_left); 
	
		this._kuang_right = new cc.Sprite("res/bg_image.png");
		this._kuang_right.attr({
			x: this.width*3/4,
			y: 20,
			anchorX: 0.5,
			anchorY: 0,
			scale: 1
		});
		this.addChild(	this._kuang_right); 
		
		this._pic_right = new cc.Sprite("res/p"+this.picId+"_1.jpg");
		this._pic_right.attr({
			x: this._kuang_right.getBoundingBox().width/2,
			y: this._kuang_right.getBoundingBox().height/2,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this._kuang_right.addChild(this._pic_right); 
	
		//准备画布 点击正确后画出找茬框
		this._rectangle = new cc.DrawNode();
		this._rectangle.tag=100;
		this._rectangle.x = 0;
		this._rectangle.y =0;
		
		this._pic_left.addChild(this._rectangle); 
		
		//因为左右两边要同时画出 计算两边同一点x方向距离
		this._twopicDistance=this._kuang_right.x-this._kuang_left.x;
				
		//找茬5个不一样的区域
		this._difRects[0]=cc.rect(388, this._pic_right.height-35-150, 112, 150);
		this._difRects[1]=cc.rect(199, this._pic_right.height-142-90, 73, 90);
		this._difRects[2]=cc.rect(126, this._pic_right.height-241-68, 75, 68);
		this._difRects[3]=cc.rect(30, this._pic_right.height-355-19, 41, 19);
		this._difRects[4]=cc.rect(282, this._pic_right.height-353-88, 111, 88);
			
		//点击
		// 添加点击监听
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			onTouchesBegan: this.onTouchBegan.bind(this)
			//onTouchesMoved: this.onToucheMoved.bind(this)
			//onTouchesEnded: this.onTouchEnded.bind(this)
		}, this); 
			
	},
	changeImages:function(id){
	
			
		
	},

	onTouchBegan:function(touches, event){
		var touch = touches[0];
		var location = touch.getLocation();
		var size=cc.winSize;
		
		
		if(location.x>size.width/2)
			{
			location.x-=this._twopicDistance;	
			}
		location1 = this._pic_left.convertToNodeSpace(location); 
		
		location2 = this._kuang_left.convertToNodeSpace(location);
		location3 = this._kuang_right.convertToNodeSpace(cc.p(location.x+this._twopicDistance,location.y)); 
		
		var _difRects=this._difRects;
		
		for(var i=0;i<5;i++)
		{
			
			if(_difRects[i]!=null&&cc.rectContainsPoint(_difRects[i],location1))	
			{
				Sound.getInstance().play_snd_right();
				var origin=cc.p(_difRects[i].x,_difRects[i].y);
				
				var destination=cc.p(_difRects[i].x+_difRects[i].width,_difRects[i].y+_difRects[i].height);
				
				var origin2=cc.p(_difRects[i].x+this._twopicDistance,_difRects[i].y);

				var destination2=cc.p(_difRects[i].x+_difRects[i].width+this._twopicDistance,_difRects[i].y+_difRects[i].height);

				this._rectangle.drawRect(origin,destination, null,2, cc.color(78,255, 0, 255) );	
				this._rectangle.drawRect(origin2,destination2, null,2, cc.color(78,255, 0, 255) );	
				_difRects[i]=null;
				
				this._difnum++;
				
				this.addScore(0);
				
				if(this._difnum==5)
				{
				//过关
				Sound.getInstance().play_snd_win();
					this.addScore(1);
					this.gamePass();
		
				}
				return false;	
			}
			
		}
		
		if(cc.rectContainsPoint(this._pic_left.getBoundingBox(),location2)||cc.rectContainsPoint(this._pic_right.getBoundingBox(),location3))
		{
			Sound.getInstance().play_snd_wrong();
			//消耗时间
			if(this._model==1)
			this.setPercent(this.getPercent()-0.1);
			else
			{
				if(this._mode0Time>=20)
				this._mode0Time-=20;
				else
				this._mode0Time=0;	
			}
			
		}
		return false;
	},
	//暂停
	onClickPause:function() {
		Sound.getInstance().play_snd_btn();
		//暂停计时
		this.modepause();
		//显示暂停界面
		if(this._PauseLayer)
		{
			if(!this._PauseLayer.Visible)
			{
				this._PauseLayer.y=0;
				this._PauseLayer.setVisible(true);
				// 暂停页面按钮功能
				cc.eventManager.pauseTarget(this, true);
				// 开启设置层按钮功能
				cc.eventManager.resumeTarget(this._PauseLayer,true);
			}
		}
		else
		{
			// 暂停页面已存按钮功能
			cc.eventManager.pauseTarget(this, true);

			this._PauseLayer=new PauseLayer();
			this.addChild(this._PauseLayer,101);
		}
	},
	restartgame:function() {
		//Sound.getInstance().playBtn();
		
		//this.resetWithGuanka(this.guankaNum);
		//cc.director.runScene(new GameScene(this.guankaNum, this.isRand));
		
		//cc.director.runScene(new GameScene(this.guankaNum, this));

	},
	//道具实现
	onhint:function(sender) {	
		
		if(this._difnum==5)
		return;
		
		sender.setVisible(false);
		//找到一个茬
		this.showSurplusDif();
		
		if(this._difnum==5)
		{
			//跳转胜利界面	
			Sound.getInstance().play_snd_win();
			this.addScore(1);
			this.gamePass();
		}
	
	},
	//设置进度条百分比 num% 
	setPercent:function(num) {
		
		this._ProgressBar.x=-this._ProgressBar.getBoundingBox().width*(1-num);
		
	},
	//设置进度条百分比 返回 num％
	getPercent:function() {
		var percent=(this._ProgressBar.getBoundingBox().width+this._ProgressBar.x)/this._ProgressBar.getBoundingBox().width;
		return percent;
	},
	//模式1进度条
	runPercent:function() {
		
		this._ProgressBar.x-=this._ProgressBar.getBoundingBox().width/6000;
		
		if(this._issoundinshedule&&this.getPercent()<=0.1){
			Sound.getInstance().play_snd_timesup();
			this._issoundinshedule=false;
		}
		
		if(this._ProgressBar.x<=-this._ProgressBar.getBoundingBox().width)
		{
			this.unschedule(this.runPercent);  
			//显示未找到的茬 //显示所有
			var actions=[];
			var pdifnum=5-this._difnum;
			while(pdifnum>=0)
			{
			var action0=cc.delayTime(0.8);
			actions.push(action0);
			var action1=cc.callFunc(this.showSurplusDif, this);
			actions.push(action1);
			pdifnum--;
			}
			var actiondelay=cc.delayTime(0.5);
			var actionover=cc.callFunc(this.gameOver, this);
			actions.push(actiondelay);
			actions.push(actionover);
			
			this.runAction(cc.sequence(actions));
			
		}
		
	},
	//计时启动
	modestart:function() {
		if(this._model==1)
		{
			this.setPercent(1);
			this.schedule(this.runPercent); 
		}
		
		else
		{
			this._gamelasttime=Date.now();
			this.schedule(this.runTime);
		}
	
	},
	//计时暂停
	modepause:function() {
		cc.director.getScheduler().pauseTarget(this);
	},
	//计时继续
	moderesume:function() {
		this._gamelasttime=Date.now();
		cc.director.getScheduler().resumeTarget(this);
	},
	//计时停止
	modestop:function() {

		if(this._model==1)
		{
			this.unschedule(this.runPercent); 
		}

		else
		{
			this.unschedule(this.runTime);
		}

	},
	//显示剩余不同
	showSurplusDif:function() {
		if(this._difnum==5)
			return;
		
		var _difRects=this._difRects;
		for(var i=0;i<5;i++)
		{
			if(_difRects[i]!=null)	
			{
				Sound.getInstance().play_snd_right();
				var origin=cc.p(_difRects[i].x,_difRects[i].y);

				var destination=cc.p(_difRects[i].x+_difRects[i].width,_difRects[i].y+_difRects[i].height);

				var origin2=cc.p(_difRects[i].x+this._twopicDistance,_difRects[i].y);

				var destination2=cc.p(_difRects[i].x+_difRects[i].width+this._twopicDistance,_difRects[i].y+_difRects[i].height);

				this._rectangle.drawRect(origin,destination, null,2, cc.color(255,0, 0, 255) );	
				this._rectangle.drawRect(origin2,destination2, null,2, cc.color(255,0, 0, 255) );	
				_difRects[i]=null;
				this._difnum++;
				break;
			}	
		}	
	
	},
	//模式0待启动
	runTime:function() {
		
		if(this._mode0Time<=0)
			{
				this.unschedule(this.runTime); 
				//gameover
				var actions=[];
				var pdifnum=5-this._difnum;
				while(pdifnum>=0)
				{
					var action0=cc.delayTime(0.8);
					actions.push(action0);
					var action1=cc.callFunc(this.showSurplusDif, this);
					actions.push(action1);
					pdifnum--;
				}
				var actiondelay=cc.delayTime(0.5);
				var actionover=cc.callFunc(this.gameOver, this);
				actions.push(actiondelay);
				actions.push(actionover);
	
				this.runAction(cc.sequence(actions));	
			}
		
		var now = Date.now();
		this._mode0Time-=(now-this._gamelasttime)/1000;
		if(this._mode0Time<0)
		this._mode0Time=0;
		
		this._gamelasttime=now;
			if(this._issoundinshedule&&this._mode0Time<=30)
			{
				Sound.getInstance().play_snd_timesup();
				this._issoundinshedule=false;
			}
		this._timeLabel.setString(""+this.formatSeconds(this._mode0Time));	
		
	},
	//过关成功结束显示
	passGameOverShow:function() {
	//看分数给图案
		Sound.getInstance().play_snd_praisement();
		var size=cc.winSize;
		var passGameSprite = new cc.Sprite("res/a.png");
		passGameSprite.attr({
			x: size.width/2,
			y: size.height,
			anchorX: 0.5,
			anchorY: 0,
			scale: 1
		});
		this.addChild(passGameSprite,20);
		
		
		var action0=cc.moveBy(1.0, 0, -500);
		//var move_ease_in = action0.easing(cc.easeBounceIn());
		var move_ease_out = action0.easing(cc.easeBounceOut());
		var delay = cc.delayTime(0.5);
		var action2=cc.RemoveSelf();
		var seq2 = cc.sequence(move_ease_out,delay,action2);
		
		passGameSprite.runAction(seq2);
	
	},
	//过关成功下一关开始显示
	passGameStartShow:function() {
		//判断第几关
		Sound.getInstance().play_snd_stage();
		var size=cc.winSize;
		

			var passGameSprite = new cc.Sprite("res/bg_stage.png");
			passGameSprite.attr({
				x: size.width/2,
				y: 0,
				anchorX: 0.5,
				anchorY: 1,
				scale: 1
			});
			this.addChild(passGameSprite,20);
	
			
			var levelItem = new cc.LabelAtlas(this._level,"res/stage_num.png",70,80,"0");
			levelItem.attr({
				x: 393,
				y: 85,
				anchorX: 0.5,
				anchorY: 0.5,
				scale: 1
			});
			passGameSprite.addChild(levelItem);
			var action0=cc.moveBy(1.0, 0, 450);
			
			var move_ease_in = action0.easing(cc.easeOut(3.0));
			
			//var move_ease_in = action0.easing(cc.easeBounceIn());
			//var move_ease_out = action0.easing(cc.easeBounceOut());
			var delay = cc.delayTime(10.5);
			
			var func1=cc.callFunc(function(){
				this.modestart();
	
			}, this);	
			
			var action2=cc.RemoveSelf();
			var seq2 = cc.sequence(move_ease_in,delay,func1,action2);
			passGameSprite.runAction(seq2);	
		
	
		//动作完成后加载下一关
		
	},
	gamePass:function() {

		this.modestop();
		//评价系统
		
		//var percent=this.getPercent();
//		if(percent>0.7)
//		{
//		//a+
//		}else{

//		}

		var delay0 = cc.delayTime(0.5);
		var func0=cc.callFunc(function(){
			
			this.passGameOverShow();	
		}, this);					
		var delay1 = cc.delayTime(2.0);
		
		var func1=cc.callFunc(function(){
			this.nextGame();

		}, this);	

		var seq2 = cc.sequence(delay0,func0,delay1,func1);
		
		this.runAction(seq2);	
		
		
	},

	//游戏失败结束
	gameOver:function() {	
		Sound.getInstance().play_snd_gameover();
		
		if(this._GameoverLayer)
		{
			if(!this._GameoverLayer.Visible)
			{
				this._GameoverLayer.y=0;
				this._GameoverLayer.setVisible(true);
				// 暂停页面按钮功能
				cc.eventManager.pauseTarget(this, true);
				// 开启设置层按钮功能
				cc.eventManager.resumeTarget(this._GameoverLayer,true);
			}
		}
		else
		{
			// 暂停页面已存按钮功能
			cc.eventManager.pauseTarget(this, true);

			this._GameoverLayer=new GameoverLayer(10);
		
			this.addChild(this._GameoverLayer,101);

		}	
	},
	nextGame:function() {
		//画布清理
		this._rectangle.clear();
		
		//图片更改
		this._difRects[0]=cc.rect(388, this._pic_right.height-35-150, 112, 150);
		this._difRects[1]=cc.rect(199, this._pic_right.height-142-90, 73, 90);
		this._difRects[2]=cc.rect(126, this._pic_right.height-241-68, 75, 68);
		this._difRects[3]=cc.rect(30, this._pic_right.height-355-19, 41, 19);
		this._difRects[4]=cc.rect(282, this._pic_right.height-353-88, 111, 88);
		

		this._difnum=0;
		//下一关
		this._level++;
		this._issoundinshedule=true;
		if(this._model==1)
		{	
		this.setPercent(1);
			
		this.passGameStartShow();	
			
		}else{
			//下一关更新标题
			
			this._levelLabelItem.setString(""+this._level);
			
			//继续计时
			this.modestart();
			
		}
		
		
		
		
		
		
		
		
		
	},
	//增加分数
	addScore:function(type) {
		//模式0不需要分数
		if(this._model==0)
		return;
		
		switch (type)
		{
		case 0:
			//点击选出茬 增加分数  基础分100 关卡增加系数10*level
			
			this._pscore+=100+10*this._level;
			if(this._pscore-this._showscore==100+10*this._level)
				this.schedule(this.addScoreUpdate); 
			
			break;
		case 1:
			//结束后根据时间计算所得分数 满时间1000分   ／／播放时间轴缩减动作
			var percent=this.getPercent();
			var addscore=Math.round(1000*percent);
			this._pscore+=addscore;
			
			var duration=(this._ProgressBar.getBoundingBox().width+this._ProgressBar.x)/this._ProgressBar.getBoundingBox().width*2;
			
			var action0=cc.moveTo(duration, -this._ProgressBar.getBoundingBox().width, this._ProgressBar.y);
			
			this._ProgressBar.runAction(action0);
			
			if(this._pscore-this._showscore==addscore)
				this.schedule(this.addScoreUpdate); 
			
			break;
		
		
		}
		
		
		
	},
	//分数增加更新update
	addScoreUpdate:function() {
		var willadd=this._pscore-this._showscore;
		
		if(willadd>50)
		{
			this._showscore+=11;
	
		}else if(willadd>0)
		{
			this._showscore++;
		}else
		{
			//停止增加
			this.unschedule(this.addScoreUpdate); 
		}
	this._score_item.setString(this._showscore);
	
	if(this._showscore==this._pscore)
	this.unschedule(this.addScoreUpdate); 
	
	},
	onSound:function() {
		Sound.getInstance().effectOnOff();
		Sound.getInstance().play_snd_btn();
	},
	//转化时间格式
	formatSeconds:function(value) {
		
			//var theTime = parseInt(value);// 秒
			//var theTime3=parseInt((value-theTime)*10);
		    var theTime=value;
			var theTime1 = 0;// 分
			var theTime2 = 0;// 小时
			if(value > 60) {
				theTime1 = parseInt(value/60);
				theTime = value%60;
				if(theTime1 > 60) {
					theTime2 = parseInt(theTime1/60);
					theTime1 = parseInt(theTime1%60);
				}
			}
			theTime=theTime.toFixed(1);
			//var thenum0=theTime.toFixed(1);;
			if(theTime<10)
				theTime="0"+theTime;
			var result = ""+theTime;
			
			if(theTime1 >=0) {
				var thenum=parseInt(theTime1);
				if(thenum<10)
				thenum="0"+thenum;
				
				result = ""+thenum+":"+result;
			}
			if(theTime2 > 0) {
				var thenum=parseInt(theTime2);
				if(thenum<10)
				thenum="0"+thenum;
				result = ""+thenum+":"+result;
			}
			return result;		
	}
})

var GameScene = cc.Scene.extend({
	model:0,
	ctor:function (model) {
		this._super();
		this.model = model;
	},
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		layer.init(this.model);
		this.addChild(layer);
	}
});
