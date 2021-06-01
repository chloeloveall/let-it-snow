const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particlesOnScreen = 1000;
let particlesArray = [];
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

function random(min, max) {
  return min + Math.random() * (max - min);
};

function clientResize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
};
window.addEventListener('resize', clientResize);

function createSnowFlakes() {
  for(let i = 0; i < particlesOnScreen; i++){
    particlesArray.push({
      x: Math.random() * w,  
      y: Math.random() * h,  
      opacity: Math.random(),  
      speedX: random(-5, 5),  
      speedY: random(4, 15),    
      radius:random(0.15, 5.2),
    })
  }
};

function drawSnowFlakes(){
  for(let i = 0; i < particlesArray.length; i++){    
    let gradient = ctx.createRadialGradient(  
      particlesArray[i].x,   
      particlesArray[i].y,   
      0,                     
      particlesArray[i].x,   
      particlesArray[i].y,   
      particlesArray[i].radius  
    );

    gradient.addColorStop(0, 'rgba(255, 255, 255,' + particlesArray[i].opacity + ')');
    gradient.addColorStop(.8, 'rgba(210, 236, 242,' + particlesArray[i].opacity + ')');
    gradient.addColorStop(1, 'rgba(237, 247, 249,' + particlesArray[i].opacity + ')');
    
    ctx.beginPath(); 
    ctx.arc(
      particlesArray[i].x,  
      particlesArray[i].y,  
      particlesArray[i].radius,  
      0,                         
      Math.PI*2,                 
      false                     
    );

    ctx.fillStyle = gradient;   
    ctx.fill();                 
  }
};

function moveSnowFlakes(){
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].x += particlesArray[i].speedX;     
    particlesArray[i].y += particlesArray[i].speedY;     

    if (particlesArray[i].y > h) {                                                                               
      particlesArray[i].x = Math.random() * w * 1.5;
      particlesArray[i].y = -100;
    }
  }
};

function updateSnowFall() {
  ctx.clearRect(0, 0, w, h);
  drawSnowFlakes();
  moveSnowFlakes();
};

setInterval(updateSnowFall, 50);
createSnowFlakes();