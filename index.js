const canvas = document.getElementById('platform');
const ctx = canvas.getContext('2d');
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
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y, size, size);
        ctx.fill();
    }

    this.update = function(time, clicked){
        this.clearCanvas()
        if(clicked){
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

    this.update = function(){
        this.x -=2;
        this.drawWall();
    }

    this.drawWall = function(){
        ctx.fillStyle = "green";
        if(up)
            ctx.fillRect(this.x+turn*100,0, size, height);
        else
            ctx.fillRect(this.x+turn*100,canvas.height-height, size, height);
        ctx.fill();
    }
}



function setup(){
    bird = new Bird(7)
    walls = []
    for(i=0;i<100;i++)
        walls[i] = new Wall(60, 30, i%2==0, i)
}

function startGame(){    
    bird.update(count)
    for(i=0;i<100;i++){
        walls[i].update();
    }
    if(gameOver(bird, walls)){
        cancelAnimationFrame(startGame)
    }
        
    count+=0.05;
    window.requestAnimationFrame(startGame);
}

function gameOver(bird, walls){

    return false;

}




setup();
window.requestAnimationFrame(startGame);
window.addEventListener("keypress", function(e){
    bird.update(0, true);  
    count = 0
})
