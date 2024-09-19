import { executeQuery } from "../database/database.js";


const addItem = async(name) => {
    return (await executeQuery(`INSERT INTO shopping_list_items(name) 
        VALUES($1) RETURNING *`, name));
};

const addList = async(name) => {
    return await executeQuery(`INSERT INTO shopping_lists(name) 
        VALUES($1) RETURNING *`, name);
};

const deletItemById = async(id) => {
    await executeQuery(`DELETE FROM shopping_list_items 
        WHERE id = $1`, id);
};

const deletListById = async(id) => {
    await executeQuery(`DELETE FROM shopping_lists 
        WHERE id = $1`, id);
};

const deleteItemByName = async(name) => {
    await executeQuery(`DELETE FROM shopping_list_items 
        WHERE name = $1`, name);
};

const deleteListByName = async(name) => {
    await executeQuery(`DELETE FROM shopping_lists 
        WHERE name = $1`, name);
};


export {
    addItem,
    addList,
    deletItemById,
    deletListById,
    deleteItemByName,
    deleteListByName,
};