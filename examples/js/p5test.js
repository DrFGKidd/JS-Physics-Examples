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
    Vertices = Matter.Vertices,
    Events = Matter.Events;

var engine,
  world,
  runner,
  decomp,
  ground,
  boxes = [],
  listOfColors,
  bgColor=51,
  font;



class Box {
  constructor(x,y,w,h,options) {
    this.body = Bodies.rectangle(x,y,w,h,options)
    Composite.add(world,this.body)
    this.w = w;
    this.h = h;
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
class Letter {
  constructor(x,y,letter,options) {
    this.letter = letter
    this.body = Bodies.fromVertices(x,y,letters[letter])//Vertices.fromPath(letters[letter]))
    Body.setPosition(this.body,{x:x,y:y})
    if(options.isStatic) {Body.setStatic(this.body,true)}
    Composite.add(world,this.body)
    this.draw = true
  }
  show() {
    if (this.draw) {
      let parts = this.body.parts
      push()
      let pos = this.body.position
      for (var j=1;j<parts.length;j++) {
        let verts = parts[j].vertices
        beginShape();
        fill(255,0,0);
        noStroke();
        for (var i=0;i<verts.length;i++) {vertex(verts[i].x,verts[i].y)}
        endShape(CLOSE);
      }
      pop()
    }
  }
  remove() {
    Composite.remove(world,this.body)
    this.draw = false
  }
}
class Word {
  constructor(x,y,letters,options) {
    this.letters = []
    let addX = 0
    for (var i = 0;i<letters.length;i++) {
      let newLetter = new Letter(x+addX,y,letters[i],options)
      this.letters.push(newLetter)
      addX += Math.max(60,newLetter.body.bounds.max.x-newLetter.body.bounds.min.x)
    }
  }
  show() {
    for (var i=0;i<this.letters.length;i++) {
      this.letters[i].show()
    }
  }
  remove() {
    for (var i=0;i<this.letters.length;i++) {
      this.letters[i].remove()
    }
  }
}
function setup() {
  createCanvas(800,600)
  listOfColors = [color('#A908B5'), color('#FF8000'), color('#00FFFF'), color('#FFFF00'), color('#FF00FF'), color('#FFFFFF'), color('#66ff00')];
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
    friction: 0.7,
    restitution: 0.8,
    isStatic: true,
  }
  if (boxes.length>0) {  boxes[boxes.length-1].remove()}
  newLetter = new Word(mouseX,mouseY,"1750",options)
  boxes.push(newLetter)

}
function draw() {
  background(bgColor);

  for (var i=0;i<boxes.length; i++) {boxes[i].show()}
}
