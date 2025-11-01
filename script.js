const star = document.querySelector('#star');
let pointsCount = 5; // стартова кількість променів

// Генерує форму зірки
function generateStarPoints(count) {
    const outerR = 120;
    const innerR = 60;
    const cx = 200, cy = 200;
    const points = [];

    for (let i = 0; i < count * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (Math.PI * i) / count - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        points.push(`${x},${y}`);
    }

    return points.join(' ');
}

// Анімація морфінгу
function animateStar() {
    const newPoints = generateStarPoints(pointsCount);
    anime({
        targets: star,
        points: [{ value: newPoints }],
        easing: 'easeInOutQuad',
        duration: 800,
    });
}

// Початковий стан
star.setAttribute('points', generateStarPoints(pointsCount));
animateStar();

// Щосекунди додаємо новий промінь
setInterval(() => {
    pointsCount++;
    animateStar();

    // Додатково — легке обертання зірки
    const rotation = (pointsCount * 10) % 360;
    star.style.transform = `rotate(${rotation}deg)`;
}, 1000);
