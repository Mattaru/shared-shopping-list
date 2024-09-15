import { renderFile } from "../deps.js";
import { redirectTo } from "../utils/requestUtils.js";
import { responseDetails } from "../utils/responseUtils.js";
import * as adminService from "../services/adminService.js";
import * as shoppingItemsService from "../services/shoppingItemsService.js";
import * as shoppingListsService from "../services/shoppingListsService.js";


const deleteList = async(request) => {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[2];

    await shoppingItemsService.deletByListId(id);
    await shoppingListsService.deleteById(id);

    return redirectTo("/admin");
};

const viewAdmin = async(request) => {
    const data = {
        title: "Admin:",
        shopping_lists: (await adminService.getAllListsWhithItems()).rows,
    };

    return new Response(await renderFile("./admin/admin.eta", data), responseDetails);
};


export {
    viewAdmin,
    deleteList,
};