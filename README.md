# Shared shopping list
### First course project (Omnia)
> The application is a web service for creating and maintaining shopping lists.
On the main page we only have a title and a navigation link to the list of shopping lists.
On the shopping lists page we can create a new list or deactivate one of the existing lists. 
When we have an active shopping list, we can click on it and we will see the shopping list page,
 where we can add items to our list and mark these items as collected.

## Demo
> Not deployed yet.
> Live demo [_here_](//.../..). 

## Setup
> To run this project, you'll need to install Docker and Docker Compose, then clone the project from GitHub and navigate to the root directory:

```
$ git clone github/repo
$ cd dir/to/project
$ docker compose up --build -d
```
> After dockeer compose is runing you can see the project at the url:
> https://localhost:7777/
> ### Admin
> To delete data from the database, you can use https://localhost:7777/admin, since the default functionality does not provide this option.

## For tests
> To run the tests, you should create a Docker container (if you haven't already) and then run the tests:

```
$ docker compose up --build -d
$ docker compose up -d shopping-lists database flyway && \ 
    docker compose run --entrypoint=npx e2e-playwright playwright test && \
    docker compose rm -sf e2e-playwright
```
