import db from '../config/database.js';

export const College = {
    getCollegesByCriteria: (gender, category) => {
        return new Promise((resolve, reject) => {
            const tableName = `${gender}_${category}`;
            const query = `SELECT college_name, branch_name, round_1, round_2, round_3, round_4, round_5, sr_1, sr_2 FROM ${tableName}`;
            
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};