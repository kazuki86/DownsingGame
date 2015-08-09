var playerAnimationLeft = new cc.Animation();;
var playerAnimationRight = new cc.Animation();;
var playerAnimationUp = new cc.Animation();;
var playerAnimationDown = new cc.Animation();;
var playerAnimationUpperLeft = new cc.Animation();
var playerAnimationLowerLeft = new cc.Animation();
var playerAnimationUpperRight = new cc.Animation();
var playerAnimationLowerRight = new cc.Animation();

var oldDirection = null;

var playerAnimation = null;
var playerAction = null;

var player = null;

var tileMap = null;

var xmapPosition = 0;
var ymapPosition = 0;
var xmovement = 0;
var ymovement = 0;

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    controllAreaSize:100, //コントローラーのサイズ
    controllXminSize:5, //コントローラーの表示位置 x軸の最小
    controllYminSize:5, //コントローラーの表示位置 y軸の最小
    controllXMaxSize:100 + 5, //コントローラーの表示位置 x軸の最大
    controllYMaxSize:100 + 5,　//コントローラーの表示位置 y軸の最大
    controllCentrall:100 / 2 + 5,

    ctor:function () {
        this._super();

        var size = cc.winSize;

        tiledMap = new cc.TMXTiledMap.create(res.Map_tmx);
        tiledMap.setPosition(cc.p(0,0));
        cc.log("width " + tiledMap.getTileSize().width + "height " + tiledMap.getTileSize().height);
        this.addChild(tiledMap,0);

        var controllerButton = cc.Sprite.create(res.ControllerButton_png);
            controllerButton.setPosition(cc.p(55,55));
            controllerButton.setScale(0.4);
            this.addChild(controllerButton,4);

        var spriteFrame = new cc.Animation();
        var playerFrame = new Array();
        for(var i = 0; i < 4; i++){
           for(var j = 0; j < 6; j++){
                var frame = cc.SpriteFrame.create(res.Player_png,cc.rect(j*20,i*28,20,28));
               // var spriteFrame = new cc.AnimationFrame();
                    //spriteFrame.initWithSpriteFrame(frame,1,null);
                    playerFrame.push(frame);
                   // spriteFrame.addSpriteFrame(frame);
            }
        }

        //左向きのアニメーション
        playerAnimationLeft.addSpriteFrame(playerFrame[6]);
     //   playerAnimationLeft.addSpriteFrame(playerFrame[7]);
        playerAnimationLeft.addSpriteFrame(playerFrame[8]);
        playerAnimationLeft.setDelayPerUnit(0.3);
        playerAnimationLeft.setLoops(true);

        //右向きのアニメーション
        playerAnimationRight.addSpriteFrame(playerFrame[12]);
      //  playerAnimationRight.addSpriteFrame(playerFrame[13]);
        playerAnimationRight.addSpriteFrame(playerFrame[14]);
        playerAnimationRight.setDelayPerUnit(0.3);
        playerAnimationRight.setLoops(true);

        //上向きのアニメーション
        playerAnimationUp.addSpriteFrame(playerFrame[18]);
    //    playerAnimationUp.addSpriteFrame(playerFrame[19]);
        playerAnimationUp.addSpriteFrame(playerFrame[20]);
        playerAnimationUp.setDelayPerUnit(0.3);
        playerAnimationUp.setLoops(true);

        //下向きのアニメーション
        playerAnimationDown.addSpriteFrame(playerFrame[0]);
    //    playerAnimationDown.addSpriteFrame(playerFrame[1]);
        playerAnimationDown.addSpriteFrame(playerFrame[2]);
        playerAnimationDown.setDelayPerUnit(0.3);
        playerAnimationDown.setLoops(true);

        player = new cc.Sprite.create(res.Player_png,cc.rect(1*20,0*28,20,28));
        player.setPosition(cc.p(size.width/2,size.height/2));
        player.setScale(2.0);
        this.addChild(player,4);

        this.scheduleUpdate();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function (touches, event) {
                var touch = touches[0];
                    this.playerControll(touch,"start");
            },
            onTouchesMoved: function(touches, event){
                var touch = touches[0];
                    this.playerControll(touch,"move");
            },
            onTouchesEnded: function(touches,event){
                var touch = touches[0];
                    this.playerControll(touch,"end");
                    xmovement = 0;
                    ymovement = 0;
            },

            playerControll:function(touche,type){
                var location = touche.getLocation();
                var distance = Math.sqrt(Math.pow(Math.abs(location.x - 55),2) +
                                         Math.pow(Math.abs(location.y - 55),2));
               // cc.log("touche !! " + "x : " + location.x + " y : " + location.y);
                var rad = Math.atan2((location.y - 55),(location.x - 55));
                cc.log("rad " + rad);
                var theta = rad * (180 / Math.PI);
                //cc.log("radian!!" + rad + "test set" + test);
                cc.log("distance " + distance);

                if(theta < 0){
                    theta = 360 + theta;
                }

                if(distance < 50){
                    controllerButton.setPosition(cc.p(location.x,location.y));
                }else{//範囲外で操作した場合
                    var posy = 50 * Math.sin(rad);
                    var posx = 50 * Math.cos(rad);
                    controllerButton.setPosition(cc.p(posx + 55,posy + 55));
                }

                if(type == "end"){
                    controllerButton.setPosition(cc.p(55,55));
                    player.stopAllActions();
                    return false;
                }


                if(theta < 360 && theta >= 315 || theta < 45 && theta > 0){//右
                    cc.log("right");
                    xmovement = -1;
                    ymovement = 0;
                    if(this.isSameDirection("right")){
                        this.oldDirection = "right";
                        return false;
                    }else{
                        this.oldDirection = "right";
                        playerAnimation = playerAnimationRight;
                    }
                }else if(theta < 135 && theta >= 45){//上
                    cc.log("up");
                    xmovement = 0;
                    ymovement = - 1;
                    if(this.isSameDirection("up")){
                        return false;
                    }else{
                        this.oldDirection = "up";
                        playerAnimation = playerAnimationUp;
                    }
                }else if(theta < 225 && theta >= 135){//左
                    cc.log("left");
                    xmovement = 1;
                    ymovement = 0;
                     if(this.isSameDirection("left")){
                        return false;
                    }else{
                        this.oldDirection = "left";
                        playerAnimation = playerAnimationLeft;
                    }

                }else if(theta < 315 && theta >= 225 ){//下
                    xmovement = 0;
                    ymovement = 1;
                    tiledMap.setPosition(cc.p(xmapPosition,ymapPosition));
                     cc.log("down");
                    if(this.isSameDirection("down")){
                         this.oldDirection = "down";
                        return false;
                    }else{
                        this.oldDirection = "down";
                        playerAnimation = playerAnimationDown;
                    }

                }else{
                    //計算上起こり得ない
                }

                // if(){
                //    playerAnimationDown.setDelayPerUnit(0.1);
                // }

                player.stopAllActions();
                playerAction = new cc.RepeatForever(new cc.Animate(playerAnimation));
                player.runAction(playerAction);

                cc.log("theta " + theta);

            },
            isSameDirection:function(direction){
                if(this.oldDirection == direction){
                    return true;
                }else{
                    return false;
                }
            }
        }, this);
        return true;
    },
    update:function(){
        xmapPosition += xmovement;
        ymapPosition += ymovement;
        tiledMap.setPosition(cc.p(xmapPosition,ymapPosition));
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

