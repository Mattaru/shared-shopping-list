import { configure } from "./deps.js";
import * as mainController from "./controllers/mainController.js";
import * as shoppingItemsController from "./controllers/shoppingItemsController.js";
import * as shoppingListsController from "./controllers/shoppingListsController.js";


configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") 
    return await mainController.viewMainPage(request);
  else if (url.pathname === "/lists" && request.method === "GET") 
    return await shoppingListsController.viewActiveLists(request);
  else if (url.pathname === "/lists" && request.method === "POST")
    return await shoppingListsController.addList(request);
  else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST")
    return await shoppingListsController.deactivateList(request);
  else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET")
    return await shoppingItemsController.viewShoppingItems(request);
  else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST")
    return await shoppingItemsController.markItemAsCollected(request);
  else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST")
    return await shoppingItemsController.addItem(request);
  else return new Response("Not found", { status: 404 });
};


Deno.serve({ port: 7777 }, handleRequest);
