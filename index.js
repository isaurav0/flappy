// var canvas = document.getElementById('platform');
// var ctx = canvas.getContext('2d');
// var player = new Image(7, 7);
// player.src = "./images/don.png";

// var HEIGHT = canvas.height;
// var WIDTH = canvas.width;
// var GRAVITY = 1; 
// var count = 1;
// var score = 0;
var gameStop = false;

// window.addEventListener('resize', setCanvas(canvas.width, canvas.height))
window.addEventListener('resize', e=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
})


function Bird(size){
    this.size = size;
    this.x = 10
    // this.y = HEIGHT/2
    this.y = 0
    this.drawBird = function(){
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x,this.y, size, size);
        // ctx.fill();
        ctx.drawImage(player, this.x,this.y, size, size);
    }

    this.update = function(time, clicked){
        this.clearCanvas()
        if(clicked & this.y>0+this.size){
            const clickAudio = document.getElementById("click");
            clickAudio.play();
            this.y -= 15;
        }
        if(this.y<HEIGHT-13){
            this.y = this.y + count ;
            // this.clearCanvas()
        }
        this.drawBird();        
    }

    this.clearCanvas= function(){
        ctx.clearRect(0,0,WIDTH, HEIGHT);
        ctx.fill();
    }
    
}


function Wall(height, size, turn, gap, distance){
    this.x = WIDTH + turn*distance*100
    this.size = size
    this.gap = gap
    this.height = height

    this.update = function(isActive){
        this.x -=2;                
        if(isActive)
            ctx.fillStyle = "orange";
        else
            ctx.fillStyle = "green";
        this.drawWall();
    }

    this.drawWall = function(){                
        ctx.fillRect(this.x,0, size, height);
        ctx.fillRect(this.x-3,height-4, size+6, 4);

        ctx.fillRect(this.x,height+gap, size, HEIGHT);
        ctx.fillRect(this.x-3,height+gap-2, size+6, 4);
        ctx.fill();
    }
   
}


function gameStart(){   

    canvas = document.getElementById('platform');
    ctx = canvas.getContext('2d');
    player = new Image(7, 7);
    player.src = "./images/don.png";

    count = 0
    score = 0 
    gameStop = false
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    GRAVITY = 1; 
    count = 0;
    score = 0;
    bird = new Bird(20)
    walls = []
    for(i=0;i<5;i++){
        walls[i] = new Wall(40, 35, i, 40, 1)
    }
    var request = window.requestAnimationFrame(runningState);
}



function runningState(){    

    bird.update(count)
    if(walls[0].x < - walls[0].size - 20 ){
        score++;
        walls = walls.slice(1, )
        wall = new Wall(40, 35, 1, 50, 0.9)
        walls.push(wall)
    }
    
    for(i=0;i<walls.length;i++){
        if(isWallActive(bird, walls[i]))
            walls[i].update(true)
        else
            walls[i].update(false)
    }    
    

    if(gameOver(bird, walls[0])){
        const gameOverMusic = document.getElementById("gameOver");
        gameOverMusic.play()
        gameStop = true
        return
    }        
    count+=0.05;
    window.requestAnimationFrame(runningState);
}

function gameOver(bird, wall){
    if(bird.y>=HEIGHT-bird.size){        
        return true
    }
    else if(collide(bird,wall)){
        return true
    } 
    else{
        return false
    }
}

function collide(bird, wall){
    if(isWallActive(bird, wall) && ((bird.y < wall.height) || bird.y+bird.size > (wall.height+wall.gap))){
        return true
    }
    else
        return false
}

function isWallActive(bird, wall){    

    //from front and back
    if(bird.x+bird.size >= wall.x && bird.x <= wall.x + wall.size)
        return true
    else
        return false

}

window.addEventListener("keypress", function(e){
    if(!gameStop){
        bird.update(0, true);
        count = 0
    }
})

//actual events happening
gameStart();
