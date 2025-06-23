var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://<USERNAME>:<PASSWORD>@gallery.wc344.mongodb.net/RickyCluster?retryWrites=true&w=majority',
    development: 'mongodb+srv://<USERNAME>:<PASSWORD>@gallery.wc344.mongodb.net/RickyCluster-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://<USERNAME>:<PASSWORD>@gallery.wc344.mongodb.net/RickyCluster-test?retryWrites=true&w=majority',
}
module.exports = config;
