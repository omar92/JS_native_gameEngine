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
                this.trans.pos.x++;
                this.trans.pos.y++;
            }
        }
    }
    return MoveCompnent;
})();

var Draw = (function () {
    var ctx = null;
    class Draw {
        constructor() {
            this.trans = null;
        }
        onStart() {
            this.trans = this.GameObject.getComponent(Transform);
            if (!ctx) {
                var canvas = document.getElementById("canvas");
                ctx = canvas.getContext("2d");
            }

            console.log(this.trans);
        }
        onUpdate() {
            ctx.beginPath();
         //   console.log( this.trans.pos.toString());
            ctx.fillRect(this.trans.pos.x, this.trans.pos.y, 10, 10);
            ctx.fill();
            ctx.closePath();
        }
    }
    return Draw;
})();

//player.addCompnent(new Draw());
//player.addCompnent(new MoveCompnent());
player.addCompnent(new Transform());

enemy.addCompnent(new Draw());
//enemy.addCompnent(new MoveCompnent());
enemy.addCompnent(new Transform({
    x: 100,
    y: 0,
    z: 0
}));

//startScene.addGameObject(player);
startScene.addGameObject(enemy);

GE.sceneManager.addScene(startScene);
GE.start();




var text = '{"Project":[' +
    '{ "Name": "1", "Description": "blabla1", "Images":["blabla.png"] },' +
    '{ "Name": "2", "Description": "blabla2", "Images":["blabla.png","blabla2.jpg"] },' +
    '{ "Name": "3", "Description": "blabla3", "Images":["blabla.png","blabla2.jpg","fahmy.gif"] }]}';
var obj = JSON.parse(text);
// console.log(obj.Project[0].Description);