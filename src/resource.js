var res = {
    Player_png : "res/selfdefenceforces.png",
    ControllerButton_png : "res/controllerButton.png",
    Map_tmx : "res/map.tmx",
    TileMap_png : "res/tilemap.png",
    Objects_json : "res/data/mapdata.json"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}