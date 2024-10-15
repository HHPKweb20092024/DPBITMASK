// Menu 
const menu = document.querySelector(".hhpk__links");
const menuButton = document.querySelector(".hhpk__icons");
const overlay = document.querySelector("#overlay");

menuButton.addEventListener('click', () => {
    menu.classList.toggle("hhpk__open");
    menuButton.classList.toggle("open");
    overlay.classList.toggle("show");
});


overlay.addEventListener('click', () => {
    menu.classList.toggle("hhpk__open");
    menuButton.classList.toggle("open");
    overlay.classList.toggle("show");
});

// status


const optstatusElements = document.querySelectorAll(".select-status");

optstatusElements.forEach(optstatus => {
    const selectBtn = optstatus.querySelector(".select-btn");
    const options = optstatus.querySelectorAll(".option");
    const sBtn_text = optstatus.querySelector(".sBtn-text");
    const sBtn_icon = optstatus.querySelector(".sBtn-icon");

    selectBtn.addEventListener("click", () => {
        optstatus.classList.toggle("active");
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
            let selectedOption = option.querySelector(".option-text").innerText;
            let selectedIcon = option.querySelector("i").className;
            sBtn_text.innerHTML = selectedOption;
            sBtn_icon.className = selectedIcon;
            sBtn_icon.style.color = option.querySelector("i").style.color;

            if (selectedOption === "Practicing" || selectedOption === "Completed") {
                showFireworks(); // Gọi hàm hiển thị pháo bông
            }

            optstatus.classList.remove("active");
        });
    });
});




const fireworksCanvas = document.getElementById("fireworksCanvas");

function createFirework(x, y) {
    const particles = [];
    const colors = ['#ff004d', '#ffcc00', '#00ffcc', '#00aaff', '#ff00ff'];

    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 2 + 2;
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,
            life: Math.random() * 100 + 50
        });
    }

    return particles;
}

function showFireworks() {
    fireworksCanvas.style.display = 'block';
    const ctx = fireworksCanvas.getContext('2d');
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    const fireworkCount = 10;
    const particlesArray = [];
    const delayBetweenFireworks = 0;

    const createFireworksWithDelay = (index) => {
        if (index < fireworkCount) {
            const x = Math.random() * fireworksCanvas.width;
            const y = Math.random() * fireworksCanvas.height * 0.5;
            particlesArray.push(createFirework(x, y));
            setTimeout(() => createFireworksWithDelay(index + 1), delayBetweenFireworks);
        } else {
            animate();
        }
    };

    createFireworksWithDelay(0);

    function animate() {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        particlesArray.forEach((particles, arrayIndex) => {
            particles.forEach((particle, index) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                particle.x += particle.velocityX;
                particle.y += particle.velocityY;
                particle.velocityY += 0.05; // Gravity
                particle.life--;

                if (particle.life <= 0) {
                    particles.splice(index, 1);
                }
            });

            // Xóa mảng particles nếu không còn particle nào
            if (particles.length === 0) {
                particlesArray.splice(arrayIndex, 1);
            }
        });

        if (particlesArray.length === 0) {
            fireworksCanvas.style.display = 'none'; // Ẩn canvas nếu không còn particle nào
        } else {
            requestAnimationFrame(animate);
        }
    }
}