const { getAllActivities, createActivity, updateActivity, deleteActivity } = require( '../controllers' )

// Gets all the activities of the DB
const getAllActivitiesHandler = async ( req, res )=> {

  try {

    const allActivities = await getAllActivities()

    return res.status( 200 ).json( allActivities )

  } catch ( error ) {

    return res.status( 400 ).json( { error: error.message } )

  }
}

// Create a new Activity in the DB with the parameters entered by BODY
const createActivityHandler = async ( req, res )=> {

  const { name, dificulty, duration, seasons, countriesIds } = req.body

  try {

    const newActivity = await createActivity( name, dificulty, duration, seasons, countriesIds )
    
    return res.status( 200 ).json( newActivity )

  } catch ( error ) {

    return res.status( 400 ).json( { error: error.message } )

  }
}

// Update a Activity in the DB with the parameters entered by BODY
const updateActivityHandler = async ( req, res )=> {

  const { name, dificulty, duration, seasons, countriesIds } = req.body

  try {

    const updatedActivity = await updateActivity( name, dificulty, duration, seasons, countriesIds )
    
    return res.status( 200 ).json( updatedActivity )

  } catch ( error ) {

    return res.status( 400 ).json( { error: error.message } )

  }
}

const deleteActivityHandler = async ( req, res )=> {

  const { id } = req.params

  try {

    const deletedActivity = await deleteActivity( id )
    
    return res.status( 200 ).json( deletedActivity )

  } catch ( error ) {

    return res.status( 400 ).json( { error: error.message } )

  }
}

module.exports = { getAllActivitiesHandler, createActivityHandler, updateActivityHandler, deleteActivityHandler }