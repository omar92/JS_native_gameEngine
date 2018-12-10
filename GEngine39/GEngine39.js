(function () {

    var proto = {};
    this.GE = Object.create(proto);

    var SM = StateMachine.getInstance();
    //engine prototype functions
    proto.start = function(){
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