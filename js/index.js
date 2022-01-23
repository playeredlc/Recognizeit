// const modelPath = '../tensorflow/tfjs_savedmodel/model.json';
// let isModelLoaded = false;
// let tfModel;

// function predictDigit(tfModel, X) {
//   const prediction = tfModel.execute({'X': X}, ['accuracy_calc/prediction']);
//   prediction.print();
//   prediction.dispose();
// }

// async function run() {
//   if(!isModelLoaded) {
//     tfModel = await tf.loadGraphModel(modelPath);
//     isModelLoaded = true;
//   }
//   const { X, img } = canvasToTensor(canvas);
//   predictDigit(tfModel, X);
// };

async function run() {
  if(!isModelLoaded) {
    await loadModel();
  }
  
  const { X, img } = canvasToTensor(canvas);
  predictDigit(X);
  
  X.dispose();
  img.delete();
};
