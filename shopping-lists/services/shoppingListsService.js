import { executeQuery } from "../database/database.js";

const add = async(name) => {
    await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);", { name: name});
}; 

const deactivate = async(id) => {
    await executeQuery("UPDATE shopping_lists SET active=FALSE WHERE id=$id;", { id: id });
};

const findAllActive = async() => {
    return await executeQuery("SELECT * FROM shopping_lists WHERE active=TRUE;");
};

export { 
    add,
    deactivate,
    findAllActive,
 };