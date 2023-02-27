const { expect } = require( "chai" );
const { Activity, conn } = require( "../../src/db.js" );

describe( "Validations Model", () => {
  describe( 'Activity model Async: ', async ()=> {
    before(() => conn.authenticate()
    .catch((err) => {
      console.error( "Unable to connect to the database:", err);
    }));
      
    beforeEach(() => Activity.sync({ force: true }));
    
    const activity = await Activity.build({
      name: "Sky",
      dificulty: 1,
      seasons: ['winter'],
    });

    describe( "\nAcivity Model:", () => {
      it( "Must have the correct properties.", () => {
        const keys = [ "id", "name", "dificulty", "seasons" ];
        expect(Object.keys(activity.toJSON())).deep.to.equal(keys);
      });

      it( "The 'name' property must be a string.", () => {
        expect(activity.name).to.be.a('string');
      });

      it( "The 'difficulty' property must be a number.", () => {
        expect(activity.dificulty).that.is.a('number');
      });

      it( "The value of the 'difficulty' property must be between 1 and 5 inclusive.", () => {
        expect(activity.dificulty).to.be.within(1, 5);
      });

      it( "The 'seasons' property must be an array.", () => {
        expect(activity.seasons).to.be.an('array');
      });
      it( "The 'seasons' property cannot be an empty array.", () => {
        expect(activity.seasons).to.be.an('array').that.is.not.empty;
      });
    });
  });
});
