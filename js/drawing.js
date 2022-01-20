const backgroundColor = '#000000';
const lineColor = '#FFFFFF';
const lineWidth = 8;

const canvas = document.getElementById('drawing-box');
const ctx = canvas.getContext('2d');

var prevX=0, 
    prevY=0,
    currX=0,
    currY=0;
var isDrawing = false;

function clearCanvas() {
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.fillStyle = backgroundColor;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';  
}

function initCanvas() {
  clearCanvas();
  canvas.addEventListener('mousemove', (evt) => {
    updateCoord(evt);
    if(isDrawing) {
      drawLine();
    }
  });
  canvas.addEventListener('mousedown', (evt) => { isDrawing = true; }, false);
  canvas.addEventListener('mouseup', (evt) => { isDrawing = false; }, false);
  canvas.addEventListener('mouseout', (evt) => { isDrawing = false; }, false);
};

function updateCoord(evt) {
  prevX = currX;
  currX = evt.clientX - canvas.offsetLeft;
  prevY = currY;
  currY = evt.clientY - canvas.offsetTop;
};
function drawLine() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.closePath();
};

initCanvas();
