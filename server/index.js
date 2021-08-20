const express = require('express');
const app = express();

app.use(express.json());

app.listen(4321, () => {
    console.log('listening on port 4321');
});