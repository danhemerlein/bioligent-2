// Toggle UI functionality
document.addEventListener("DOMContentLoaded", function () {
  const toggleOptions = document.querySelectorAll(".toggle-option");
  const toggleTrack = document.querySelector(".toggle-track");
  const productContainer = document.querySelector(
    ".js-new-mobile-nav-product-container"
  );
  const learnContainer = document.querySelector(
    ".js-new-mobile-nav-learn-container"
  );

  toggleOptions.forEach((option) => {
    option.addEventListener("click", function () {
      toggleOptions.forEach((opt) =>
        opt.classList.remove("toggle-option--active")
      );

      this.classList.add("toggle-option--active");

      const toggleType = this.getAttribute("data-toggle");

      if (toggleType === "product") {
        toggleTrack.classList.remove("toggle-track--right");
        productContainer.style.opacity = "1";
        learnContainer.style.opacity = "0";
        productContainer.style.visibility = "visible";
        learnContainer.style.visibility = "hidden";
      } else if (toggleType === "learn") {
        toggleTrack.classList.add("toggle-track--right");
        productContainer.style.opacity = "0";
        learnContainer.style.opacity = "1";
        productContainer.style.visibility = "hidden";
        learnContainer.style.visibility = "visible";
      }
    });
  });
});
