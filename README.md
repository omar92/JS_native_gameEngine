# JS Native Game Engine (GEngine39)

A lightweight, component-based 2D game engine written in vanilla JavaScript. It runs entirely in the browser with no dependencies or build steps required.

## Features

- **2D Rendering Engine** — Canvas-based rendering for colored square shapes
- **2D Physics Engine** — Velocity-based physics simulation
- **Component System** — Unity-like GameObject/component architecture
- **Transform Hierarchy** — Parent-child object relationships with cascading position updates
- **Scene Management** — Multiple scenes with full lifecycle support
- **State Machine** — Engine-level state transitions (init → play → exit)
- **Vector3 Math** — Utility class for 3D vector arithmetic

## Getting Started

No build tools or package manager needed. Just open `index.html` in a browser.

```
open index.html
```

The engine initializes automatically on page load, running the demo scene defined in `Level.js`.

## Architecture

```
GE (global engine object)
├── StateMachine          — engine states: init, play, exit
├── SceneManager          — manages and switches scenes
│   └── Scene             — holds GameObjects, runs update loop
│       └── GameObject    — entity with attached components
│           ├── Transform         — position + parent/child hierarchy
│           ├── shape2D           — visual rendering component
│           └── rigidBody2D       — physics component
├── RenderEngine2D        — canvas renderer (subscribes to shape2D components)
└── PhysicsEngine2D       — physics updater (subscribes to rigidBody2D components)
```

### Game Loop

```
index.html loads scripts
→ GE.start()
→ initState.onStart() → GE.stateDone()
→ playState.onStart() → sceneManager.onStart()
→ requestAnimationFrame loop:
    PhysicsEngine2D.onUpdate()   // apply velocities
    Scene.onUpdate()             // update all GameObjects and their components
    RenderEngine2D.onUpdate()    // clear canvas and render all shapes
```

## Project Structure

```
JS_native_gameEngine/
├── index.html                        # Entry point — loads all scripts and creates canvas
├── Level.js                          # Demo scene setup — create your game here
├── GEngine39/
│   ├── GEngine39.js                  # Global GE object, Vector3, Transform
│   ├── GameObject.js                 # Component-based entity
│   ├── Scene.js                      # Scene container
│   ├── sceneManager.js               # Scene management singleton
│   └── EngineStateMachine/
│       ├── StateMachine.js           # State machine singleton
│       ├── RenderEngine2D.js         # 2D rendering engine + Square shape
│       ├── PhysicsEngine2D.js        # 2D physics engine + rigidBody2D
│       └── EngineStates/
│           ├── initState.js          # Initialization state
│           └── playState.js          # Main play/game loop state
└── my hero.png                       # Example asset
```

## Usage Guide

### 1. Set up a Scene

```javascript
var myScene = new Scene("myScene");
GE.sceneManager.addScene(myScene);
```

### 2. Create a GameObject

```javascript
var player = new GameObject("player");
```

### 3. Add a Transform (position)

```javascript
var playerTransform = new Transform();
playerTransform.setPos(new Vector3(100, 150, 0));
player.addCompnent(playerTransform);
```

### 4. Add a Visual Shape

```javascript
// new RenderEngine2D.shapes.Square(width, height, color)
player.addCompnent(new shape2D(
    new RenderEngine2D.shapes.Square(50, 50, "red")
));
```

### 5. Add Physics

```javascript
var body = new rigidBody2D();
body.velocity = new Vector3(1, 0, 0); // moves right 1px per frame
player.addCompnent(body);
```

### 6. Add Objects to the Scene and Start

```javascript
myScene.addGameObject(player);
GE.start();
```

### 7. Create Custom Components

Custom components follow a simple three-method lifecycle:

```javascript
var MoveComponent = (function () {
    class MoveComponent {
        constructor() {
            this.enable = true;
        }
        onStart() {
            // Runs once when the scene starts.
            // Access the owning GameObject via this.GameObject.
            this.transform = this.GameObject.getComponent(Transform);
        }
        onUpdate() {
            // Runs every frame.
            var pos = this.transform.getPos();
            this.transform.setPos(pos.sum(new Vector3(1, 0, 0)));
        }
        onDestroy() {
            // Runs when the GameObject is destroyed.
        }
    }
    return MoveComponent;
})();

player.addCompnent(new MoveComponent());
```

