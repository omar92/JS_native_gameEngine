var SceneManager = (function () {
    var instance;
    function createInstance() {
        var object = new sceneManager();
        return object;
    }

    var SM = StateMachine.getInstance();
    var GameScenes = [];
    function sceneManager() {  
        
    }
    sceneManager.prototype.changeScene = function (sceneNum) {
        SM.changeState(GameScenes[sceneNum]);
    }
    sceneManager.prototype.getCurrentSceneindex = function () {
        GameScenes.indexOf(SM.changeState.getCurrentScene());
    }
    sceneManager.prototype.addScene = function (newScene) {
        GameScenes.push(newScene)
    }
    sceneManager.prototype.onStart= function (){
        SM.getCurrentState().onStart();
    }
    sceneManager.prototype.onUpdate= function (){
        SM.getCurrentState().onUpdate();
    }
    sceneManager.prototype.onExit= function (){
        SM.getCurrentState().onExit();
    }
    // sceneManager.prototype.addGameObject= function (gameObject){
    //     SM.getCurrentState().addGameObject(gameObject);
    // }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };

})();
