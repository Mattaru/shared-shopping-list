import { configure } from "./deps.js";
import * as mainController from "./controllers/mainController.js";
import * as shoppingListController from "./controllers/shoppingListsController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") 
    return await mainController.viewMainPage(request);
  else if (url.pathname === "/lists" && request.method === "GET") 
    return await shoppingListController.viewActiveLists(request);
  else if (url.pathname === "/lists" && request.method === "POST")
    return await shoppingListController.addList(request);
  else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST")
    return await shoppingListController.deactivateList(request);


  
  else return new Response("Not found", { status: 404 });
};

Deno.serve({ port: 7777 }, handleRequest);
