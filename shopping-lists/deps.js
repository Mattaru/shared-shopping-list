import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import postgres from "https://deno.land/x/postgresjs@v3.4.2/mod.js";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";

export { 
    configure,
    Pool,
    postgres, 
    renderFile,
};
