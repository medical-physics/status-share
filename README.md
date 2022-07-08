# Status Share
An internal tool used by the Medical Physics and Radiation Therapy departments at BC Cancer to track employee and machine statuses and send internal memos.

## Running the Application
- Server
  - Create a `.env` file in project root 
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
We use the [JavaScript Standard Style](https://standardjs.com/). No configuration is needed. 
- Run `standard` in the command line from the project root to check the style of all files
- Run `standard --fix` to automatically format all files
