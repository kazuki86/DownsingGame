var ControllerLayer = cc.Layer.extend({
    controllerButton:null,
    xmovement:0,
    ymovement:0,
    mapData:null,
    _drawNode1:null,

    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
            this.controllerButton = cc.Sprite.create(res.ControllerButton_png);
            this.controllerButton.setPosition(cc.p(ControllerLayer.X_ORIGIN_POINT,
                                                   ControllerLayer.Y_ORIGIN_POINT));
            this.controllerButton.setScale(0.4);
            this.addChild(this.controllerButton,4);
        
            //draw a circle 
            this._drawNode1 = new cc.DrawNode();
            this.addChild(this._drawNode1,4);
            this._drawNode1.drawCircle(
                cc.p(ControllerLayer.X_ORIGIN_POINT,ControllerLayer.Y_ORIGIN_POINT),
                ControllerLayer.CONTROLL_AREA_RADIUS,
                null,72,false);
    },
    setCntBtnPosAndPMove:function(touche){
        var location = touche.getLocation();
        var distance = this.calcDistance(location.x,location.y);
        var rad = this.calcRad(location.x,location.y);
        var theta = rad * (180 / Math.PI);

        //thetaが-180<Θ<180の範囲なので
        //分かりやすいように下駄を履かせて0<Θ<360にする
        if(theta < 0){
            theta = 360 + theta;
        }

        if(distance < ControllerLayer.CONTROLL_AREA_RADIUS){
            this.controllerButton.setPosition(cc.p(location.x,location.y));
        }else{//範囲外で操作した場合
            var posy = ControllerLayer.CONTROLL_AREA_RADIUS * Math.sin(rad);
            var posx = ControllerLayer.CONTROLL_AREA_RADIUS * Math.cos(rad);
            this.controllerButton.setPosition(cc.p(posx + ControllerLayer.X_ORIGIN_POINT,
                                                   posy + ControllerLayer.Y_ORIGIN_POINT));
        }

        //方向を計算する
        var currentDirection = null;
        if((theta < 360 && theta >= 315) || (theta < 45 && theta > 0)){//右
            currentDirection = "right";
        }else if(theta < 135 && theta >= 45){//上
            currentDirection = "up";
        }else if(theta < 225 && theta >= 135){//左
            currentDirection = "left";
        }else if(theta < 315 && theta >= 225 ){//下
            currentDirection = "down";
        }else{
            //計算上起こり得ない
            currentDirection = null;
        }

        //移動量を計算する
        switch(currentDirection){
            case "right":
                this.xmovement = -1;
                this.ymovement = 0;
                break;
            case "up":
                this.xmovement = 0;
                this.ymovement = -1;
                break;
            case "left":
                this.xmovement = 1;
                this.ymovement = 0;
                break;
            case "down":
                this.xmovement = 0;
                this.ymovement = 1;
                break;
        }

        //異なる方向が押されていたらその状態を保持する
        if(currentDirection != this.oldDirection){
            this.oldDirection = currentDirection;
        }else{
            currentDirection = "same";
        }
        return currentDirection;
    },
    setCntBtnOriginPosition:function(){
        this.controllerButton.setPosition(cc.p(ControllerLayer.X_ORIGIN_POINT,
                                               ControllerLayer.Y_ORIGIN_POINT));
    },
    getXmovement:function(){
        return this.xmovement;
    },
    getYmovement:function(){
        return this.ymovement;
    },
    resetMovement:function(){
        this.xmovement = 0;
        this.ymovement = 0;
    },
    //距離を計算する
    calcDistance:function(xpos,ypos){
        var distance = 0;
        distance =Math.sqrt(Math.pow(Math.abs(xpos - ControllerLayer.X_ORIGIN_POINT),2) +
                            Math.pow(Math.abs(ypos - ControllerLayer.Y_ORIGIN_POINT),2));
        return distance;
    },
    //Radiusを計算する
    calcRad:function(xpos,ypos){
        var rad = Math.atan2((ypos - ControllerLayer.Y_ORIGIN_POINT),
                            (xpos - ControllerLayer.X_ORIGIN_POINT));
        return rad;
    }
});

ControllerLayer.X_ORIGIN_POINT = 55; //コントローラーの表示中心位置
ControllerLayer.Y_ORIGIN_POINT = 55; //コントローラーの表示中心位置
ControllerLayer.CONTROLL_AREA_RADIUS = 50;//コントローラーの移動半径

