const state = {
  vitamins: {
    paginated: false,
    loadMoreButton: document.querySelector('.js-vitamins-see-more'),
    hiddenGrid: document.querySelectorAll(
      'div[data-type="vitamins"].js-paginated-cards'
    ),
  },

  'specialty-compounds': {
    paginated: false,
    loadMoreButton: document.querySelector('.js-specialty-compounds-see-more'),
    hiddenGrid: document.querySelectorAll(
      'div[data-type="specialty-compounds"].js-paginated-cards'
    ),
  },

  minerals: {
    paginated: false,
    loadMoreButton: document.querySelector('.js-minerals-see-more'),
    hiddenGrid: document.querySelectorAll(
      'div[data-type="minerals"].js-paginated-cards'
    ),
  },

  'plants-herbs': {
    paginated: false,
    loadMoreButton: document.querySelector('.js-plants-herbs-see-more'),
    hiddenGrid: document.querySelectorAll(
      'div[data-type="plants-herbs"].js-paginated-cards'
    ),
  },
}

state['vitamins']?.loadMoreButton?.addEventListener('click', function () {
  paginate('vitamins')
})

state['specialty-compounds']?.loadMoreButton?.addEventListener(
  'click',
  function () {
    paginate('specialty-compounds')
  }
)

state['minerals']?.loadMoreButton?.addEventListener('click', function () {
  paginate('minerals')
})

state['plants-herbs']?.loadMoreButton?.addEventListener('click', function () {
  paginate('plants-herbs')
})

const paginate = (key) => {
  const { paginated, loadMoreButton, hiddenGrid } = state[key]
  hiddenGrid[0].style.transition = 'all 0.75s ease-in-out'

  if (!paginated) {
    hiddenGrid[0].style.height = '0'
    hiddenGrid[0].style.overflow = 'hidden'

    const fullHeight = hiddenGrid[0].scrollHeight + 'px'
    requestAnimationFrame(() => {
      hiddenGrid[0].style.height = fullHeight
      hiddenGrid[0].style.opacity = '1'
    })

    loadMoreButton.querySelector('.js-button-text').innerHTML = 'See Fewer'
    loadMoreButton.querySelector('.js-button-icon').style =
      'transform: rotate(180deg);'
    state[key].paginated = true
  } else {
    hiddenGrid[0].style.height = hiddenGrid[0].scrollHeight + 'px'
    hiddenGrid[0].style.overflow = 'hidden'

    requestAnimationFrame(() => {
      hiddenGrid[0].style.height = '0px'
      hiddenGrid[0].style.opacity = '0'
    })

    loadMoreButton.querySelector('.js-button-text').innerHTML = 'See All'
    loadMoreButton.querySelector('.js-button-icon').style =
      'transform: rotate(0deg);'
    state[key].paginated = false
  }
}
