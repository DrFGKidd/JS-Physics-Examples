// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Composites = Matter.Composites;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});
function addRectangle(x,y,column,row,lastbody,i){
  return Bodies.rectangle(x,y,20,20,index=i)
}

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var stack = Composites.stack(439,250,1,15,5,5,callback=addRectangle)
var chain = Composites.chain(stack,0,0,0,0)
// add all of the bodies to the world
Composite.add(engine.world, [ boxB, ground, stack]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
