import { College } from '../models/collegeModel.js';

export const collegeController = {
    getColleges: async (req, res) => {
        try {
            const { gender, category, rank, subcategoryRank } = req.body;
            
            if (!gender || !category || !rank) {
                return res.status(400).json({ error: "Gender, category, and rank are required" });
            }
            
            const results = await College.getCollegesByCriteria(gender, category);
            
            const processedData = results.map(row => {
                const effectiveRank = category === "General" ? rank : subcategoryRank;
                
                return {
                    college: row.college_name,
                    branch: row.branch_name,
                    rounds: [
                        { round: "Round 1", value: row.round_1, color: row.round_1 >= effectiveRank ? "green" : "red" },
                        { round: "Round 2", value: row.round_2, color: row.round_2 >= effectiveRank ? "green" : "red" },
                        { round: "Round 3", value: row.round_3, color: row.round_3 >= effectiveRank ? "green" : "red" },
                        { round: "Round 4", value: row.round_4, color: row.round_4 >= effectiveRank ? "green" : "red" },
                        { round: "Round 5", value: row.round_5, color: row.round_5 >= effectiveRank ? "green" : "red" },
                        { round: "SR 1", value: row.sr_1, color: row.sr_1 >= rank ? "green" : "red" },
                        { round: "SR 2", value: row.sr_2, color: row.sr_2 >= rank ? "green" : "red" }
                    ],
                    last_rank: Math.max(row.round_1, row.round_2, row.round_3, row.round_4, row.round_5, row.sr_1, row.sr_2)
                };
            });

            res.json(processedData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Database query failed" });
        }
    }
};