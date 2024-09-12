import { renderFile } from "../deps.js";
import { redirectTo } from "../utils/requestUtils.js";
import { responseDetails } from "../utils/responseUtils.js";
import * as shoppingListsService from "../services/shoppingListsService.js";

const addList = async(request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await shoppingListsService.add(name);
    
    return redirectTo("/lists");
};

const deactivateList = async(request) => {
    const pathname = new URL(request.url).pathname;
    const id = pathname.split("/")[2];

    await shoppingListsService.deactivate(id);

    return redirectTo("/lists")
};

const viewActiveLists = async(request) => {
    const data = {
        shopping_lists: (await shoppingListsService.findAllActive()).rows,
    };

    return new Response(await renderFile("shoppingLists.eta", data), responseDetails);
};

export { 
    addList,
    deactivateList,
    viewActiveLists,
};