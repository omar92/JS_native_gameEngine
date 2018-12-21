var GameObject = (function () {
    class GameObject {

        constructor(name) {
            this._components = [];
            var that = this;
            this.id = GE.Register(this);
            this.name = name || "gameObject" + this.id;

        }
        onStart() {
            for (let i = 0; i < this._components.length; i++) {
                this._components[i].onStart();
            }
        }
        onUpdate() {
            //  console.log("gameObject update");
            for (let i = 0; i < this._components.length; i++) {
                if (this._components[i].enable) {
                    this._components[i].onUpdate();
                }
            }
        }
        onDestroy() {
            for (let i = 0; i < this._components.length; i++) {
                this._components[i].onDestroy();
            }
        }
        addCompnent(component) {
            component.GameObject = this;
            component.enable = true;
            if (!component.id)
                component.id = GE.Register(this);
            this._components.push(component);
        }
        getComponent(_Class) {

            for (let i = 0; i < this._components.length; i++) {
                if (this._components[i] instanceof _Class) {
                    return this._components[i];
                }
            }
            return null;
        }
    }

    return GameObject;

})();