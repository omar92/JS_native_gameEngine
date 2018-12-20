var startScene = new Scene();

var enemy = new GameObject("enemy");
var player = new GameObject("player");



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
    //static
    class MoveCompnent {
        constructor() {
            this.trans = null;
        }
        onStart() {
            this.trans = this.GameObject.getComponent(Transform);
        }
        onUpdate() {
            if (this.trans) {
                this.trans.pos.x+= .5;
                this.trans.pos.y+= .5;
            }
        }
    }
    //privat methods 
    return MoveCompnent;
})();


var MoveCompnent2 = (function () {
    //static
    class MoveCompnent2 {
        constructor() {
            this.trans = null;
        }
        onStart() {
            this.trans = this.GameObject.getComponent(Transform);
        }
        onUpdate() {
            if (this.trans) {
               // this.trans.pos.x+= 2;
                this.trans.pos.x+= 5;
            }
        }
    }
    //privat methods 
    return MoveCompnent2;
})();

player.addCompnent(new shape2D(new RenderEngine2D.shapes.Square(100,100,"red")));
player.addCompnent(new MoveCompnent());
player.addCompnent(new Transform());

enemy.addCompnent(new shape2D(new RenderEngine2D.shapes.Square(100,100,"blue")));
enemy.addCompnent(new MoveCompnent());
//enemy.addCompnent(new MoveCompnent2());
enemy.addCompnent(new Transform({
    x: 100,
    y: 0,
    z: 0
}));

startScene.addGameObject(player);
//startScene.addGameObject(enemy);

GE.sceneManager.addScene(startScene);
GE.start();




var text = '{"Project":[' +
    '{ "Name": "1", "Description": "blabla1", "Images":["blabla.png"] },' +
    '{ "Name": "2", "Description": "blabla2", "Images":["blabla.png","blabla2.jpg"] },' +
    '{ "Name": "3", "Description": "blabla3", "Images":["blabla.png","blabla2.jpg","fahmy.gif"] }]}';
var obj = JSON.parse(text);
// console.log(obj.Project[0].Description);

