
var startScene = new Scene();

 var player = GameObject.getInstance ("player");

 var Transform = {
    onStart: function(){
        GameObject.getCompo
    },
    onUpdate: function(){
        console.log("player update");
    }
}
 player.addCompnent(Transform);
 startScene.addGameObject(player);

GE.sceneManager.addScene(startScene);
GE.start( );




var text = '{"Project":[' +
    '{ "Name": "1", "Description": "blabla1", "Images":["blabla.png"] },' +
    '{ "Name": "2", "Description": "blabla2", "Images":["blabla.png","blabla2.jpg"] },' +
    '{ "Name": "3", "Description": "blabla3", "Images":["blabla.png","blabla2.jpg","fahmy.gif"] }]}';
var obj = JSON.parse(text);
// console.log(obj.Project[0].Description);

