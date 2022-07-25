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

var letters= {
  "A":[
    {x:0, y:	67.41,isInternal:false},
    {x:36.58, y:	0,isInternal:false},
    {x:73.17, y:	66.73,isInternal:false},
    {x:56.23, y:	67.07,isInternal:false},
    {x:36.58, y:	34.55,isInternal:false},//internal
    {x:30.15, y:  46.07,isInternal:false},//internal
    {x:43.02, y:	46.07,isInternal:false},//internal
    {x:49.80, y:	55.22,isInternal:false},
    {x:23.37, y:	55.55,isInternal:false},
    {x:16.94 ,y:	67.41,isInternal:false},
  ],
  "1":[
    {x:7.64,y:	66.01},
    {x:7.64,y:	11.12},
    {x:0.00,y:	10.77},
    {x:0.00,y:	0.00},
    {x:22.93,y:	0.00},
    {x:22.93,y:	66.35},
  ],
  "2":[
    {x:14.59,y:	21.54},
    {x:0.69,y:	12.85},
    {x:7.30,y:	4.86},
    {x:19.80	,y:0.00},
    {x:31.96	,y:1.04},
    {x:40.65	,y:6.25},
    {x:45.86	,y:15.29},
    {x:46.55	,y:24.32},
    {x:44.81	,y:30.92},
    {x:41.34	,y:37.52},
    {x:29.53	,y:52.46},
    {x:49.33	,y:52.81},
    {x:49.33	,y:67.74},
    {x:0.00	,y:67.74},
    {x:27.44	,y:32.66},
    {x:30.92	,y:24.32},
    {x:29.18	,y:17.37},
    {x:23.28	,y:14.94},
    {x:18.06	,y:16.33},
  ],
  "3":[
    {x:0.35,y:	12.16},
    {x:15.29	,y:1.04},
    {x:27.44	,y:0.00},
    {x:36.13	,y:2.78},
    {x:42.73	,y:8.69},
    {x:45.51	,y:18.06},
    {x:44.81	,y:25.36},
    {x:39.26	,y:32.31},
    {x:43.77	,y:35.78},
    {x:47.25	,y:41.34},
    {x:48.29	,y:46.55},
    {x:47.59	,y:54.89},
    {x:43.43,y:61.84},
    {x:37.87	,y:66.01},
    {x:28.14	,y:69.13},
    {x:17.72	,y:68.79},
    {x:8.69	,y:65.66},
    {x:2.78	,y:61.49},
    {x:0.00	,y:58.71},
    {x:10.77	,y:47.94},
    {x:14.24	,y:51.42},
    {x:20.15	,y:54.19},
    {x:27.79,y:	53.15},
    {x:31.61	,y:47.94},
    {x:30.57	,y:42.38},
    {x:26.06	,y:39.95},
    {x:15.98	,y:39.26},
    {x:15.98	,y:27.79},
    {x:26.06	,y:27.10},
    {x:29.88	,y:22.93},
    {x:29.53	,y:18.06},
    {x:26.40	,y:14.24},
    {x:21.89	,y:13.55},
    {x:16.68,y:14.59},
    {x:11.81	,y:19.11},
  ],
  "4":[
    {x:42.04,y:	0.35},
    {x:42.38,y:	27.10},
    {x:50.37,y:	27.10},
    {x:50.72,y:	40.65},
    {x:42.38,y:	40.30},
    {x:42.38,y:	67.05},
    {x:26.75,y:	67.05},
    {x:26.75,y:	40.65},
    {x:0.00	,y:40.65},
    {x:0.00	,y:0.00},
    {x:15.63,y:	0.00},
    {x:15.98,y:	27.10},
    {x:26.40,y:	27.10},
    {x:26.75,y:	0.00},
  ],
  "5":[
    {x:4.17,y:	0.00},
    {x:38.21,y:	0.35},
    {x:38.21,y:	15.29},
    {x:19.45,y:	15.29},
    {x:19.45,y:	21.19},
    {x:26.06,y:	21.19},
    {x:34.74,y:	23.97},
    {x:42.73,y:	31.61},
    {x:45.86,y:	42.04},
    {x:45.16,y:	50.03},
    {x:40.99,y:	58.71},
    {x:33.70,y:	64.96},
    {x:22.93,y:	68.09},
    {x:11.81,y:	67.05},
    {x:0.00	,y:61.49},
    {x:8.34	,y:47.59},
    {x:12.85,y:	51.76},
    {x:20.84,y:	53.15},
    {x:28.14,y:	47.59},
    {x:27.79,y:	38.56},
    {x:21.54,y:	34.05},
    {x:12.51,y:	33.70},
    {x:4.17,y:	36.13},
  ],
  "6":[
    {x:22.93,y:	24.67},
    {x:32.31,y:	23.62},
    {x:42.38,y:	28.83},
    {x:47.94,y:	38.91},
    {x:48.29,y:	49.68},
    {x:44.12,y:	60.10},
    {x:30.92,y:	68.79},
    {x:15.63,y:	67.74},
    {x:6.60,y:	62.19},
    {x:1.74	,y:53.85},
    {x:0.00,y:41.69},
    {x:4.86	,y:25.36},
    {x:10.77,y:	16.33},
    {x:25.01,y:	0.00},
    {x:44.47,y:	0.35},
    {x:38.21,y:	6.95},
    {x:29.53,y:	15.63},
    {x:24.67,y:	21.89},
    {x:16.33,y:	40.65},
    {x:15.63,y:	46.55},
    {x:20.15,y:	53.15},
    {x:28.14,y:	53.50},
    {x:33.00,y:	47.25},
    {x:32.31,y:	41.34},
    {x:28.83,y:	37.17},
    {x:21.89,y:	36.48},
    {x:16.68,y:	40.30},
  ],
  "7":[
    {x:0.00,y:	0.35},
    {x:44.47,y:	0.00},
    {x:22.58,y:	66.70},
    {x:4.86,y:	66.70},
    {x:23.28,y:	14.94},
    {x:0.00,y:	15.63},
    {x:0.00	,y:15.29},
  ],
  "8":[
    {x:23.28,y:	33.00},
    {x:9.03,y:	33.70},
    {x:3.13,y:	27.44},
    {x:1.39,y:	17.02},
    {x:4.17,y:	8.69},
    {x:10.42,y:	3.13},
    {x:22.23,y:	0.00},
    {x:36.13,y:	3.13},
    {x:43.77,y:	11.46},
    {x:45.51,y:	19.11},
    {x:44.12,y:	26.06},
    {x:42.04,y:	29.88},
    {x:38.21,y:	33.00},
    {x:44.47,y:	38.56},
    {x:47.25,y:	45.51},
    {x:47.25,y:	53.15},
    {x:44.47,y:	59.75},
    {x:38.91,y:	65.31},
    {x:33.35,y:	68.09},
    {x:26.06,y:	69.48},
    {x:18.06,y:	69.13},
    {x:9.03,y:	66.01},
    {x:2.78,y:	60.10},
    {x:0.00,y:	53.15},
    {x:0.00,y:	46.20},
    {x:2.08,y:	40.65},
    {x:9.03,y:	34.05},
    {x:23.28,y:	33.70},
    {x:23.28,y:	39.60},
    {x:18.06,y:	42.73},
    {x:15.29,y:	46.90},
    {x:16.68,y:	52.81},
    {x:23.62,y:	55.93},
    {x:30.92,y:	52.46},
    {x:30.92,y:	44.81},
    {x:27.10,y:	41.34},
    {x:23.62,y:	39.60},
    {x:23.62,y:	25.71},
    {x:28.49,y:	22.58},
    {x:29.53,y:	16.68},
    {x:25.01,y:	13.90},
    {x:20.15,y:	14.24},
    {x:17.02,y:	18.76},
    {x:19.11,y:	22.93},
    {x:22.93,y:	25.71},
  ],
  "9":[
    {x:24.67,y:	43.77},
    {x:18.41,y:	44.81},
    {x:8.34	,y:41.69},
    {x:2.08,y:	34.39},
    {x:0.00	,y:27.79},
    {x:0.35,y:17.37},
    {x:3.82,y:	9.03},
    {x:10.77,y:	2.78},
    {x:19.80,y:	0.00},
    {x:30.22,y:	0.69},
    {x:39.26,y:	4.86},
    {x:44.81,y:	10.77},
    {x:47.94,y:	18.76},
    {x:47.94,y:	27.79},
    {x:46.55,y:	35.44},
    {x:42.38,y:	44.47},
    {x:22.93,y:	67.74},
    {x:3.13,y:	67.74},
    {x:19.11,y:	51.42},
    {x:25.01,y:	43.77},
    {x:32.31,y:	26.40},
    {x:30.92,y:	18.06},
    {x:25.36,y:	14.59},
    {x:16.68,y:	18.06},
    {x:15.63,y:	26.06},
    {x:19.45,y:	31.27},
    {x:25.71,y:	32.31},
    {x:31.96,y:	27.44},
  ],
  "0":[
    {x:24.32,y:	0.00},
{x:31.61,y:	1.39},
{x:39.95,y:	6.60},
{x:44.12,y:	12.16},
{x:46.90,y:	20.50},
{x:48.64,y:	30.92},
{x:48.64,y:	39.95},
{x:46.90,y:	50.37},
{x:43.43,y:	58.71},
{x:38.91,y:	64.27},
{x:30.92,y:	68.79},
{x:24.32,y:	69.83},
{x:13.20,y:	67.05},
{x:7.30	,y:61.84},
{x:2.78	,y:53.15},
{x:0.35	,y:42.73},
{x:0.00	,y:34.39},
{x:0.69	,y:25.71},
{x:2.78	,y:17.37},
{x:6.60	,y:9.38},
{x:12.85,y:	3.13},
{x:19.45,y:	0.69},
{x:23.97,y:	0.00},
{x:23.97,y:	14.94},
{x:20.50,y:	16.33},
{x:17.02,y:	21.19},
{x:15.63,y:	30.22},
{x:15.63,y:	39.26},
{x:16.33,y:	46.20},
{x:19.11,y:	52.46},
{x:23.62,y:	54.54},
{x:28.49,y:	53.15},
{x:31.96,y:	46.90},
{x:33.00,y:	37.87},
{x:33.00,y:	28.14},
{x:31.61,y:	21.89},
{x:29.18,y:	17.37},
{x:24.67,y:	14.94},

  ]
}

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
  constructor(x,y,letter) {
    this.letter = letter
    this.body = Bodies.fromVertices(x,y,letters[letter])//Vertices.fromPath(letters[letter]))
    Body.setPosition(this.body,{x:x,y:y})
    Composite.add(world,this.body)
  }
  show() {
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
class Word {
  constructor(x,y,letters) {
    this.letters = []
    let addX = 0
    for (var i = 0;i<letters.length;i++) {
      let newLetter = new Letter(x+addX,y,letters[i])
      this.letters.push(newLetter)
      let add
      addX += Math.max(45,newLetter.body.bounds.max.x-newLetter.body.bounds.min.x)
    }
  }
  show() {
    for (var i=0;i<this.letters.length;i++) {
      this.letters[i].show()
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
function mouseClicked() {
  options = {
    friction: 0.3,
    restitution: 0.8,
    addToWorld: false,
  }
  newLetter = new Word(mouseX,mouseY,"1234567890")
  boxes.push(newLetter)

}
function draw() {
  background(bgColor);

  for (var i=0;i<boxes.length; i++) {boxes[i].show()}
}
