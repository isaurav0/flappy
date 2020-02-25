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

    this.update = function(clicked, GRAVITY){
        this.clearCanvas()
        if(clicked && this.y>0){            
            this.y -= 15;
            const wingAudio = document.getElementById("wing");
            wingAudio.play();
        }
        else if(this.y<HEIGHT-13){
            this.y = this.y + GRAVITY ;
            // this.clearCanvas()
        }
        else{

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

    //from front and back
    if(bird.x+bird.size >= wall.x && bird.x <= wall.x + wall.size)
        return true
    else
        return false

}

window.addEventListener("keypress", function(e){
    if(!gameStop){
        bird.update(true, 0);
        GRAVITY = 0
    }
})


function gameSetup(){   
    canvas = document.getElementById('platform');
    ctx = canvas.getContext('2d');    

    player = new Image(7, 7);
    player.src = "./images/don.png";

    score = 0;
    gameStop = false;
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    GRAVITY = 0;
    bird = new Bird(20);
    walls = [];
    scoreUpdate = false
    for(i=0;i<5;i++){
        // Wall(height, size, turn, gap, distance)
        walls[i] = new Wall(80, 35, i, 50, 1)
    }    
    var request = window.requestAnimationFrame(runningState);
}



function runningState(){  
    //bird.update(clicked, GRAVITY)  GRAVITY is for accelerating in freefall
    bird.update(false, GRAVITY)

    //update score
    if(isWallActive(bird, walls[0]))
        scoreUpdate = true
    else{
        if(scoreUpdate){
            score++;
            const clickAudio = document.getElementById("click");
            clickAudio.play();

            //show score
            scoreBoard = document.getElementById("score");
            scoreBoard.innerText = score
            scoreUpdate = false
        }
    }
    
    //implement queue for walls
    if(walls[0].x < - walls[0].size - 10){
        walls = walls.slice(1, )
        // Wall(height, size, turn, gap, distance)
        wall = new Wall(40, 35, 1, 40, 2)
        walls.push(wall)
    }
        
    for(i=0;i<walls.length;i++){
        if(isWallActive(bird, walls[i]))
            walls[i].update(false)
        else
            walls[i].update(false)
    }    
    

    if(gameOver(bird, walls[0])){
        const gameOverMusic = document.getElementById("gameOver");
        gameOverMusic.play()
        gameStop = true 
        const playAgain = document.getElementById("start");
        const mainMenu = document.getElementById("mainmenu");
        playAgain.style.visibility= "visible"
        mainMenu.style.visibility= "visible"

        return
    }        
    GRAVITY+=0.05;
    window.requestAnimationFrame(runningState);
}


gameSetup();