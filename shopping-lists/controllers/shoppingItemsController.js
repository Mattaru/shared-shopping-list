import { renderFile } from "../deps.js";
import { redirectTo } from "../utils/requestUtils.js";
import { responseDetails } from "../utils/responseUtils.js";
import * as shoppingItemsService from "../services/shoppingItemsService.js";
import * as shoppingListsService from "../services/shoppingListsService.js";


const addItem = async(request) => {
    const pathname = new URL(request.url).pathname;
    const formData = await request.formData();
    const listId = pathname.split("/")[2];
    const name = formData.get("name");

    await shoppingItemsService.add(listId, name);
    
    return redirectTo(`/lists/${listId}`);
};

const markItemAsCollected = async(request) => {
    const pathname = new URL(request.url).pathname;
    const listId = pathname.split("/")[2];
    const itemId = pathname.split("/")[4];

    console.log(`Pathname: ${ pathname } \nlID: ${ listId } \niID: ${ itemId }`);

    await shoppingItemsService.collected(itemId);

    return redirectTo(`/lists/${listId}`);
};

const viewShoppingItems = async(request) => {
    const pathname = new URL(request.url).pathname;
    const listId = pathname.split("/")[2];
    const data = {
        shoppingList: 
        (await shoppingListsService.getById(listId)).rows[0],
        collectedItems: 
        (await shoppingItemsService.getCollectedFromList(listId, true, true)).rows,
        notCollectedItems: 
        (await shoppingItemsService.getCollectedFromList(listId, false, true)).rows,
    };

    return new Response(await renderFile("individualShoppingList.eta", data), responseDetails);
};


export {
    addItem,
    markItemAsCollected,
    viewShoppingItems,
};