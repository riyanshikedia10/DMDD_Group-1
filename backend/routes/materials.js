const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET all materials
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        Material_ID as id,
        Material_Code as code,
        Name as name,
        Type as type,
        Unit_Of_Measure as unit,
        Shelf_Life_Days as shelfLife,
        Min_Temperature_C as minTemp,
        Max_Temperature_C as maxTemp,
        Is_Active as status
      FROM Material
      WHERE Is_Active = 1
      ORDER BY Name
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create material
router.post('/', async (req, res) => {
  try {
    const { code, name, type, unit, shelfLife, minTemp, maxTemp } = req.body;
    const pool = await poolPromise;
    
    const result = await pool
      .request()
      .input('code', sql.VarChar(20), code)
      .input('name', sql.VarChar(200), name)
      .input('type', sql.VarChar(50), type)
      .input('unit', sql.VarChar(20), unit)
      .input('shelfLife', sql.Int, shelfLife)
      .input('minTemp', sql.Decimal(5, 2), minTemp)
      .input('maxTemp', sql.Decimal(5, 2), maxTemp)
      .query(`
        INSERT INTO Material (Material_Code, Name, Type, Unit_Of_Measure, Shelf_Life_Days, Min_Temperature_C, Max_Temperature_C)
        OUTPUT INSERTED.Material_ID as id
        VALUES (@code, @name, @type, @unit, @shelfLife, @minTemp, @maxTemp)
      `);
    
    res.status(201).json({ id: result.recordset[0].id, message: 'Material created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update material
router.put('/:id', async (req, res) => {
  try {
    const { code, name, type, unit, shelfLife, minTemp, maxTemp } = req.body;
    const pool = await poolPromise;
    
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .input('code', sql.VarChar(20), code)
      .input('name', sql.VarChar(200), name)
      .input('type', sql.VarChar(50), type)
      .input('unit', sql.VarChar(20), unit)
      .input('shelfLife', sql.Int, shelfLife)
      .input('minTemp', sql.Decimal(5, 2), minTemp)
      .input('maxTemp', sql.Decimal(5, 2), maxTemp)
      .query(`
        UPDATE Material 
        SET Material_Code = @code,
            Name = @name,
            Type = @type,
            Unit_Of_Measure = @unit,
            Shelf_Life_Days = @shelfLife,
            Min_Temperature_C = @minTemp,
            Max_Temperature_C = @maxTemp
        WHERE Material_ID = @id
      `);
    
    res.json({ message: 'Material updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE material
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().input('id', sql.Int, req.params.id).query('UPDATE Material SET Is_Active = 0 WHERE Material_ID = @id');
    res.json({ message: 'Material deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;