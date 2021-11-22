//Setup Canvas and framerate
var width = 500;
var height = 400;
var canvas = ctx = false;
var frameRate = 1/40; // Seconds
var frameDelay = frameRate * 1000; // ms
var loopTimer = false;

//Get mouse position and allow for clicking
var mouse = {
  x: 0, y: 0,
  isDown: false,
};
var k_spr = 10
function getMousePosition(e) {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
}
var slingshot = {
  length: 0,
  start: {x: 0, y: 0},
  end: {x: 0, y: 0},
  d: {x: 0,y: 0},
  on: false
}
function drawSlingshot() {
  if (slingshot.on && mouse.isDown) {
    ball.position.x = mouse.x
    ball.position.y = mouse.y

    ctx.clearRect(0,0,width,height);

    ctx.save();

    ctx.restore();
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, ball.radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(slingshot.start.x, slingshot.start.y);
      ctx.stroke();
      ctx.closePath();
      slingshot.length = slingshotLength()
    }
    if (slingshot.on && ! mouse.isDown) {
      ctx.clearRect(0,0,width,height);

      ctx.save();
      slingshot.end.x = ball.position.x
      slingshot.end.y = ball.position.y
      ctx.beginPath();
      ctx.moveTo(slingshot.start.x, slingshot.start.y);
      ctx.lineTo(slingshot.end.x, slingshot.end.y);
      ctx.stroke();
      ctx.closePath();
      slingshot.length = slingshotLength()
      ctx.translate(ball.position.x, ball.position.y);
      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();

      ctx.restore();
    }
    if ((slingshot.on && (! mouse.isDown) && slingshot.length<.5)) {
        slingshot.on = false;
        slingshot.d.x=0
        slingshot.d.y=0
      }
}
function drawSlingshotGravity() {
  if (slingshot.on && mouse.isDown) {
    ball.position.x = mouse.x
    ball.position.y = mouse.y

    ctx.clearRect(0,0,width,height);

    ctx.save();

    ctx.restore();
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, ball.radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(slingshot.start.x, slingshot.start.y);
      ctx.stroke();
      ctx.closePath();
      slingshot.length = slingshotLength()
    }
    // Draw the Earth
    ctx.beginPath();
    ctx.arc(earth.position.x, earth.position.y, earth.radius, 0, Math.PI*2, true);
    ctx.fillStyle = earth.color;
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = ball.color
    ctx.restore();
    ctx.restore();
    if (slingshot.on && ! mouse.isDown) {
      ctx.clearRect(0,0,width,height);

      ctx.save();
      slingshot.end.x = ball.position.x
      slingshot.end.y = ball.position.y
      ctx.beginPath();
      ctx.moveTo(slingshot.start.x, slingshot.start.y);
      ctx.lineTo(slingshot.end.x, slingshot.end.y);
      ctx.stroke();
      ctx.closePath();
      slingshot.length = slingshotLength()
      ctx.beginPath();
      ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();
      // Draw the Earth
      ctx.beginPath();
      ctx.arc(earth.position.x, earth.position.y, earth.radius, 0, Math.PI*2, true);
      ctx.fillStyle = earth.color;
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = ball.color
      ctx.restore();
      ctx.restore();
    }
    if ((slingshot.on && (! mouse.isDown) && slingshot.length<.5)) {
        slingshot.on = false;
        slingshot.d.x=0
        slingshot.d.y=0
      }
}
function slingshotLength() {
  slingshot.d.x = (ball.position.x - slingshot.start.x)/100
  slingshot.d.y = (ball.position.y - slingshot.start.y)/100
  return Math.sqrt(Math.pow(slingshot.d.x,2)+Math.pow(slingshot.d.y,2))
}
var mouseDown = function(e) {
    if (e.which == 1) {
      slingshot.on = true
      getMousePosition(e);
      mouse.isDown = true;
      ball.position.x = mouse.x;
      ball.position.y = mouse.y;
      ball.velocity.x = 0
      ball.velocity.y = 0
      slingshot.start.x = mouse.x
      slingshot.start.y = mouse.y
    }
}
var mouseUp = function(e) {
    if (e.which == 1) {
        mouse.isDown = false;
        slingshot.end.x = mouse.x
        slingshot.end.y = mouse.y
        slingshot.length = slingshotLength()
        ball.velocity.x=0.01*slingshot.d.x/Math.abs(slingshot.d.x)
        ball.velocity.y=0.01*slingshot.d.y/Math.abs(slingshot.d.y)
    }
}
var bounceOffWalls = function() {
  if (ball.position.y > height - ball.radius) {
      ball.velocity.y *= ball.restitution;
      ball.position.y = height - ball.radius;
  }
  if (ball.position.x > width - ball.radius) {
      ball.velocity.x *= ball.restitution;
      ball.position.x = width - ball.radius;
  }
  if (ball.position.x < ball.radius) {
      ball.velocity.x *= ball.restitution;
      ball.position.x = ball.radius;
  }
  if (ball.position.y < ball.radius) {
      ball.velocity.y *= ball.restitution;
      ball.position.y = ball.radius;
  }
}
var dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
var norm = (a) => Math.sqrt(a.map((x,i) => a[i] * a[i]).reduce((m, n) => m + n))
var norm_vec = (a) => a.map((x,i) => a[i]/norm(a))
var rotate_vec = function(vec, angle) {
  return [Math.cos(angle)*vec[0]-Math.sin(angle)*vec[1],Math.sin(angle)*vec[0]+Math.cos(angle)*vec[1]]
}
var change_vel = function(a,pos) {
  r_n = norm_vec(pos)
  r_t = rotate_vec(r_n,-Math.PI/2)
  v_n = dot(a,r_n)*ball.restitution
  v_t = dot(a,r_t)
  ball.velocity.x = r_n[0]*v_n+r_t[0]*v_t
  ball.velocity.y = r_n[1]*v_n+r_t[1]*v_t
}
var bounceOffEarth = function() {
  pos = [ball.position.x-earth.position.x, ball.position.y - earth.position.y]
  if (norm(pos)<earth.radius+ball.radius) {
    ball.position.x = norm_vec(pos)[0]*(earth.radius+ball.radius)*1.005+earth.position.x
    ball.position.y = norm_vec(pos)[1]*(earth.radius+ball.radius)*1.005+earth.position.y
    change_vel([ball.velocity.x,ball.velocity.y],pos)
  }
}
var setup = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.onmousemove = getMousePosition;
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;

    ctx.fillStyle = 'red';
    ctx.strokeStyle = '#000000';
    loopTimer = setInterval(loop, frameDelay);
    lineTimer = setInterval(addLine,500)
}
var drawLines = function(lines) {
  for (let k = 0; k < lines.length; k++) {
    ctx.beginPath();
    ctx.moveTo(lines[k], 0);
    ctx.lineTo(lines[k], height);
    ctx.stroke();
    ctx.closePath();
  }
}
