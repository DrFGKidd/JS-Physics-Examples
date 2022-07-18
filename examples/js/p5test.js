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

var engine,
  world,
  runner,
  ground,
  boxes = [];
class Box {
  constructor(x,y,w,h,options) {
    this.body = Bodies.rectangle(x,y,w,h,options)
    if (!!options.addToWorld) {Composite.add(world,this.body)}
    this.w = w;
    this.h = h;
    var listOfColors = [color('#00FFFF'), color('#FFFF00'), color('#FF00FF'), color('#FFFFFF'), color('#66ff00')];
    this.color = listOfColors[int(random(0, listOfColors.length))]
  }
  show(ang) {
    var pos = this.body.position
    var angle = ang || this.body.angle

    push();
    fill(this.color);
    translate(pos.x,pos.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0,0,this.w,this.h)
    pop();
  }
}
class ComboBox {
  constructor(bodies,options) {
    this.bodies = bodies
    this.parts = []
    for (var i = 0; i<bodies.length; i++) {this.parts.push(bodies[i].body)}
    this.body = Body.create({parts:this.parts})
    Composite.add(world,this.body)
  }
  show() {
    for (var i = 0; i<this.bodies.length; i++) {this.bodies[i].show(this.body.angle)}
  }
}
function setup() {
  createCanvas(800,600)
  engine = Engine.create();
  world = engine.world;
  runner = Runner.create();
  Runner.run(runner, engine)
  options = {
    isStatic: true
  }
  ground = Bodies.rectangle(width/2, height+250, width, 500, options);
  Composite.add(world,ground);
}
function mousePressed() {
  options = {
    friction: 0.3,
    restitution: 0.8,
    addToWorld: false,
  }
  boxA = new Box(mouseX, mouseY,20,20,options)
  boxB = new Box(mouseX+20,mouseY+20,20,20,options)
  comboBox = new ComboBox([boxA,boxB],{})
  boxes.push(comboBox)

}
function draw() {
  background(51);

  for (var i=1;i<boxes.length; i++) {
    boxes[i].show()
  }
}
