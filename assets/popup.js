class PopupComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
            <style>
                .popup-overlay {
                  visibility: hidden;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  position: fixed;
                  height: 100vh;
                  background: rgba(0, 0, 0, 0.5);
                  justify-content: center;
                  opacity: 0;
                  display: flex;
                  cursor: pointer;
                  transition: opacity 250ms ease-in-out;
                }

                .popup-overlay.open {
                  visibility: visible;
                  z-index: 1000;
                  opacity: 1;
                }

                .popup {
                  display: flex;
                  background: #fff;
                  padding: 20px;
                  width: 80%;
                  max-width: 800px;
                  max-height: 80%;
                  margin: auto;
                  position: relative;
                  z-index: 1001;
                  position: relative;
                  flex-direction: column;
                  gap: 20px;
                  border-radius: 12px;
                  overflow-y: scroll;
                  scrollbar-width: none;
                  -ms-overflow-style: none;
                }

                .popup::-webkit-scrollbar {
                  display: none; /* Chrome, Safari, Edge */
                }

                .close-btn {
                  height: 30px;
                  width: 30px;
                  cursor: pointer;
                }

                .close-btn svg {
                  width: 100%;
                  height: 100%;
                }

                .popup-image {
                  max-width: 30%;
                  height: auto;
                  margin-right: auto;
                  margin-left: auto;
                  margin-bottom: 20px;
                }

                .popup-content {
                  max-width: 100%;
                  text-align: left;
                }

                @media screen and (max-width: 767px) {
                  .popup {
                    gap: 0;
                  }
                  .popup-content h3 {
                    text-align: center;
                  }
                  .popup-image {
                    max-width: 60%;
                    object-fit: contain;
                    margin-bottom: 0;
                  }
                }

            </style>

            <div class="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="popup-title" aria-describedby="popup-text">
              <div class="popup">

                  <span class="close-btn">
                    <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M12 10.586l-3.293-3.293-1.414 1.414L10.586 12l-3.293 3.293 1.414 1.414L12 13.414l3.293 3.293 1.414-1.414L13.414 12l3.293-3.293-1.414-1.414L12 10.586z" fill="#000" fill-rule="evenodd"/>
                    </svg>
                  </span>

                  <img id="popup-image" class="popup-image" src="" alt="Popup Image">

                  <div id="loading-spinner" class="loading-spinner" style="display: none;">

                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"><animateTransform attributeName="transform" dur="0.6s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>

                    <style>
                      .loading-spinner svg {
                        width: 100%;
                        height: 100px;
                      }
                      .loading-spinner {
                        width: 60%;
                        height: auto;
                        margin-right: auto;
                        margin-left: auto;
                        margin-bottom: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100px;
                      }
                    </style>
                  </div>
                  <div id="popup-text" class="popup-content"></div>
              </div>
            </div>
        `

    this.overlay = this.shadowRoot.querySelector('.popup-overlay')
    this.popup = this.shadowRoot.querySelector('.popup')
    this.closeBtn = this.shadowRoot.querySelector('.close-btn')
    this.image = this.shadowRoot.querySelector('#popup-image')
    this.loadingSpinner = this.shadowRoot.querySelector('.loading-spinner')
    this.text = this.shadowRoot.querySelector('#popup-text')

    this.closeBtn.addEventListener('click', () => this.closePopup())
    this.overlay.addEventListener('click', (event) => {
      if (event.target === this.overlay) {
        this.closePopup()
      }
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closePopup()
      }
    })
  }

  openPopup(imageSrc, imageSrcset, textContent) {
    this.loadingSpinner.style.display = 'block'
    this.image.style.opacity = 0
    this.image.style.display = 'none'
    this.image.src = imageSrc
    this.image.srcset = imageSrcset
    this.text.innerHTML = textContent
    this.overlay.classList.add('open')
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      this.image.style.opacity = 1
      this.image.style.display = 'block'
      this.loadingSpinner.style.display = 'none'
    }, 500)
  }

  closePopup() {
    this.overlay.classList.remove('open')
    document.body.style.overflow = ''
  }
}

customElements.define('popup-component', PopupComponent)

document.querySelectorAll('.js-ingredient-popup-trigger').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    const imageSrc = event.currentTarget.getAttribute('data-image')
    const imageSrcset = event.currentTarget.getAttribute('data-image-srcset')
    const textContent = event.currentTarget.getAttribute('data-text')
    document
      .querySelector('popup-component')
      .openPopup(imageSrc, imageSrcset, textContent)
  })
})
