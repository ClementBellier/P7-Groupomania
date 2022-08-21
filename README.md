
# Groupomania Social Network for Project 7 of Web Developper training by OpenClassrooms

The project consists of building an internal social network for Groupomania employees. The purpose of this tool is to facilitate interactions between colleagues.
## Run Locally

### Prerequisites

To Run this project, you need:
```
NodeJs
MariaDB
```
### Database

Create a database named groupomania
I can provide you with a dump of my database by contacting me by email [clement.bellier@gmail.com](mailto:clement.bellier@gmail.com)

### Clone and install

Clone the project

```bash
  git clone https://github.com/ClementBellier/P7-Groupomania
```

Go to the project directory

```bash
  cd P7-Groupomania
```

Install dependencies

```bash
  npm install
```

### Environment Variables

To run this project, you will need to add the following environment variables to a .env file

Create a `.env` file in `back` folder

`SECRET_TOKEN` a long string for secure tokens  
`TOKEN_EXPIRED` time ex: 24h  
`DB_NAME` groupomania  
`DB_USER` name of a user who have access to the database  
`DB_PASS` user's password  
`DB_HOST` ip of the database host machine (localhost if it's the same)

Example:

```
  SECRET_TOKEN = SecretTokenIsABadExample81kHzcUlkxFWZUSGMIJu97fSdJeDM0XkRlMle85PmM
  TOKEN_EXPIRED = 12h
  DB_NAME = groupomania
  DB_USER = root
  DB_PASS = Pa55wordI5ABad3xampl3
  DB_HOST = localhost
```

I can provide you with the ones I used for this project by contacting me by email [clement.bellier@gmail.com](mailto:clement.bellier@gmail.com)


### Start the server

```bash
  cd ./back
  node server
```
The API is reachable in http://localhost:3000/

### Start the front

In an other terminal

```bash
  cd ./front
  npm run dev
```
You can go to http://127.0.0.1:5173 and enjoy it !

## Documentation

I made a Open Api documentation in [SwaggerHub](https://app.swaggerhub.com/apis-docs/ClementBellier/OC_Groupomania/1.0.0)


## Architecture

### Back

I took the code from my previous project, if you want more information go [here](https://github.com/ClementBellier/P6-Piiquante)

I change the persistance part with MariaDB and control it with Sequelize.

### Front

I create this front with Vite, ReactJs, React-router
## Lessons Learned

This is my first fullstack big project and my first time with ReactJs.  
I love React and I'm sure I want to do front for the rest of my life.

There is still a lot of work to make this project perfect.  
I understand now that it will never be over in my eyes.  
There will always be something to improve or add.