# clocoss-signoff-2


This is a simple api hooked to a gcloud datastore

It requires both Node and Git to use

## Installation

1. Clone the repository code
2. Deploy app the gcloud app engine 
3. Use the different endpoints to update the datastore
4. Deploy the app thorough your app engine, or run `node app`.

## Usage

1. GET api/ - Returns a list of all keys
2. GET api/name - Returns specific key - if it exists!
3. POST api/name - Adds a specific value to the store
4. PUT api/ name - updates that value
5. DELETE api/name - Deleteds a specific node from key
