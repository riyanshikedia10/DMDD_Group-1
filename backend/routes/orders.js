const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        o.Order_ID as id,
        o.Order_Number as orderNumber,
        c.Name as customer,
        w.Name as warehouse,
        o.Order_Total as total,
        o.Order_Status as status,
        CONVERT(varchar, o.Order_Date, 23) as date,
        CONVERT(varchar, o.Required_Date, 23) as requiredDate,
        o.Payment_Method as payment,
        o.Customer_ID as customerId,
        o.Warehouse_ID as warehouseId
      FROM Orders o
      JOIN Customer c ON o.Customer_ID = c.Customer_ID
      JOIN Warehouse w ON o.Warehouse_ID = w.Warehouse_ID
      ORDER BY o.Order_Date DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create order
router.post('/', async (req, res) => {
  try {
    const { orderNumber, customerId, warehouseId, total, status, date, requiredDate, payment } = req.body;
    const pool = await poolPromise;
    
    const result = await pool
      .request()
      .input('orderNumber', sql.VarChar(50), orderNumber)
      .input('customerId', sql.Int, customerId)
      .input('warehouseId', sql.Int, warehouseId)
      .input('total', sql.Decimal(12, 2), total)
      .input('status', sql.VarChar(20), status || 'Pending')
      .input('date', sql.Date, date)
      .input('requiredDate', sql.Date, requiredDate)
      .input('payment', sql.VarChar(50), payment)
      .query(`
        INSERT INTO Orders (Order_Number, Customer_ID, Warehouse_ID, Order_Total, Order_Status, Order_Date, Required_Date, Payment_Method)
        OUTPUT INSERTED.Order_ID as id
        VALUES (@orderNumber, @customerId, @warehouseId, @total, @status, @date, @requiredDate, @payment)
      `);
    
    res.status(201).json({ id: result.recordset[0].id, message: 'Order created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update order
router.put('/:id', async (req, res) => {
  try {
    const { orderNumber, customerId, warehouseId, total, status, date, requiredDate, payment } = req.body;
    const pool = await poolPromise;
    
    await pool
      .request()
      .input('id', sql.Int, req.params.id)
      .input('orderNumber', sql.VarChar(50), orderNumber)
      .input('customerId', sql.Int, customerId)
      .input('warehouseId', sql.Int, warehouseId)
      .input('total', sql.Decimal(12, 2), total)
      .input('status', sql.VarChar(20), status)
      .input('date', sql.Date, date)
      .input('requiredDate', sql.Date, requiredDate)
      .input('payment', sql.VarChar(50), payment)
      .query(`
        UPDATE Orders 
        SET Order_Number = @orderNumber,
            Customer_ID = @customerId,
            Warehouse_ID = @warehouseId,
            Order_Total = @total,
            Order_Status = @status,
            Order_Date = @date,
            Required_Date = @requiredDate,
            Payment_Method = @payment
        WHERE Order_ID = @id
      `);
    
    res.json({ message: 'Order updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    // First delete order details
    await pool.request().input('id', sql.Int, req.params.id).query('DELETE FROM Order_Details WHERE Order_ID = @id');
    // Then delete order
    await pool.request().input('id', sql.Int, req.params.id).query('DELETE FROM Orders WHERE Order_ID = @id');
    
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;