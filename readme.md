# Umpisa

This is a simple application built for Umpisa examination.

Tech stack:
* Nextjs 14 (React), TailwindCSS, React-Query, React Context
* GraphQL, Node.js 18, Express, MongoDB

## Installation

Clone the repository to your local machine
```
git clone https://github.com/benedictpmateo/umpisa.git
```

There's two way to run the application:
1. Docker setup
2. Manual setup


### Docker Setup (prod environment)

**Requirements:**
* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose / Docker Desktop](https://docs.docker.com/compose/install/)


**Instruction:**

On your command line, go to the root folder of the project. Here you can see the `docker-compose.yml` file. Environment variables are inside the docker-compose file and feel free to edit them if needed.

Here are the default ports:
* Frontend - 3000
* Backend - 3001
* MongoDB - 27017

> Before you start, ensure no other applications are running in these ports.

To run, enter this to your terminal
```bash
docker-compose up --build
```

After you build the project you can run the application here:
* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:3001/graphql](http://localhost:3001/graphql)

### Manual Setup (dev environment)

**Requirements:**
* Node.js 18+
* NPM 9.6+
* Mongo DB, [Docker Mongo](https://hub.docker.com/_/mongo) or register in Mongo Atlas for database

**Instruction:**

* Open two terminals, and open the backend and frontend folders then run `npm install` .
* After installing the `node_modules`, copy `.env.example` to `.env` for both folder
* Then run `npm run dev` to run it locally.

Then visit the application here:
* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:3001/graphql](http://localhost:3001/graphql)

## Unit Testing

For backend unit testing, open your terminal and go to `backend` folder.

Make sure you already installed the application using the **Manual Setup**

For unit testing, run this to your terminal:
```
npm run test
```
