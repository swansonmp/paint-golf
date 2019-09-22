const WIDTH = 800;
const HEIGHT = 800;

var canvas;
var ctx;

var btn;

var ball;

var teeX = -1;
var teeY = -1;
var holeX = -1;
var holeY = -1;

/*
 *	Function performed on page load
 */
function init() {
  var img = new Image();
  img.src = "hole1.png";
  img.crossOrigin = "Anonymous";
  
  btn = document.getElementById('btn');
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  
  //initiate the hole bg
  drawImage(img);
  
  $('#canvas').mousemove(function(e) {
		var pos = findPos(this);
		var x = e.pageX - pos.x;
		var y = e.pageY - pos.y;
		var coord = "x=" + x + ", y=" + y;
		var c = this.getContext('2d');
		var p = c.getImageData(x, y, 1, 1).data; 
		var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
		$('#coord').html(coord + "<br>" + hex);
	});
  
  //find the tee box
  findTeeAndHole();

  btn.addEventListener('click', function () {	//on click
	drawBall();	//draw the ball
  });
  
}

/*
 *	Draws the image to the canvas
 */
function drawImage(img) {
	// Set the canvas the same width and height of the image
	if (img.width != WIDTH || img.height != HEIGHT) {
		document.getElementById("debug").textContent="ERROR: INVALID IMAGE SIZE";
	}
	else {
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		ctx.drawImage(img, 0, 0);
	}
}

/*
 *	Draws ball in initial tee pos
 */
function drawBall() {
	ctx.fillStyle = "white";
	ctx.fillRect(teeX,teeY,4,4);
}

/*
 *	Find tee and hole
 */
function findTeeAndHole() {
	//for loop to fine tee and hole	
	for (var y = 0; y < WIDTH; y++) {
		var p = ctx.getImageData(0,y,WIDTH,1).data;
		for (var i = 0; i < p.length; i += 4) {
			if ((teeX == -1) && (p[i] == 255) && (p[i+1] == 255) && (p[i+2] == 0)) {
				teeX = i/4;
				teeY = y;
			}
			else if ((holeX == -1) && (p[i] == 255) && (p[i+1] == 0) && (p[i+2] == 0)) {
				holeX = i/4;
				holeY = y;
			}
		}
	}
	//print to spans
	document.getElementById("tee").textContent=teeX + " " + teeY;
	document.getElementById("hole").textContent=holeX + " " + holeY;
}

//Helper methods for mouse hover code////////////////
//mouse hover function code
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
////////////////////////////////////////////////////////

window.addEventListener('load', init);