// Toggle UI functionality
document.addEventListener("DOMContentLoaded", function () {
  const toggleOptions = document.querySelectorAll(".toggle-option");

  toggleOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all options
      toggleOptions.forEach((opt) =>
        opt.classList.remove("toggle-option--active")
      );

      // Add active class to clicked option
      this.classList.add("toggle-option--active");

      // Get the toggle type
      const toggleType = this.getAttribute("data-toggle");

      // Handle different toggle states
      if (toggleType === "product") {
        // Show product content
        // Add your product-specific logic here
      } else if (toggleType === "learn") {
        // Show learn content
        // Add your learn-specific logic here
      }
    });
  });
});
