# Charging Station Data Server

This project is a Node.js application that simulates charging station data reception from multiple clients. The received data is stored in a PostgreSQL database, and it provides two API endpoints for retrieving the stored data.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version v18.17.1)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abhay-jsx/pluseenergy.git

2. Create .env file like .env.example

3. npx knex migrate:latest

4. run node server

5. run mock client server by nodemon mock_client.js


# Setup Codebase
-> create .env file
```env
CSV_FILE_PATH=./dumpcsv.csv
PORT = node-port
PG_USER = user
PG_DATABASE = database
PG_PASSWORD = password
PG_PORT= port
PG_HOST = hostname
```

```npm

-> npm install
-> npm start

------->Ready to go
```



# APIs Description

### Detail Endpoint
Retrieve complete data for a single record.
###
Endpoint: /v1/api/get-charge-point-data/:id/:page/:limit
###
Method: GET
###
Path Parameter:
###
id: ID of the record


### List Endpoint
Retrieve data in a paginated format and for specific charge point IDs.

Endpoint: /v1/api/get-charge-list
##
Method: POST
###
Query Payload:
###
page (optional): Page number (default: 1)
###
limit (optional): Number of items per page (default: 10)
###
ids (optional): list of charge point IDs


