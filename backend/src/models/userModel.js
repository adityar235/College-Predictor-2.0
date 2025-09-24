import db from '../config/database.js';
import bcrypt from 'bcryptjs';

export const User = {
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE email = ?";
            db.query(query, [email], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    },

    create: async (name, email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(query, [name, email, hashedPassword], (err, results) => {
                if (err) reject(err);
                else resolve({ id: results.insertId, name, email });
            });
        });
    },

    checkExists: (email) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT id FROM users WHERE email = ?";
            db.query(query, [email], (err, results) => {
                if (err) reject(err);
                else resolve(results.length > 0);
            });
        });
    }
};