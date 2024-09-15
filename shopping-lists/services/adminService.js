import { executeQuery } from "../database/database.js";


const getAllListsWhithItems = async() => {
    return await executeQuery(`SELECT sl.id AS id, sl.name AS name, 
        sl.active AS active, 
        COALESCE( ARRAY_AGG( CASE WHEN sli.id IS NOT NULL 
        THEN json_build_object ('id', sli.id,'name', sli.name,'collected', sli.collected) 
        END) 
        FILTER (WHERE sli.id IS NOT NULL), '{}'::json[]) 
        AS items 
        FROM shopping_lists sl 
        LEFT JOIN shopping_list_items sli 
        ON sl.id = sli.shopping_list_id 
        GROUP BY sl.id 
        ORDER BY sl.id;`);
};


export {
    getAllListsWhithItems,
};