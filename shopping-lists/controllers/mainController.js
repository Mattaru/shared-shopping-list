import { renderFile } from "../deps.js";
import { responseDetails } from "../utils/responseUtils.js";
import * as shoppingItemsService from "../services/shoppingItemsService.js";
import * as shoppingListsService from "../services/shoppingListsService.js";

const viewMainPage = async(request) => {
    const data = {
        title: "Shared shopping lists",
        statistic: {
            itemsCount: (await shoppingItemsService.getItemsCount()).rows[0].count,
            listsCount:(await shoppingListsService.getListsCount()).rows[0].count,
        },
    };
    
    return new Response(await renderFile("main.eta", data), responseDetails);
};

export { viewMainPage };