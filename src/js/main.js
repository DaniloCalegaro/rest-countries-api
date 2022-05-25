//const modeDark = document.getElementById('mode-dark')

modeDark.addEventListener('click', () => {
   const page = document.querySelector('html')
   page.classList.toggle('dark-mode')
})
