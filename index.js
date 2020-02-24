const canvas = document.getElementById('platform');
const ctx = canvas.getContext('2d');
const player = new Image(7, 7);
player.src = "don.png"
const HEIGHT = canvas.height
const WIDTH = canvas.width
const GRAVITY = 0.001;
var count = 1;


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


function Wall(height, size, up, turn){
    this.x = WIDTH-size
    this.gone = false

    this.update = function(){
        this.x -=2;
        this.drawWall();
    }

    this.drawWall = function(){
        ctx.fillStyle = "green";
        if(up)
            ctx.fillRect(this.x+turn*90,0, size, height);
        else
            ctx.fillRect(this.x+turn*50,canvas.height-height, size, height);
        
        if(this.gone){
            this.x = WIDTH-size
        }
        ctx.fill();
    }
   
}

function setup(){
    bird = new Bird(20)
    walls = []
    for(i=0;i<100;i++)
        walls[i] = new Wall(40, 35, i%2==0, i)
}

function startGame(){    
    bird.update(count)
    for(i=0;i<100;i++){
        walls[i].update();
    }
    if(gameOver(bird, walls)){
        const gameOverMusic = document.getElementById("gameOver");
        gameOverMusic.play()
        return
    }        
    count+=0.05;
    window.requestAnimationFrame(startGame);
}

function gameOver(bird, walls){
    if(bird.y>=HEIGHT-bird.size){        
        return true
    }
    else{
        return false
    }
        

}

setup();
var request = window.requestAnimationFrame(startGame);
window.addEventListener("keypress", function(e){
    if(!gameOver(bird, walls)){
        bird.update(0, true);  
        count = 0
    }
    else{
        setup();
        var request = window.requestAnimationFrame(startGame);
    }
})


