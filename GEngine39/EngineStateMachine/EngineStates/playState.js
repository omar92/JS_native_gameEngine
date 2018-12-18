var playState = {
    isRunning : true,
    onStart: function () {

       GE.sceneManager.changeScene(0);
       GE.sceneManager.onStart();
        function RequestFrames(){
            GE.sceneManager.onUpdate();
            if(isRunning){
                requestAnimationFrame(RequestFrames);
            }
        }
        
        isRunning = true;
        RequestFrames();

    },
    onExit: function () {
        isRunning = false;
    }
}