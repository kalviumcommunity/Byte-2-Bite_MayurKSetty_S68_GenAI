const express = require('express');
const ConnectDB = require('./db');
const cors = require('cors');
const aiRoute = require('./Routes/aiRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', aiRoute);

app.get('/', (req, res) => {
    res.send('Byte-2-Bite API is running...')
})

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

app.listen(port, async () => {
//   await ConnectDB(url);
  console.log(`The server is running on port:${port} Link: http://localhost:${port}`);
});