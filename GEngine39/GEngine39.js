(function () {

    var proto = {};
    var onInit ;
    this.GE = Object.create(proto);

    var SM = StateMachine.getInstance();
    

    //engine properties
    this.GE.sceneManager = SceneManager.getInstance();
    this.GE.RenderEngine2D = new RenderEngine2D("canvas");
    //engine prototype functions
    proto.start = function(){
       // onInit();
        SM.changeState(initState);
    }

    proto.stateDone= function () {
            switch (SM.getCurrentState()) {
                case initState:
                    SM.changeState(playState)
                    break;
                case playState:
                    SM.changeState(exitState)
                    break;
                default:
                    SM.changeState(initState);
                    break;
            } 
    }

    
})();