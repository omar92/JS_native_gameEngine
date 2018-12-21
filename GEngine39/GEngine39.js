(function () {

    var proto = {};
    var onInit;
    this.GE = Object.create(proto);
    var SM = StateMachine.getInstance();


    //engine properties
    this.GE.sceneManager = SceneManager.getInstance();
    this.GE.RenderEngine2D = new RenderEngine2D("canvas");
    this.GE.PhysicsEngine2D = new PhysicsEngine2D();
    //engine prototype functions
    proto.start = function () {
        // onInit();
        SM.changeState(initState);
    }

    proto.stateDone = function () {
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
    var _id = 0;
    proto.Register = function (inistance) {
        return ++_id;
    }


})();
var Vector3 = (function () {
    class Vector3 {
        constructor(x, y, z) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
        sum(vector3) {
            this.x += vector3.x;
            this.y += vector3.y;
            this.z += vector3.z;
            return this;
        }
        sub(vector3) {

            this.x -= vector3.x;
            this.y -= vector3.y;
            this.z -= vector3.z;
            return this;
        }
        mul(num) {
            this.x *= num;
            this.y *= num;
            this.z *= num;
            return this;
        }
        clone(vector3) {
            this.x = vector3.x;
            this.y = vector3.y;
            this.z = vector3.z;
            return this;
        }
        toString() {
            return `x:${this.x},y:${this.y},z:${this.z}`;
        }
    }
    return Vector3;
})();

var Transform = (function () {
    var _pos = {};
    var _childs = {};
    var _parent = {};
    class Transform {
        constructor() {
            this.childCount = 0;
            this.id = GE.Register(this);
            _pos[this.id] = new Vector3();
            _childs[this.id] = [];
            _parent[this.id] = null;
        }
        onStart() {}
        onUpdate() {}
        onDestroy() {

        }

        getPos() {

            return new Vector3().clone(_pos[this.id]);
        }
        getLocalPos(){
            return this.getPos().sub(_parent[this.id].getPos());
        }
        setPos(pos) {
            if (pos && pos instanceof Vector3) {

                //update childs positions
                var childNewPos = null;
                if (this.childCount > 0) {
                    for (var i = 0; i < this.childCount; i++) {
                        childNewPos = new Vector3().clone(pos);
                        childNewPos.sum(this.getChild(i).getLocalPos());
                        this.getChild(i).setPos(childNewPos);
                    }
                }
                //update my position
                _pos[this.id].clone(pos);
            } else {
                throw ("expected Vector3 but found " + typeof (pos));
            }
        }
        getChild(i) {
            return _childs[this.id][i];
        }
        setParent(transform) {
            if (transform && transform instanceof Transform) {
                _childs[transform.id].push(this);
                transform.childCount++;
                _parent[this.id] = transform;
            } else if (transform === null) { //remove parent
                if (_parent[this]) {
                    _parent[this.id].removeChild(this);
                    _parent[this.id] = null;
                }
            } else {
                throw ("expected Transform but found " + typeof (transform));
            }
        }
        removeChild(transform) {
            if (transform && transform instanceof Transform) {
                var childIndex = -1;
                if ((childIndex = _childs[this.id].indexOf(transform)) > 0) {
                    _childs[this.id].splice(childIndex, 1);
                    this.childCount--;
                }
            } else {
                throw ("expected Transform but found " + typeof (transform));
            }
        }
    }
    return Transform;
})();