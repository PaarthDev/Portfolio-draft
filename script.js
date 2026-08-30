/* =====================================================
   PAARTH DEV - PERSONAL PORTFOLIO
   JavaScript
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       1. AUTOMATIC COPYRIGHT YEAR
       ================================================= */

    const yearText = document.querySelector(
        "footer > p:last-of-type"
    );

    if (yearText) {
        const currentYear = new Date().getFullYear();

        yearText.innerHTML =
            `&copy; ${currentYear} Paarth Dev, All rights reserved`;
    }


    /* =================================================
       2. TYPING EFFECT
       ================================================= */

    const introText = document.querySelector("#about p");

    if (introText) {

        const originalText = introText.textContent.trim();

        introText.textContent = "";

        let index = 0;

        function typeText() {

            if (index < originalText.length) {

                introText.textContent += originalText.charAt(index);

                index++;

                setTimeout(typeText, 20);
            }
        }

        typeText();
    }


    /* =================================================
       3. CONTACT FORM
       ================================================= */

    const form = document.querySelector("form");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document
                .querySelector("#name")
                .value
                .trim();

            const email = document
                .querySelector("#email")
                .value
                .trim();

            const message = document
                .querySelector("#message")
                .value
                .trim();


            /* Basic validation */

            if (name === "") {

                showMessage(
                    "Please enter your name.",
                    "error"
                );

                return;
            }


            if (email === "") {

                showMessage(
                    "Please enter your email address.",
                    "error"
                );

                return;
            }


            if (!validateEmail(email)) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            if (message === "") {

                showMessage(
                    "Please enter a message.",
                    "error"
                );

                return;
            }


            /* Success */

            showMessage(
                `Thank you, ${name}! Your message has been submitted.`,
                "success"
            );


            /* Clear form */

            form.reset();

        });

    }


    /* =================================================
       4. EMAIL VALIDATION
       ================================================= */

    function validateEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }


    /* =================================================
       5. FORM MESSAGE
       ================================================= */

    function showMessage(text, type) {

        let messageBox =
            document.querySelector(".form-message");


        /* Create message box if it doesn't exist */

        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.className =
                "form-message";

            form.appendChild(messageBox);
        }


        messageBox.textContent = text;

        messageBox.className =
            `form-message ${type}`;


        /* Remove message after 4 seconds */

        setTimeout(() => {

            messageBox.remove();

        }, 4000);
    }


    /* =================================================
       6. SCROLL REVEAL ANIMATION
       ================================================= */

    const sections =
        document.querySelectorAll("main section");


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "section-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    sections.forEach(function (section) {

        section.classList.add(
            "section-hidden"
        );

        observer.observe(section);

    });


    /* =================================================
       7. ACTIVE NAVIGATION LINK
       ================================================= */

    const navLinks =
        document.querySelectorAll("nav a");

    const pageSections =
        document.querySelectorAll(
            "main section"
        );


    window.addEventListener("scroll", function () {

        let currentSection = "";

        pageSections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove(
                "active-link"
            );


            const target =
                link.getAttribute("href");


            if (
                target === `#${currentSection}`
            ) {

                link.classList.add(
                    "active-link"
                );

            }

        });

    });


    /* =================================================
       8. SCROLL TO TOP BUTTON
       ================================================= */

    const topButton =
        document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.className =
        "scroll-top";

    topButton.setAttribute(
        "aria-label",
        "Scroll to top"
    );

    document.body.appendChild(topButton);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            topButton.classList.add(
                "show-scroll-top"
            );

        } else {

            topButton.classList.remove(
                "show-scroll-top"
            );

        }

    });


    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

});