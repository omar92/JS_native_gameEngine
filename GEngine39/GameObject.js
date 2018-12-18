var GameObject = (function () {
    var num = 0;

    class GameObject {
       
        constructor(name) { 
             this._components = [];
            var that = this;
            this.name = name || "gameObject" + num++;
        }
        onStart() {
            for (let i = 0; i <  this._components.length; i++) {
                 this._components[i].onStart();
            }
        }
        onUpdate() {
          //  console.log("gameObject update");
            for (let i = 0; i <  this._components.length; i++) {
                if ( this._components[i].enable) {
                     this._components[i].onUpdate();
                }
            }
        }
        onExit() {
            for (let i = 0; i <  this._components.length; i++) {
                 this._components[i].onExit();
            }
        }
        addCompnent(component) {
            component.GameObject = this;
            component.enable = true;
             this._components.push(component);
        }
        getComponent( _Class ){

            for (let i = 0; i <  this._components.length; i++) {
                if( this._components[i] instanceof _Class){
                    return  this._components[i];
                }
            }
            return null;
        }
    }

    return GameObject ;

})();