// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const phoneInput = contactForm.querySelector('input[type="tel"]');
    const phone = phoneInput.value.trim();

    // Allow only exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {

      const errorModal = new bootstrap.Modal(
        document.getElementById("errorModal")
      );

      errorModal.show();

      phoneInput.focus();

      return;
    }

    const successModal = new bootstrap.Modal(
      document.getElementById("successModal")
    );

    successModal.show();

    contactForm.reset();

  });

}

const phoneInput = document.querySelector('#contactForm input[type="tel"]');

if (phoneInput) {

  phoneInput.addEventListener("input", function () {

    // Remove non-numeric characters
    this.value = this.value.replace(/\D/g, "");

    // Limit to 10 digits
    if (this.value.length > 10) {

      this.value = this.value.slice(0, 10);

    }

  });

}