var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://kaburaricky:ricky2025@gallery.wc344.mongodb.net/RickyCluster?retryWrites=true&w=majority',
    development: 'mongodb+srv://kaburaricky:ricky2025@gallery.wc344.mongodb.net/RickyCluster-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://kaburaricky:ricky2025@gallery.wc344.mongodb.net/RickyCluster-test?retryWrites=true&w=majority',
}
module.exports = {
  mongoURI: process.env.NODE_ENV === 'test' 
    ? "mongodb://localhost:27017/gallery-test"
    : "mongodb+srv://kaburaricky:ricky2025@gallery.wc344.mongodb.net/RickyCluster?retryWrites=true&w=majority"
};


