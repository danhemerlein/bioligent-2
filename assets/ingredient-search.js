const form = document.querySelector('.js-ingredient-search-form')
const input = document.querySelector('.js-ingredient-search-input')
const cards = document.querySelectorAll('.js-ingredient-card')
const loadMoreButtons = document.querySelectorAll('.js-see-more-button')
const value = input.value.toLowerCase()
const noResultsMessage = document.querySelector('.js-no-results')

let vitaminsInHits = false
let specialtyCompoundsInHits = false
let mineralsInHits = false
let plantsHerbsInHits = false

const vitaminsGird = document.querySelector('.js-vitamins-grid-container')
const vitaminsDesktopGrid = vitaminsGird.querySelector(
  '.desktop-ingredient-grid'
)
const specialtyCompoundsGrid = document.querySelector(
  '.js-specialty-compounds-grid-container'
)
const specialtyCompoundsDesktopGrid = specialtyCompoundsGrid.querySelector(
  '.desktop-ingredient-grid'
)

const mineralsGrid = document.querySelector('.js-minerals-grid-container')
const mineralsDesktopGrid = mineralsGrid.querySelector(
  '.desktop-ingredient-grid'
)

const plantsHerbsGrid = document.querySelector(
  '.js-plants-herbs-grid-container'
)
const plantsHerbsDesktopGrid = plantsHerbsGrid.querySelector(
  '.desktop-ingredient-grid'
)

const mobileSeachResults = document
  .querySelector('.js-mobile-search-results')
  .querySelectorAll('.js-ingredient-card')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  handleSearch()
})

input.addEventListener('input', function (event) {
  event.preventDefault()
  handleSearch()
})

const handleNoResults = () => {
  vitaminsGird.classList.add('ingredient-card--hidden')
  specialtyCompoundsGrid.classList.add('ingredient-card--hidden')
  mineralsGrid.classList.add('ingredient-card--hidden')
  plantsHerbsGrid.classList.add('ingredient-card--hidden')

  loadMoreButtons.forEach((button) => {
    button.classList.add('ingredient-card--hidden')
  })

  document.querySelector('.js-ingredient-search-results').style.height = '50px'
  noResultsMessage.classList.remove('ingredient-card--hidden')
}

