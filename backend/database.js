const { Client } = require('pg');
const connectionString = 'postgres://gufhunsh:W3aGK2IiEFfhTRC63WfpuIY39qQHfR4V@john.db.elephantsql.com:5432/gufhunsh'

function connect() {
    const client = new Client({
        connectionString: connectionString,
      });
      client.connect();
      return client;
}

//Run npm run resetTable to reset the database. Aka, drops the table and creates a new table with empty values.
function resetTable() {
    const client = connect();
    const query = `
        DROP TABLE IF EXISTS musicFestival;
        CREATE TABLE musicFestival (
            id SERIAL PRIMARY KEY,
            performance_id INTEGER UNIQUE NOT NULL,
            festival_id INTEGER NOT NULL,
            performance VARCHAR(40) NOT NULL,
            startTime CHAR(4) NOT NULL,
            endTime CHAR(4) NOT NULL,
            popularity INTEGER NOT NULL
        );
    `;
    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
    })
}

function insertPerformanceData(musicFestival, callback) {
    let i = 1;
    const template = musicFestival.map(music => `($${i++}, $${i++}, $${i++}, $${i++}, $${i++}, $${i++})`).join(',');
    const values = musicFestival.reduce((reduced, music) => [...reduced, music.performance_id, music.festival_id, music.performance, music.startTime, music.endTime, music.popularity], []);
    const query = `INSERT INTO musicFestival (performance_id, festival_id, performance, startTime, endTime, popularity) VALUES ${template};`;
    
    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
}

module.exports = {
    resetTable,
    insertPerformanceData,
};