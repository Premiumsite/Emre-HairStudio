document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Dynamic Smooth Sticky Navbar ---
    const navbar = document.querySelector(".main-navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- 2. Mobile Menu Toggle Logic ---
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navMenuLinks = document.querySelectorAll(".nav-link");
    
    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }

    navMenuLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
        });
    });

    // --- 3. Micro Particle Engine for Hero Section (Deactivated on Mobile for Performance) ---
    const canvas = document.getElementById("hero-particles");
    if (canvas && window.innerWidth > 768) {
        const ctx = canvas.getContext("2d");
        let particlesArray = [];
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedY = Math.random() * 0.4 + 0.1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.y -= this.speedY;
                if (this.y < 0) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(223, 183, 108, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < 45; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // --- 4. Premium Reveal Engine (Intersection Observer) ---
    const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-fade");
    
    if ('IntersectionObserver' in window && window.innerWidth > 768) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute("data-delay") || 0;
                    setTimeout(() => {
                        entry.target.classList.add("revealed");
                    }, delay * 120);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Safe Fallback for structural lighthouse performance mapping
        revealElements.forEach(el => el.classList.add("revealed"));
    }

    // --- 5. Fluid Numeric Counter Engine ---
    const statNumbers = document.querySelectorAll(".stat-number");
    
    function startCounter(el) {
        const target = parseInt(el.getAttribute("data-target"));
        let count = 0;
        const speed = target / 80; // Animation frame rate execution map
        
        const updateCount = () => {
            count += speed;
            if (count < target) {
                el.innerText = Math.floor(count);
                setTimeout(updateCount, 20);
            } else {
                el.innerText = target;
            }
        };
        updateCount();
    }

    if ('IntersectionObserver' in window) {
        const statsSection = document.querySelector(".stats-section");
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(num => startCounter(num));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        if(statsSection) statsObserver.observe(statsSection);
    } else {
        statNumbers.forEach(num => num.innerText = num.getAttribute("data-target"));
    }

    // --- 6. Smooth FAQ Accordion Transition System ---
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const trigger = item.querySelector(".faq-trigger");
        trigger.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Collapse other active options
            faqItems.forEach(i => {
                i.classList.remove("active");
                i.querySelector(".faq-content").style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add("active");
                const content = item.querySelector(".faq-content");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- 7. Expandable Floating Action Button Menu Event ---
    const fabMainBtn = document.querySelector(".fab-main-btn");
    const fabContainer = document.querySelector(".fab-container");
    
    if (fabMainBtn) {
        fabMainBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            fabContainer.classList.toggle("active");
        });
        
        // Dynamic close interaction map on global screen hits
        document.addEventListener("click", () => {
            fabContainer.classList.remove("active");
        });
    }

    // --- 8. Smooth Active Navigation Menu Tracking ---
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add("active");
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove("active");
            }
        });
    });
});