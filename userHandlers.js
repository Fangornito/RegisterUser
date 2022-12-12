const database = require('./database.js')

const getUsers= (req, res) => {
  database
  .query("select firstname, lastname, email, city, language from users")
  .then(([users]) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err)
    res.status(500).send("Error retrieving data from database");
  })
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (user != null) {
    res.json(user);
  } else {
    res.status(404).send("Not Found");
  }
};
const postUser = (req, res) => {
  console.error(req.body);  
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  database
    .query(
      "INSERT INTO users( firstname, lastname, email, city, language, hashedPassword) VALUES ( ?, ?, ?, ?, ?, ?)",
      [ firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the users");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
};
