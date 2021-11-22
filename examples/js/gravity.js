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
    position: {x: width/2, y: 100},
    velocity: {x: 2, y: 0},
    mass: 0.1, //kg
    radius: 5, // 1px = 1cm
    restitution: -0.7,
    color: 'red'
    };
var earth = {
  position: {x: width/2, y: height/2},
  mass: 5E5, //kg
  radius: 25,
  color: 'red'
}
var Cd = 0.47;  // Dimensionless
var rho = 1.225; // kg / m^3
var A = Math.PI * ball.radius * ball.radius / (10000); // m^2
var ag = 9.81;  // m / s^2
var k_spr = 10;
var G = 6.67430E-2 // km^3/kg s^2  1 pixel = 1 km for this

var loop = function() {
    if ( ! mouse.isDown) {
        // Do physics
            // Drag force: Fd = -1/2 * Cd * A * rho * v * v
        var r = norm([ball.position.x-earth.position.x,ball.position.y-earth.position.y])
        var FG = G*ball.mass*earth.mass/r/r
        var d_vec = norm_vec([earth.position.x-ball.position.x,earth.position.y-ball.position.y])
        var Fx = FG*d_vec[0]-slingshot.d.x*k_spr;
        var Fy = FG*d_vec[1]-slingshot.d.y*k_spr;
        Fx = (isFinite(Fx) ? Fx : 0);
        Fy = (isFinite(Fy) ? Fy : 0);
            // Calculate acceleration ( F = ma )
        var ax = Fx / ball.mass;
        var ay = (Fy / ball.mass);
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
    //  bounceOffWalls()
      bounceOffEarth()
    // Draw the ball
    ctx.clearRect(0,0,width,height);

    ctx.save();
    ctx.fillStyle = ball.color
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



    // Draw the slingshot
    drawSlingshotGravity()
}
    setup();
