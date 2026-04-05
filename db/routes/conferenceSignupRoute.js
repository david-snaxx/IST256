const express = require('express');

// exporting these express endpoints as a function that expects a mysql database connection to be given to it
module.exports = function(connection) {
    const router = express.Router();

    // GET localhost:3301/conference-signups
    // this endpoint returns all ConferenceSignup objects in the database
    // optionally filtered by conferenceId with ?conferenceId={id} or by email with ?email={email}
    router.get("/", (request, response) => {
        const { conferenceId, email } = request.query;
        let query;
        let params;
        if (conferenceId !== undefined) {
            query = `SELECT * FROM conference_signups WHERE conferenceId = ?`;
            params = [conferenceId];
        } else if (email !== undefined) {
            query = `SELECT * FROM conference_signups WHERE email = ?`;
            params = [email];
        } else {
            query = `SELECT * FROM conference_signups`;
            params = [];
        }
        connection.query(query, params, (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            }
            response.json(result);
        })
    });

    // GET localhost:3301/conference-signups/{id}
    // this endpoint returns a ConferenceSignup with the given {id} if that id is found
    router.get("/:id", (request, response) => {
        const query = `
            SELECT *
            FROM conference_signups
            WHERE id = ?
        `;
        connection.query(query, [request.params.id], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            } else if (result.length === 0)  {
                return response.status(404).json({ error: "ConferenceSignup not found with given id" });
            }
            response.json(result[0]);
        })
    })

    // POST localhost:3301/conference-signups
    // this endpoint adds a new ConferenceSignup object to the database
    router.post("/", (request, response) => {
        const {
            fullName, email, conferenceId, participationType, notes
        } = request.body;
        const query = `
            INSERT INTO conference_signups (fullName, email, conferenceId, participationType, notes)
            VALUES (?, ?, ?, ?, ?)
        `;
        connection.query(query, [fullName, email, conferenceId, participationType, notes], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            }
            response.json(result);
        });
    })

    //PUT localhost:3301/conference-signups/{id}
    // this endpoint updates a ConferenceSignup object with the matching {id} if one is found in the database with that id
    router.put("/:id", (request, response) => {
        const {
            fullName, email, conferenceId, participationType, notes
        } = request.body;
        const query = `
            UPDATE conference_signups
            SET fullName = ?, email = ?, conferenceId = ?, participationType = ?, notes = ?
            WHERE id = ?
        `;
        connection.query(query, [fullName, email, conferenceId, participationType, notes, request.params.id], (error, result) => {
            if (error) {
                return response.status(500).json({ error: error.message });
            } else if (result.affectedRows === 0) {
                return response.status(404).json({ error: "ConferenceSignup not found with given id" });
            }
            response.json(result);
        })
    })

    // DELETE localhost:3301/conference-signups/{id}
    // this endpoint deletes the ConferenceSignup object with the given {id} if one exists in the database
    router.delete("/:id", (request, response) => {
        const query = `
            DELETE FROM conference_signups
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
