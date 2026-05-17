const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./utilities/db');
require('dotenv').config();
const upload = require('./middleware/upload');

// console.log(process.env.DB_USER, process.env.DB_PASS);

app.use(cors({
  origin: ['http://localhost:5173', 'https://your-vercel-frontend-url.vercel.app'],
  credentials: true
}));
app.use(bodyParser.json());

// const uri =
//   'mongodb+srv://Sharar_Nur:sharar12345@cluster0.6k1z49w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

async function runGetStarted() {
  // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6k1z49w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  // const client = new MongoClient(uri);
  const db = await connectDB();
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // console.log('Connected to MongoDB');

    // Send a ping to confirm a successful connection

    // const database = await client.db(process.env.DB_NAME);
    // const volunteerRegisterList = await database.collection(
    //   'volunteerRegisterList',
    // );

    // Get all registered volunteers
    app.get('/api/volunteer-register-list', async (req, res) => {
      await db
        .collection('volunteerRegisterList')
        .find({})
        .toArray()
        .then((result) => {
          const data = {
            status: 'success',
            message: 'Fetch volunteer register list successfully',
            data: result,
          };
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({
            status: 'error',
            message: 'Failed to fetch volunteer register list',
          });
        });
      // res.send(registerRecord);
      // console.log(res);
    });

    // Register a volunteer for an event
    app.post('/api/register', async (req, res) => {
      const registrationInfo = req.body;
      // console.log(registrationInfo);
      await db
        .collection('volunteerRegisterList')
        .insertOne(registrationInfo)
        .then((result) => {
          // console.log(result);
          const data = {
            status: 'success',
            message: 'Registration successful',
          };
          res.status(201).send(data);
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .send({ status: 'error', message: 'Failed to register volunteer' });
        });
    });

    // Get events by volunteer email
    app.post('/api/event', async (req, res) => {
      // console.log(req.params.email);
      const email = req.body.email;
      await db
        .collection('volunteerRegisterList')
        .find({ email: email })
        .toArray()
        .then((result) => {
          const data = {
            status: 'success',
            message: 'Fetch event successfully',
            data: result,
          };
          // console.log(result);
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({
            status: 'error',
            message: 'Failed to fetch event by volunteer email',
          });
        });
    });
    // Delete an event by ID
    app.delete('/api/delete-event/:id', async (req, res) => {
      const id = req.params.id;

      const result = await db.collection('volunteerRegisterList').deleteOne({
        _id: new ObjectId(id),
      });
      if (result.deletedCount === 1) {
        const data = {
          status: 'success',
          message: 'Event deleted successfully',
        };
        res.status(200).send(data);
      } else {
        const data = { status: 'error', message: 'Event not found' };
        res.status(404).send(data);
      }
    });

    app.post('/api/add-event', upload.single('bannerImage'), async (req, res) => {
      console.log("req", req.body)
      try {
        const { eventTitle, eventDescription, eventDate } = req.body;

        console.log("req.file", req.file)

        const document = {
          title: eventTitle,
          description: eventDescription,
          date: new Date(eventDate),
          bannerUrl: req.file.path,
          cloudinaryId: req.file.filename,
          uploadedAt: new Date(),
        }
        const result = await db.collection('events').insertOne(document);
        res.status(201).json({ success: true, id: result.insertedId, message: 'Event added successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    //Get all events
    app.get('/api/events', async (req, res) => {
      try {
        const result = await db.collection('events').find({}).toArray();
        res.status(200).json({ success: true, data: result })

      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
runGetStarted().catch(console.dir);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
