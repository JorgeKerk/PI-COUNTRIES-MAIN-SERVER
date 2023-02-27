const { Country, Activity } = require( '../db' )

// Returns all the countries of the dB
// If the parameter 'name' exists, it returns the countries that contain in their name the value of the parameter 'name'
const getAllCountries = async ( name )=> {

  let allCountries

  allCountries = await Country.findAll()
  
  if( name ){

    allCountries = allCountries.filter( country => 
      country.name.toLowerCase().includes(name.toLowerCase())
    )

  }

  if( !allCountries.length ) throw Error( `There is no country that contains the word in its name '${ name }'.` )

  return allCountries
  
}

// Returns a country from the DB according to its ID received by parameter
const getCountryById = async ( idPais )=>{

  idPais = idPais.toUpperCase()
  
  if( idPais.length !== 3 ) throw Error( `The country ID '${ idPais }' it is incorrect.`)
  
  const countryById = await Country.findByPk( idPais, 
    { include: { 
      model: Activity,            
      attributes: [ "name", "dificulty", "duration", "seasons" ],
      through: { attributes: [] }
    } } 
  )

  if( !countryById ) throw Error( `The country ID '${ idPais }' does not exist.` )
  
  return countryById

}

module.exports = { getAllCountries, getCountryById }