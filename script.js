document.addEventListener('DOMContentLoaded', () => {
    // Custom Mouse Trailer
    const trailer = document.createElement('div');
    trailer.id = 'mouse-trailer';
    document.body.appendChild(trailer);

    const style = document.createElement('style');
    style.textContent = `
        #mouse-trailer {
            height: 20px;
            width: 20px;
            background-color: var(--primary);
            border-radius: 50%;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 500ms ease;
            box-shadow: 0 0 10px var(--primary);
        }
        body:hover #mouse-trailer {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);

    window.onmousemove = e => {
        const x = e.clientX - trailer.offsetWidth / 2,
              y = e.clientY - trailer.offsetHeight / 2;

        const keyframes = {
            transform: `translate(${x}px, ${y}px)`
        };

        trailer.animate(keyframes, {
            duration: 800,
            fill: "forwards"
        });
    };

    // Navbar scroll effect & Scroll Progress
    const nav = document.getElementById('navbar');
    const progress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
        
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progress) progress.style.width = scrolled + "%";

        // Scroll Spy
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for Reveal Animation
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Form Handling (Mock)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = 'var(--accent)';
                form.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'var(--primary)';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
