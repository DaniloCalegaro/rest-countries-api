/*---Toggle Dark Model---*/

modeDark.addEventListener('click', () => {
   const page = document.querySelector('html')
   page.classList.toggle('dark-mode')
})

/*--- Back To Top ---*/
window.addEventListener('scroll', () => {
   const backToTop = document.querySelector('.back-to-top')
   if (window.scrollY >= 100) {
      backToTop.classList.add('show')
   } else {
      backToTop.classList.remove('show')
   }
})
