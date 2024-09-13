import { executeQuery } from "../database/database.js";


const add = async(listId, name) => {
    await executeQuery(`INSERT INTO shopping_list_items (shopping_list_id, name) 
        VALUES ($listId, $name);`,
        { listId: listId, name: name});
};

const collected = async(itemId, collected = true) => {
    await executeQuery(`UPDATE shopping_list_items 
        SET collected = $collected
        WHERE id = $itemId;`, 
        { collected: collected, itemId: itemId,  });
};

const getCollectedFromList = async(listId, collected = false, sorted = false) => {
    if (sorted)
        return await executeQuery(`SELECT * FROM shopping_list_items 
            WHERE shopping_list_id = $listId  
            AND collected = $collected
            ORDER BY name ASC;`, 
            { listId: listId, collected: collected });
    else
        return await executeQuery(`SELECT * FROM shopping_list_items 
            WHERE shopping_list_id = $listId  
            AND collected = $collected`, 
            { listId: listId, collected, collected });
};

const findAllFromList = async(listID) => {
    return await executeQuery(`SELECT * FROM shopping_list_items 
        WHERE shopping_list_id = $listID;`,
        { listID : listID});
};


export {
    add,
    collected,
    getCollectedFromList,
    findAllFromList,
};