### 8. Parent-Child Transform Hierarchy

Attaching a child transform to a parent causes the child's world position to follow the parent:

```javascript
var childTransform = new Transform();
childTransform.setPos(new Vector3(10, 10, 0)); // offset from parent
childTransform.setParent(playerTransform);
enemy.addCompnent(childTransform);
```

## API Reference

### `GE` — Global Engine Object

| Member | Type | Description |
|---|---|---|
| `GE.sceneManager` | SceneManager | Manages all scenes |
| `GE.RenderEngine2D` | RenderEngine2D | 2D rendering system |
| `GE.PhysicsEngine2D` | PhysicsEngine2D | 2D physics system |
| `GE.start()` | Method | Starts the engine |
| `GE.stateDone()` | Method | Advances the engine to the next state |
| `GE.Register(instance)` | Method | Assigns a unique ID to any object |

### `Vector3`

```javascript
var v = new Vector3(x, y, z);
v.sum(other)     // returns new Vector3 (this + other)
v.sub(other)     // returns new Vector3 (this - other)
v.mul(scalar)    // returns new Vector3 (this * scalar)
v.clone()        // returns a copy
v.toString()     // "Vector3(x, y, z)"
```

### `Transform` (Component)

| Method | Description |
|---|---|
| `getPos()` | Returns world position as `Vector3` |
| `setPos(Vector3)` | Sets world position |
| `getLocalPos()` | Returns position relative to parent |
| `setParent(transform)` | Attaches to a parent transform |
| `getChild(index)` | Returns child transform at index |
| `removeChild(transform)` | Detaches a child transform |

### `GameObject`

| Method | Description |
|---|---|
| `addCompnent(component)` | Attaches a component |
| `getComponent(Class)` | Returns the first component of the given class |
| `onStart()` | Called when the scene starts (auto) |
| `onUpdate()` | Called every frame (auto) |
| `onDestroy()` | Called when destroyed (auto) |

### `Scene`

| Method | Description |
|---|---|
| `addGameObject(go)` | Adds a GameObject to the scene |
| `onStart()` | Initializes all objects |
| `onUpdate()` | Updates physics, objects, and renderer |
| `onDestroy()` | Cleans up the scene |

### `SceneManager`

| Method | Description |
|---|---|
| `addScene(scene)` | Registers a scene |
| `changeScene(index)` | Switches to scene by index |
| `getCurrentSceneindex()` | Returns the active scene index |

### `RenderEngine2D`

| Member | Description |
|---|---|
| `subscribe(shape2D)` | Registers a shape for rendering |
| `unSubscribe(shape2D)` | Removes a shape from rendering |
| `shapes.Square(w, h, color)` | Constructor for a filled rectangle |

### `PhysicsEngine2D`

| Method | Description |
|---|---|
| `subscribe(rigidBody2D)` | Registers a body for physics updates |
| `unSubscribe(rigidBody2D)` | Removes a body |
| `has(rigidBody2D)` | Returns `true` if the body is registered |

### `rigidBody2D` (Component)

| Property/Method | Description |
|---|---|
| `velocity` | `Vector3` applied to position each frame |
| `onStart()` | Subscribes to PhysicsEngine2D |
| `onDestroy()` | Unsubscribes from PhysicsEngine2D |

### `shape2D` (Component)

```javascript
// Wrap any shape and add it to a GameObject
player.addCompnent(new shape2D(new RenderEngine2D.shapes.Square(60, 60, "blue")));
```

| Method | Description |
|---|---|
| `onStart()` | Subscribes to RenderEngine2D |
| `onDestroy()` | Unsubscribes from RenderEngine2D |

## Known Limitations

- `addCompnent()` has a typo (`o` is missing); use the name exactly as written
- Only `Square` shapes are built in (no circles, sprites, or text)
- Physics supports velocity only — no acceleration, gravity, or collision detection
- No input (keyboard/mouse) handling
- No z-ordering or layer system for rendering

## Changelog

### Version 0.2 — 21/12/2018
- Implemented `Vector3`
- `Transform` and `RenderEngine2D` updated to use `Vector3`
- `Transform` supports parent-child hierarchy

### Version 0.1 — 20/12/2018
- Basic render engine
