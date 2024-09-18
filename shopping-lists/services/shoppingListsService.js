import { executeQuery } from "../database/database.js";


const add = async(name) => {
    await executeQuery(`INSERT INTO shopping_lists (name) 
        VALUES ($name);`, 
        { name: name});
}; 

const deactivate = async(id) => {
    await executeQuery(`UPDATE shopping_lists SET active = FALSE 
        WHERE id=$id;`, 
        { id: id });
};

const deleteById = async(id) => {
    await executeQuery(`DELETE FROM shopping_lists WHERE id = $id`, 
        { id: id });
};

const getById = async(id) => {
    return await executeQuery(`SELECT * FROM shopping_lists 
        WHERE id = $id;`, 
        { id: id });
};

const getByName = async(name) => {
    return await executeQuery(`SELECT * FROM shopping_lists 
        WHERE name = $name;`, 
        { name: name });
};

const getListsCount = async() => {
    return await executeQuery(`SELECT COUNT(*) 
        AS count 
        FROM shopping_lists;`);
};

const findAllActive = async() => {
    return await executeQuery(`SELECT * FROM shopping_lists 
        WHERE active = TRUE;`);
};


export { 
    add,
    deactivate,
    deleteById,
    getById,
    getByName,
    getListsCount,
    findAllActive,
 };