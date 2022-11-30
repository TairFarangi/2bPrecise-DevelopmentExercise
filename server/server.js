const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

const organizationStructureRoute = require('./routes/OrganizationStructureRoute')

app.use(cors());
app.use(express.json())

app.use('/', organizationStructureRoute);

//db
const mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('OrganizationStructure.dbConfig.dbName');

mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database successfully connected')
}).catch((err) => {
    console.log('Database could not connected' + err)
})

// Server listen   
app.listen(port, () => {
    console.log('App is running on port 8000')
});