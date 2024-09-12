import { sharedShoppingLists } from "./controllers/mainController.js";
import { configure } from "./deps.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.namepath === "/") return await sharedShoppingLists(request);
};

Deno.serve({ port: 7777 }, handleRequest);
