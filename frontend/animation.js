const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 200;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            opacity: Math.random(),
            speed: 0.005 + Math.random() * 0.01
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        ctx.save();
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) {
            star.speed *= -1;
        }

        ctx.globalAlpha = Math.max(0, star.opacity);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        
        ctx.restore();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    init();
});

init();
animate();