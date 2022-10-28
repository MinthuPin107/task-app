## Development Environment Setup

1. Install [Postgres](https://www.postgresql.org/download/) and [Pgadmin](https://www.pgadmin.org/download/) for easy accessing the database and run SQL commands.

2. Once setup, go to project root directory -> copy `.env.example` to `.env`

3. Install yarn:

   ```shell
   npm install --global yarn
   ```

4. Navigate to project root folder on terminal. Install dependencies with this command:

   ```shell
   yarn install
   ```

   This command will look up package.json file to inspect its dependencies and download it.

5. Run the node application in two different terminals for dev mode:
   ```shell
   yarn watch
   ```
   ```shell
   yarn dev
   ```
6. App will take care of creating tables when server is started.