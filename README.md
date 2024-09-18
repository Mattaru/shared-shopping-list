# shared-shopping-list
First course project (Omnia)

Command for run the tests:
  Old command: 
    docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf

  New command:
    docker compose up -d shopping-lists database flyway && \ 
    docker compose run --entrypoint=npx e2e-playwright playwright test && \
    docker compose rm -sf e2e-playwright