async function run() {
  if(!isModelLoaded) {
    await loadModel();
  }

  const { X, img } = canvasToTensor(canvas);
  const predictedDigit = predictDigit(X);

  X.dispose();
  img.delete();
  console.log(tf.memory());

  console.log('The digit was recognized as: ', predictedDigit);

};
