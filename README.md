
<p align="center">
  <img width="70" src="https://github.com/medical-physics/status-share/assets/63022198/7bcfea63-7e38-4318-8cf6-b6082129fbb7" />
</p>

## Status Share by BC Cancer
An internal tool used by the Medical Physics and Radiation Therapy departments at BC Cancer to track machine and team member statuses and send internal memos.

- React.js and Redux.js client
- Node.js server
- MongoDB for DB and change streams
- Socket.io for real-time updates

## Local Development
To get started, create a `.env` file in the project root, ask admin ([@schung53](https://www.github.com/schung53)) for secrets, and add them to `.env`.

Install dependencies.
```
npm install && (cd client && npm install)
```
Then execute start commands from the project root.

Server:
```
npm run dev:server
```
Client:
```
npm run dev:client
```

## Contributors
- Development: James Chung ([@schung53](https://www.github.com/schung53))
- Product: Don Ta (BC Cancer)

