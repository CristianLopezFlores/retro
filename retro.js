var initialX = null;
var initialY = null;
var move=0;
var myGamePiece;
let img = new Image();
img.src = 'character2.png';
const width = 150;
const height = 150;

let img1= new Image();
img1.src='adventure-complete.png';
const width1=222;
const height1=222;

function startGame(){
	myGameArea.start();
	myGamePiece=new component(150,150, "green", 100, 465);
}
var myGameArea={
    canvas:document.createElement("canvas"),
	start:function(){
		//this.canvas.width=document.documentElement.clientWidth;
		//this.canvas.height=document.documentElement.clientHeight;
		this.canvas.width=1200;
		this.canvas.height=650;
		this.context=this.canvas.getContext("2d");

		document.getElementById('retro').appendChild(this.canvas);
		this.frameNo=0;
		this.interval=setInterval(updateGameArea,20);
        window.addEventListener("touchstart", startTouch, false);
        window.addEventListener("touchmove", moveTouch, false);
        window.addEventListener("keydown", keyDown, false);
        window.addEventListener("keyup", keyUp, false);
		//window.addEventListener('resize', resizeCanvas, false);

	},
	clear:function(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}


}
function component(width,height,color,x,y,type){
	this.type=type;
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.speedY=8;
	this.speedX=8;
	this.x=x;
	this.y=y;
	this.gravity;
	this.gravitySpeed=0;
	this.cycleLoop=[0,1,2,3,4,5];
	this.currentLoopIndex = 0;
	this.frameCount = 0;
	this.currentDirection = 0;
	this.direction=0;
	this.frameCount=0;
	this.frameChange=0;
	this.frameX=0;
	this.frameY=0;
	this.maxFrames=0;
	this.jumped=false;
	this.update=function(){
		ctx=myGameArea.context;
		//gravity
		//running requires more sprite images
		if(this.direction==1||this.direction==11){
			//alert("5");
			this.maxFrames=5;
		}
		else if(this.direction==2){
			this.frameChange=13;
		}
		else{
			//alert("6");
			this.maxFrames=3;
			this.frameChange=8;
		}
		if(this.y<465){
			this.y+=3;
		}
		//change sprite image every 8 frames
		if(this.frameCount>=this.frameChange){
			this.frameCount=0;
			if(this.frameX>=this.maxFrames){
				this.frameX=0;
			}
			else{
				this.frameX++;
			}
		}
		//////////////////////////////////////////////
		switch(this.direction){
			case 0:
				//alert("still");
				this.frameY=0;
				break;
			case 1:	
				//alert("right");
				if(this.x+this.width<1200){
					this.x+=10;
				}
				this.frameY=1;
				break;
			case 2:
				if(this.jumped==false){
				
					if(this.y>0){
						this.y-=100;
						this.jumped=true;
					}
					
					//alert("Up");
				}
				this.frameY=2;
				break;
			case 4:
				if(this.y+this.height<650){
					this.y+=10;
				}
					this.frameY=0
				//alert("Down");
				break;
			case 10:
				this.frameY=10;
				break;
			case 11:
				
				//alert("left");
				if(this.x>0){

					this.x-=10;
				}
				this.frameY=11;
				break;
		}
		ctx.drawImage(img1,this.frameX* width1, this.frameY * height1, width1, height1,this.x, this.y, 180,180);

		
	}
}




function startTouch(e){
	//alert("this worked");
	initialX=e.touches[0].clientX;
	initialY=e.touches[0].clientY;
}
function moveTouch(e){
	//alert("move");
	if(initialX==null){
		return;
	}
	if(initialY==null){
		return;
	}
	var currentX=e.touches[0].clientX;
	var currentY=e.touches[0].clientY;

	var diffX=initialX-currentX;
	var diffY=initialY-currentY;

	if(Math.abs(diffX)>Math.abs(diffY)){
		if(diffX>0){
			//alert("left");
			myGamePiece.direction=1;
		}
		else{
			//alert("right");
			myGamePiece.direction=2;
		}
	}
	else{
		if(diffY>0){
			//alert("up");
			myGamePiece.direction=3;
		}
		else{
			//alert("down");
			myGamePiece.direction=4;
		}
	}
	initialY=null;
	initialX=null;
}
function keyDown(e){
    
    switch (e.keyCode){
		case 32:
			myGamePiece.direction=5;
		break;
        case 38:
			//up
			
			myGamePiece.direction=2;
			
        break;
        case 40:
			//down
			
           // myGamePiece.direction=4;
        break;
        case 37:
			//left
			
            myGamePiece.direction=11;
        break;
        case 39:
			//right
			
            myGamePiece.direction=1;
        break;
    }
}
function keyUp(e){
	if(myGamePiece.direction<10){
		//alert(myGamePiece.direction);
	
		myGamePiece.direction=0;
	}
	else{
		
		myGamePiece.direction=10;
	}
}



function updateGameArea(){
    //frameCount++;//only for sprite animation
    
    myGameArea.frameNo += 1;
	
	
	var retroDiv = document.getElementById("retro")
    
	myGameArea.clear();
	myGamePiece.frameCount++;
	myGamePiece.update();
}
startGame();
