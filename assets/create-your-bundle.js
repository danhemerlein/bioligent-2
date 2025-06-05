document.addEventListener('DOMContentLoaded', function () {
  const bundleArray = []
  const bundleAddButtons = document.querySelectorAll('.js-bundle-add')
  const bundleRemoveButtons = document.querySelectorAll('.js-bundle-remove')
  const bundleGridItems = document.querySelectorAll('.js-bundle-grid-item')
  // adds the full bundle to the cart
  const bundleAddToCart = document.querySelector('.js-cyb-bundle-atc')
  const sellingPlanSelect = document.querySelector('.js-cyb-bundle-atc-select')

  bundleAddToCart.addEventListener('click', async function () {
    const bundleProductData = {
      productId: '7795024363590',
      variantId: 42525769433158,
      handle: 'customizable-bundle-test-v1',
    }
    const sellingPlanValue = sellingPlanSelect.value

    const COLLECTION_ID = '289448460358'

    const uniqueBundleArray = []

    bundleArray.forEach((item) => {
      const existingItem = uniqueBundleArray.find(
        (uniqueItem) => uniqueItem.variantId === item.variantId
      )

      const sellingPlan = JSON.parse(item.sellingPlans).filter((plan) => {
        return plan.name.toLowerCase() === sellingPlanValue.toLowerCase()
      })

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        const newItem = {
          collectionId: COLLECTION_ID,
          externalProductId: item.productId,
          externalVariantId: item.variantId,
          sellingPlan: Number(sellingPlan[0].selling_plans[0].id),
          quantity: 1,
        }
        uniqueBundleArray.push({ ...newItem, quantity: 1 })
      }
    })

    const bundle = {
      externalVariantId: bundleProductData.variantId,
      externalProductId: bundleProductData.productId,
      selections: uniqueBundleArray,
    }

    const cartItems = await recharge.bundle.getDynamicBundleItems(
      bundle,
      bundleProductData.handle
    )
    const cartData = { items: cartItems }

    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = '/cart'
        }
        return response.json()
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })

  bundleAddButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      if (bundleArray.length >= 5) {
        return
      }
      const productId = button.getAttribute('data-product-id')
      const variantId = button.getAttribute('data-variant-id')
      const productHandle = button.getAttribute('data-product-handle')
      const imageUrl = button.getAttribute('data-image-url')
      const productTitle = button.getAttribute('data-product-title')
      const sellingPlans = button.getAttribute('data-selling-plans')

      const price = button.getAttribute('data-price')
      bundleArray.push({
        productId: productId,
        variantId: variantId,
        productHandle: productHandle,
        imageUrl: imageUrl,
        productTitle: productTitle,
        sellingPlans: sellingPlans,
        price: price,
      })

      updateGridImages(bundleArray)
      updatePrices()
    })
  })

  bundleRemoveButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const index = button.getAttribute('data-index')
      bundleArray.splice(index, 1)
      updateGridImages(bundleArray)
      updatePrices()
    })
  })

  const updateGridImages = (bundleArray) => {
    bundleGridItems.forEach((item) => {
      const image = item.querySelector('img')
      const figure = item.querySelector('figure')
      const removeButton = item.querySelector('.js-bundle-remove')
      image.src = ''
      image.alt = ''
      image.classList.add('cyb-bundle-grid__hidden')
      figure.classList.add('cyb-bundle-grid__hidden')
      removeButton.classList.add('cyb-bundle-grid__hidden')
    })

    bundleArray.map((item, index) => {
      const image = bundleGridItems[index].querySelector('img')
      const figure = bundleGridItems[index].querySelector('figure')
      const removeButton =
        bundleGridItems[index].querySelector('.js-bundle-remove')
      image.src = item.imageUrl
      image.alt = item.productTitle
      image.classList.remove('cyb-bundle-grid__hidden')
      figure.classList.remove('cyb-bundle-grid__hidden')
      removeButton.classList.remove('cyb-bundle-grid__hidden')
    })
  }

  const tiers = {
    2: 0.15,
    3: 0.25,
    4: 0.25,
    5: 0.25,
  }

  const updatePrices = () => {
    const productPrices = document.querySelectorAll('.js-bundle-product-price')
    productPrices.forEach((price) => {
      const p = price.getAttribute('data-price')

      if (bundleArray.length === 0 || bundleArray.length === 1) {
        const priceDueToSubscription = p - p * 0.1
        price.textContent = `$${(priceDueToSubscription / 100).toFixed(2)}`
      } else {
        const currentDiscountedPrice = p - p * tiers[bundleArray.length]
        price.textContent = `$${(currentDiscountedPrice / 100).toFixed(2)}`
      }
    })

    // update the subheadline total brices
    const bundlePrice = document.querySelector('.js-bundle-price')
    const discountPrice = document.querySelector('.js-bundle-discount')
    const grossPrice = bundleArray.reduce((acc, item) => {
      return acc + Number(item.price)
    }, 0)

    const priceDueToSubscription = grossPrice - grossPrice * 0.1

    if (bundleArray.length === 0) {
      bundlePrice.innerHTML = '<s>$0.00</s>'
      discountPrice.textContent = '$0.00'
      return
    }

    if (bundleArray.length === 1) {
      bundlePrice.innerHTML = `<s>$${(grossPrice / 100).toFixed(2)}</s>`
      discountPrice.textContent = `$${(priceDueToSubscription / 100).toFixed(
        2
      )}`
      return
    }

    if (bundleArray.length > 0) {
      bundlePrice.innerHTML = `<s>$${(grossPrice / 100).toFixed(2)}</s>`

      const currentDiscountedPrice =
        grossPrice - grossPrice * tiers[bundleArray.length]
      discountPrice.textContent = `$${(currentDiscountedPrice / 100).toFixed(
        2
      )}`
    }
  }

  updatePrices()
})
