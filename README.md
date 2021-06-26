## Backend Assignment | FamPay

### Project Goal

To make an API to fetch latest videos sorted in reverse chronological order of the publishing date-time from YouTube for a given search query in paginated response

### Basic Functionalities

- Cron Job to constantly fetch data in the background every minute
- GET API, `/videos` for fetching videos supporting options like sorting, fuzzy searching and pagination
- Search API which also supports fuzzy matching for situations like `How to make a tea?` matched with `tea how`
- Dashboard to access the videos with options to filter and search

### Development

1. Clone the project

`git clone https://github.com/meehawk/fampay-assignment.git`

2. Copy [.env.example](https://github.com/meehawk/fampay-assignment/blob/master/.env.example) to .env

```
# For default values, refer `.env.defaults` file
NODE_ENV = 

# Server Properties
PORT =

# MONGODB
MONGODB_URI = 

# YOUTUBE API
YOUTUBE_API_KEY =
YOUTUBE_SEARCH_QUERY =
```
You will need a YOUTUBE DATA API key in order to run this app. Follow the instructions on [this page](https://developers.google.com/youtube/v3/getting-started) to get one.

> **Note:** 
> - For default values of environment variables, refer [.env.defaults](https://github.com/meehawk/fampay-assignment/blob/master/.env.defaults) file
> - You will need to provide values to all those variables that do not have a default
> - Fields that don't have a default value are _required_  
> - In case of multiple API keys, provide them as "," delimited list of keys like so:

```
YOUTUBE_API_KEY = "<API_KEY1>, <API_KEY2>..."
```

3. Install dependencies

`npm install`

4. Run in development mode

`npm run dev`

### Running with Docker Compose

When using Docker Compose, 

1. Create a `.env` file using the instructions mentioned above
2. Set the `MONGODB_URI` environment variable in your `.env` file to

```
MONGODB_URI = mongodb://mongo:27017
```
3. Run:

```
docker-compose up -d
```
4. Navigate to `http://localhost:3000` to see the app live
5. Monitor the data dumped into MongoDB by navigating to `http://localhost:8081` thanks to [mongo-express](https://github.com/mongo-express/mongo-express)

### Resources

1. https://demos.creative-tim.com/argon-design-system/#/presentation
2. https://developers.google.com/youtube/v3

### Contributing

Found a bug/want to request a feature? Thanks! Just follow the steps below:

1. File an issue with appropriate tags
2. Fork this repo
3. Make changes to a feature branch
`git checkout -b <issue-#>`
4. Once done, run `npm run commit`
5. Make sure you `sync up` the branch with the upstream master
6. Raise a PR for review
