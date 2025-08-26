document.addEventListener("DOMContentLoaded", function () {
  const collectionLinks = document.querySelectorAll(
    ".mega-link[data-mega-menu-product-grid-id]"
  );

  const productGrids = document.querySelectorAll(
    ".mega-menu-product-grid.product-grid"
  );

  collectionLinks.forEach((link) => {
    // Function to activate a link and its corresponding product grid
    function activateLink(linkElement) {
      const productGridId = linkElement.getAttribute(
        "data-mega-menu-product-grid-id"
      );
      const productGrid = document.getElementById(productGridId);

      productGrids.forEach((grid) => {
        grid.classList.remove("product-grid--active");
      });

      collectionLinks.forEach((link) => {
        link.classList.remove("active");
      });

      linkElement.classList.add("active");
      productGrid.classList.add("product-grid--active");
    }

    // Click event listener
    link.addEventListener("click", function (event) {
      activateLink(link);
    });

    // Hover event listeners
    link.addEventListener("mouseenter", function (event) {
      activateLink(link);
    });
  });
});
