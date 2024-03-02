// script.js

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let shapes = []; // Array to store both spheres and rectangles
let popSound = document.getElementById('popSound');
let barrierHeight = 30; // Height of the barriers
let spawnDelay = 300; // Delay in milliseconds

let lastSpawnTime = 0; // Variable to keep track of the last spawn time

function init() {
    canvas.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(update);
}

function onMouseMove(e) {
    let currentTime = new Date().getTime();
    if (currentTime - lastSpawnTime > spawnDelay) {
        let shape;
        if (Math.random() < 0.5) {
            // Create a sphere
            shape = createSphere(e.clientX, e.clientY);
        } else {
            // Create a rectangle
            shape = createRectangle(e.clientX, e.clientY);
        }
        shapes.push(shape);
        popSound.play(); // Play pop sound
        lastSpawnTime = currentTime; // Update last spawn time
    }
}

function createSphere(x, y) {
    let radius = Math.random() * 50 + 10;
    let color = getRandomColor();
    let speedX = Math.random() * 2 - 1; // Random horizontal speed between -1 and 1
    let speedY = Math.random() * 2 - 1; // Random vertical speed between -1 and 1
    return { type: 'sphere', x, y, radius, color, speedX, speedY };
}

function createRectangle(x, y) {
    let width = Math.random() * 100 + 20;
    let height = Math.random() * 100 + 20;
    let color = getRandomColor();
    let speedX = Math.random() * 2 - 1; // Random horizontal speed between -1 and 1
    let speedY = Math.random() * 2 - 1; // Random vertical speed between -1 and 1
    return { type: 'rectangle', x, y, width, height, color, speedX, speedY };
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw barriers
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, canvas.width, barrierHeight);
    ctx.fillRect(0, canvas.height - barrierHeight, canvas.width, barrierHeight);
    ctx.fillRect(0, 0, barrierHeight, canvas.height);
    ctx.fillRect(canvas.width - barrierHeight, 0, barrierHeight, canvas.height);

    shapes.forEach((shape) => {
        if (shape.type === 'sphere') {
            drawSphere(shape);
        } else if (shape.type === 'rectangle') {
            drawRectangle(shape);
        }

        shape.x += shape.speedX;
        shape.y += shape.speedY;

        if (shape.x + shape.width > canvas.width - barrierHeight || shape.x < barrierHeight) {
            shape.speedX = -shape.speedX;
        }
        if (shape.y + shape.height > canvas.height - barrierHeight || shape.y < barrierHeight) {
            shape.speedY = -shape.speedY;
        }
    });

    requestAnimationFrame(update);
}

function drawSphere(sphere) {
    ctx.fillStyle = `rgba(${sphere.color.r},${sphere.color.g},${sphere.color.b},${sphere.color.a})`;
    ctx.strokeStyle = '#000000'; // Stroke color (black)
    ctx.beginPath();
    ctx.arc(sphere.x, sphere.y, sphere.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

function drawRectangle(rectangle) {
    ctx.fillStyle = `rgba(${rectangle.color.r},${rectangle.color.g},${rectangle.color.b},${rectangle.color.a})`;
    ctx.strokeStyle = '#000000'; // Stroke color (black)
    ctx.beginPath();
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let a = Math.random();
    return { r, g, b, a };
}

init();
