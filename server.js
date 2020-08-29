const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');
const path = require('path');

let sequelize;
if (process.env.NODE_ENV !== 'production') {
  sequelize = new Sequelize('postgres://admin:secret@localhost:5432/postgres')
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL)
}

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(error => {
  console.error('Unable to connect to the database:', error);
})

const app = express();
const port = process.env.PORT || 5000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

class Club extends Model { }
Club.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
      notEmpty: true
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      notEmpty: true
    }
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isAlphanumeric: true,
      notEmpty: true
    }
  },
  county: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isAlphanumeric: true,
      notEmpty: true
    }
  },
  website: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    validate: {
      isAlphanumeric: true,
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  }
}, { sequelize, modelName: 'club' });
sequelize.sync();

app.get('/clubs', (req, res) => {
  Club.findAll()
    .then(clubs => {
      res.send(JSON.stringify(clubs, null, 2))
    })
    .catch(error => {
      console.warn(error);
      res.send(false)
    })
});

app.post('/club', (req, res) => {
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;

  // User.create({ firstName: firstName, lastName: lastName })
  // .then(() => {
  //   res.send(true)
  // })
  // .catch(error => {
  //   console.warn(error);
  //   res.send(false)
  // })
});

app.delete('/club', (req, res) => {
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;

  // User.destroy({
  //   where: {
  //     firstName: firstName,
  //     lastName: lastName
  //   }
  // })
  // .then(() => {
  //   res.send(true)
  // })
  // .catch(error => {
  //   console.warn(error);
  //   res.send(false)
  // })
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
