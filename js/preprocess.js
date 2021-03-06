function canvasToTensor(canvas) {
  // full preprocess workflow using the functions defined in this module.
  
  // load image and convert to gray scale
  let img = loadImg(canvas);
  img = toGrayScale(img);
  // get contours to calculate bounding rectangle and crop
  let rect = getBoundRect(getContours(img));
  img = cropImg(rect, img);
  // resize img
  img = resizeImg(img);
  // add padding
  img = addPadding(img);
  // calculate center of mass and shift
  const { cx, cy } = getCenterOfMass(img);
  img = shiftCenterOfMass(img, cx, cy);
  // create tf.Tensor ()
  const X = createTensor(normalizePixels(img));

  return { X: X, img: img };
};

function loadImg(canvas) {
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

  hierarchy.delete();

  return contours;
};

function getBoundRect(contours) {
  let cnt = contours.get(0);
  let rect = cv.boundingRect(cnt);

  contours.delete();
  cnt.delete();
  return rect;
};

function cropImg(boundRect, img) {
  img = img.roi(boundRect);

  return img;
};

function resizeImg(img) {
  // the model expects the input data to have 20 pixels on the biggest side. (total is 28x28, the missing pixels must be completed with a border)
  
  let height = img.rows;
  let width = img.cols;
  if(height > width) {
    // height is the biggest side
    height = 20;
    const scaleFactor = (img.rows/height);
    width = Math.round(img.cols/scaleFactor);
  }
  else {
    // width is the biggest side
    width = 20;
    const scaleFactor = (img.cols/width);
    height = Math.round(img.rows/scaleFactor);
  }
  
  let newSize = new cv.Size(width, height);
  cv.resize(img, img, newSize, 0, 0, cv.INTER_AREA);

  return img;
};

function addPadding(img) {
  // calculate the extra pixels to make the img 28x28
  const width = img.cols;
  const height = img.rows;

  const padLeft = Math.ceil(4 + (20 - width)/2);
  const padRight = Math.floor(4 + (20 - width)/2);
  const padTop = Math.ceil(4 + (20 - height)/2);
  const padBottom = Math.floor(4 + (20 - height)/2);

  // add padding as a border
  const blackColor = new cv.Scalar(0, 0, 0, 1);
  cv.copyMakeBorder(img, img, padTop, padBottom, padLeft, padRight, cv.BORDER_CONSTANT, blackColor);

  return img;
};

function getCenterOfMass(img) {
  let contours = getContours(img);
  let cnt = contours.get(0);

  const moments = cv.moments(cnt, false);
  const cx = moments.m10 / moments.m00;
  const cy = moments.m01 / moments.m00;

  contours.delete();
  cnt.delete();

  return { cx: cx, cy: cy };
};

function shiftCenterOfMass(img, cx, cy){
  // shift based on the center of mass
  const xTranslate = Math.round(img.cols/2.0 - cx);
  const yTranslate = Math.round(img.rows/2.0 - cy);
  const imgSize = new cv.Size(img.cols, img.rows);
  const transformMatrix = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, xTranslate, 0, 1, yTranslate]);
  const blackColor = new cv.Scalar(0, 0, 0, 1);
  // apply shift
  cv.warpAffine(img, img, transformMatrix, imgSize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, blackColor);

  transformMatrix.delete();

  return img;
};

function normalizePixels(img) {
  let pixelValues = img.data;
  pixelValues = Float32Array.from(pixelValues);
  pixelValues = pixelValues.map(px => px/255.0);

  return pixelValues;
};

function createTensor(normalizedPixels) {
  const X = tf.tensor([normalizedPixels]);

  return X;
};
