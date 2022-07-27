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
  scoreBoard,
  boxes = [],
  listOfColors,
  bgColor=51,
  font;

class Ball {
  constructor(x,y,radius,options,callbacks) {
    this.body = Bodies.circle(x,y,radius,options)
    Composite.add(world,this.body)
    this.radius = radius
    this.draw = true
    this.callbacks = callbacks || []
  }
  show() {
    if(this.draw) {
      let pos = this.body.position
      push();
      translate(pos.x,pos.y)
      rectMode(CENTER)
      circle(0,0,this.radius*2)
      pop()
      for (var c = 0;c<this.callbacks.length;c++) {
        this.callbacks[c](this)
      }
    }
  }
  remove() {
    Composite.remove(world,this.body)
    this.draw = false
  }
}
class Box {
  constructor(x,y,w,h,options) {
    this.body = Bodies.rectangle(x,y,w,h,options)
    Composite.add(world,this.body)
    this.w = w;
    this.h = h;
    this.color = listOfColors[1]//int(random(0, listOfColors.length))]
    this.draw=true
  }
  show(ang) {
    var pos = this.body.position
    var angle = ang || this.body.angle
    if (this.draw) {
      push();
      fill(this.color);
      translate(pos.x,pos.y);
      rotate(angle);
      rectMode(CENTER);
      rect(0,0,this.w,this.h)
      pop();
    }
  }
  remove() {
    Composite.remove(world,this.body)
    this.draw = false
  }
}
class ComboBox {
  constructor(bodies,options) {
    this.bodies = bodies
    this.parts = []
    for (var i = 0; i<bodies.length; i++) {
      this.parts.push(bodies[i].body)
      Composite.remove(world,bodies[i].body)
    }
    this.body = Body.create({parts:this.parts})
    Composite.add(world,this.body)
    this.draw = true
  }
  show() {
    if (this.draw) {
      for (var i = 0; i<this.bodies.length; i++) {this.bodies[i].show(this.body.angle)}
    }
  }
  remove() {
    Composite.remove(world,this.body)
    this.draw = false
  }
}
class Spring {
  constructor(options) {
    this.body = Constraint.create(options)
    this.options = options
    this.draw = true
    this.length = this.options["length"]
    Composite.add(world,this.body)
    if ((options["bodyA"] || false) && (options["bodyB"] || false)) {this.twoBody = true}
    else {
      if (options["bodyA"] || false) {
        this.oneBody=options["bodyA"].position;
        this.bodyPt =options["pointA"] || {x:0,y:0}
        this.otherPt = options["pointB"]
      } else {
        this.oneBody = options["bodyB"].position;
        this.bodyPt = options["pointB"] || {x:0,y:0}
        this.otherPt = options["pointA"]
      }
    }
  }
  show() {
    if (this.draw) {
      push()
        if (this.length==0) {
          let pos = this.options["pointB"]
          circle(pos.x,pos.y,5)
        } else if (this.length>0) {
          stroke(255)
          strokeWeight(3)
          if (this.twoBody) {
            let bodyApos=this.options.bodyA.position
            let bodyBpos=this.options.bodyB.position
            let ptA = this.options.pointA
            let ptB = this.options.pointB
            line(bodyApos.x+ptA.x,bodyApos.y+ptA.y,bodyBpos.x+ptB.x,bodyBpos.y+ptB.y)
          } else {
            line(this.oneBody.x+this.bodyPt.x,this.oneBody.y+this.bodyPt.y,this.otherPt.x,this.otherPt.y)
          }
        }
      pop()
    }

  }
  remove() {
    this.draw = false
    Composite.remove(world,this.body)
  }
}
class Catapult {
  constructor(position,options) {
    this._position = position
    if (Object.keys(options).length>0) {
      for (const key in options) {
        this.initialize(key,options[key])
      }
    }
    if (this._center === undefined) {this.initialize("center",this.width/2)};
    if (this._offset === undefined) {this.initialize("offset",0)};
    this.built = false
    this.draw = true
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
    if (this.built) {
      this.remove();
      this.draw=true
    }
    let plank = new Box(this._position.x-this.width/2,this._position.y+this.offset,this.width,this.height)
    let cup = new Box(this._position.x-this.width+this.height/2,this._position.y+this.offset-35+this.height/2,this.height,30)
    let arm = new ComboBox([plank,cup])
    let options = {
      bodyA: arm.body,
      pointA: {x:this.center,y:0},
      pointB: {x:this._position.x+this.center,y:this._position.y+this.offset},
      stiffness: 1,
      length:0
    }
    let hinge = new Spring(options)
    let options2 = {
      bodyA: arm.body,
      pointA:{x:this.width/2,y:0},
      pointB:{x:this._position.x+this.width/2,y:this._position.y+60},
      stiffness: 0.01,
      length:60-this.offset
    }
    let spring = new Spring(options2)
    this.bodies = [arm,hinge,spring]
    this.built = true
  }
  show() {
    if (this.draw) {
      for (var i=0;i<this.bodies.length;i++) {this.bodies[i].show()}
    }
  }
  remove() {
    this.draw = false
    for (var i=0;i<this.bodies.length;i++) {this.bodies[i].remove()}
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
    this.slider = new Box(position.x+this._offset,position.y,100,20,{
      isStatic: true,
      label: "slider",
      collisionFilter: {group:-1}
    })
    this.body = this.slider.body
    Composite.add(world,this.body)
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
  being_clicked() {
    if (!clicking) {return false}
    let maxBounds = this.body.bounds.max
    let minBounds = this.body.bounds.min
    if ((mouseX>minBounds.x && mouseX<maxBounds.x) && (mouseY>minBounds.y && mouseY<maxBounds.y)) {
      return true
    }
    return false
  }
  update() {
    let sliderDelta = this.body.position.x - this.oldPos
    this.oldPos = this.body.position.x
    if (sliderDelta != 0) {
      this.object[this.key]+=(sliderDelta)*this.scale
      this.object.build();
    }
  }
  show() {
    this.slider.show()
    if (this.being_clicked()) {
      Body.translate(this.body,{x:mouseX-this.body.position.x,y:0})
      sliderClicked = true
      this.update()
    }
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
  var mouse = Mouse.create(),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.2,
          }
      });
  Composite.add(world, mouseConstraint);
  //Add in the important stuff for this example.
  var initial_position = {x:400,y:540};
  options = {
    isStatic: true
  }
  ground = Bodies.rectangle(width/2, height+25, width, 50, options);
  options = {
    height: 20,
    width:320,
    offset:0,
    center:0,
  }
  scoreBoard = new Word(40,40,"0",{isStatic:true})
  const catapult = new Catapult(initial_position,options)
  const slider = new Slider("center",catapult,{x:400,y:50},{scale:.2,offset:0})
  const slider2 = new Slider("offset",catapult,{x:400,y:100},{scale:.1,offset:0})
  const slider3 = new Slider("width",catapult,{x:400,y:150},{scale:.1,offset:0})
  objects = [catapult,slider,slider2,slider3,scoreBoard]
  Composite.add(world,[ground]);
  for (var i=0; i<objects.length; i++) {boxes.push(objects[i])}
  Events.on(engine, 'afterUpdate', function(event) {
    if (score != oldScore) {
      scoreBoard.remove()
      scoreBoard = new Word(40,40,String(Math.abs(score)),{isStatic:true})
      boxes.push(scoreBoard)
    }
  });

}
var dragging = false,
    clicking = false,
    sliderClicked = false,
    bigBall,
    ball,
    score=0,
    oldScore=0;


function mousePressed() {
  clicking = true
}
function updateScore(object) {
  let pos = object.body.position
  if (600-pos.y<object.radius) {
    oldScore = score
    score = Math.floor(pos.x-800)
    if (score<0) {score = 0}
    object.remove()

  }
}
function keyPressed() {
  if (keyCode === 32) {
    try{bigBall.remove()} catch {pass =""}
    bigBall = new Ball(mouseX,mouseY,50,{density:.1})
    boxes.push(bigBall)
  }
  if (keyCode === 66) {
    try{ball.remove()} catch {pass =""}
    ball = new Ball(mouseX,mouseY,10,{density:.0001},[updateScore])
    boxes.push(ball)
  }
}
function mouseReleased() {
  dragging = false;
  clicking = false;
  sliderClicked = false;
}

function draw() {
  background(bgColor);
  for (var i=0;i<boxes.length; i++) {boxes[i].show()}

}
