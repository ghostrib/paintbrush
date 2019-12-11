class Circle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  draw() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

window.addEventListener('DOMContentLoaded', function() {
  const red = document.querySelector('#red');
  const green = document.querySelector('#green');
  const blue = document.querySelector('#blue');
  const brushSize = document.querySelector('#brush-size');
  const brushOut = document.querySelector('#brush-out');
  const opacityOut = document.querySelector('#opacity-out');
  const preview = document.querySelector('#color-preview');

  let isMouseDown = false;
  let color = 'rgba(0, 0, 0, 1)';

  canvas.width = window.innerWidth - 100;
  canvas.height = window.innerHeight - 300;

  canvas.onmousedown = () => (isMouseDown = true);
  canvas.onmouseup = () => (isMouseDown = false);

  canvas.addEventListener('mousemove', function(e) {
    if (isMouseDown) {
      const size = brushSize.value;
      const x = e.x - 10;
      const y = e.y - 60;
      const circle = new Circle(x, y, size, color);
      circle.draw();
    }
  });

  function handleInputChange(event) {
    const id = this.nextElementSibling.id;
    const value = event.target.value;
    if (id === 'red') red.value = value;
    if (id === 'green') green.value = value;
    if (id === 'blue') blue.value = value;
    if (id === 'opacity-out') {
      opacityOut.value = (value * 0.01).toFixed(2);
    }
    if (id === 'brush-out') {
      brushOut.value = value;
      brushSize.value = value;
    }
    color = `rgba(${red.value}, ${green.value}, ${blue.value}, ${opacityOut.value})`;
    preview.style.backgroundColor = color;
  }

  document.querySelectorAll('input').forEach(element => {
    element.addEventListener('change', handleInputChange);
    element.addEventListener('input', handleInputChange);
  });
});
