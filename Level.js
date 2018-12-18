var startScene = new Scene();

var enemy = new GameObject("enemy");
var player = new GameObject("player");
//var sayed = new GameObject("sayed");

var Transform = (function () {
    class Transform {
        constructor(_pos) {
            this.pos = {
                x: 0,
                y: 0,
                z: 0,
                toString: function () {
                    return `x:${this.x},y:${this.y},z:${this.z}`;
                }
            };
            // console.log(_pos);
            if (_pos) {
                // console.log("here");
                this.pos.x = _pos.x;
                this.pos.y = _pos.y;
                this.pos.z = _pos.z;
            }
            // console.log( this.pos);
        }
        onStart() {}
        onUpdate() {}
    }
    return Transform;
})();

var MoveCompnent = (function () {
    class MoveCompnent {
        constructor() {
            this.trans = null;
        }
        onStart() {
            this.trans = this.GameObject.getComponent(Transform);
        }
        onUpdate() {
            if (this.trans) {
                this.trans.pos.x+= 2;
                this.trans.pos.y+= 2;
            }
        }
    }
    return MoveCompnent;
})();

var Image = (function () {
    var ctx = null;
    class Image {
        constructor(color, w, h) {
            this.color = color;
            this.w = w;
            this.h = h;
        }
        onStart() {
            GE.RenderEngine2D.subscribe(this);
        }
        onUpdate() {}
        onExit(){
            GE.RenderEngine2D.unSubscribe(this);
        }
    }
    return Image;
})();

player.addCompnent(new Image("red",10,10));
player.addCompnent(new MoveCompnent());
player.addCompnent(new Transform());

enemy.addCompnent(new Image("blue",20,10));
enemy.addCompnent(new MoveCompnent());
enemy.addCompnent(new Transform({
    x: 100,
    y: 0,
    z: 0
}));

startScene.addGameObject(player);
startScene.addGameObject(enemy);

GE.sceneManager.addScene(startScene);
GE.start();




var text = '{"Project":[' +
    '{ "Name": "1", "Description": "blabla1", "Images":["blabla.png"] },' +
    '{ "Name": "2", "Description": "blabla2", "Images":["blabla.png","blabla2.jpg"] },' +
    '{ "Name": "3", "Description": "blabla3", "Images":["blabla.png","blabla2.jpg","fahmy.gif"] }]}';
var obj = JSON.parse(text);
// console.log(obj.Project[0].Description);