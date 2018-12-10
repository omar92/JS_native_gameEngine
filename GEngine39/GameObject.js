var GameObject = (function () {
    var num = 0;

    function _createInstance(name) {
        var object = new GameObject(name);
        return object;
    }


    function GameObject(name) {
        this.name = name || "gameObject" + num++;
        this._components = [];
    }
    GameObject.prototype.onStart = function () {
        for (let i = 0; i < this._components.length; i++) {
            this._components[i].onStart();
        }
    }
    GameObject.prototype.onUpdate = function () {
        console.log("gameObject update");
        for (let i = 0; i < this._components.length; i++) {
            if (this._components[i].enable) {
                this._components[i].onUpdate();
            }
        }
    }
    GameObject.prototype.onExit = function () {
        for (let i = 0; i < this._components.length; i++) {
            this._components[i].onExit();
        }
    }
    GameObject.prototype.addCompnent = function (component) {

        component.GameObject = this;
        component.enable =true;
        this._components.push(component);

    }

    return {
        getInstance: function (name) {
            return _createInstance(name);
        }
    };

})();