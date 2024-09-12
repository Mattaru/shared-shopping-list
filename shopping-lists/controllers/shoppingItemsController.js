import { renderFile } from "../deps.js";
import { redirectTo } from "../utils/requestUtils.js";
import { responseDetails } from "../utils/responseUtils.js";
import * as shoppingItemsService from "../services/shoppingItemsService.js";

const addItem = async(request) => {
    const pathname = new URL(request.url).pathname;
    const formData = await request.formData();
    const id = pathname.split("/")[2];
    const name = formData.get("name");

    await shoppingItemsService.add(id, name);
    
    return redirectTo(`/lists/${id}`);
};

const viewShoppingItems = async(request) => {
    const pathname = new URL(request.url).pathname;
    const id = pathname.split("/")[2];
    const data = {
        list_id: id,
        shopping_items: (await shoppingItemsService.findAll(id)).rows,
    };

    return new Response(await renderFile("individualShoppingList.eta", data), responseDetails);
};

export {
    addItem,
    viewShoppingItems,
};