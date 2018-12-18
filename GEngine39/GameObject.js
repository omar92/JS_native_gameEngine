var GameObject = (function () {
    var num = 0;
    var _components = [];
    class GameObject {
        constructor(name) {
            this.name = name || "gameObject" + num++;
        }
        onStart() {
            for (let i = 0; i < _components.length; i++) {
                _components[i].onStart();
            }
        }
        onUpdate() {
          //  console.log("gameObject update");
            for (let i = 0; i < _components.length; i++) {
                if (_components[i].enable) {
                    _components[i].onUpdate();
                }
            }
        }
        onExit() {
            for (let i = 0; i < _components.length; i++) {
                _components[i].onExit();
            }
        }
        addCompnent(component) {
            component.GameObject = this;
            component.enable = true;
            _components.push(component);
        }
        getComponent( _Class ){

            for (let i = 0; i < _components.length; i++) {
                if(_components[i] instanceof _Class){
                    return _components[i];
                }
            }
            return null;
        }
    }

    return GameObject ;

})();