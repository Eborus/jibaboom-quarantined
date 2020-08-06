//Database connection stuff, do not touch unless you wanna switch between the backup and the main database, in which you'd only have to change connectionString. Just copy
//and paste the url

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
function resetTable(callback) {
    const client = connect();
    const query = `
        DROP TABLE IF EXISTS musicFestival;
        CREATE TABLE musicFestival (
            id SERIAL PRIMARY KEY,
            data_type VARCHAR(20) NOT NULL,
            performance_id BIGINT NOT NULL,
            festival_id BIGINT NOT NULL,
            performance VARCHAR(40),
            startTime CHAR(4) NOT NULL,
            endTime CHAR(4) NOT NULL,
            popularity INTEGER,
            UNIQUE (data_type, performance_id)
        );
    `;
    client.query(query, (err, res) => {
        console.log(err, res);
        client.end();
        callback(err, res);
    })
}

//Since there is no frontend option to insert statements. Use test.http for the insert function
function insertPerformanceData(musicFestival, dataType, callback) {
    let i = 1;
    const queryStructure = musicFestival.map(music => `($${i++}, $${i++}, $${i++} ,$${i++}, $${i++}, $${i++}, $${i++})`).join(',');
    const values = musicFestival.reduce((reduced, music) => [...reduced, dataType, music.performanceId, music.festivalId, music.performance, music.startTime, music.endTime, music.popularity], []);
    if (musicFestival.length == 0) {
        const err = "";
        const result = "";
        return callback(err, result);
    } else {
        const query = `INSERT INTO musicFestival (data_type, performance_id, festival_id, performance, startTime, endTime, popularity) VALUES ${queryStructure};`;

        const client = connect();
        client.query(query, values, (err, result) => {
            callback(err, result);
            client.end();
        });
    }
}

//Gets and generates the table again based on filtered search.
function getPerformanceDetails(dataType, festivalId, startTime, endTime, page = 0, pageSize = 18, callback) { //Default should always be 18 rows.
    console.log("DataType = " + dataType);
    let whereClause;
    let i = 1;
    const values = [];
    if (dataType == 0 && !festivalId && !startTime && !endTime) whereClause = ''; //If all inputs are empty, return an empty sql query
    else {
        whereClause = 'WHERE ';
        if (festivalId) {
            whereClause += `festival_id = $${i++}`;
            values.push(parseInt(festivalId));
        }
        if (startTime) { //Checks if festivalid is queried
            whereClause += festivalId ? ` AND startTime >= $${i++}` : `startTime >= $${i++}`;
            values.push(startTime);
        }
        if (endTime) { //Checks if startTime is queried, if empty then checks for festival id
            whereClause += startTime ? ` AND endTime < $${i++}` : festivalId ? ` AND endTime < $${i++}` : `endTime < $${i++}`;
            values.push(endTime);
        }
        if (dataType == 1) {
            whereClause += endTime ? ` AND data_type = 'Basic'` : startTime ? ` AND data_type = 'Basic'` : festivalId ? ` AND data_type = 'Basic'` : `data_type = 'Basic'`;
        }
        if (dataType == 2) {
            whereClause += endTime ? ` AND data_type = 'Advanced'` : startTime ? ` AND data_type = 'Advanced'` : festivalId ? ` AND data_type = 'Advanced'` : `data_type = 'Advanced'`;
        }
    }

    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`; //@Rui Yang, you can choose to build the pagination upon this code structure. Or you can delete the 
    values.push(parseInt(pageSize));                        //limitOffSetClause and do your style
    values.push(parseInt(page) * parseInt(pageSize));
    const query = `SELECT * FROM musicFestival ${whereClause} ${limitOffsetClause}`;

    const client = connect();
    client.query(query, values, function (err, result) {
        client.end();
        if (err) {
            // result is null; thus, cannot access the "rows" key from result. i.e. result.rows will throw an error.
            console.log(err);
            return callback(err, result);
        }
        const {rows} = result;
        callback(err, rows);
    })
}

function getPerformancesForComputation(festival_id, callback) {
    if(!festival_id) {
        const error = {message: "Expected Error due to Missing Field", status: 400}
        callback(error);
        return;
    }
    const client = connect();
    client.query(`SELECT * FROM musicFestival WHERE festival_id = $1`, [festival_id], (err, { rows }) => {
        client.end();
        callback(err, rows);
    });
}

module.exports = {
    resetTable,
    insertPerformanceData,
    getPerformanceDetails,
    getPerformancesForComputation
};