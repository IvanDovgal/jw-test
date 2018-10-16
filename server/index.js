const application = require('./app')({});
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('*', express.static(`${__dirname}/client`));
app.use("*", application)

app.listen(PORT, function () {
  console.log(`Test app listening on port ${PORT}`);
});
