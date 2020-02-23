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
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y, size, size);
        ctx.fill();
    }

    this.update = function(time, clicked){
        if(clicked){
            this.y -= 15;
        }
        if(this.y<HEIGHT-13){
            this.y = this.y + count ;
            this.clearCanvas()
        }
        this.drawBird();        
    }

    this.clearCanvas= function(){
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,WIDTH, HEIGHT);
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
        ctx.fillStyle = "red";
        if(up)
            ctx.fillRect(this.x+turn*100,0, 10, height);
        else
            ctx.fillRect(this.x+turn*100,canvas.height-height, 10, height);
        ctx.fill();
    }
}



function setup(){
    bird = new Bird(7)
    walls = []
    for(i=0;i<100;i++)
        walls[i] = new Wall(60, 10, i%2==0, i)
}

function startGame(){    
    bird.update(count)
    for(i=0;i<5;i++)
        walls[i].update();
    count+=0.05;
    window.requestAnimationFrame(startGame);
}

setup();
window.requestAnimationFrame(startGame);
window.addEventListener("keypress", function(e){
    bird.update(0, true);  
    count = 0
})
