/**
 * [Reference]
 * 
 * [Daily.html](../Daily.html)
 * 
 * [Introduction.html](../Introduction.html)
 * 
 * [main.html](../main.html)
 * 
 * [Portfolio.html](../Portfolio.html)
 * 
 * @version 1.1.0
 */
var motionbackground = (function () {
    return {
        initsnow: initsnow,
        initfontize: initfontize,
        initdotor: initdotor
    };
    function initsnow() {
        var symbols = ["❆", "❅", "❀"];

        function createsnow() {
            var b = document.createElement("span");
            var ri = Math.floor(Math.random() * symbols.length);

            b.innerHTML = symbols[ri];
            b.className = "snowflake";
            b.style.left = Math.random() * (window.innerWidth - 75) + "px";
            b.style.animationDuration = Math.random() * 3 + 10 + "s";
            b.style.fontSize = Math.random() * 20 + 20 + "px";
            b.style.transform = "rotate(" + Math.random() * 360 + "deg)";

            document.body.appendChild(b);

            setTimeout(function () {
                b.style.opacity = "0";
                setTimeout(function () {
                    b.remove();
                }, 1000);
            }, 10000);
        }

        setInterval(function () {
            createsnow();
        }, 1500);
    }
    function initfontize() {
        const canvas = document.createElement('canvas');
        canvas.style.position = "fixed";
        canvas.style.bottom = "0";
        canvas.style.zIndex = "-999";
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const texts = [];

        function createText() {
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const vx = Math.random() * 2 - 1;
                const vy = Math.random() * 2 - 1;
                const text = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                texts.push({ x, y, vx, vy, text });
                ctx.font = `${15}px Arial`;
                ctx.fillStyle = "#00000020";
            }
        }

        function drawText() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            texts.forEach((t1, index) => {
                ctx.fillText(t1.text, t1.x, t1.y);

                if (t1.x < 0 || t1.x > canvas.width - 30) {
                    t1.vx *= -1;
                }
                if (t1.y < document.querySelector('.nav').offsetHeight + 15 || t1.y > canvas.height) {
                    t1.vy *= -1;
                }

                t1.x += t1.vx;
                t1.y += t1.vy;

                for (let i = index + 1; i < texts.length; i++) {
                    const t2 = texts[i];
                    const dx = t2.x - t1.x;
                    const dy = t2.y - t1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 10) {
                        const angle = Math.atan2(dy, dx);
                        const tx = Math.cos(angle) * 0.5;
                        const ty = Math.sin(angle) * 0.5;

                        const ax = (10 - distance) * tx;
                        const ay = (10 - distance) * ty;

                        t1.vx -= ax;
                        t1.vy -= ay;
                        t2.vx += ax;
                        t2.vy += ay;
                    }
                }
            });
        }

        function animate() {
            drawText();
            requestAnimationFrame(animate);
        }

        createText();
        animate();

        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            texts.forEach((t) => {
                const distance = Math.sqrt((mouseX - t.x) ** 2 + (mouseY - t.y) ** 2);
                if (distance < 50) {
                    const angle = Math.atan2(mouseY - t.y, mouseX - t.x);
                    t.vx = Math.cos(angle) * 2;
                    t.vy = Math.sin(angle) * 2;
                }

                const angle = Math.atan2(mouseY - t.y, mouseX - t.x);
                t.vx = Math.cos(angle) * 2;
                t.vy = Math.sin(angle) * 2;
            });
        });

        document.addEventListener('mousedown', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            texts.forEach((t) => {

            });
        });
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.font = `${15}px Arial`;
            ctx.fillStyle = "#00000020";
        });
    }
    function initdotor(color1, color2) {
        const canvas = document.createElement('canvas');
        canvas.style.position = "fixed";
        canvas.style.bottom = "0";
        canvas.style.zIndex = "-999";
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const mouse = {
            x: null,
            y: null,
            radius: 150,
        };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        class Particle {
            constructor(x, y, size) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceX = dx / distance;
                const forceY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceX * force * this.density;
                const directionY = forceY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, color1);
                gradient.addColorStop(0.8, color2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }

        function createParticles() {
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 5 + 1;
                particles.push(new Particle(x, y, size));
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animateParticles);
        }

        createParticles();
        animateParticles();
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}());