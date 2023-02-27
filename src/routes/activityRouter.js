const activityRouter = require( 'express').Router()
const { getAllActivitiesHandler, createActivityHandler, updateActivityHandler, deleteActivityHandler } = require( '../handlers' )

// Gets all the activities of the DB
activityRouter.get( '/', getAllActivitiesHandler )

// Create a new Activity in the DB with the parameters entered by BODY
activityRouter.post( '/', createActivityHandler )

// Update a Activity in the DB with the parameters entered by BODY
activityRouter.put( '/', updateActivityHandler )

// Update a Activity in the DB with the parameters entered by BODY
activityRouter.delete( '/:id', deleteActivityHandler )

module.exports = activityRouter 