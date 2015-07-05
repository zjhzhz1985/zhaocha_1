var Sound = cc.Class.extend({
		//_Silence1:1,
		_Silence2:0,
		_spin:0,
		_remove:0,
		_close:0,
		ctor:function () {
//				var Silence1=LocalStorage.getInstance().getItem("IS_PLAY_MUSIC");
//			    if(Silence1==0)
//				{
//				this._Silence1=0;
//				}	    
	
			    var Silence2=LocalStorage.getInstance().getItem("IS_PLAY_EFFECT");
			    if(Silence2==1)
			    {
			    this._Silence2=1;
			    }	
			    
			   // cc.log(Silence1);
			    //cc.log(Silence2);
			    
			    
	    },
//		playBg:function(){
//			//cc.sys.os!=cc.sys.OS_ANDROID
//			if(!this._Silence1)
//				cc.audioEngine.playMusic(res.bg_mp3, true);
//		},

//		playSpin:function(){
//			if(!Sound._Silence2){
//				if(Sound._spin){
//					cc.audioEngine.stopEffect(Sound._spin);
//
//				}
//				Sound._spin = cc.audioEngine.playEffect(res.spin_mp3, false);
//			}
//		},
//		playClose:function(){
//			if(!Sound._Silence2){
//				if(Sound._close){
//					cc.audioEngine.stopEffect(Sound._close);
//
//				}
//				Sound._close = cc.audioEngine.playEffect(res.close_mp3, false);
//			}
//		},
//		playRemove:function(){
//			if(!Sound._Silence2){
//				if(Sound._remove){
//					cc.audioEngine.stopEffect(Sound._remove);
//
//				}
//				Sound._remove = cc.audioEngine.playEffect(res.remove_mp3, false);
//			}
//		},
//		playLvup:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.lvup_mp3, false);
//			}
//		},
	    play_snd_btn:function(){
	
			if(!this._Silence2){
				cc.audioEngine.playEffect("res/sound/snd_btn.mp3", false);
			}
		},
		play_snd_gamefinish:function(){

			if(!this._Silence2){
				cc.audioEngine.playEffect("res/sound/snd_gamefinish.mp3", false);
			}
		},
		play_snd_gameover:function(){

			if(!this._Silence2){
				cc.audioEngine.playEffect("res/sound/snd_gameover.mp3", false);
			}
		},
		play_snd_praisement:function(){

			if(!this._Silence2){
				cc.audioEngine.playEffect("res/sound/snd_praisement.mp3", false);
			}
		},
		
		play_snd_right:function(){

			if(!this._Silence2){
				cc.audioEngine.playEffect("res/sound/snd_right.mp3", false);
			}
		},
		play_snd_stage:function(){

			if(!this._Silence2){
				cc.audioEngine.playEffect("res/sound/snd_stage.mp3", false);
			}
		},
		play_snd_timebarload:function(){

			if(!this._Silence2){
				cc.audioEngine.playEffect("res/sound/snd_timebarload.mp3", false);
			}
		},
		play_snd_timesup:function(){

			if(!this._Silence2){
				cc.audioEngine.playEffect("res/sound/snd_timesup.mp3", false);
			}
		},
		play_snd_win:function(){

			if(!this._Silence2){
				cc.audioEngine.playEffect("res/sound/snd_win.mp3", false);
			}
		},
		play_snd_wrong:function(){

			if(!this._Silence2){
				cc.audioEngine.playEffect("res/sound/snd_wrong.mp3", false);
			}
		},
		
		
		
		
//		playGold:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.gold_mp3, false);
//			}
//		},
//		playReborn:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.reborn_mp3, false);
//			}
//		},
//		playWrong:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.wrong_mp3, false);
//			}
//		},
//		playDangrous:function(){
//			if(!Sound._Silence2){
//				cc.audioEngine.playEffect(res.dangrous_mp3, false);
//			}
//		},
//		stopDangrous:function(){
//			//cc.audioEngine.stopEffect(this._dangrous);
//		},
		
		effectOnOff:function(){
			if(this._Silence2){
				this._Silence2 = 0;
				LocalStorage.getInstance().setItem("IS_PLAY_EFFECT", 0);
				//cc.audioEngine.setEffectsVolume(1);
			}
			else{
				this._Silence2 = 1;
				LocalStorage.getInstance().setItem("IS_PLAY_EFFECT", 1);
				//cc.audioEngine.stopAllEffects(true);
				//cc.audioEngine.setEffectsVolume(0);
			}
		}
});

Sound.getInstance = function () {
	if (Sound.sharedInstance == null) {
		Sound.sharedInstance = new Sound();
	}
	return Sound.sharedInstance;
};