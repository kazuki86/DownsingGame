var MapLayer = cc.Layer.extend({
    tileMap:null,
    tileMapData:null,
    currentXpos:0,
    currentYpos:0,

    ctor:function(mapData){
        this._super();
        this.init(mapData);
    },
    init:function(mapData){
        this.tiledMap = new cc.TMXTiledMap.create(mapData);
        var xtileSize = this.tiledMap.getTileSize().width;
        var ytileSize = this.tiledMap.getTileSize().height;
        var xSize = this.tiledMap.getMapSize().width;
        var ySize = this.tiledMap.getMapSize().height;

        cc.log("x " + xtileSize * xSize + " y " + ytileSize * ySize);
        this.tiledMap.setPosition(cc.p(0,0));
        this.addChild(this.tiledMap,0);
    },
    setMapPosition:function(xpos,ypos){
        this.currentXpos = this.currentXpos + xpos;
        this.currentYpos = this.currentYpos + ypos;

        this.tiledMap.setPosition(cc.p(this.currentXpos,this.currentYpos));
    }
});
