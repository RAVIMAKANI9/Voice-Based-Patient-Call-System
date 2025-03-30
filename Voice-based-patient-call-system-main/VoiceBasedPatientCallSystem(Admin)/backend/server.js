
const express = require("express");
const cors = require("cors");
const connectDB = require('./db');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

const nursesRouter = require('./routes/RoutNurse');
const patientsRouter = require('./routes/RoutPatient'); 

app.use('/api/nurses', nursesRouter);
app.use('/api/patients', patientsRouter);

app.get('/', (req, res) => res.send('Backend API Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

