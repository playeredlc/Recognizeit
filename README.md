
<h1 align="center">
	Recognize<i>it</i>.
</h1>

<div align="center">

<strong>Machine learning model trained to recognize handwritten digits, deployed to a website using <i>Tensorflow.js.</i> </strong>

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/playeredlc/Recognizeit/blob/master/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/aca2db4a-3dd7-42a1-aa47-d80d597f1d3c/deploy-status)](https://recognizeit.netlify.app/)

Check online: [recognizeit.netlify.app/](https://recognizeit.netlify.app/)

[About](#about)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
[Technologies](#technologies)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
[How to run](#running-locally)&nbsp;&nbsp;&nbsp;

</div>

## About
Recognizeit is a project with the goal to allow users to interact with a functional machine learning model, trained to recognize handwritten digits.

The model was developed during my studies in data science and machine learning, it was defined and trained using [TensorFlow](https://www.tensorflow.org/) with Python. Details about this process can be found in this [repository](https://github.com/playeredlc/DataScience-Learnings/tree/master/Neural_Networks#handwritten-digits-recognition).

The tensorflow model was saved and [converted](https://www.tensorflow.org/js/tutorials/conversion/import_saved_model#step_1_convert_an_existing_tensorflow_model_to_the_tensorflowjs_web_format) to [TensorFlow.js](https://www.tensorflow.org/js), which makes it possible to load and run it in the browser.

An interface allows the user to draw a digit with a mouse or touchscreen, the user input is preprocessed using [OpenCV](https://docs.opencv.org/4.x/d5/d10/tutorial_js_root.html) to have the same format as the training data. After that, it is fed to the model which makes the prediction.

## Technologies
##### Development
* HTML / CSS / JavaScript
* [TensorFlow.js](https://www.tensorflow.org/js)
* [OpenCV.js](https://docs.opencv.org/4.x/d5/d10/tutorial_js_root.html)
##### Deploy
* [Netlify](https://www.netlify.com/)

## Running locally
#### Pre-requisites:
To run this application locally you will need to install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to clone the repository. It is also necessary to have [Python](https://www.python.org/) installed to easily launch a http-server to serve the model to the browser.

```bash
# clone this repository
$ git clone https://github.com/playeredlc/Recognizeit

# go to the root of directory
$ cd Recognizeit

# launch the local server using the 'start-server.sh' script (make sure it is executable)
$ sudo chmod +x start-server.sh
$ ./start-server

# you can find the page being served locally at 
# http://localhost:8000
```

<hr>

<strong><i> </> </i></strong> Developed by <strong>edlc</strong>. [Get in touch!](https://github.com/playeredlc) :metal:
