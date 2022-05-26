//const axios = require('axios').default

const urlFilterd =
   'https://restcountries.com/v2/all?fields=name,flags,population,region,capital'

// axios
//    .get(urlFilterd)
//    .then(response => console.log(response.data))
//    .catch(error => console.error(error))

async function fetchCountries() {
   try {
      const countries = await axios.get(urlFilterd)
      //console.log(countries.data)
      createConntainersCountries(countries.data)
   } catch (e) {
      console.error(e)
   }
}

function newElement(name, className, type) {
   name = document.createElement(type)
   if (className != '') {
      name.className = className
   }
   return name
}

function createConntainersCountries(data) {
   const sectionListCountries = document.querySelector('.list-countries')

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
      pNameCounty.textContent = country.name
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

fetchCountries()