const handleSearch = () => {
  const isMobile = window.innerWidth < 768
  const query = input.value.toLowerCase()
  const hits = []
  const misses = []
  document.querySelector('.js-ingredient-search-results').style.height = 'auto'
  noResultsMessage.classList.add('ingredient-card--hidden')

  if (query === '') {
    location.reload()
    return
  }

  if (isMobile) {
    handleMobileSearch()
    return
  }

  cards.forEach((card) => {
    const title = card.getAttribute('data-search-title')?.toLowerCase() || ''
    const desc = card.getAttribute('data-search-desc')?.toLowerCase() || ''
    const text = `${title} ${desc}`.trim()

    if (text.includes(query)) {
      hits.push(card)
    } else {
      misses.push(card)
    }
  })

  if (hits.length === 0) {
    handleNoResults()
    return
  }

  hits.forEach((hit) => {
    hit.classList.remove('ingredient-card--hidden')
  })

  misses.forEach((miss) => {
    miss.classList.add('ingredient-card--hidden')
  })

  vitaminsInHits = hits.some((hit) => {
    return hit.getAttribute('data-type') === 'vitamins'
  })
  specialtyCompoundsInHits = hits.some((hit) => {
    return hit.getAttribute('data-type') === 'specialty-compounds'
  })
  mineralsInHits = hits.some((hit) => {
    return hit.getAttribute('data-type') === 'minerals'
  })

  plantsHerbsInHits = hits.some((hit) => {
    return hit.getAttribute('data-type') === 'plants-herbs'
  })

  const hitsInPlantsHerbsDesktop = hits.filter((hit) => {
    return (
      hit.getAttribute('data-type') === 'plants-herbs' &&
      hit.getAttribute('data-desktop') === 'true' &&
      hit.getAttribute('data-is-desktop-pagination') === 'true'
    )
  })

  for (let i = 0; i < hitsInPlantsHerbsDesktop.length; i++) {
    plantsHerbsDesktopGrid.appendChild(hitsInPlantsHerbsDesktop[i])
  }

  const hitsInVitaminsDesktop = hits.filter((hit) => {
    return (
      hit.getAttribute('data-type') === 'vitamins' &&
      hit.getAttribute('data-desktop') === 'true' &&
      hit.getAttribute('data-is-desktop-pagination') === 'true'
    )
  })

  for (let i = 0; i < hitsInVitaminsDesktop.length; i++) {
    vitaminsDesktopGrid.appendChild(hitsInVitaminsDesktop[i])
  }

  const hitsInSpecialtyCompoundsDesktop = hits.filter((hit) => {
    return (
      hit.getAttribute('data-type') === 'specialty-compounds' &&
      hit.getAttribute('data-desktop') === 'true' &&
      hit.getAttribute('data-is-desktop-pagination') === 'true'
    )
  })
  for (let i = 0; i < hitsInSpecialtyCompoundsDesktop.length; i++) {
    specialtyCompoundsDesktopGrid.appendChild(
      hitsInSpecialtyCompoundsDesktop[i]
    )
  }

  const hitsInMineralsDesktop = hits.filter((hit) => {
    return (
      hit.getAttribute('data-type') === 'minerals' &&
      hit.getAttribute('data-desktop') === 'true' &&
      hit.getAttribute('data-is-desktop-pagination') === 'true'
    )
  })
  for (let i = 0; i < hitsInMineralsDesktop.length; i++) {
    mineralsDesktopGrid.appendChild(hitsInMineralsDesktop[i])
  }

  vitaminsInHits
    ? vitaminsGird.classList.remove('ingredient-card--hidden')
    : vitaminsGird.classList.add('ingredient-card--hidden')

  specialtyCompoundsInHits
    ? specialtyCompoundsGrid.classList.remove('ingredient-card--hidden')
    : specialtyCompoundsGrid.classList.add('ingredient-card--hidden')

  mineralsInHits
    ? mineralsGrid.classList.remove('ingredient-card--hidden')
    : mineralsGrid.classList.add('ingredient-card--hidden')

  plantsHerbsInHits
    ? plantsHerbsGrid.classList.remove('ingredient-card--hidden')
    : plantsHerbsGrid.classList.add('ingredient-card--hidden')

  if (hits.length > 0) {
    document.querySelectorAll('.js-paginated-cards').forEach((group) => {
      group.style.height = 'auto'
      group.style.overflow = 'hidden'
      group.style.opacity = '1'
    })
    loadMoreButtons.forEach((button) => {
      button.classList.add('ingredient-card--hidden')
    })
  } else {
    loadMoreButtons.forEach((button) => {
      button.classList.remove('ingredient-card--hidden')
    })
  }
}

const handleMobileSearch = () => {
  const query = input.value.toLowerCase()

  const mobileHits = []
  vitaminsGird.classList.add('ingredient-card--hidden')
  specialtyCompoundsGrid.classList.add('ingredient-card--hidden')
  mineralsGrid.classList.add('ingredient-card--hidden')
  plantsHerbsGrid.classList.add('ingredient-card--hidden')

  document
    .querySelector('.js-mobile-search-results')
    .classList.remove('ingredient-card--hidden')

  mobileSeachResults.forEach((card) => {
    const title = card.getAttribute('data-search-title')?.toLowerCase() || ''
    const desc = card.getAttribute('data-search-desc')?.toLowerCase() || ''
    const text = `${title} ${desc}`.trim()
    card.classList.remove('ingredient-card--hidden')

    if (text.includes(query)) {
      card.classList.remove('ingredient-card--hidden')
      mobileHits.push(card)
    } else {
      card.classList.add('ingredient-card--hidden')
    }
  })

  if (mobileHits.length === 0) {
    handleNoResults()

    document
      .querySelector('.js-mobile-search-results')
      .classList.add('ingredient-card--hidden')
    return
  }
}
