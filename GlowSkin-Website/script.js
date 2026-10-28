const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const newsletter = document.querySelector("#newsletter-form");
if (newsletter) {
  newsletter.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = newsletter.querySelector(".form-message");
    message.textContent =
      "Thanks for your interest! Newsletter sign-up needs to be connected to an email service to save subscriptions.";
    newsletter.reset();
  });
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  const params = new URLSearchParams(window.location.search);
  const product = params.get("product");
  const productField = contactForm.querySelector('[name="subject"]');
  if (product && productField)
    productField.value = "Product enquiry: " + product;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent a normal page reload.
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "General enquiry").trim();
    const phone = String(formData.get("phone") || "").trim();
    const userMessage = String(formData.get("message") || "").trim();

    const text =
      "Hello GlowSkin, my name is " +
      name +
      ".\nEmail: " +
      email +
      "\nPhone: " +
      (phone || "Not provided") +
      "\nEnquiry: " +
      subject +
      "\nMessage: " +
      userMessage;
    const message = contactForm.querySelector(".form-message");
    message.textContent =
      "Opening WhatsApp with your message. Please review it and press Send in WhatsApp to contact GlowSkin.";
    window.open(
      "https://wa.me/2349078221507?text=" + encodeURIComponent(text),
      "_blank",
      "noopener",
    );
  });
}

document.querySelectorAll(".dropdown-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    const parent = trigger.closest(".nav-dropdown");
    if (window.matchMedia("(max-width: 760px)").matches) {
      event.preventDefault();
      const open = parent.classList.toggle("dropdown-open");
      trigger.setAttribute("aria-expanded", String(open));
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".nav-dropdown.dropdown-open").forEach((menu) => {
      menu.classList.remove("dropdown-open");
      const trigger = menu.querySelector(".dropdown-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }
});
