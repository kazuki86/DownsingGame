var TreasureAndBomb = cc.Class.extend({
    ctor:function() {
        this.init();
    },
    init:function () {
        treasures = [ ];
        cc.log("TreasureAndBomb load");
        return true;
    },
    
});


var CollisionObjLayer = cc.Layer.extend({
    
    ctor:function(){
        this._super();
        this.init();
        cc.log("aa");
    },
    init:function(){
            //draw a circle 
//            this._drawNode1 = new cc.DrawNode();
//            this.addChild(this._drawNode1,4);
        
//        if (typeof COLLISION_OBJ != "null") {
//            COLLISION_OBJ.obj.each(function(idx,elem){
//                var label = cc.LabelTTF.create(strValue, JSON.stringify(elem), 15);
//                label.setPosition(50,0);
//                label.setAnchorPoint(0,0);
//                this.addChild(label);
//
//            }.bind(this));
//        }
        
//            this._drawNode1.drawCircle(
//                cc.p(ControllerLayer.X_ORIGIN_POINT,ControllerLayer.Y_ORIGIN_POINT),
//                ControllerLayer.CONTROLL_AREA_RADIUS,
//                null,72,false);
    },
    update:function(){
        
    }
});