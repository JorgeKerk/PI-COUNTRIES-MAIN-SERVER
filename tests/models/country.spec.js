const { Activity, Country, conn } = require( "../../src/db.js" );
const { expect } = require( "chai" );

describe( "Validations Model", () => {
  describe( "Country Model Async:", async () => {
    before(() => conn.authenticate()
    .catch((err) => {
      console.error( "Unable to connect to the database:", err);
    }));
    
    beforeEach(() => Country.sync({ force: true }));

    const country = await Country.build({
      id: "KKK",
      name: "Kapa Kipa Kopa",
      flag: "https://flagcdn.com/ar.svg",
      continent: "South America",
      capital: "Buenos Aires",
      population: 45376763,
    });

    describe( "\nCountry Model:", () => {

      it( "Must have the correct properties.", () => {
        const keys = [ "id", "name", "flag", "continent", "capital", "population" ];
        expect(Object.keys(country.toJSON())).deep.to.equal(keys);
      });
      
      it( "The 'id' property must be a string.", () => {
        expect(country.id).to.be.a('string');
      });
      it( "The 'id' property must be 3 characters.", () => {
        expect(country.id).to.have.lengthOf(3);
      });
      it( "The 'name' property must be a string.", () => {
        expect(country.name).to.be.a('string');
      });
      it( "The 'flag' property must be a string.", () => {
        expect(country.flag).to.be.a('string');
      });
      it( "The 'continent' property must be a string.", () => {
        expect(country.continent).to.be.a('string');
      });
      it( "The 'capital' property must be a string.", () => {
        expect(country.capital).to.be.a('string');
      });
      it( "The 'population' property must be a number.", () => {
        expect(country.population).that.is.a('number');
      });
    });
  });
});
