let frameCount = 0;
var initialX = null;
var initialY = null;
var move=3;
var myGamePiece;
function startGame(){
	myGameArea.start();
	myGamePiece=new component(60, 60, "green", 200, 0);
}
var myGameArea={
    canvas:document.createElement("canvas"),
	start:function(){
		this.canvas.width=document.documentElement.clientWidth;
		this.canvas.height=document.documentElement.clientHeight;
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
	this.update=function(){
		ctx=myGameArea.context;
		ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
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
			move=1;
		}
		else{
			//alert("right");
			move=2;
		}
	}
	else{
		if(diffY>0){
			//alert("up");
			move=3;
		}
		else{
			//alert("down");
			move=4;
		}
	}
	initialY=null;
	initialX=null;
}
function keyDown(e){
    
    switch (e.keyCode){
        case 38:
			//up
            move=3;
        break;
        case 40:
			//down
            move=4;
        break;
        case 37:
			//left
            move=1;
        break;
        case 39:
			//right
            move=2;
        break;
    }
}
function keyUp(e){
    move=0;
}



function updateGameArea(){
    //frameCount++;//only for sprite animation
    myGameArea.clear();
    myGameArea.frameNo += 1;
	myGamePiece.update();
	var retroDiv = document.getElementById("retro")
    switch(move){
		case 1:
		//game piece goes left
		if(myGamePiece.x>0){

			myGamePiece.x-=10;
		}

		break;
		case 2:
		if(myGamePiece.x<retroDiv.offsetWidth){
			
		
		myGamePiece.x+=10;

			}
		break;
		case 3:
		if(myGamePiece.y>0){
		myGamePiece.y-=10;
		}	
		break;
		case 4:
		if(myGamePiece.y<retroDiv.offsetHeight){
			myGamePiece.y+=10;
		}	
		break;
		case 4:
		break;
	}
}
startGame();