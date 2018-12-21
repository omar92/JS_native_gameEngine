var PhysicsEngine2D = (function () {
    var rigidBodys2D = [];
    var trans;
    var rb2d ;
    class PhysicsEngine2D {
        constructor() {
        }
        onUpdate() {
        
            for (let i = 0; i < rigidBodys2D.length; i++) {         
                rb2d = rigidBodys2D[i]
                if (trans = rb2d.GameObject.getComponent(Transform)) {

                    trans.pos.sum(rb2d.velocity);

                }else{
                    throw(rb2d.GameObject.name + ' Transform not found')
                }
            }
        }
        subscribe(rigidBody2D) {
            if (!this.has(rigidBody2D))
                rigidBodys2D.push(rigidBody2D);
        }
        unSubscribe(rigidBody2D) {
            if (this.has(rigidBody2D))
                rigidBodys2D.splice(rigidBodys2D.findIndex(rigidBody2D), 1);
        }
        has(rigidBody2D) {
            for (let i = 0; i < rigidBodys2D.length; i++) {
                if (rigidBody2D === rigidBodys2D[i]) {
                    return true;
                }
            }
            return false;
        }
    }
    return PhysicsEngine2D;
})();


var rigidBody2D = (function () {
    class rigidBody2D {
        constructor() {
            this.velocity = new vector3();
        }
        onStart() {
            GE.PhysicsEngine2D.subscribe(this);
        }
        onUpdate() {}
        onDestroy() {
            GE.PhysicsEngine2D.unSubscribe(this);
        }
    }
    return rigidBody2D;
})();