var boardWidth = 500;
var boardHeight = 500;
var coinRadius = 10;

var coins = []
coins.push(new Coin(10,10,coinRadius));
coins.push(new Coin(490,10,coinRadius));

// this function is used to check if all coins are at rest
function allCoinsRest(){
    for (let i=0;i<coins.length;i++){
        if (coins[i].vx!==0 || coins[i].vy!==0){
            return false;
        }
    }
    return true;
}



//This fucntion ise used to find distance between 2 points
function dist(x1,x2,y1,y2){
    var dis = Math.pow((x1-x2),2)+Math.pow((y1-y2),2);
    dis = Math.sqrt(dis);
    return dis;
}

function Coin(x,y,r){

    //components
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.r = r;

    //functions
    //This function is used to update the postion adn velocity of coin
    this.update = function(){
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;

        //This makes velocity to be zero if it decrease beyond 0.5
        if (this.vx<0.5){
            this.vx = 0;
        }
        if (this.vy<0.5){
            this.vy = 0;
        }
    }

    //This is used to rebound the coin if we hit the wall if carrom board
    this.rebound = function(){
        if ((this.x+this.r+this.vx)>=boardWidth || (this.x-this.r+this.vx)<=0){
            this.vx*=(-1);
        }
        if ((this.y+this.r+this.vy)>=boardHeight || (this.y-this.r+this.vy)<=0){
            this.vy*=(-1);
        }
    }

    //This is used for the collision between coins
    this.collide = function(i,j){ //i = new coin; j = present coin
        // finding the distance between the centers and check if distance is <2r
        var dis = dist(coins[i].x+coins[i].vx, coins[j].x+coins[j].vx, coins[i].y+coins[i].vy, coins[j].y+coins[j].vy);
        if (dis<=(2*r)){
            var dx = coins[j].x+coins[j].vx - (coins[i].x+coins[i].vx);
            var dy = coins[j].y+coins[j].vy - (coins[i].y+coins[i].vy);
            var collideAngle = Math.atan2(dy,dx);

            //get the individual speeds and velocities and the angle of collisions
            var speed1 = Math.sqrt(coins[i].vx*coins[i].vx + coins[i].vy*coins[i].vy );
<<<<<<< HEAD
		    var speed2 = Math.sqrt(coins[j].vx*coins[j].vx + coins[j].vy*coins[j].vy);

		    var direction1 = Math.atan2(coins[i].vy, coins[i].vx);
		    var direction2 = Math.atan2(coins[j].vy, coins[j].vx);

		    var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
		    var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
		    var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
		    var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);

            //exchange the velocities of coins (due to inelastic collision)
		    var final_velocityx_1 = velocityx_2;
		    var final_velocityx_2 = velocityx_1;
		    var final_velocityy_1 = velocityy_1;
		    var final_velocityy_2 = velocityy_2;

            //get the final velocities in respective directions with respect to the line of collision.
		    ball1_velocityx = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
		    ball1_velocityy = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
		    ball2_velocityx = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
		    ball2_velocityy = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;

		    coins[i].vx = ball1_velocityx;
		    coins[i].vy = ball1_velocityy;
		    coins[j].vx = ball2_velocityx;
		    coins[j].vy = ball2_velocityy;

		   	coins[j].x+=coins[j].vx;
			coins[j].y+=coins[j].vy;
			coins[i].x+=coins[i].vx;
			coins[i].y+=coins[i].vy;
=======
	    var speed2 = Math.sqrt(coins[j].vx*coins[j].vx + coins[j].vy*coins[j].vy);

	    var direction1 = Math.atan2(coins[i].vy, coins[i].vx);
	    var direction2 = Math.atan2(coins[j].vy, coins[j].vx);

	    var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
	    var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
	    var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
	    var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);

	    var final_velocityx_1 = velocityx_2;
	    var final_velocityx_2 = velocityx_1;
	    var final_velocityy_1 = velocityy_1;
	    var final_velocityy_2 = velocityy_2;

	    ball1_velocityx = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
	    ball1_velocityy = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
	    ball2_velocityx = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
	    ball2_velocityy = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;

	    coins[i].vx = ball1_velocityx;
	    coins[i].vy = ball1_velocityy;
	    coins[j].vx = ball2_velocityx;
	    coins[j].vy = ball2_velocityy;
		
		coins[j].x+=coins[j].vx;
		coins[j].y+=coins[j].vy;
		coins[i].x+=coins[i].vx;
		coins[i].y+=coins[i].vy;
>>>>>>> 9490b1d98c823a3bee6768b508904ac32fe7afc1
        }
    }
}



