import { renderFile } from "../deps.js";
import { responseDetails } from "../utils/responseUtils.js";

const viewMainPage = async(request) => {
    const data = {
        title: "Shared shopping lists",
        statistic: {},
      };
    
      return new Response(await renderFile("main.eta", data), responseDetails);
};

export { viewMainPage };