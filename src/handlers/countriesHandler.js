const { getAllCountries, getCountryById } = require( '../controllers' )

// Gets all the Countries of the DB. 
// If 'name' is sent by QUERY, it gets all the Countries that contain the value of 'name' in their name
const getAllCountriesHandler = async ( req, res )=> {

  const { name } = req.query

  try {

    const allCountries = await getAllCountries( name )

    return res.status( 200 ).json( allCountries )

  } catch ( error ) {

    return res.status( 400 ).json( { error: error.message } )

  }
}

// Gets a Country from the DB with the ID sent by PARAMS
const getCountryByIdHandler = async ( req, res )=> {

  const { idCountry } = req.params

  try {

    const countryById = await getCountryById( idCountry )

    return res.status( 200 ).json( countryById )

  } catch ( error ) {

    return res.status( 400 ).json( { error: error.message } )
    
  }
}

module.exports = { getAllCountriesHandler, getCountryByIdHandler }