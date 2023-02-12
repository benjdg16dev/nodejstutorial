# Mongo DB

## SQL Databases

- Relational
- Normalized Data
- Uses JOIN
- "D.R.Y" - Don't repeat yourself

## MongoDB

- Stores data in "collections"
- Individual records in the collections are called "documents"
- Documents have a key value structure and look alot like JSON
- Collections contain all the data for the user for example instead of breaking them into tables

## NoSQL/MongoDB Advantages

- Performance
  - Collection query is fast
- Flexibility
  - Easy to make structural changes without wrecking havock in your total structure; just like adding new property to your object
- Scalability
  - Can support large databases with large request rates with very low latency
- Usability
  - Can get up and running in the cloud very fast

## Setting up MongoDB

1. Create account/Use Google sign in
2. Create New Project > Build Database > Free
3. Create a Shared Cluster > Leave as default
4. Wait for 1-3 minutes > Go to Deployment/Databases
5. On your new Cluster > Browse Collections
6. Add My Own Data > Create Database/Collection
7. MongoDB will create the Database with your new collection
8. Navigate to Security/Database Access > Add New Database User
9. Stick with password (UN: `mongotut` PW: `testing123`)
10. On Database User Privileges choose "Read and write to any database"
11. Go back to Cluster > wait for changes
12. Click Connect > Allow access from anywhere > Choose default `0.0.0.0`
13. Choose a connection method > Connect your application
14. This will give a connection string (replace the `<password>` & `myFirstDatabase`)
15. Copy the connection string
16. Paste in .env file and install mongoose

https://www.npmjs.com/package/mongoose
