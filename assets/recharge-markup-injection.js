const widget = document.querySelector('recharge-subscription-widget')
const elmenet = document.querySelector('.rc-purchase-option__sub-container')

const shadowRoot = widget.attachShadow({ mode: 'open' }) // 'open' allows external access

const addMarkup = () => {
  setTimeout(() => {
    const targetElement = shadowRoot.querySelector(
      '.rc-purchase-option__sub-container'
    )

    const htmlContent = `
      <style>
        .sub-container {
          display: flex;
          justify-content:
          space-between;
          gap: 16px;
        }

        .sub-container > div {
          width: 33.33%;
          border: 4px solid #F0F3F2;
          border-radius: 8px;
          padding: 4px 8px;
        }

        .sub-container > div > p.buy-paragraph {
          text-align: center;
          margin: 0;
          color: #132F1D;
          font-size: 14px;
          line-height: 160%;
          letter-spacing: 0%;
          font-weight: 400;
        }

        .sub-container > div > p.percentage {
          text-align: center;
          margin: 0;
          color: #132F1D;
          font-size: 14px;
          line-height: 120%;
          letter-spacing: -2%;
          font-weight: 400
        }

        @media (min-width: 768px) {

          .sub-container > div > p.buy-paragraph {
            font-size: 14px;
          }

          .sub-container > div > p.percentage {
            font-size: 22px;
          }

          .sub-container > div {
            padding: 8px 16px;
          }
        }
    </style>

    <div class="sub-container">
      <div>
        <p class="buy-paragraph">Buy Any 1</p>
        <p class="percentage">10% Off</p>
      </div>

      <div>
        <p class="buy-paragraph">Buy Any 2</p>
        <p class="percentage">15% Off</p>
      </div>

      <div>
        <p class="buy-paragraph">Buy Any 3+</p>
        <p class="percentage">25% Off</p>
      </div>
    </div>
    `

    if (targetElement.querySelector('.sub-container')) {
      return
    }

    targetElement.insertAdjacentHTML('beforeend', htmlContent)
    const injectedElement = targetElement.lastElementChild
    injectedElement.style.opacity = 0
    injectedElement.style.transition = 'opacity 0.5s ease-in-out'
    requestAnimationFrame(() => {
      injectedElement.style.opacity = 1
    })
  }, 750)
}

const interval = setInterval(() => {
  if (shadowRoot.querySelector('.rc-purchase-option__sub-container')) {
    addMarkup()
    clearInterval(interval)
  }
}, 500)

shadowRoot.addEventListener('click', (event) => {
  if (
    event.target.classList.contains('rc-purchase-option__input') ||
    event.target.classList.contains(
      'rc-purchase-option__label' && event.target.tagName === 'LABEL'
    )
  ) {
    addMarkup()
  }
})
