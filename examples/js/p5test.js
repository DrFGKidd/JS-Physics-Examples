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
var check = true
class Box {
  constructor(x,y,w,h,options) {
    this.body = Bodies.rectangle(x,y,w,h,options);
    this.width = w;
    this.height = h;
    this.options = options;
    Composite.add(world,this.body)
  }
  draw() {
    let pos = this.body.position
    let angle = this.body.angle
    push()
    rectMode(CENTER)
    translate(pos.x,pos.y)
    rotate(angle)
    rect(0,0,this.width,this.height)
    pop()
  }
}
class Letter {
  constructor(x,y,vertices) {

    this.body = Bodies.fromVertices(x,y,vertices)
    console.log(this.body)
    Composite.add(world,this.body)
    this.position = this.body.position
    this.angle = this.body.angle
    this.vertices = vertices
    this.matchVert = 0
  }
  draw() {
    let parts = this.body.parts
    console.log(parts)
    push()
    for (var j=1;j<parts.length;j++) {
      let verts = parts[j].vertices
      beginShape();
      fill(255,0,0);
      for (var i=0;i<verts.length;i++) {vertex(verts[i].x,verts[i].y)}
      endShape(CLOSE);
    }
    pop()
  }
}


function setup() {
  createCanvas(800,600)
  engine = Engine.create();
  world = engine.world;
  ground = Bodies.rectangle(width/2,height+25,width,50, {isStatic:true})
  Composite.add(world,ground)
  runner = Runner.create();
  Runner.run(runner, engine)
}

function draw() {
  background(51);
  for (var i=0;i<boxes.length;i++) {boxes[i].draw()}
}

function mousePressed() {
  vertices = [{x:0,y:0},{y:40,x:0},{x:30,y:40},{x:30,y:30},{x:10,y:30},{x:10,y:0}]
  newBox = new Letter(mouseX,mouseY,vertices)
  boxes.push(newBox)
}
