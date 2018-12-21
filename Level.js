var startScene = new Scene();

var enemy = new GameObject("enemy");
var player = new GameObject("player");

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
                this.trans.setPos(this.trans.getPos().sum(new Vector3(.5, .5, .5)));
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
                this.trans.pos.x += 5;
            }
        }
    }
    //privat methods 
    return MoveCompnent2;
})();

player.addCompnent(new shape2D(new RenderEngine2D.shapes.Square(100, 100, "red")));
player.addCompnent(new MoveCompnent());
var playerT;
player.addCompnent(playerT = new Transform());
playerT.setPos(new Vector3(10,30,0));
enemy.addCompnent(new shape2D(new RenderEngine2D.shapes.Square(50, 50, "blue")));
//enemy.addCompnent(new MoveCompnent());
//enemy.addCompnent(new MoveCompnent2());
var enemyT;
enemy.addCompnent(enemyT = new Transform());
enemyT.setPos(new Vector3(20,20,0));
enemyT.setParent(playerT);
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