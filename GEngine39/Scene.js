

function Scene(name) {
    this.name = name || "scene";
    this.GameObjects = [];
}
Scene.prototype.onStart = function () {
    for (let i = 0; i <  this.GameObjects.length; i++) {
        const gameObject =  this.GameObjects[i];
        gameObject.OnStart();
    }
}

Scene.prototype.onUpdate = function() {
    console.log("onUpate");
    for (let i = 0; i < this.GameObjects.length; i++) {
        const gameObject =  this.GameObjects[i];
        gameObject.onUpdate();
    }
}


Scene.prototype.onExit = function () {
    for (let i = 0; i < GameObjects.length; i++) {
        const gameObject = GameObjects[i];
        gameObject.onExit();
    }
}

Scene.prototype.addGameObject = function (gameObject) {
    this.GameObjects.push(gameObject);
}


