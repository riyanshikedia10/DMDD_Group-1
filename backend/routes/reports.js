const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET Lot Quality Summary (uses view v_LotQualitySummary)
router.get('/lot-quality-summary', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT * FROM dbo.v_LotQualitySummary
      ORDER BY Lot_Number
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Inventory by Warehouse & Material (uses view v_InventoryByWarehouseMaterial)
router.get('/inventory-by-warehouse', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT * FROM dbo.v_InventoryByWarehouseMaterial
      ORDER BY Warehouse_Name, Material_Name
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Active Recalls Summary (uses view v_ActiveRecallsSummary)
router.get('/active-recalls', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT * FROM dbo.v_ActiveRecallsSummary
      ORDER BY Recall_Date DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Lot Traceability (uses function fn_GetLotTraceability)
router.get('/lot-traceability/:lotNumber', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('lotNumber', sql.VarChar(50), req.params.lotNumber)
      .query(`SELECT * FROM dbo.fn_GetLotTraceability(@lotNumber) ORDER BY Stage_Date`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Lot Remaining Shelf Life (uses function fn_GetLotRemainingShelfLife)
router.get('/lot-shelf-life/:lotId', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('lotId', sql.Int, req.params.lotId)
      .query(`SELECT dbo.fn_GetLotRemainingShelfLife(@lotId) as remainingDays`);
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Order Computed Total (uses function fn_GetOrderComputedTotal)
router.get('/order-computed-total/:orderId', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('orderId', sql.Int, req.params.orderId)
      .query(`SELECT dbo.fn_GetOrderComputedTotal(@orderId) as computedTotal`);
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;