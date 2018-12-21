var RenderEngine2D = (function () {

    var canvas;
    var ctx;
    var shape;
    var trans;
    var _shapes = [];
    var tPos;

    function has(shape2D) {
        for (let i = 0; i < _shapes.length; i++) {
            if (shape2D === _shapes[i]) {
                return true;
            }
        }
        return false;
    }

    function inCanvas(pos, w, h) {
        return (
            (pos.y + h) > 0 &&
            (pos.y) < canvas.height &&
            (pos.x + w) > 0 &&
            (pos.x) < canvas.width
        );
    }

    class RenderEngine2D {
        constructor(CanvasName) {
            canvas = document.getElementById(CanvasName);
            ctx = canvas.getContext("2d");
        }
        onUpdate() {
            canvas.width = canvas.width; //clear screen
            for (let i = 0; i < _shapes.length; i++) {
                shape = _shapes[i]
                if (trans = shape.GameObject.getComponent(Transform)) {
                    tPos = trans.getPos();
                    if (inCanvas(tPos, shape._shape.w, shape._shape.h)) {
                        shape._shape._render(canvas, ctx, tPos);
                    }
                    //else {
                    //     console.log(shape.GameObject.name + ' out of canvas');
                    // }
                } else {
                    throw (shape.GameObject.name + ' Transform not found')
                }
            }
        }

        subscribe(shape2D) {
            if (!has(shape2D))
                _shapes.push(shape2D);
        }
        unSubscribe(shape2D) {
            if (has(shape2D))
                _shapes.splice(_shapes.findIndex(shape2D), 1);
        }
    }

    return RenderEngine2D;
})();

RenderEngine2D.shapes = {};
RenderEngine2D.shapes.Square = class {
    constructor(w, h, color) {
        this.w = w || 1;
        this.h = h || 1;
        this.color = color || "black";
    }
    _render(canvas, ctx, tPos) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(tPos.x, tPos.y, this.w, this.h);
        ctx.fill();
        ctx.closePath();
    }
}


var shape2D = (function () {
    var ctx = null;
    class shape2D {
        constructor(shape) {
            this._shape = shape;
        }
        onStart() {
            GE.RenderEngine2D.subscribe(this);
        }
        onUpdate() {}
        onDestroy() {
            GE.RenderEngine2D.unSubscribe(this);
        }
    }
    return shape2D;
})();