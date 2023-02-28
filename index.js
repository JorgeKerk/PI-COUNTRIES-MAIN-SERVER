//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { saveApiData } = require('./src/controllers');
const port = process.env.PORT || 3001

// Syncing all the models at once.
conn.sync( { force: false } ).then( async () => {
  try {
    // The data from the DB or API is loaded after connecting to the DB and before starting the server
    await saveApiData()
    server.listen(port, () => {
      console.log(`%s listening at ${ port }`); // eslint-disable-line no-console
    });
  } catch (error) {
    // Captures any errors that may exist if the data could not be loaded
    console.error( `Server not up by ${ error.message }` );
  }
});
