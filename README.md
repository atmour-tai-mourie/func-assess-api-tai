Objectives

1. Creating a user interface for contracts.
   a. Data fields: Contract ID, Contract amount, Interest rate, borrower, investor
2. Create a REST API to capture this data
3. Store the data in Cosmos DB
4. List the stored data in the UI.

You need to create a Single Page App and host it in Azure
You should be able to use azure storage account for that.

### Rest API

POST:

Process:

1. Receive request with body
2. Validate data
3. Return errors if required?
4. Process data to store in Db
5. Store data
6. Return success

Data:

- Contract ID -> contract_id
- Contract Amount -> contract_amount
- Interest Rate -> interest_rate
- Borrower -> borrower
- Investor -> investor

GET:

Process:

1.  Receive request
2.  Retreive data from cosmosDB
3.  Return data to UI

Data (Array):

- Contract ID -> contract_id
- Contract Amount -> contract_amount
- Interest Rate -> interest_rate
- Borrower -> borrower
- Investor -> investor
