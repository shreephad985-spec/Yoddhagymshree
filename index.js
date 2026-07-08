document.addEventListener("DOMContentLoaded", () => {

    const heroTitle = document.querySelector(".hero h1");
    const heroText = document.querySelector(".hero p");
    const heroButtons = document.querySelectorAll(".hero .btn");

    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(50px)";

    heroText.style.opacity = "0";
    heroText.style.transform = "translateY(50px)";

    heroButtons.forEach(btn => {
        btn.style.opacity = "0";
        btn.style.transform = "translateY(50px)";
    });

    setTimeout(() => {
        heroTitle.style.transition = "1s";
        heroTitle.style.opacity = "1";
        heroTitle.style.transform = "translateY(0)";
    }, 200);

    setTimeout(() => {
        heroText.style.transition = "1s";
        heroText.style.opacity = "1";
        heroText.style.transform = "translateY(0)";
    }, 600);

    heroButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.transition = "0.8s";
            btn.style.opacity = "1";
            btn.style.transform = "translateY(0)";
        }, 900 + (index * 200));
    });

});

const counters = document.querySelectorAll(".glass-card h2");

const startCounter = () => {

    counters.forEach(counter => {

        const target = parseInt(counter.innerText);

        let count = 0;

        const speed = target / 80;

        const update = () => {

            if (count < target) {

                count += speed;

                counter.innerText = Math.floor(count) + "+";

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + "+";

            }

        };

        update();

    });

};

const heroSection = document.querySelector("#home");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            startCounter();

            observer.unobserve(heroSection);

        }

    });

}, {
    threshold: 0.5
});

observer.observe(heroSection);

window.addEventListener("mousemove", (e) => {

    const img = document.querySelector(".hero-img");

    const x = (window.innerWidth / 2 - e.pageX) / 40;

    const y = (window.innerHeight / 2 - e.pageY) / 40;

    img.style.transform = `translate(${x}px, ${y}px)`;

});

document.querySelectorAll(".hero .btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = circle.style.height = diameter + "px";

        circle.style.left = e.offsetX - diameter / 2 + "px";

        circle.style.top = e.offsetY - diameter / 2 + "px";

        circle.classList.add("ripple");

        this.appendChild(circle);

        setTimeout(() => {

            circle.remove();

        }, 600);

    });

});

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("loader-hide");

        setTimeout(() => {
            preloader.style.display = "none";
        }, 800); // matches CSS transition
    }, 1800); // keeps loader visible for a moment
});