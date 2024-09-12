import { executeQuery } from "../database/database.js";

const add = async(id, name) => {
    await executeQuery("INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($id, $name);",
        { id: id, name: name});
};

const findAll = async(id) => {
    return await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id=$id;",
        { id : id});
};

export {
    add,
    findAll,
};