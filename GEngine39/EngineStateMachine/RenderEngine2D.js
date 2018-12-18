var RenderEngine2D = (function () {

    var canvas;
    var ctx;
    var Images = [];

    class RenderEngine2D {
        constructor(CanvasName) {
            canvas = document.getElementById(CanvasName);
            ctx = canvas.getContext("2d");
        }
        render() {
            canvas.width = canvas.width; //clear screen
            var img;
            var trans;
          //  console.log(Images);
            for (let i = 0; i < Images.length; i++) {
               
                if (img = Images[i]) {
                    trans = img.GameObject.getComponent(Transform);
                      // console.log(obj , trans);
                    ctx.beginPath();
                    ctx.fillStyle = img.color;
                    ctx.fillRect(trans.pos.x, trans.pos.y, img.w, img.h);
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
        subscribe(image) {
            if (!this.has(image))
                Images.push(image);
        }
        unSubscribe(image) {
            if (this.has(image))
                Images.splice(Images.findIndex(image), 1);
        }
        has(image) {
            for (let i = 0; i < Images.length; i++) {
                if (image === Images[i]) {
                    return true;
                }
            }
            return false;
        }
    }


    return RenderEngine2D;
})();