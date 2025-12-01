const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// POST Create Order with Reservation (uses stored procedure usp_CreateOrderWithReservation)
router.post('/create-order-with-reservation', async (req, res) => {
  try {
    const { customerId, warehouseId, orderDate, requiredDate, paymentMethod, lotId, quantityOrdered, unitPrice } = req.body;
    
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('CustomerID', sql.Int, customerId)
      .input('WarehouseID', sql.Int, warehouseId)
      .input('OrderDate', sql.Date, orderDate)
      .input('RequiredDate', sql.Date, requiredDate)
      .input('PaymentMethod', sql.VarChar(50), paymentMethod)
      .input('LotID', sql.Int, lotId)
      .input('QuantityOrdered', sql.Decimal(12, 3), quantityOrdered)
      .input('UnitPrice', sql.Decimal(10, 2), unitPrice)
      .output('NewOrderID', sql.Int)
      .output('Message', sql.VarChar(4000))
      .execute('dbo.usp_CreateOrderWithReservation');
    
    const newOrderId = result.output.NewOrderID;
    const message = result.output.Message;
    
    if (newOrderId) {
      res.status(201).json({ 
        success: true, 
        orderId: newOrderId, 
        message: message 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: message 
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Record Quality Test (uses stored procedure usp_RecordQualityTestAndUpdateLotStatus)
router.post('/record-quality-test', async (req, res) => {
  try {
    const { lotId, testType, result, passFlag, testedBy, certificateNumber, notes } = req.body;
    
    const pool = await poolPromise;
    const execResult = await pool
      .request()
      .input('LotID', sql.Int, lotId)
      .input('Test_Type', sql.VarChar(50), testType)
      .input('Result', sql.VarChar(500), result)
      .input('Pass_Flag', sql.Bit, passFlag)
      .input('Tested_By', sql.VarChar(100), testedBy)
      .input('Certificate_Number', sql.VarChar(50), certificateNumber)
      .input('Notes', sql.VarChar(1000), notes)
      .output('NewTestID', sql.Int)
      .output('Message', sql.VarChar(4000))
      .execute('dbo.usp_RecordQualityTestAndUpdateLotStatus');
    
    const newTestId = execResult.output.NewTestID;
    const message = execResult.output.Message;
    
    if (newTestId) {
      res.status(201).json({ 
        success: true, 
        testId: newTestId, 
        message: message 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: message 
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Create Recall for Lot (uses stored procedure usp_CreateRecallForLot)
router.post('/create-recall', async (req, res) => {
  try {
    const { lotId, reason, severity, initiatedBy, regulatoryBody } = req.body;
    
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('LotID', sql.Int, lotId)
      .input('Reason', sql.VarChar(500), reason)
      .input('Severity', sql.VarChar(20), severity)
      .input('Initiated_By', sql.VarChar(100), initiatedBy)
      .input('Regulatory_Body', sql.VarChar(100), regulatoryBody)
      .output('RecallID', sql.Int)
      .output('Message', sql.VarChar(4000))
      .execute('dbo.usp_CreateRecallForLot');
    
    const recallId = result.output.RecallID;
    const message = result.output.Message;
    
    if (recallId) {
      res.status(201).json({ 
        success: true, 
        recallId: recallId, 
        message: message 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: message 
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;