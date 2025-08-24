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

const mobileNavCollectionTriggers = document.querySelectorAll(
  ".js-new-mobile-nav-dropdown-trigger"
);

const closeGrid = (grid) => {
  grid.style.height = grid.scrollHeight + "px";
  grid.style.overflow = "hidden";

  requestAnimationFrame(() => {
    grid.style.height = "0px";
    grid.style.opacity = "0";
  });

  grid.parentElement.classList.remove(
    "new-mobile-nav__collection-dropdown--active"
  );
};

const openGrid = (grid) => {
  grid.style.height = "0";
  grid.style.overflow = "hidden";

  const fullHeight = grid.scrollHeight + "px";
  requestAnimationFrame(() => {
    grid.style.height = fullHeight;
    grid.style.opacity = "1";
  });

  grid.parentElement.classList.add(
    "new-mobile-nav__collection-dropdown--active"
  );
};

mobileNavCollectionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", function () {
    const key = this.getAttribute("data-collection-id");
    const isOpen = this.parentElement.classList.contains(
      "new-mobile-nav__collection-dropdown--active"
    );

    const hiddenGrid = document.querySelector(
      `.new-mobile-nav__collection-dropdown-content[data-collection-id="${key}"]`
    );

    hiddenGrid.style.transition = "all 0.3s ease-in-out";

    if (!isOpen) {
      // Close all other grids first
      const allGrids = document.querySelectorAll(
        ".new-mobile-nav__collection-dropdown-content"
      );
      allGrids.forEach((grid) => {
        if (grid !== hiddenGrid) {
          closeGrid(grid);
        }
      });
      openGrid(hiddenGrid);
    } else {
      closeGrid(hiddenGrid);
    }
  });
});
