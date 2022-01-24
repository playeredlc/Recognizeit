const modelPath = '../tensorflow/tfjs_savedmodel/model.json';
let isModelLoaded = false;
let tfModel;

async function loadModel() {
  if(!isModelLoaded) {
    tfModel = await tf.loadGraphModel(modelPath);
    isModelLoaded = true;
  }
};

function predictDigit(X) {
  const prediction = tfModel.execute({'X': X}, ['accuracy_calc/prediction']);  
  const predictionAsNumber = Number(prediction.dataSync()[0]);

  prediction.dispose();
  
  return predictionAsNumber;
};

loadModel();
