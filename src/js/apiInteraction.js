const url =
   'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital'

const urlFilterdRegions = 'https://restcountries.com/v3.1/region/'
const urlFilterName = 'https://restcountries.com/v3.1/name/'

const sectionListCountries = document.querySelector('.list-countries')

async function fetchCountries() {
   sectionListCountries.innerHTML = ''
   viewModalLoading(true)
   try {
      const countries = await axios.get(url)
      viewModalLoading(false)
      createOptionSelect(countries.data)
      createContainersCountries(countries.data)
   } catch (e) {
      console.error(e)
      viewModalLoading(false)
      createMessageClient('Failed to load data')
   }
}

async function fetchCountriesOfRegions(region) {
   sectionListCountries.innerHTML = ''
   viewModalLoading(true)
   try {
      const countries = await axios.get(urlFilterdRegions + region)
      viewModalLoading(false)
      createContainersCountries(countries.data)
   } catch (e) {
      //console.error(e)
      viewModalLoading(false)
      createMessageClient('Country not found!')
   }
}

async function fetchSearchCountry(country) {
   sectionListCountries.innerHTML = ''
   viewModalLoading(true)
   try {
      const countries = await axios.get(urlFilterName + country)
      viewModalLoading(false)
      createContainersCountries(countries.data)
   } catch (e) {
      //console.error(e)
      viewModalLoading(false)
      createMessageClient('Country not found!')
   }
}

function newElement(name, className, type) {
   name = document.createElement(type)
   if (className != '') {
      name.className = className
   }
   return name
}

function createContainersCountries(data) {
   data.forEach(country => {
      const countryCreate = newElement(
         'countryCreate',
         'container-country animation-up',
         'div'
      )
      const divFlag = newElement('divFlag', 'flag', 'div')
      const imgFlag = newElement('imgFlag', '', 'img')
      imgFlag.src = country.flags.svg

      divFlag.appendChild(imgFlag)

      const divInfoCountry = newElement('divInfoCountry', 'info-country', 'div')
      const listInfoCountry = newElement('listInfoCountry', '', 'ul')

      //---
      const rowInfoCountry = newElement('rowInfoCountry', '', 'li')
      const pNameCounty = newElement('pNameCounty', '', 'p')
      pNameCounty.textContent = country.name.common
      rowInfoCountry.appendChild(pNameCounty)
      listInfoCountry.appendChild(rowInfoCountry)

      //---
      const rowPopulationCountry = newElement('rowPopulationCountry', '', 'li')
      const pPopulationCounty = newElement('pPopulation', '', 'p')
      pPopulationCounty.textContent = 'Population:'
      const spanPopulationCountry = newElement(
         'spanPopulationCountry',
         '',
         'span'
      )
      spanPopulationCountry.textContent = country.population
      rowPopulationCountry.appendChild(pPopulationCounty)
      rowPopulationCountry.appendChild(spanPopulationCountry)
      listInfoCountry.appendChild(rowPopulationCountry)

      //---
      const rowRegionCountry = newElement('rowRegionCountry', '', 'li')
      const pRegionCounty = newElement('pRegion', '', 'p')
      pRegionCounty.textContent = 'Region:'
      const spanRegionCountry = newElement('spanRegionCountry', '', 'span')
      spanRegionCountry.textContent = country.region
      rowRegionCountry.appendChild(pRegionCounty)
      rowRegionCountry.appendChild(spanRegionCountry)
      listInfoCountry.appendChild(rowRegionCountry)

      //---

      const rowCapitalCountry = newElement('rowCapitalCountry', '', 'li')
      const pCapitalCounty = newElement('pCapital', '', 'p')
      pCapitalCounty.textContent = 'Capital:'
      const spanCapitalCountry = newElement('spanCapitalCountry', '', 'span')
      spanCapitalCountry.textContent = country.capital
      rowCapitalCountry.appendChild(pCapitalCounty)
      rowCapitalCountry.appendChild(spanCapitalCountry)
      listInfoCountry.appendChild(rowCapitalCountry)

      //---

      divInfoCountry.appendChild(listInfoCountry)

      countryCreate.appendChild(divFlag)
      countryCreate.appendChild(divInfoCountry)
      sectionListCountries.appendChild(countryCreate)
      //console.log(country.flags.svg)
   })
}

function createOptionSelect(data) {
   const regionsReceived = []
   data.forEach(country => {
      const confirmDuplicate = regionsReceived.some(
         region => region === country.region
      )
      if (!confirmDuplicate) {
         regionsReceived.push(country.region)
         const optionSelectRegions = newElement('optionSelect', '', 'option')
         optionSelectRegions.textContent = country.region
         selectRegion.appendChild(optionSelectRegions)
      }
   })
}

function createMessageClient(data) {
   const pNotify = newElement('pNotify', '', 'p')
   pNotify.textContent = data
   sectionListCountries.append(pNotify)
}

function viewModalLoading(view) {
   const modalWait = document.querySelector('.modal-wait')
   if (view === true) {
      modalWait.classList.add('show')
   } else {
      modalWait.classList.remove('show')
   }
}

/*--- EventListeners ---*/

selectRegion.addEventListener('change', event => {
   const region = event.target.value
   //console.log(region)
   if (region === 'All') {
      fetchCountries()
   } else {
      fetchCountriesOfRegions(event.target.value)
   }
})

inputSeachCountry.addEventListener('input', event => {
   selectRegion.selectedIndex = 1
   if (event.target.value != '') {
      fetchSearchCountry(event.target.value)
   } else {
      fetchCountries()
   }
})

window.onload = () => {
   fetchCountries()
}
