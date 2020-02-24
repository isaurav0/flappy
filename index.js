const canvas = document.getElementById('platform');
const ctx = canvas.getContext('2d');
const player = new Image(7, 7);
player.src = "don.png";

const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const GRAVITY = 1; 
var count = 1;
var score = 0;
gameStop = false;


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


function setup(){   
    count = 0
    score = 0 
    gameStop = false
    bird = new Bird(20)
    walls = []
    for(i=0;i<5;i++){
        walls[i] = new Wall(40, 35, i, 40, 1)
    }
        
}

function startGame(){    

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
    window.requestAnimationFrame(startGame);
    console.log("animating")
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
    if(isWallActive(bird, wall) && ((bird.y <= wall.height) || bird.y+bird.size >= (wall.height+wall.gap))){
        return true
    }
    else
        return false
}

function isWallActive(bird, wall){
    if(wall.x <= 40 && wall.x>=-wall.size){
        return true
    }        
    else{
        return false
    }        
}


//actual events happening
setup();
var request = window.requestAnimationFrame(startGame);
window.addEventListener("keypress", function(e){
    if(!gameStop){
        bird.update(0, true);
        count = 0
    }
    else{
        setup();
        var request = window.requestAnimationFrame(startGame);        
    }
})


