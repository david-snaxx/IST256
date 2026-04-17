const express = require('express');

// exporting these express endpoints as a function that expects a mysql database connection to be given to it
module.exports = function(connection) {
    const router = express.Router();

    // GET localhost:3301/products
    // this endpoint returns all Product objects in the database
    // optionally filtered by approval status with ?approved=true or ?approved=false
    router.get("/", (request, response) => {
        const query =
            `SELECT * FROM products`;
        connection.query(query, (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            }
            console.log(`[DB] SELECT products returned ${result.length} row(s)`);
            response.json(result);
        })
    });

    // GET localhost:3301/products/{id}
    // this endpoint returns a Product with the given {id} if that id is found
    router.get("/:id", (request, response) => {
        const query = `
            SELECT *
            FROM products
            WHERE id = ?
        `;
        connection.query(query, [request.params.id], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            } else if (result.length === 0)  {
                return response.status(404).json({ error: "Product not found with given id" });
            }
            console.log(`[DB] SELECT products WHERE id=${request.params.id} returned 1 row`);
            response.json(result[0]);
        })
    })

    // POST localhost:3301/products
    // this endpoint adds a new Product object to the database
    router.post("/", (request, response) => {
        const {
            name, image, description, category, specifications, price, additionalInfo
        } = request.body;
        const query = `
            INSERT INTO products (name, image, description, category, specifications, price, additionalInfo)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        connection.query(query, [name, image, description, category, specifications, price, additionalInfo], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            }
            console.log(`[DB] INSERT into products successful, insertId: ${result.insertId}`);
            response.json(result);
        });
    })

    //PUT localhost:3301/products/{id}
    // this endpoint updates a Product object with the matching {id} if one is found in the database with that id
    router.put("/:id", (request, response) => {
        const {
            name, image, description, category, specifications, price, additionalInfo
        } = request.body;
        const query = `
            UPDATE products
            SET name = ?, image = ?, description = ?, category = ?, specifications = ?, price = ?, additionalInfo = ?
            WHERE id = ?
        `;
        connection.query(query, [name, image, description, category, specifications, price, additionalInfo, request.params.id], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            } else if (result.affectedRows === 0) {
                return response.status(404).json({ error: "Product not found with given id" });
            }
            console.log(`[DB] UPDATE products WHERE id=${request.params.id}, affectedRows: ${result.affectedRows}`);
            response.json(result);
        })
    })

    // DELETE localhost:3301/products/{id}
    // this endpoint deletes the Product object with the given {id} if one exists in the database
    router.delete("/:id", (request, response) => {
        const query = `
            DELETE FROM products
            WHERE id = ?
        `;
        connection.query(query, [request.params.id], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            }
            console.log(`[DB] DELETE from products WHERE id=${request.params.id}, affectedRows: ${result.affectedRows}`);
            response.json(result);
        })
    })

    return router;
};
