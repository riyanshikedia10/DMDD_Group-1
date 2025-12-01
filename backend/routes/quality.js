const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET all quality tests
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        q.Test_ID as id,
        q.Lot_Number as lotNumber,
        q.Test_Type as testType,
        CONVERT(varchar, q.Test_Date, 23) as testDate,
        q.Result as result,
        q.Pass_Flag as passFlag,
        q.Tested_By as testedBy,
        q.Certificate_Number as certificateNumber,
        q.Notes as notes,
        q.Lot_ID as lotId
      FROM Quality_Test q
      ORDER BY q.Test_Date DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create quality test
router.post('/', async (req, res) => {
  try {
    const { lotId, lotNumber, testType, testDate, result, passFlag, testedBy, certificateNumber, notes } = req.body;
    const pool = await poolPromise;
    
    const insertResult = await pool
      .request()
      .input('lotId', sql.Int, lotId)
      .input('lotNumber', sql.VarChar(50), lotNumber)
      .input('testType', sql.VarChar(50), testType)
      .input('testDate', sql.DateTime, testDate || new Date())
      .input('result', sql.VarChar(500), result)
      .input('passFlag', sql.Bit, passFlag)
      .input('testedBy', sql.VarChar(100), testedBy)
      .input('certificateNumber', sql.VarChar(50), certificateNumber)
      .input('notes', sql.VarChar(1000), notes)
      .query(`
        INSERT INTO Quality_Test (Lot_ID, Lot_Number, Test_Type, Test_Date, Result, Pass_Flag, Tested_By, Certificate_Number, Notes)
        OUTPUT INSERTED.Test_ID as id
        VALUES (@lotId, @lotNumber, @testType, @testDate, @result, @passFlag, @testedBy, @certificateNumber, @notes)
      `);
    
    res.status(201).json({ id: insertResult.recordset[0].id, message: 'Quality test created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update quality test
router.put('/:id', async (req, res) => {
  try {
    const { lotId, lotNumber, testType, testDate, result, passFlag, testedBy, certificateNumber, notes } = req.body;
    const pool = await poolPromise;
    
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .input('lotId', sql.Int, lotId)
      .input('lotNumber', sql.VarChar(50), lotNumber)
      .input('testType', sql.VarChar(50), testType)
      .input('testDate', sql.DateTime, testDate)
      .input('result', sql.VarChar(500), result)
      .input('passFlag', sql.Bit, passFlag)
      .input('testedBy', sql.VarChar(100), testedBy)
      .input('certificateNumber', sql.VarChar(50), certificateNumber)
      .input('notes', sql.VarChar(1000), notes)
      .query(`
        UPDATE Quality_Test 
        SET Lot_ID = @lotId,
            Lot_Number = @lotNumber,
            Test_Type = @testType,
            Test_Date = @testDate,
            Result = @result,
            Pass_Flag = @passFlag,
            Tested_By = @testedBy,
            Certificate_Number = @certificateNumber,
            Notes = @notes
        WHERE Test_ID = @id
      `);
    
    res.json({ message: 'Quality test updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE quality test
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().input('id', sql.Int, req.params.id).query('DELETE FROM Quality_Test WHERE Test_ID = @id');
    res.json({ message: 'Quality test deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;