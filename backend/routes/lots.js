const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET all lots
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        l.Lot_ID as id,
        l.Lot_Number as lotNumber,
        m.Name as material,
        s.Name as supplier,
        l.Quantity as quantity,
        l.Status as status,
        CONVERT(varchar, l.Expiry_Date, 23) as expiryDate,
        CONVERT(varchar, l.Production_Date, 23) as productionDate,
        l.Material_ID as materialId,
        l.Supplier_ID as supplierId
      FROM Lot l
      JOIN Material m ON l.Material_ID = m.Material_ID
      JOIN Supplier s ON l.Supplier_ID = s.Supplier_ID
      ORDER BY l.Created_Date DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching lots:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET single lot by ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .query(`
        SELECT 
          l.Lot_ID as id,
          l.Lot_Number as lotNumber,
          m.Name as material,
          s.Name as supplier,
          l.Quantity as quantity,
          l.Status as status,
          CONVERT(varchar, l.Expiry_Date, 23) as expiryDate,
          CONVERT(varchar, l.Production_Date, 23) as productionDate,
          l.Material_ID as materialId,
          l.Supplier_ID as supplierId
        FROM Lot l
        JOIN Material m ON l.Material_ID = m.Material_ID
        JOIN Supplier s ON l.Supplier_ID = s.Supplier_ID
        WHERE l.Lot_ID = @id
      `);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Lot not found' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new lot
router.post('/', async (req, res) => {
  try {
    const { lotNumber, materialId, supplierId, quantity, status, productionDate, expiryDate } = req.body;
    const pool = await poolPromise;
    
    const result = await pool
      .request()
      .input('lotNumber', sql.VarChar(50), lotNumber)
      .input('materialId', sql.Int, materialId)
      .input('supplierId', sql.Int, supplierId)
      .input('quantity', sql.Decimal(12, 3), quantity)
      .input('status', sql.VarChar(20), status || 'Received')
      .input('productionDate', sql.Date, productionDate)
      .input('expiryDate', sql.Date, expiryDate)
      .input('receiptDate', sql.Date, new Date())
      .query(`
        INSERT INTO Lot (Lot_Number, Material_ID, Supplier_ID, Quantity, Status, Production_Date, Expiry_Date, Receipt_Date)
        OUTPUT INSERTED.Lot_ID as id
        VALUES (@lotNumber, @materialId, @supplierId, @quantity, @status, @productionDate, @expiryDate, @receiptDate)
      `);
    
    res.status(201).json({ id: result.recordset[0].id, message: 'Lot created successfully' });
  } catch (err) {
    console.error('Error creating lot:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update lot
router.put('/:id', async (req, res) => {
  try {
    const { lotNumber, materialId, supplierId, quantity, status, productionDate, expiryDate } = req.body;
    const pool = await poolPromise;
    
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .input('lotNumber', sql.VarChar(50), lotNumber)
      .input('materialId', sql.Int, materialId)
      .input('supplierId', sql.Int, supplierId)
      .input('quantity', sql.Decimal(12, 3), quantity)
      .input('status', sql.VarChar(20), status)
      .input('productionDate', sql.Date, productionDate)
      .input('expiryDate', sql.Date, expiryDate)
      .query(`
        UPDATE Lot 
        SET Lot_Number = @lotNumber,
            Material_ID = @materialId,
            Supplier_ID = @supplierId,
            Quantity = @quantity,
            Status = @status,
            Production_Date = @productionDate,
            Expiry_Date = @expiryDate
        WHERE Lot_ID = @id
      `);
    
    res.json({ message: 'Lot updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE lot
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM Lot WHERE Lot_ID = @id');
    
    res.json({ message: 'Lot deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;