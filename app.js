let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let save_btn = document.getElementById("save_btn");
let clear_btn = document.getElementById("clear_btn");
let hex_btn = document.getElementById("hex");
let pos = { x: 0, y: 0 };
resize();

//color picker
let pickr = Pickr.create({
  el: '.color-picker',
  theme: 'nano', // or 'monolith', or 'nano'

  swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 0.95)',
      'rgba(156, 39, 176, 0.9)',
      'rgba(103, 58, 183, 0.85)',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)'
  ],

  components: {

      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
          hex: true,
          rgba: false,
          hsla: false,
          hsva: false,
          cmyk: false,
          input: true,
          clear: true,
          save: false
      }
  }
});

// resize canvas when window is resized
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function setPosition(e) {
  pos.x = e.clientX - 6;
  pos.y = e.clientY - 42;
}

function draw(e) {
  if (e.buttons !== 1) return; // if mouse is not clicked, do not go further

  ctx.beginPath(); // begin the drawing path

  ctx.lineWidth = 4; // width of line
  ctx.lineCap = "round"; // rounded end cap for smooth lines
  ctx.strokeStyle = pickr.getColor().toHEXA(); // hex color of line

  ctx.moveTo(pos.x, pos.y); // from position
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to position

  ctx.stroke(); // draw it!
}

//handles key presses
function keyPress(event) {
  if (event.key === "c") {
    clear();
  }
  if (event.key === "s") {
    document.getElementById("savebtn").click();
  }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function save() {
  let imgurl = canvas.toDataURL('image/png');
  save_btn.href = imgurl;
}

canvas.oncontextmenu = function(e) {e.preventDefault(); e.stopPropagation();} //disables right-click menu on canvas

//Event Listeners
window.addEventListener("resize", resize);
save_btn.addEventListener("click", save);
clear_btn.addEventListener("click", clear);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);
document.addEventListener("keydown", keyPress)


// Things to do:
// Add different drawing tools (preset thicknesses and stuff)
// Add options menu to modify the options and stuff
