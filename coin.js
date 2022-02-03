var boardWidth = 500;
var boardHeight = 500;
var coinRadius = 10;

coins = []
coins.push(new Coin(10,10,coinRadius));
coins.push(new Coin(490,10,coinRadius));

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
    this.update = function(){
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
    }

    this.rebound = function(){
        if ((this.x+this.r+this.vx)>=boardWidth || (this.x-this.r+this.vx)<=0){
            this.vx*=(-1);
        }
        if ((this.y+this.r+this.vy)>=boardHeight || (this.y-this.r+this.vy)<=0){
            this.vy*=(-1);
        }
    }

    this.collide = function(i,j){ //i = new coin; j = present coin
        var dis = dist(coins[i].x+coins[i].vx, coins[j].x+coins[j].vx, coins[i].y+coins[i].vy, coins[j].y+coins[j].vy);
        if (dis<=(2*r)){
            var dx = coins[j].x+coins[j].vx - (coins[i].x+coins[i].vx);
            var dy = coins[j].y+coins[j].vy - (coins[i].y+coins[i].vy);
            var collideAngle = Math.atan2(dy,dx);

            var speed1 = Math.sqrt(coins[i].vx*coins[i].vx + coins[i].vy*coins[i].vy );
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
        }
    }
}



