//プレイヤークラス
var PlayerLayer = cc.Layer.extend({
    playerAnimationLeft:null,
    playerAnimationRight:null,
    playerAnimationUp:null,
    playerAnimationDown:null,
    player:null,
    xmovement:0,
    ymovement:0,

    ctor:function(){
        this._super();
        this.init();
    },

    init: function(){
        this._super();
        var size = cc.director.getWinSize();

        var playerFrame = new Array();
        for(var i = 0; i < 4; i++){
           for(var j = 0; j < 6; j++){
                var frame = cc.SpriteFrame.create(res.Player_png,cc.rect(j*20,i*28,20,28));
                    playerFrame.push(frame);
            }
        }

        //左向きのアニメーション
        this.playerAnimationLeft = this.setSpriteToAnimation(playerFrame,"6,8");

          //右向きのアニメーション
        this.playerAnimationRight = this.setSpriteToAnimation(playerFrame,"12,14");

        //上向きのアニメーション
        this.playerAnimationUp = this.setSpriteToAnimation(playerFrame,"18,20");

        //下向きのアニメーション
        this.playerAnimationDown = this.setSpriteToAnimation(playerFrame,"0,2");

        //初回の位置を設定
        this.player = new cc.Sprite.create(res.Player_png,cc.rect(1*20,0*28,20,28));
        this.player.setPosition(cc.p(size.width/2,size.height/2));
        this.player.setScale(2.0);
        this.addChild(this.player,4);
    },
    setSpriteToAnimation:function(playerFrame,number){
        var animation = new cc.Animation();
        var splitNum = number.split(",");

        if(splitNum.length != null){
            for(var i = 0; i < splitNum.length; i++){
                animation.addSpriteFrame(playerFrame[Number(splitNum[i])]);
            }
        }
        animation.setDelayPerUnit(0.3);
        animation.setLoops(true);
        return animation;
    },
    //Animationとプレイヤーの移動値を設定する。
    setPlayerAnimation:function(direction){
        var pAnimation = null;
        switch(direction){
            case "left":
                pAnimation = this.playerAnimationLeft;
                break;
            case "right":
                pAnimation = this.playerAnimationRight;
                break;
            case "up":
                pAnimation = this.playerAnimationUp;
                break;
            case "down":
                pAnimation = this.playerAnimationDown;
                break;
            case "same":
                return 0;
        }
        this.player.stopAllActions();
        var playerAction = new cc.RepeatForever(new cc.Animate(pAnimation));
        this.player.runAction(playerAction);
    },
    setPosition:function(){

    },
    isRange:function(){

    },
    stopPlayerAnimation:function(){
        this.player.stopAllActions();
    }
});