document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('input', function (event) {
    if (event.target.matches('input[type="number"].qty')) {
      if (parseInt(event.target.value, 10) > 24) {
        event.target.value = 24
      }
    }
  })

  const pdpAddToCartButton = document.querySelectorAll('button.add-to-cart')

  checkCartQty = () => {
    fetch('/cart.js')
      .then((response) => response.json())
      .then((data) => {
        for (item of data.items) {
          if (item.quantity >= 24) {
            pdpAddToCartButton.forEach((button) => {
              const productId = String(item.product_id)

              if (button.dataset.productId === productId) {
                button.disabled = true
              }
            })
          }
        }
      })
      .catch((error) => console.error('Error fetching cart:', error))
  }

  if (pdpAddToCartButton.length) {
    checkCartQty()

    pdpAddToCartButton.forEach((button) => {
      button.addEventListener('click', function () {
        setTimeout(() => {
          fetch('/cart.js')
            .then((response) => response.json())
            .then((data) => {
              for (item of data.items) {
                if (item.quantity >= 24) {
                  const productId = String(item.product_id)

                  if (button.dataset.productId === productId) {
                    button.disabled = true
                  }
                }
              }
            })
            .catch((error) => console.error('Error fetching cart:', error))
        }, 750)
      })
    })
  }
})
