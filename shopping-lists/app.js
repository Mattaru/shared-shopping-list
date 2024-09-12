const handleRequest = (request) => {
  
  return new Response("Hello world!");
};

Deno.serve({ port: 7777 }, handleRequest);
