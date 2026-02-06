import pool from '../config/db.js';

const getAllCandidates = async (req, res, next) => {
  try {
    const { search, status, position } = req.query;
    let query = 'SELECT * FROM candidates WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount} OR skills ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (position) {
      paramCount++;
      query += ` AND applied_position ILIKE $${paramCount}`;
      params.push(`%${position}%`);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    next(error);
  }
};

const getCandidateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM candidates WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

const createCandidate = async (req, res, next) => {
  try {
    const {
      name,
      age,
      email,
      phone,
      skills,
      experience,
      applied_position,
      status = 'Applied'
    } = req.body;

    if (!name || !age || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name, age, and email are required fields'
      });
    }

    const result = await pool.query(
      `INSERT INTO candidates (name, age, email, phone, skills, experience, applied_position, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name, age, email, phone || null, skills || null, experience || null, applied_position || null, status]
    );

    res.status(201).json({
      success: true,
      message: 'Candidate created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

const updateCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      age,
      email,
      phone,
      skills,
      experience,
      applied_position,
      status
    } = req.body;

    const checkResult = await pool.query('SELECT * FROM candidates WHERE id = $1', [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    const result = await pool.query(
      `UPDATE candidates 
       SET name = COALESCE($1, name),
           age = COALESCE($2, age),
           email = COALESCE($3, email),
           phone = COALESCE($4, phone),
           skills = COALESCE($5, skills),
           experience = COALESCE($6, experience),
           applied_position = COALESCE($7, applied_position),
           status = COALESCE($8, status),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [name, age, email, phone, skills, experience, applied_position, status, id]
    );

    res.json({
      success: true,
      message: 'Candidate updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

const deleteCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM candidates WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.json({
      success: true,
      message: 'Candidate deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate
};
