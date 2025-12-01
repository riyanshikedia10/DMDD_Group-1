const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        Customer_ID as id,
        Customer_Code as code,
        Name as name,
        Type as type,
        Shipping_Address as address,
        Contact_Email as email,
        Contact_Phone as phone,
        Credit_Terms as creditTerms,
        Is_Active as status
      FROM Customer
      WHERE Is_Active = 1
      ORDER BY Name
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create customer
router.post('/', async (req, res) => {
  try {
    const { code, name, type, address, email, phone, creditTerms } = req.body;
    const pool = await poolPromise;
    
    const result = await pool
      .request()
      .input('code', sql.VarChar(20), code)
      .input('name', sql.VarChar(200), name)
      .input('type', sql.VarChar(50), type)
      .input('address', sql.VarChar(500), address)
      .input('email', sql.VarChar(100), email)
      .input('phone', sql.VarChar(20), phone)
      .input('creditTerms', sql.VarChar(50), creditTerms)
      .query(`
        INSERT INTO Customer (Customer_Code, Name, Type, Shipping_Address, Contact_Email, Contact_Phone, Credit_Terms)
        OUTPUT INSERTED.Customer_ID as id
        VALUES (@code, @name, @type, @address, @email, @phone, @creditTerms)
      `);
    
    res.status(201).json({ id: result.recordset[0].id, message: 'Customer created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update customer
router.put('/:id', async (req, res) => {
  try {
    const { code, name, type, address, email, phone, creditTerms } = req.body;
    const pool = await poolPromise;
    
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .input('code', sql.VarChar(20), code)
      .input('name', sql.VarChar(200), name)
      .input('type', sql.VarChar(50), type)
      .input('address', sql.VarChar(500), address)
      .input('email', sql.VarChar(100), email)
      .input('phone', sql.VarChar(20), phone)
      .input('creditTerms', sql.VarChar(50), creditTerms)
      .query(`
        UPDATE Customer 
        SET Customer_Code = @code,
            Name = @name,
            Type = @type,
            Shipping_Address = @address,
            Contact_Email = @email,
            Contact_Phone = @phone,
            Credit_Terms = @creditTerms
        WHERE Customer_ID = @id
      `);
    
    res.json({ message: 'Customer updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE customer
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().input('id', sql.Int, req.params.id).query('UPDATE Customer SET Is_Active = 0 WHERE Customer_ID = @id');
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;