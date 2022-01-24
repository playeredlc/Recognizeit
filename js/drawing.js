const backgroundColor = '#000000';
// const lineColor = '#FFFFFF';
const lineColor = '#99FEFF';
const lineWidth = 8;

const canvas = document.getElementById('drawing-box');
const ctx = canvas.getContext('2d');

var prevX=0, 
    prevY=0,
    currX=0,
    currY=0;
    x=0;
    y=0;
var isDrawing = false;

function clearCanvas() {
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.fillStyle = backgroundColor;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  document.getElementById('result').innerHTML = '';
  document.getElementById('prediction').innerHTML = '';
};

function initCanvas() {
  clearCanvas();
  
  // mouse events
  canvas.addEventListener('mousemove', (evt) => {
    updateCoord(evt, false);
    if(isDrawing) {
      drawLine();
    }
  });
  canvas.addEventListener('mousedown', (evt) => { isDrawing = true });
  canvas.addEventListener('mouseup', (evt) => { isDrawing = false });
  canvas.addEventListener('mouseout', (evt) => { isDrawing = false });

  // touch events
  canvas.addEventListener('touchstart', (evt) => { isDrawing = true; updateCoord(evt, true); });
  canvas.addEventListener('touchmove', (evt) => {
    updateCoord(evt, true);
    if(isDrawing) {
      drawLine();
    }
  });
  canvas.addEventListener('touchend', (evt) => { isDrawing = false });
  canvas.addEventListener('touchcancel', (evt) => { isDrawing = false });
};

function updateCoord(evt, isTouch) {
  if(isTouch) {
    x = evt.touches[0].clientX;
    y = evt.touches[0].clientY;
  } else {
    x = evt.clientX;
    y = evt.clientY;
  }
  prevX = currX;
  currX = x - canvas.offsetLeft;
  prevY = currY;
  currY = y - canvas.offsetTop;
};

function drawLine() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.closePath();
};

initCanvas();
