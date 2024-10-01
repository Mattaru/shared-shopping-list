import { Pool } from "../deps.js";


let connectionPool;
const DATABASE_URL = Deno.env.get("DATABASE_URL");

if (DATABASE_URL) connectionPool = new Pool(DATABASE_URL, 10);
else connectionPool = new Pool({}, 10);

const executeQuery = async (query, params) => {
    const response = {};
    let client;

    try {
        client = await connectionPool.connect();
        const result = await client.queryObject(query, params);

        if (result.rows) {
            response.rows = result.rows;
        }
    } catch (e) {
        response.error = e;
    } finally {
        try {
            await client.release();
        } catch (e) {
            console.log(e);
        }
    }

    return response;
};


export { executeQuery };
