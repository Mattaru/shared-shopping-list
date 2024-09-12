import { renderFile } from "../deps.js";

const sharedShoppingLists = async(request) => {
    const data = {
        title: "Shared shopping lists",
        statistic: {},
      };
    
      return new Response(await renderFile("main.eta", data), responseDetails);
};

export { sharedShoppingLists };