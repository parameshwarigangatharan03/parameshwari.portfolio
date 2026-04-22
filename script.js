document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    });

    // Smooth Follower
    function animate() {
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;
        
        follower.style.transform = `translate(${posX - 20}px, ${posY - 20}px)`;
        requestAnimationFrame(animate);
    }
    animate();

    // Hover Effects for Link/Buttons
    const interactiveElements = document.querySelectorAll('a, button, .reaction-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform += ' scale(2)';
            follower.style.backgroundColor = 'rgba(188, 255, 0, 0.1)';
            follower.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = follower.style.transform.replace(' scale(2)', '');
            follower.style.backgroundColor = 'transparent';
            follower.style.borderColor = 'var(--primary)';
        });
    });

    // Navbar Scroll Logic
    const nav = document.getElementById('navbar');
    const progressBar = document.getElementById('progress-bar');

    window.addEventListener('scroll', () => {
        // Nav background
        if (window.scrollY > 100) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');

        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";

        // Scroll Spy
        let current = "";
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        const navLinks = document.querySelectorAll(".nav-links a");
        navLinks.forEach((a) => {
            a.classList.remove("active");
            if (a.getAttribute("href").includes(current)) {
                a.classList.add("active");
            }
        });
    });

    // Intersection Observer for Section Reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Interactive Reactions (Local State Simulation)
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            const span = btn.querySelector('span');
            let count = parseFloat(span.textContent);

            if (icon.classList.contains('far')) {
                icon.classList.replace('far', 'fas');
                btn.classList.add('liked');
                span.textContent = (count + 0.1).toFixed(1) + 'k';
                confettiEffect(btn);
            } else {
                icon.classList.replace('fas', 'far');
                btn.classList.remove('liked');
                span.textContent = (count - 0.1).toFixed(1) + 'k';
            }
        });
    });

    // Global Like Button
    const globalLike = document.getElementById('global-like');
    if (globalLike) {
        globalLike.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = globalLike.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
            if (icon.classList.contains('fas')) {
                globalLike.style.color = 'var(--accent)';
                confettiEffect(globalLike);
            } else {
                globalLike.style.color = '#fff';
            }
        });
    }

    // AI Prompt Animation
    const promptText = document.querySelector('.prompt-text');
    const phrases = [
        "Synthesize a world-class interface...",
        "Optimizing user conversion rates...",
        "Building scalable design systems...",
        "Crafting intuitive digital landscapes..."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            promptText.textContent = currentPhrase.substring(0, charIndex--);
        } else {
            promptText.textContent = currentPhrase.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentPhrase.length + 1) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    typeEffect();

    // Simple Confetti/Sparkle Effect for Likes
    function confettiEffect(el) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.backgroundColor = 'var(--primary)';
            sparkle.style.borderRadius = '50%';
            sparkle.style.zIndex = '10000';
            
            const rect = el.getBoundingClientRect();
            let x = rect.left + rect.width / 2;
            let y = rect.top + rect.height / 2;
            
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            
            document.body.appendChild(sparkle);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let opacity = 1;
            let animationX = x;
            let animationY = y;
            
            const moveSparkle = () => {
                animationX += vx;
                animationY += vy;
                opacity -= 0.02;
                
                sparkle.style.transform = `translate(${animationX - x}px, ${animationY - y}px)`;
                sparkle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(moveSparkle);
                } else {
                    sparkle.remove();
                }
            };
            requestAnimationFrame(moveSparkle);
        }
    }
});
