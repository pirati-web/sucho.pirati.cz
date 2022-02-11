

const imageReader = new FileReader();

const fgImage = new Image();
const recruitImage = new Image();

const canvas = document.getElementById("picture");
const ctx = canvas.getContext("2d");

const setFile = (file) => {
  if (!file.type.startsWith("image/")) {
    return;
  }

  imageReader.readAsDataURL(file);
};

var drag = false;
var dragStart;
var dragEnd;
var scaleImg = 1; 

dragStart = {
  x: 0,
  y: 0
}

dragEnd = {
  x: canvas.width/2,
  y: canvas.height/3
}

canvas.addEventListener("dragover", (e) => e.preventDefault());

canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  if (!e.dataTransfer || e.dataTransfer.files.length <= 0) {
    return;
  }

  setFile(e.dataTransfer.files[0]);
});
 
var outlineImage = new Image();
outlineImage.onload = function() {
 
  ctx.globalCompositeOperation = 'source-over';
  // scale image to always fill the canvas
  const scaleX = canvas.width / outlineImage.width;
  const scaleY = canvas.height / outlineImage.height;
  const scale = Math.max(scaleX, scaleY);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  
  ctx.drawImage(outlineImage, 0, 0);

  // don't draw over the transparent parts of the canvas
  ctx.globalCompositeOperation = 'source-atop';
  
}
outlineImage.src = "/assets/img/ukrajina_diplomacie.jpeg";


const repaintImage = async () => {
  ctx.globalCompositeOperation = 'source-atop';
  outlineImage.onload();
  // scale image to always fill the canvas
  var scaleX = canvas.width / recruitImage.width*scaleImg;
  var scaleY = canvas.height / recruitImage.height*scaleImg;
  var scale = Math.max(scaleX, scaleY);
  ctx.setTransform(scaleImg, 0, 0, scaleImg, 0, 0);

  ctx.drawImage(recruitImage, (dragEnd.x-dragStart.x)-((recruitImage.width*2)*scaleImg), (dragEnd.y-dragStart.y)-((recruitImage.height)*scaleImg));
  
  scaleX = canvas.width / fgImage.width;
  scaleY = canvas.height / fgImage.height;
  scale = Math.max(scaleX, scaleY);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  fgImage.src = "/assets/img/ukrajina_diplomacie.png";
  ctx.globalCompositeOperation = 'source-atop';
  ctx.drawImage(fgImage, 0, 0);
  ctx.setTransform(); // reset so that everything else is normal size

};

imageReader.addEventListener("load", (e) => {

  recruitImage.addEventListener("load", () => repaintImage());
  recruitImage.src = e.target.result;
  drag=false;
  dragEnd.x = canvas.width * 0.8;
  dragEnd.y = canvas.height / 2;
  var y = document.getElementById("navi");
  y.style.display = "block";
  

});
 
const inputCustomImg = document.getElementById("customImage");
inputCustomImg.addEventListener("change", (e) => {
  e.preventDefault();
  if (e.target.files.length <= 0) {
    return;
  }
  setFile(e.target.files[0]);
});
const buttonCustomImg = document.getElementById("customImageBtn");
buttonCustomImg.addEventListener("click", () => {
  inputCustomImg.click();
});

const buttonUpscale = document.getElementById("upscaleBtn");
buttonUpscale.addEventListener("click", () => {
  scaleImg=scaleImg+0.1;
  dragEnd.x = dragEnd.x - (scaleImg*(recruitImage.width/8))
  repaintImage();
});

const buttonDownscale = document.getElementById("downscaleBtn");
buttonDownscale.addEventListener("click", () => {
  scaleImg=scaleImg-0.1;
  dragEnd.x = dragEnd.x + (scaleImg*recruitImage.width/8)
  repaintImage();
});

const buttonMoveUp = document.getElementById("moveUpBtn");
buttonMoveUp.addEventListener("click", () => {
  dragEnd.y=dragEnd.y-4;
  repaintImage();
});

const buttonMoveDown = document.getElementById("moveDownBtn");
buttonMoveDown.addEventListener("click", () => {
  dragEnd.y=dragEnd.y+4;
  repaintImage();
});
const buttonMoveLeft = document.getElementById("moveLeftBtn");
buttonMoveLeft.addEventListener("click", () => {
  dragEnd.x=dragEnd.x-5;
  repaintImage();
});
const buttonMoveRight = document.getElementById("moveRightBtn");
buttonMoveRight.addEventListener("click", () => {
  dragEnd.x=dragEnd.x+5;
  repaintImage();
});



function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', function(event) {


  drag = true;

})

canvas.addEventListener('mouseup', function(event) {
  dragEnd = {
    x: event.pageX - canvas.offsetLeft,
    y: event.pageY - canvas.offsetTop
  }
  repaintImage()
  drag = false;

})


canvas.addEventListener('mousemove', function(event) {
  if (drag) {
    dragEnd = {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    }
    ctx.translate(dragEnd.x - dragStart.x - (recruitImage.width/2)*scaleImg, dragEnd.y - dragStart.y-(recruitImage.height/2)*scaleImg);
    repaintImage()
//    dragStart = dragEnd;
  }

})





