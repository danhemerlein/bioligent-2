document.addEventListener('DOMContentLoaded', function () {
  const valueProps = document.querySelectorAll('.value-prop')
  const stickySection = document.querySelector('.sticky')
  const timeline = document.querySelector('.timeline')

  if (!stickySection || valueProps.length === 0) return

  let sectionTop = 0
  let sectionHeight = 0
  let windowHeight = window.innerHeight

  // Function to calculate positions with proper timing
  function calculatePositions() {
    const rect = stickySection.getBoundingClientRect()
    sectionTop = rect.top + window.scrollY
    sectionHeight = rect.height
    windowHeight = window.innerHeight
  }

  // Initial calculation with a small delay to ensure elements are rendered
  setTimeout(() => {
    calculatePositions()
    handleScroll() // Initial call after positions are calculated
  }, 100)

  function handleScroll() {
    const scrollY = window.scrollY
    const sectionBottom = sectionTop + sectionHeight

    // Recalculate positions if they seem wrong (safety check)
    if (sectionTop === 0 || sectionHeight === 0) {
      calculatePositions()
    }

    console.log('Scroll check:', {
      scrollY,
      sectionTop,
      sectionBottom,
      sectionHeight,
      windowHeight,
    })

    // Only animate when we're within the sticky section
    if (scrollY >= sectionTop && scrollY <= sectionBottom) {
      console.log("Only animate when we're within the sticky section")

      // Calculate how far through the section we are (0 to 1)
      const sectionProgress =
        (scrollY - sectionTop) / (sectionHeight - windowHeight)

      // Animate timeline height more gradually
      if (timeline) {
        const timelineHeight = Math.min(100, sectionProgress * 100)
        timeline.style.height = `${timelineHeight}%`
        // Timeline fades in more slowly
        timeline.style.opacity =
          sectionProgress > 0.1 ? 1 : sectionProgress / 0.1
      }

      // Show value props with larger, overlapping fade windows for smoother transitions
      valueProps.forEach((prop, index) => {
        // Each value prop gets a 35% window to fade in (larger than before)
        const propStart = Math.max(0, index * 0.25) // Start earlier
        const propEnd = Math.min(1, (index + 1) * 0.35) // End later

        let opacity = 0

        if (sectionProgress >= propStart) {
          if (sectionProgress >= propEnd) {
            opacity = 1 // Fully visible
          } else {
            // Fade in over the larger window with smoother easing
            const fadeProgress =
              (sectionProgress - propStart) / (propEnd - propStart)
            // Use a smoother easing function
            opacity = Math.pow(fadeProgress, 0.7) // Makes the fade more gradual
          }
        }

        prop.style.opacity = opacity
      })
    } else if (scrollY < sectionTop) {
      // Reset all to 0 opacity when above the section

      if (timeline) {
        timeline.style.height = '0%'
        timeline.style.opacity = 0
      }
      valueProps.forEach((prop) => {
        prop.style.opacity = 0
      })
    } else if (scrollY > sectionBottom) {
      // Set all to 1 opacity when below the section
      if (timeline) {
        timeline.style.height = '100%'
        timeline.style.opacity = 1
      }
      valueProps.forEach((prop) => {
        prop.style.opacity = 1
      })
    }
  }

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', function () {
    // Recalculate positions on resize
    calculatePositions()
    handleScroll()
  })

  // Additional safety check - recalculate after a longer delay
  setTimeout(() => {
    calculatePositions()
  }, 500)
})
