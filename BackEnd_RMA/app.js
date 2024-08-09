const express = require('express');
const app = express();
const cors = require('cors')
const port = 3100;
const dontenv = require('dotenv')

const auditRoutes = require('./Routes/audit');
const auditAdmin = require('./Routes/admin');

app.use(cors({
  origin: '*'
}))

app.use(express.json())

app.use("/Data", auditRoutes )
app.use("/Admin", auditAdmin)

dontenv.config()



app.listen(port, () => {
  console.log(`Server has been running in http://localhost:${port}`);
})