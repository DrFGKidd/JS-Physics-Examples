/*
 * Experiment with values of mass, radius, restitution,
 * gravity (ag), and density (rho)!
 *
 * Changing the constants literally changes the environment
 * the ball is in.
 *
 * Some settings to try:
 * the moon: ag = 1.6
 * water: rho = 1000, mass 5
 * beach ball: mass 0.05, radius 30
 * lead ball: mass 10, restitution -0.05
 */
var ball = {
    position: {x: 150, y: 50},
    velocity: {x: 0, y: 0},
    mass: 0.1, //kg
    radius: 15, // 1px = 1cm
    restitution: -0.7
    };

var Cd = 0.47;  // Dimensionless
var rho = 1.225; // kg / m^3
var A = Math.PI * ball.radius * ball.radius / (10000); // m^2
var ag = 9.81;  // m / s^2
var k_spr = 1;

var lines = []
var addLine = function() {
  lines.push(ball.position.x)
  if (lines.length>5) {lines.shift()}
}
var loop = function() {
    if ( ! mouse.isDown) {
        // Do physics
            // Drag force: Fd = -1/2 * Cd * A * rho * v * v
        var Fx = -slingshot.d.x*k_spr;
        var Fy = -slingshot.d.y*k_spr;
        Fx = (isFinite(Fx) ? Fx : 0);
        Fy = (isFinite(Fy) ? Fy : 0);
            // Calculate acceleration ( F = ma )
        var ax = Fx / ball.mass;
        var ay = Fy / ball.mass;
            // Integrate to get velocity
        ball.velocity.x += ax*frameRate;
        ball.velocity.y += ay*frameRate;
        ball.velocity.x = (isFinite(ball.velocity.x) ? ball.velocity.x : 0);
        ball.velocity.y = (isFinite(ball.velocity.y) ? ball.velocity.y : 0);
            // Integrate to get position
        ball.position.x += ball.velocity.x*frameRate*100;
        ball.position.y += ball.velocity.y*frameRate*100;
    }
    // Handle collisions
      bounceOffWalls()

    ctx.clearRect(0,0,width,height);

    ctx.save();
    // Draw lines


    drawLines(lines)
    // Draw the ball





    ctx.beginPath();
    ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();

    ctx.restore();



    // Draw the slingshot
    drawSlingshot()
}
    setup();
