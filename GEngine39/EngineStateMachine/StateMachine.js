var StateMachine = (function () {
    var instance;
    var  currentState = null;

    function createInstance() {
        var object = new StateMachine();
        return object;
    }

    function StateMachine() { 
    }
    StateMachine.prototype.changeState = function (newState) {
        if (this.currentState && this.currentState.hasOwnProperty("onExit")) // exit current state
            this.currentState.onExit();

        this.currentState = newState; //replace current state

        if (this.currentState.hasOwnProperty("onStart"))// start new state
            this.currentState.onStart();
    }
    StateMachine.prototype.getCurrentState= function (){
        return this.currentState ;
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };

})();
