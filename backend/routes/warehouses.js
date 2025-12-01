const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET all warehouses
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        Warehouse_ID as id,
        Warehouse_Code as code,
        Name as name,
        Location as location,
        Address as address,
        Capacity_Cubic_Meters as capacity,
        Temperature_Zones as tempZones,
        Manager as manager,
        Is_Active as isActive
      FROM Warehouse
      WHERE Is_Active = 1
      ORDER BY Name
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create warehouse
router.post('/', async (req, res) => {
  try {
    const { code, name, location, address, capacity, tempZones, manager } = req.body;
    const pool = await poolPromise;
    
    const result = await pool
      .request()
      .input('code', sql.VarChar(20), code)
      .input('name', sql.VarChar(200), name)
      .input('location', sql.VarChar(200), location)
      .input('address', sql.VarChar(500), address)
      .input('capacity', sql.Decimal(12, 2), capacity)
      .input('tempZones', sql.VarChar(100), tempZones)
      .input('manager', sql.VarChar(100), manager)
      .query(`
        INSERT INTO Warehouse (Warehouse_Code, Name, Location, Address, Capacity_Cubic_Meters, Temperature_Zones, Manager)
        OUTPUT INSERTED.Warehouse_ID as id
        VALUES (@code, @name, @location, @address, @capacity, @tempZones, @manager)
      `);
    
    res.status(201).json({ id: result.recordset[0].id, message: 'Warehouse created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update warehouse
router.put('/:id', async (req, res) => {
  try {
    const { code, name, location, address, capacity, tempZones, manager } = req.body;
    const pool = await poolPromise;
    
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .input('code', sql.VarChar(20), code)
      .input('name', sql.VarChar(200), name)
      .input('location', sql.VarChar(200), location)
      .input('address', sql.VarChar(500), address)
      .input('capacity', sql.Decimal(12, 2), capacity)
      .input('tempZones', sql.VarChar(100), tempZones)
      .input('manager', sql.VarChar(100), manager)
      .query(`
        UPDATE Warehouse 
        SET Warehouse_Code = @code,
            Name = @name,
            Location = @location,
            Address = @address,
            Capacity_Cubic_Meters = @capacity,
            Temperature_Zones = @tempZones,
            Manager = @manager
        WHERE Warehouse_ID = @id
      `);
    
    res.json({ message: 'Warehouse updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE warehouse
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().input('id', sql.Int, req.params.id).query('UPDATE Warehouse SET Is_Active = 0 WHERE Warehouse_ID = @id');
    res.json({ message: 'Warehouse deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;