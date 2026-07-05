gsap.registerPlugin(ScrollTrigger)

// Split heading into words wrapped in spans
const heading = document.getElementById('heroHeading')
const words = heading.textContent.trim().split(' ')
heading.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join('')
const wordEls = heading.querySelectorAll('.word')

const para = document.getElementById('heroPara')
const btn = document.getElementById('heroBtn')

const tl = gsap.timeline({ delay: 0.3 })

tl.fromTo(
  wordEls,
  { y: 60, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
)
  .fromTo(para, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
  .fromTo(btn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')

// Cards scroll reveal
const cards = document.querySelectorAll('.card')
cards.forEach((card, i) => {
  gsap.fromTo(
    card,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: i * 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
    }
  )
})


// Stats count-up animation
const statNumbers = document.querySelectorAll('.stat-number')

statNumbers.forEach((el) => {
  const target = parseInt(el.getAttribute('data-target'))
  const suffix = el.getAttribute('data-suffix') || ''
  const counter = { val: 0 }

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.floor(counter.val).toLocaleString() + suffix
        },
      })
    },
  })
})

// Battery Diagnostics animation
const diagnosticsPanel = document.querySelector('.diagnostics-panel')

if (diagnosticsPanel) {
  ScrollTrigger.create({
    trigger: diagnosticsPanel,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.diagnostic-fill').forEach((bar) => {
        const fill = bar.getAttribute('data-fill')
        gsap.to(bar, {
          width: fill + '%',
          duration: 1.5,
          ease: 'power2.out',
        })
      })

      document.querySelectorAll('.diagnostic-value').forEach((el) => {
        const target = parseInt(el.getAttribute('data-target'))
        const suffix = el.getAttribute('data-suffix') || ''
        const counter = { val: 0 }

        gsap.to(counter, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.floor(counter.val) + suffix
          },
        })
      })
    },
  })
}

// Team scroll reveal
const teamCards = document.querySelectorAll('.team-card')
teamCards.forEach((card, i) => {
  gsap.fromTo(
    card,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
      },
    }
  )
})