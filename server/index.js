const express = require('express');
const application = require('./app').default({});

const app = express();

const PORT = process.env.PORT || 3000;

app.get('*', express.static(`${__dirname}/client`));
app.use(application);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Test app listening on port ${PORT}`);
});
