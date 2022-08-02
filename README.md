# Status Share
An internal tool used by the Medical Physics and Radiation Therapy departments at BC Cancer to track employee and machine statuses and send internal memos.

## Environments
- When developing in your local environment, switch to the `dev` branch.
- Ensure that nodemon is installed globally on your system.
```
npm install -g nodemon
```
- The `main` branch is the production branch and should never be committed to directly. 
- When developing, branch off of the `dev` branch and create pull requests to the `dev` branch for each feature.
```
git checkout dev
git checkout -b NEW_BRANCH_NAME
```

## Running the Application
- Server
  - Create a `.env` file in the project root
  - Ask admin ([@schung53](https://www.github.com/schung53)) for `ATLAS_URI` and `TOKEN_KEY`
  - Add these to the `.env` file
```
npm install
npm start
```
- Client
```
cd client
npm install
npm start
```

## Linter
We use the [JavaScript Semi-Standard Style](https://www.npmjs.com/package/semistandard) for formatting. It is a version of the JS Standard Style, just with semicolons added. No configuration is needed.
- Run `npm install semistandard --global` to install the CLI globally
- Run `semistandard` in the command line from the project root to check the style of all files
- Run `semistandard --fix` to automatically format all files
