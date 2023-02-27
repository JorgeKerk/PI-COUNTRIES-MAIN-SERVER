const countryRouter = require( 'express' ).Router()
const { getAllCountriesHandler, getCountryByIdHandler } = require( '../handlers' )

// Gets all the Countries of the DB. 
// If 'name' is sent by QUERY, it gets all the Countries that contain the value of 'name' in their name
countryRouter.get( '/', getAllCountriesHandler )

// Gets a Country from the DB with the ID sent by PARAMS
countryRouter.get( '/:idCountry', getCountryByIdHandler )

module.exports = countryRouter 