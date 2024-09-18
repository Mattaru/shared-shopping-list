const { Pool } = require('pg');


const CONCURRENT_CONNECTIONS = 5;
const connectionPool = new Pool({
    connectionString: process.env.PGURL,
    max: CONCURRENT_CONNECTIONS
});

const executeQuery = async (query, params) => {
    const response = {};
    let client;

    try {
        client = await connectionPool.connect();
        const result = await client.query(query, [params]);

        if (result.rows) {
            response.rows = result.rows;
        }
    } catch (e) {
        response.error = e;
    } finally {
        try {
            client.release();
        } catch (e) {
            console.error('Error releasing client:', e);
        }
    }

    return response;
};


export { 
    executeQuery,
};
