const express = require('express');

// exporting these express endpoints as a function that expects a mysql database connection to be given to it
module.exports = function(connection) {
    const router = express.Router();

    // GET localhost:3301/conferences
    // this endpoint returns all Conference objects in the database
    router.get("/", (request, response) => {
        const query = `SELECT * FROM conferences`;
        connection.query(query, (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            }
            response.json(result);
        })
    });

    // GET localhost:3301/conferences/{id}
    // this endpoint returns a Conference with the given {id} if that id is found
    router.get("/:id", (request, response) => {
        const query = `
            SELECT *
            FROM conferences
            WHERE id = ?
        `;
        connection.query(query, [request.params.id], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            } else if (result.length === 0)  {
                return response.status(404).json({ error: "Conference not found with given id" });
            }
            response.json(result[0]);
        })
    })

    // POST localhost:3301/conferences
    // this endpoint adds a new Conference object to the database
    router.post("/", (request, response) => {
        const {
            title, description, category, format, entryPrice, additionalInfo
        } = request.body;
        const query = `
            INSERT INTO conferences (title, description, category, format, entryPrice, additionalInfo, approved)
            VALUES (?, ?, ?, ?, ?, ?, 0)
        `;
        connection.query(query, [title, description, category, format, entryPrice, additionalInfo], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            }
            response.json(result);
        });
    })

    //PUT localhost:3301/conferences/{id}
    // this endpoint updates a Conference object with the matching {id} if one is found in the database with that id
    router.put("/:id", (request, response) => {
        const {
            title, description, category, format, entryPrice, additionalInfo, approved
        } = request.body;
        const query = `
            UPDATE conferences
            SET title = ?, description = ?, category = ?, format = ?, entryPrice = ?, additionalInfo = ?, approved = ?
            WHERE id = ?
        `;
        connection.query(query, [title, description, category, format, entryPrice, additionalInfo, approved, request.params.id], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            } else if (result.affectedRows === 0) {
                return response.status(404).json({ error: "Conference not found with given id" });
            }
            response.json(result);
        })
    })

    // DELETE localhost:3301/conferences/{id}
    // this endpoint deletes the Conference object with the given {id} if one exists in the database
    router.delete("/:id", (request, response) => {
        const query = `
            DELETE FROM conferences
            WHERE id = ?
        `;
        connection.query(query, [request.params.id], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            }
            response.json(result);
        })
    })

    return router;
};
