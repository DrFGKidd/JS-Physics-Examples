var Example = Example || {};

Example.catapult = function() {
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

    // add bodies
    var initial_width = 320,
        initial_offset = 0,
        initial_center = 0,
        width_modifier = 0,
        offset_modifier = 0,
        center_modifier = 0,
        initial_position = {x:400,y:520};
    var ball = Bodies.circle(999,999,5)
    var big_ball = Bodies.circle(999,999,5)
    create_catapult = function(width,offset,center) {
      let plank = Bodies.rectangle(initial_position.x-width/2-center,initial_position.y+offset,width,10)
      let cup = Bodies.rectangle(initial_position.x-width+5-center,initial_position.y+offset-20,10,30)
      let arm = Body.create({parts:[plank,cup]})
      let hinge = Constraint.create({
            bodyA: arm,
            pointA: {x:center,y:0},
            pointB: {x:initial_position.x-center,y:initial_position.y+offset},
            stiffness: 1,
            length:0
          });
      let spring = Constraint.create({
            bodyA: arm,
            pointA:{x:width/2-10,y:0},
            pointB:{x:initial_position.x+width/2-10-center*2,y:initial_position.y+60},
            stiffness: 0.01,
            length:60-offset
        })
      let catapult = Composite.create()
      Composite.add(catapult,[arm,hinge,spring])//,spring])
      return catapult
    };
    var catapult = create_catapult(initial_width,initial_center,initial_offset);
    var baseSlider = Bodies.rectangle(50,50,100,20,{
      isStatic:true,
      label: "slider",
      collisionFilter: {group:-1}
    })
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
    //var catapult = Bodies.rectangle(400, 520, 320, 20, { collisionFilter: { group: group } });

    var slider = document.getElementById("myCenter");
    slider.oninput = function() {
      center_modifier = this.value/1
      let new_center = initial_center + center_modifier
      let new_offset = initial_offset + offset_modifier
      let new_width = initial_width + width_modifier
      Composite.remove(world,catapult)
      catapult = create_catapult(new_width,new_offset,new_center)
      Composite.add(world,catapult)

    }
    var slider2 = document.getElementById("myOffset");
    slider2.oninput = function() {
      offset_modifier = this.value/1
      let new_center = initial_center + center_modifier
      let new_offset = initial_offset + offset_modifier
      let new_width = initial_width + width_modifier
      Composite.remove(world,catapult)
      catapult = create_catapult(new_width,new_offset,new_center)
      Composite.add(world,catapult)
    }
    var slider3 = document.getElementById("myWidth");
    slider3.oninput = function() {
      width_modifier = this.value/1
      let new_center = initial_center + center_modifier
      let new_offset = initial_offset + offset_modifier
      let new_width = initial_width + width_modifier
      Composite.remove(world,catapult)
      catapult = create_catapult(new_width,new_offset,new_center)
      Composite.add(world,catapult)
    }
    var ground = Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } });
    Composite.add(world, [
        catapult,
        ball,
        big_ball,
        ground,
        baseSlider,

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

    Events.on(mouseConstraint, 'mousedown', function(event) {
        let mouse = event.mouse;
        let position = mouse.mousedownPosition
        slider = Query.point([baseSlider],position)[0] || false;
        if (!slider) {
          if (keys[32]) {
            create_big_ball(position)
          } else {
            create_ball(position)
          }
        } else {
          Body.translate(slider,{x:mouse.position.x-slider.position.x,y:0})
        }
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

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

Example.catapult.title = 'Catapult';
Example.catapult.for = '>=0.14.2';

Example.catapult()

if (typeof module !== 'undefined') {
    module.exports = Example.catapult;
}