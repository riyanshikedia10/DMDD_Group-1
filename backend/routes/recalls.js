const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET all recalls
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        Recall_ID as id,
        Recall_Number as recallNumber,
        CONVERT(varchar, Recall_Date, 23) as recallDate,
        Reason as reason,
        Severity as severity,
        Status as status,
        Initiated_By as initiatedBy,
        Regulatory_Body as regulatoryBody,
        CONVERT(varchar, Resolution_Date, 23) as resolutionDate,
        Notes as notes
      FROM Recall
      ORDER BY Recall_Date DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create recall
router.post('/', async (req, res) => {
  try {
    const { recallNumber, recallDate, reason, severity, status, initiatedBy, regulatoryBody, notes } = req.body;
    const pool = await poolPromise;
    
    const result = await pool
      .request()
      .input('recallNumber', sql.VarChar(50), recallNumber)
      .input('recallDate', sql.Date, recallDate || new Date())
      .input('reason', sql.VarChar(500), reason)
      .input('severity', sql.VarChar(20), severity)
      .input('status', sql.VarChar(20), status || 'Active')
      .input('initiatedBy', sql.VarChar(100), initiatedBy)
      .input('regulatoryBody', sql.VarChar(100), regulatoryBody)
      .input('notes', sql.VarChar(sql.MAX), notes)
      .query(`
        INSERT INTO Recall (Recall_Number, Recall_Date, Reason, Severity, Status, Initiated_By, Regulatory_Body, Notes)
        OUTPUT INSERTED.Recall_ID as id
        VALUES (@recallNumber, @recallDate, @reason, @severity, @status, @initiatedBy, @regulatoryBody, @notes)
      `);
    
    res.status(201).json({ id: result.recordset[0].id, message: 'Recall created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update recall
router.put('/:id', async (req, res) => {
  try {
    const { recallNumber, recallDate, reason, severity, status, initiatedBy, regulatoryBody, resolutionDate, notes } = req.body;
    const pool = await poolPromise;
    
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .input('recallNumber', sql.VarChar(50), recallNumber)
      .input('recallDate', sql.Date, recallDate)
      .input('reason', sql.VarChar(500), reason)
      .input('severity', sql.VarChar(20), severity)
      .input('status', sql.VarChar(20), status)
      .input('initiatedBy', sql.VarChar(100), initiatedBy)
      .input('regulatoryBody', sql.VarChar(100), regulatoryBody)
      .input('resolutionDate', sql.Date, resolutionDate)
      .input('notes', sql.VarChar(sql.MAX), notes)
      .query(`
        UPDATE Recall 
        SET Recall_Number = @recallNumber,
            Recall_Date = @recallDate,
            Reason = @reason,
            Severity = @severity,
            Status = @status,
            Initiated_By = @initiatedBy,
            Regulatory_Body = @regulatoryBody,
            Resolution_Date = @resolutionDate,
            Notes = @notes
        WHERE Recall_ID = @id
      `);
    
    res.json({ message: 'Recall updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE recall
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().input('id', sql.Int, req.params.id).query('DELETE FROM Recall_Lots WHERE Recall_ID = @id');
    await pool.request().input('id', sql.Int, req.params.id).query('DELETE FROM Recall WHERE Recall_ID = @id');
    res.json({ message: 'Recall deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;