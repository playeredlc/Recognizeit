// canvas to display partial results of preprocess steps
function displayImg() {
  
  // load img and convert to gray scale
  let img = loadImg();
  img = toGrayScale(img);

  // get contours to calculate bounding rectangle and crop
  let rect = getBoundRect(getContours(img));
  img = cropImg(rect, img);

  // create canvas and display img
  const outputCanvas = document.createElement('canvas');
  cv.imshow(outputCanvas, img);
  document.body.appendChild(outputCanvas);
};

function loadImg() {
  let img = cv.imread(canvas);

  return img;
};

function toGrayScale(img) {
  cv.cvtColor(img, img, cv.COLOR_RGB2GRAY, 0);
  cv.threshold(img, img, 175, 255, cv.THRESH_BINARY);

  return img;
};

function getContours(img) {
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(img, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

  return contours;
};

function getBoundRect(contours) {
  let cnt = contours.get(0);
  let rect = cv.boundingRect(cnt);

  return rect;
};

function cropImg(boundRect, img) {
  img = img.roi(boundRect);

  return img;
};
