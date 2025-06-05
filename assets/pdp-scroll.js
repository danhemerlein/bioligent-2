document.addEventListener('DOMContentLoaded', function () {
  // Get all product page links
  const productLinks = document.querySelectorAll('a[href="#product-page-1"]')

  // Function to center the button in viewport
  const centerButtonInViewport = (button) => {
    const buttonRect = button.getBoundingClientRect()
    const absoluteButtonTop = buttonRect.top + window.pageYOffset
    const viewportHeight = window.innerHeight
    const scrollPosition =
      absoluteButtonTop - viewportHeight / 2 + buttonRect.height / 2

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    })
  }

  console.log(productLinks)

  // Add click handler to each link
  productLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault() // Prevent default link behavior

      // Find the add to cart button
      const addToCartButton = document.querySelector(
        '[data-js-product-add-to-cart][data-main-product-add-to-cart]'
      )

      if (addToCartButton) {
        centerButtonInViewport(addToCartButton)
        
        // Add resize handler to keep button centered
        const resizeHandler = () => {
          centerButtonInViewport(addToCartButton)
        }
        
        // Add resize listener
        window.addEventListener('resize', resizeHandler)
        
        // Remove resize listener after 1 second of no resizing
        let resizeTimeout
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout)
          resizeTimeout = setTimeout(() => {
            window.removeEventListener('resize', resizeHandler)
          }, 1000)
        })
      }
    })
  })
})
