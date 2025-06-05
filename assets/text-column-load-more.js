document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.js-text-column-card')
  const loadMoreButton = document.querySelector('.js-text-column-load-more')
  const loadMoreInnerText = loadMoreButton?.innerText
  let loadedMore = false

  if (!window.location.pathname.includes('/our-ingredients')) {
    loadMoreButton?.addEventListener('click', function () {
      if (!loadedMore) {
        cards.forEach(function (card) {
          card.style.display = 'block'
        })
        loadMoreButton.innerText = 'See Less'
      } else {
        cards.forEach(function (card, index) {
          if (index > 9) {
            card.style.display = 'none'
          }
        })
        loadMoreButton.innerText = loadMoreInnerText
      }
      loadedMore = !loadedMore
    })
  }
})
