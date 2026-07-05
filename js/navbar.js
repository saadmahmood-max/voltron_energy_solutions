const hamburger = document.getElementById('hamburger')
const overlay = document.getElementById('overlay')
const lineTop = document.querySelector('.line-top')
const lineBot = document.querySelector('.line-bot')
const overlayLinks = document.querySelectorAll('.overlay-link')
const navbar = document.querySelector('.navbar')

let isOpen = false

function toggleMenu() {
  isOpen = !isOpen

  const tl = gsap.timeline()

  if (isOpen) {
    overlay.style.pointerEvents = 'auto'
    tl.fromTo(
      overlay,
      { clipPath: 'circle(0% at 100% 0%)' },
      { clipPath: 'circle(150% at 100% 0%)', duration: 0.8, ease: 'power3.inOut' }
    ).fromTo(
      overlayLinks,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
      '-=0.3'
    )

    gsap.to(lineTop, { y: 3, rotate: 45, duration: 0.35, ease: 'power3.inOut' })
    gsap.to(lineBot, { y: -3, rotate: -45, duration: 0.35, ease: 'power3.inOut' })
  } else {
    tl.to(overlayLinks, { y: 20, opacity: 0, duration: 0.2, stagger: 0.03 }).to(
      overlay,
      {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          overlay.style.pointerEvents = 'none'
        },
      },
      '-=0.1'
    )

    gsap.to(lineTop, { y: 0, rotate: 0, duration: 0.35, ease: 'power3.inOut' })
    gsap.to(lineBot, { y: 0, rotate: 0, duration: 0.35, ease: 'power3.inOut' })
  }
}

hamburger.addEventListener('click', toggleMenu)

// Close menu when a link is clicked
overlayLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (isOpen) toggleMenu()
  })
})

// Hide navbar on scroll down, show on scroll up
let lastScrollY = window.scrollY

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY

  // Don't hide navbar if overlay menu is open
  if (isOpen) return

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // Scrolling down
    gsap.to(navbar, { y: '-150%', duration: 0.4, ease: 'power2.inOut' })
  } else {
    // Scrolling up
    gsap.to(navbar, { y: '0%', duration: 0.4, ease: 'power2.inOut' })
  }

  lastScrollY = currentScrollY
})