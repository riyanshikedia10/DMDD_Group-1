const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET all inventory
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        i.Inventory_ID as id,
        l.Lot_Number as lotNumber,
        w.Name as warehouse,
        i.Location_In_Warehouse as location,
        i.Quantity_On_Hand as quantityOnHand,
        i.Reserved_Quantity as reservedQty,
        i.Status as status,
        CONVERT(varchar, i.Last_Movement_Date, 23) as lastMovement,
        i.Lot_ID as lotId,
        i.Warehouse_ID as warehouseId
      FROM Inventory i
      JOIN Lot l ON i.Lot_ID = l.Lot_ID
      JOIN Warehouse w ON i.Warehouse_ID = w.Warehouse_ID
      ORDER BY i.Last_Movement_Date DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create inventory
router.post('/', async (req, res) => {
  try {
    const { lotId, warehouseId, location, quantityOnHand, reservedQty, status } = req.body;
    const pool = await poolPromise;
    
    const result = await pool
      .request()
      .input('lotId', sql.Int, lotId)
      .input('warehouseId', sql.Int, warehouseId)
      .input('location', sql.VarChar(50), location)
      .input('quantityOnHand', sql.Decimal(12, 3), quantityOnHand)
      .input('reservedQty', sql.Decimal(12, 3), reservedQty || 0)
      .input('status', sql.VarChar(20), status || 'Available')
      .query(`
        INSERT INTO Inventory (Lot_ID, Warehouse_ID, Location_In_Warehouse, Quantity_On_Hand, Reserved_Quantity, Status)
        OUTPUT INSERTED.Inventory_ID as id
        VALUES (@lotId, @warehouseId, @location, @quantityOnHand, @reservedQty, @status)
      `);
    
    res.status(201).json({ id: result.recordset[0].id, message: 'Inventory created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update inventory
router.put('/:id', async (req, res) => {
  try {
    const { lotId, warehouseId, location, quantityOnHand, reservedQty, status } = req.body;
    const pool = await poolPromise;
    
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .input('lotId', sql.Int, lotId)
      .input('warehouseId', sql.Int, warehouseId)
      .input('location', sql.VarChar(50), location)
      .input('quantityOnHand', sql.Decimal(12, 3), quantityOnHand)
      .input('reservedQty', sql.Decimal(12, 3), reservedQty)
      .input('status', sql.VarChar(20), status)
      .query(`
        UPDATE Inventory 
        SET Lot_ID = @lotId,
            Warehouse_ID = @warehouseId,
            Location_In_Warehouse = @location,
            Quantity_On_Hand = @quantityOnHand,
            Reserved_Quantity = @reservedQty,
            Status = @status,
            Last_Movement_Date = GETDATE()
        WHERE Inventory_ID = @id
      `);
    
    res.json({ message: 'Inventory updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE inventory
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().input('id', sql.Int, req.params.id).query('DELETE FROM Inventory WHERE Inventory_ID = @id');
    res.json({ message: 'Inventory deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;