const axios = require('axios')
const { Country } = require('../db')

// Request the data from the API Rest of countries
const getApiData = async ()=> {

  try {

    const { data } = await axios(`https://restcountries.com/v3/all`)
    const allCountries = data.map( country => (
        {
        id: country.cca3,
        name: country.name.common,
        flag: country.flags[0],
        continent: country.continents.join(),
        capital: country.capital? country.capital.join().toString() : 'Not defined',
        subregion: country.subregion? country.subregion : null,
        area: country.area? country.area : null,
        population: country.population,
      }
    ) )
    
    return allCountries

  } catch (error) {

    throw Error( `Error API request: ${ error.message }` )

  }
}

// Get the data from the DB or from the API
const saveApiData = async ()=>{
  try {

    // Data from the DB
    let allCountriesBD = await Country.findAll()
    // Data from the API
    const allCountriesAPI = await getApiData()
    
    if( !allCountriesBD.length ){
      // If there is no data in the DB, load the API data into the DB
      await Country.bulkCreate( allCountriesAPI )
    } else {
      // If there is data in the dB, 
      // it compares the existing data with that of the API and updates it if necessary
      allCountriesBD = [ ...allCountriesBD, ...allCountriesAPI ]
      allCountriesBD.forEach( country => {      
        Country.findOrCreate( {
          where: { id: country.id }
        })
      })
    }

    // Returns the data from the DB, updated or not
    return allCountriesBD

  } catch (error) {

    // Catches any errors that may exist, whether from the API or from the DB
    if( error.message.includes( 'Error API request:' ) ) throw Error( error.message )

    throw Error( `Error DB request: ${ error.message }` )

  }
}

module.exports = saveApiData