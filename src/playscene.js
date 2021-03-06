//var gameLayer = null;
var PlayScene = cc.Scene.extend({
    gameLayer:null,
    player:null,
    controller:null,
    map:null,

    ctor:function(){
        this._super();
    },
    onEnter:function () {
        this._super();

        this.gameLayer = new cc.Layer();
        this.gameLayer.addChild(new ControllerLayer(), 1,PlayScene.TAG_CONTROLLER);
        this.gameLayer.addChild(new PlayerLayer(), 1, PlayScene.TAG_PLAYER);
        this.gameLayer.addChild(new MapLayer(res.Map_tmx), 0, PlayScene.TAG_MAP);
        this.addChild(this.gameLayer);

        var _self = this;
        _self.player = _self.gameLayer.getChildByTag(PlayScene.TAG_PLAYER);
        _self.controller = _self.gameLayer.getChildByTag(PlayScene.TAG_CONTROLLER);
        _self.map = _self.gameLayer.getChildByTag(PlayScene.TAG_MAP);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function (touches, event) {
                var touch = touches[0];
                    _self.playerController(touch,"start");
                },
            onTouchesMoved: function(touches, event){
                var touch = touches[0];
                    _self.playerController(touch,"move");
                },
            onTouchesEnded: function(touches,event){
                var touch = touches[0];
                    _self.playerController(touch,"end");
                    _self.player.stopPlayerAnimation();
                    _self.controller.resetMovement();
                    _self.controller.setCntBtnOriginPosition();
            },
        },this);

        this.scheduleUpdate();

    },
    playerController:function(touche,type){
            //ボタンの位置とプレイヤーの移動量を計算
            //getXmovement,getYmovementで移動量を取得
            var direction = this.controller.setCntBtnPosAndPMove(touche);

            //方向に合わせたアニメーションを設定
            this.player.setPlayerAnimation(direction);
    },
    update:function (dt) {
        var xpos = this.controller.getXmovement();
        var ypos = this.controller.getYmovement();
        this.map.setMapPosition(xpos,ypos);
    }
});

PlayScene.TAG_CONTROLLER = 1;
PlayScene.TAG_PLAYER = 2;
PlayScene.TAG_MAP = 3;