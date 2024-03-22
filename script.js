function getRandomNumber(size) {
    let num = Math.floor(Math.random() * size);
    return num;
}

function getDistance(event, target) {
    const diffX = event.offsetX - target.x;
    const diffY = event.offsetY - target.y;
    const dist = Math.sqrt((diffX * diffX) + (diffY * diffY));
    return dist;
}

function getDistanceHint(distance) {
    if (distance < 10) {
        return "Пече!";
    } else if (distance < 20) {
        return "Дуже гаряче";
    } else if (distance < 40) {
        return "Гаряче";
    } else if (distance < 80) {
        return "Тепло";
    } else if (distance < 160) {
        return "Холодно";
    } else if (distance < 320) {
        return "Дуже холодно";
    } else {
        return "Можна замерзнути";
    }
}

const width = 450;
const height = 400;
let click = 0;
const maxMoves = 20;

const target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
}

const distanceP = document.getElementById('distance')
const clicker = document.getElementById('clickCounter')

const mapElement = document.getElementById("map");
mapElement.addEventListener("click", (event) => {
    const hint = getDistanceHint(getDistance(event, target))
    click++;
    console.log(hint);
    clicker.innerHTML = click
    distanceP.innerHTML = hint
    if (hint === "Пече!") {
        alert('Пече! Ти знайшов скарб!')
        click = 0
        target.x = getRandomNumber(width)
        target.y = getRandomNumber(height)
    } else if (click == maxMoves) {
        alert('Ти не зміг знайти скарб. Спробуй ще раз')
        click = 0
        target.x = getRandomNumber(width)
        target.y = getRandomNumber(height)
    }
    
});