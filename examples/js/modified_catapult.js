  var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composites = Matter.Composites,
      Constraint = Matter.Constraint,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Collision = Matter.Collision,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Query = Matter.Query,
      Vector = Matter.Vector,
      Events = Matter.Events;

  // create engine
  var engine = Engine.create(),
      world = engine.world;

  // create renderer
  var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
          width: 800,
          height: 600,
          showAngleIndicator: true,
          showCollisions: true,
          showVelocity: true
      }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);
  class Catapult {
    constructor(world,position,options) {
      this._world = world
      this._position = position
      if (Object.keys(options).length>0) {
        for (const key in options) {
          this.initialize(key,options[key])
        }
      }
      if (this._center === undefined) {this.initialize("center",this.width/2)};
      if (this._offset === undefined) {this.initialize("offset",0)};
      this.updated = false
      this.build()
    };
    initialize(key,value) {
      this["_"+key] = value
      Object.defineProperty(this, key,{
        get() {return this["_"+key];},
        set(newValue) {this["_"+key] = newValue;},
        enumerable: true,
        configurable: true,
      })
    };
    build() {
      try{Composite.remove(this._world,this.body)} catch {let pass = ""}
      let plank = Bodies.rectangle(this._position.x-this.width/2,this._position.y+this.offset,this.width,this.height)
      let cup = Bodies.rectangle(this._position.x-this.width+this.height/2,this._position.y+this.offset-35+this.height/2,this.height,30)
      let arm = Body.create({parts:[plank,cup]})
      let hinge = Constraint.create({
            bodyA: arm,
            pointA: {x:this.center,y:0},
            pointB: {x:this._position.x+this.center,y:this._position.y+this.offset},
            stiffness: 1,
            length:0
          });
      let spring = Constraint.create({
            bodyA: arm,
            pointA:{x:this.width/2,y:0},
            pointB:{x:this._position.x+this.width/2,y:this._position.y+60},
            stiffness: 0.01,
            length:60-this.offset
        })
      let catapult = Composite.create()
      Composite.add(catapult,[arm,hinge,spring])//,spring])
      this.body = catapult
      console.log(this.body)
      Composite.add(this._world,this.body)
      this.updated = true
    }
  };
  class Slider {
    constructor(key,object,position,options) {
      this.key = key;
      this.object = object;
      if (Object.keys(options).length>0) {
        for (const key in options) {
          this.initialize(key,options[key])
        }
      }
      if (this._offset === undefined) {this.initialize("offset",0)};
      if (this._scale === undefined) {this.initialize("scale",1)};
      this.oldPos = position.x+this._offset;
      this.body = Bodies.rectangle(position.x+this._offset,position.y,100,20,{
        isStatic: true,
        label: "slider",
        collisionFilter: {group:-1}
      })
    };
    initialize(key,value) {
      this["_"+key] = value
      Object.defineProperty(this, key,{
        get() {return this["_"+key];},
        set(newValue) {this["_"+key] = newValue;},
        enumerable: true,
        configurable: true,
      })
    };
    update() {
      let sliderDelta = this.body.position.x - this.oldPos
      this.oldPos = this.body.position.x
      if (sliderDelta != 0) {
        console.log(this.object[this.key])
        console.log(sliderDelta)
        this.object[this.key]+=(sliderDelta)*this.scale
        this.object.build();

      }
    }
  }
  // add bodies
  var bodies = [];
  var initial_position = {x:400,y:520};
  var ball = Bodies.circle(999,999,5)
  var big_ball = Bodies.circle(999,999,5)
  const catapult = new Catapult(world,initial_position,{height:20,width:320,offset:0,center:0})
  const slider = new Slider("center",catapult,{x:400,y:50},{scale:.2,offset:0})
  const slider2 = new Slider("offset",catapult,{x:400,y:100},{scale:.1,offset:0})
  const slider3 = new Slider("width",catapult,{x:400,y:150},{scale:.1,offset:0})
  var sliders = [slider,slider2,slider3];
  create_ball = function(position) {
    Composite.remove(world,ball)
    ball = Bodies.circle(position.x,position.y,20,{density:.0001,collisionFilter: {group:-1}})
    Composite.add(world,ball)
  }
  create_big_ball = function(position) {
    Composite.remove(world,big_ball)
    big_ball = Bodies.circle(position.x,position.y,50,{density:.1,collisionFilter: {group:-1}})
    Composite.add(world,big_ball)
  }



  var ground = Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } });
  Composite.add(world, [
      ball,
      big_ball,
      ground,
      slider.body,
      slider2.body,
      slider3.body,

    //  Bodies.rectangle(400, 535, 20, 80, { isStatic: true, collisionFilter: { group: group }, render: { fillStyle: '#060a19' } }),
    //  Bodies.circle(560, 100, 50, { density: 0.005 }),
  ]);


  // add mouse control
  var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.2,
              render: {
                  visible: false
              }
          }
      });

  Composite.add(world, mouseConstraint);
  var keys = [];
  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
  });
  Events.on(engine, 'beforeUpdate', function(event) {
    if (draggingSlider) {
      let currentSlider = sliderBeingDragged.body;
      Body.translate(currentSlider,{x:mouse.position.x-currentSlider.position.x,y:0})
      sliderBeingDragged.update()
    }
  });
  var draggingSlider = false;
  var sliderBeingDragged = ""
  Events.on(mouseConstraint, 'mousedown', function(event) {
      let mouse = event.mouse;
      let position = mouse.mousedownPosition
      for (s=0;s<sliders.length; s++) {
        if (Query.point([sliders[s].body],position).length!=0) {
          draggingSlider = true
          sliderBeingDragged = sliders[s]
        }
      }
       if (!draggingSlider){
        if (keys[32]) {
          create_big_ball(position)
        } else {
          create_ball(position)
        }
      } else {
        draggingSlider = true
      }
  });
  Events.on(mouseConstraint, 'mouseup', function() {
    draggingSlider = false;
    sliderBeingDragged = "";
  });
  var score = document.getElementById("myScore");
  collided = true
  Events.on(engine, 'afterUpdate', function(event) {

    if (collided && ground.position.y-ball.position.y>ball.circleRadius+50.5/2+1) {
      collided = false
    }
    if (ground.position.y-ball.position.y<ball.circleRadius+50.5/2+1 && !collided) {
      collided=true
      score.innerText = "Score = "+Math.floor(ball.position.x-800)
    }

  });

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
  });
