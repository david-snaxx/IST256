const express = require('express');

// exporting these express endpoints as a function that expects
// a mysql database connection to be given to it
module.exports = function(connection) {
  const router = express.Router();

  // GET localhost:3301/users
  // returns all User objects in the database
  router.get("/", (request, response) => {
    const query = `SELECT * FROM users`;

    connection.query(query, (error, result) => {
      if (error) {
        return response.status(500).json({ error: error.message });
      }
      response.json(result);
    });
  });

  // GET localhost:3301/users/{email}
  // returns the User with the given email if found
  router.get("/:email", (request, response) => {
    const query = `SELECT * FROM users WHERE email = ?`;

    connection.query(query, [request.params.email], (error, result) => {
      if (error) {
        return response.status(500).json({ error: error.message });
      } else if (result.length === 0) {
        return response.status(404).json({ error: "User not found with given email" });
      }
      response.json(result[0]);
    });
  });

  // POST localhost:3301/users
  // adds a new User object to the database
  router.post("/", (request, response) => {
    const { name, email, phone, age, address } = request.body;

    const query = `
      INSERT INTO users (name, email, phone, age, address)
      VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [name, email, phone, age, address],
      (error, result) => {
        if (error) {
          return response.status(500).json({ error: error.message });
        }
        response.json(result);
      }
    );
  });

  // PUT localhost:3301/users/{email}
  // updates a User object with the matching email if found
  router.put("/:email", (request, response) => {
    const { name, phone, age, address } = request.body;

    const query = `
      UPDATE users
      SET name = ?, phone = ?, age = ?, address = ?
      WHERE email = ?
    `;

    connection.query(
      query,
      [name, phone, age, address, request.params.email],
      (error, result) => {
        if (error) {
          return response.status(500).json({ error: error.message });
        } else if (result.affectedRows === 0) {
          return response.status(404).json({ error: "User not found with given email" });
        }
        response.json(result);
      }
    );
  });

  // DELETE localhost:3301/users/{email}
  // deletes the User object with the given email if one exists
  router.delete("/:email", (request, response) => {
    const query = `DELETE FROM users WHERE email = ?`;

    connection.query(query, [request.params.email], (error, result) => {
      if (error) {
        return response.status(500).json({ error: error.message });
      }
      response.json(result);
    });
  });

  return router;
};
