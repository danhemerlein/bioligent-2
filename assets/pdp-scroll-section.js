document.addEventListener('DOMContentLoaded', function () {
  const valueProps = document.querySelectorAll('.value-prop')
  const stickySection = document.querySelector('.sticky')
  const timeline = document.querySelector('.timeline')

  console.log(valueProps, stickySection, timeline)

  if (!stickySection || valueProps.length === 0) return

  let sectionTop = stickySection.offsetTop
  let sectionHeight = stickySection.offsetHeight
  let windowHeight = window.innerHeight

  function handleScroll() {
    const scrollY = window.scrollY
    const sectionBottom = sectionTop + sectionHeight

    // Only animate when we're within the sticky section
    if (scrollY >= sectionTop && scrollY <= sectionBottom) {
      console.log("Only animate when we're within the sticky section")

      const scrollProgress =
        (scrollY - sectionTop) / (sectionHeight - windowHeight)

      // Animate timeline height
      if (timeline) {
        const timelineHeight = Math.min(100, scrollProgress * 100)
        timeline.style.height = `${timelineHeight}%`

        // Fade out timeline when height is 5% or less
        if (timelineHeight <= 5) {
          const opacity = timelineHeight / 5 // Fade from 0 to 1 as height goes from 0 to 5%
          timeline.style.opacity = opacity
        } else {
          timeline.style.opacity = 1
        }
      }

      valueProps.forEach((prop, index) => {
        const propThreshold = index / (valueProps.length - 1)
        const fadeInStart = propThreshold * 0.8 // Start fading in at 80% of the way through the previous prop
        const fadeInEnd = propThreshold

        let opacity = 0
        if (scrollProgress >= fadeInStart) {
          opacity = Math.min(
            1,
            (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart)
          )
        }

        prop.style.opacity = opacity
      })
    } else if (scrollY < sectionTop) {
      // Reset all to 0 opacity when above the section
      console.log('// Reset all to 0 opacity when above the section')
      if (timeline) {
        timeline.style.height = '0%'
        timeline.style.opacity = 0
      }
      valueProps.forEach((prop) => {
        prop.style.opacity = 0
      })
    } else if (scrollY > sectionBottom) {
      // Set all to 1 opacity when below the section
      console.log('// Set all to 1 opacity when below the section')
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
    const newSectionTop = stickySection.offsetTop
    const newSectionHeight = stickySection.offsetHeight
    const newWindowHeight = window.innerHeight

    sectionTop = newSectionTop
    sectionHeight = newSectionHeight
    windowHeight = newWindowHeight

    handleScroll()
  })

  // Initial call
  handleScroll()
})
