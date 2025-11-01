const star = document.querySelector('#star');
const scene = document.querySelector('.scene');
let pointsCount = 5; // стартова кількість променів

// Генерація зірки
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

// Морфінг анімація
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
}, 1000);

// === Реакція на рух мишки ===
document.addEventListener('mousemove', e => {
  const rect = scene.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  const rotateX = (y / rect.height) * 60;  // нахил по Y
  const rotateY = (x / rect.width) * -60;  // нахил по X

  scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
