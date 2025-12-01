const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET all suppliers
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        Supplier_ID as id,
        Supplier_Code as code,
        Name as name,
        Country as country,
        Contact_Email as email,
        Contact_Phone as phone,
        Rating as rating,
        Certification_Status as status,
        Is_Active as isActive
      FROM Supplier
      WHERE Is_Active = 1
      ORDER BY Name
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single supplier
router.get('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .query(`
        SELECT 
          Supplier_ID as id,
          Supplier_Code as code,
          Name as name,
          Country as country,
          Contact_Email as email,
          Contact_Phone as phone,
          Rating as rating,
          Certification_Status as status
        FROM Supplier
        WHERE Supplier_ID = @id
      `);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create supplier
router.post('/', async (req, res) => {
  try {
    const { code, name, country, email, phone, rating, status } = req.body;
    const pool = await poolPromise;
    
    const result = await pool
      .request()
      .input('code', sql.VarChar(20), code)
      .input('name', sql.VarChar(200), name)
      .input('country', sql.VarChar(100), country)
      .input('email', sql.VarChar(100), email)
      .input('phone', sql.VarChar(20), phone)
      .input('rating', sql.Decimal(3, 2), rating)
      .input('status', sql.VarChar(50), status || 'Pending')
      .query(`
        INSERT INTO Supplier (Supplier_Code, Name, Country, Contact_Email, Contact_Phone, Rating, Certification_Status)
        OUTPUT INSERTED.Supplier_ID as id
        VALUES (@code, @name, @country, @email, @phone, @rating, @status)
      `);
    
    res.status(201).json({ id: result.recordset[0].id, message: 'Supplier created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update supplier
router.put('/:id', async (req, res) => {
  try {
    const { code, name, country, email, phone, rating, status } = req.body;
    const pool = await poolPromise;
    
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .input('code', sql.VarChar(20), code)
      .input('name', sql.VarChar(200), name)
      .input('country', sql.VarChar(100), country)
      .input('email', sql.VarChar(100), email)
      .input('phone', sql.VarChar(20), phone)
      .input('rating', sql.Decimal(3, 2), rating)
      .input('status', sql.VarChar(50), status)
      .query(`
        UPDATE Supplier 
        SET Supplier_Code = @code,
            Name = @name,
            Country = @country,
            Contact_Email = @email,
            Contact_Phone = @phone,
            Rating = @rating,
            Certification_Status = @status,
            Modified_Date = GETDATE()
        WHERE Supplier_ID = @id
      `);
    
    res.json({ message: 'Supplier updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE supplier (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .query('UPDATE Supplier SET Is_Active = 0 WHERE Supplier_ID = @id');
    
    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;