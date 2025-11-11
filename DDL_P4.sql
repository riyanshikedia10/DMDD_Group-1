-- =============================================
-- Food Supply Chain Traceability System - DDL Script
-- Database Design & Implementation
-- Team: Group 1 | Course: DMDD
-- =============================================

-- Drop database if exists and create fresh
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'FoodSupplyChainDB')
BEGIN
    ALTER DATABASE FoodSupplyChainDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE FoodSupplyChainDB;
END
GO

CREATE DATABASE FoodSupplyChainDB;
GO

USE FoodSupplyChainDB;
GO

-- ========================================
-- DROP ALL EXISTING OBJECTS (In Correct Order)
-- =============================================

-- Drop foreign key constraints first
IF OBJECT_ID('dbo.Recall_Lots', 'U') IS NOT NULL
    ALTER TABLE dbo.Recall_Lots DROP CONSTRAINT IF EXISTS FK_RecallLots_Recall;
IF OBJECT_ID('dbo.Recall_Lots', 'U') IS NOT NULL
    ALTER TABLE dbo.Recall_Lots DROP CONSTRAINT IF EXISTS FK_RecallLots_Lot;
IF OBJECT_ID('dbo.Genealogy', 'U') IS NOT NULL
    ALTER TABLE dbo.Genealogy DROP CONSTRAINT IF EXISTS FK_Genealogy_ParentLot;
IF OBJECT_ID('dbo.Genealogy', 'U') IS NOT NULL
    ALTER TABLE dbo.Genealogy DROP CONSTRAINT IF EXISTS FK_Genealogy_ChildLot;
IF OBJECT_ID('dbo.Shipment_Lot', 'U') IS NOT NULL
    ALTER TABLE dbo.Shipment_Lot DROP CONSTRAINT IF EXISTS FK_ShipmentLot_Shipment;
IF OBJECT_ID('dbo.Shipment_Lot', 'U') IS NOT NULL
    ALTER TABLE dbo.Shipment_Lot DROP CONSTRAINT IF EXISTS FK_ShipmentLot_Lot;
IF OBJECT_ID('dbo.Order_Details', 'U') IS NOT NULL
    ALTER TABLE dbo.Order_Details DROP CONSTRAINT IF EXISTS FK_OrderDetails_Order;
IF OBJECT_ID('dbo.Order_Details', 'U') IS NOT NULL
    ALTER TABLE dbo.Order_Details DROP CONSTRAINT IF EXISTS FK_OrderDetails_Lot;
IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL
    ALTER TABLE dbo.Orders DROP CONSTRAINT IF EXISTS FK_Order_Customer;
IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL
    ALTER TABLE dbo.Orders DROP CONSTRAINT IF EXISTS FK_Order_Warehouse;
IF OBJECT_ID('dbo.Shipment', 'U') IS NOT NULL
    ALTER TABLE dbo.Shipment DROP CONSTRAINT IF EXISTS FK_Shipment_Warehouse;
IF OBJECT_ID('dbo.Shipment', 'U') IS NOT NULL
    ALTER TABLE dbo.Shipment DROP CONSTRAINT IF EXISTS FK_Shipment_Customer;
IF OBJECT_ID('dbo.Inventory', 'U') IS NOT NULL
    ALTER TABLE dbo.Inventory DROP CONSTRAINT IF EXISTS FK_Inventory_Lot;
IF OBJECT_ID('dbo.Inventory', 'U') IS NOT NULL
    ALTER TABLE dbo.Inventory DROP CONSTRAINT IF EXISTS FK_Inventory_Warehouse;
IF OBJECT_ID('dbo.Quality_Test', 'U') IS NOT NULL
    ALTER TABLE dbo.Quality_Test DROP CONSTRAINT IF EXISTS FK_QualityTest_Lot;
IF OBJECT_ID('dbo.Production', 'U') IS NOT NULL
    ALTER TABLE dbo.Production DROP CONSTRAINT IF EXISTS FK_Production_Lot;
IF OBJECT_ID('dbo.Lot', 'U') IS NOT NULL
    ALTER TABLE dbo.Lot DROP CONSTRAINT IF EXISTS FK_Lot_Material;
IF OBJECT_ID('dbo.Lot', 'U') IS NOT NULL
    ALTER TABLE dbo.Lot DROP CONSTRAINT IF EXISTS FK_Lot_Supplier;
IF OBJECT_ID('dbo.Supplier_Material', 'U') IS NOT NULL
    ALTER TABLE dbo.Supplier_Material DROP CONSTRAINT IF EXISTS FK_SupplierMaterial_Supplier;
IF OBJECT_ID('dbo.Supplier_Material', 'U') IS NOT NULL
    ALTER TABLE dbo.Supplier_Material DROP CONSTRAINT IF EXISTS FK_SupplierMaterial_Material;
IF OBJECT_ID('dbo.Data_Quality', 'U') IS NOT NULL
    ALTER TABLE dbo.Data_Quality DROP CONSTRAINT IF EXISTS FK_DataQuality_SourceSystem;

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS dbo.Audit_Log;
DROP TABLE IF EXISTS dbo.Data_Quality;
DROP TABLE IF EXISTS dbo.Recall_Lots;
DROP TABLE IF EXISTS dbo.Genealogy;
DROP TABLE IF EXISTS dbo.Shipment_Lot;
DROP TABLE IF EXISTS dbo.Order_Details;
DROP TABLE IF EXISTS dbo.Orders;
DROP TABLE IF EXISTS dbo.Shipment;
DROP TABLE IF EXISTS dbo.Recall;
DROP TABLE IF EXISTS dbo.Inventory;
DROP TABLE IF EXISTS dbo.Quality_Test;
DROP TABLE IF EXISTS dbo.Production;
DROP TABLE IF EXISTS dbo.Lot;
DROP TABLE IF EXISTS dbo.Supplier_Material;
DROP TABLE IF EXISTS dbo.Material;
DROP TABLE IF EXISTS dbo.Supplier;
DROP TABLE IF EXISTS dbo.Warehouse;
DROP TABLE IF EXISTS dbo.Customer;
DROP TABLE IF EXISTS dbo.Source_System;

GO


-- =============================================
-- MASTER DATA TABLES
-- =============================================

-- Supplier Table
CREATE TABLE dbo.Supplier (
    Supplier_ID INT IDENTITY(1,1) PRIMARY KEY,
    Supplier_Code VARCHAR(20) NOT NULL UNIQUE,
    Name VARCHAR(200) NOT NULL,
    Country VARCHAR(100) NOT NULL,
    Contact_Email VARCHAR(100) NOT NULL,
    Contact_Phone VARCHAR(20),
    Rating DECIMAL(3,2) CHECK (Rating >= 0 AND Rating <= 5),
    Certification_Status VARCHAR(50) DEFAULT 'Pending',
    Is_Active BIT NOT NULL DEFAULT 1,
    Created_Date DATETIME NOT NULL DEFAULT GETDATE(),
    Modified_Date DATETIME NOT NULL DEFAULT GETDATE()
);

-- Material Table
CREATE TABLE dbo.Material (
    Material_ID INT IDENTITY(1,1) PRIMARY KEY,
    Material_Code VARCHAR(20) NOT NULL UNIQUE,
    Name VARCHAR(200) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Unit_Of_Measure VARCHAR(20) NOT NULL,
    Shelf_Life_Days INT CHECK (Shelf_Life_Days > 0),
    Min_Temperature_C DECIMAL(5,2),
    Max_Temperature_C DECIMAL(5,2),
    Is_Active BIT NOT NULL DEFAULT 1,
    Created_Date DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT CHK_Material_Temperature CHECK (Min_Temperature_C <= Max_Temperature_C)
);

-- Warehouse Table
CREATE TABLE dbo.Warehouse (
    Warehouse_ID INT IDENTITY(1,1) PRIMARY KEY,
    Warehouse_Code VARCHAR(20) NOT NULL UNIQUE,
    Name VARCHAR(200) NOT NULL,
    Location VARCHAR(200) NOT NULL,
    Address VARCHAR(500),
    Capacity_Cubic_Meters DECIMAL(12,2) CHECK (Capacity_Cubic_Meters > 0),
    Temperature_Zones VARCHAR(100),
    Manager VARCHAR(100),
    Is_Active BIT NOT NULL DEFAULT 1,
    Created_Date DATETIME NOT NULL DEFAULT GETDATE()
);

-- Customer Table
CREATE TABLE dbo.Customer (
    Customer_ID INT IDENTITY(1,1) PRIMARY KEY,
    Customer_Code VARCHAR(20) NOT NULL UNIQUE,
    Name VARCHAR(200) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Shipping_Address VARCHAR(500) NOT NULL,
    Contact_Email VARCHAR(100) NOT NULL,
    Contact_Phone VARCHAR(20),
    Credit_Terms VARCHAR(50),
    Registration_Date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    Is_Active BIT NOT NULL DEFAULT 1
);

-- Source System Table
CREATE TABLE dbo.Source_System (
    System_ID INT IDENTITY(1,1) PRIMARY KEY,
    System_Name VARCHAR(100) NOT NULL UNIQUE,
    System_Type VARCHAR(50) NOT NULL,
    Connection_Method VARCHAR(100),
    Data_Format VARCHAR(50),
    Update_Frequency VARCHAR(50),
    Is_Active BIT NOT NULL DEFAULT 1,
    Last_Sync_Date DATETIME
);

-- =============================================
-- ASSOCIATIVE/JUNCTION TABLES
-- =============================================

-- Supplier Material Relationship
CREATE TABLE dbo.Supplier_Material (
    Supplier_Material_ID INT IDENTITY(1,1) PRIMARY KEY,
    Supplier_ID INT NOT NULL,
    Material_ID INT NOT NULL,
    Lead_Time_Days INT NOT NULL CHECK (Lead_Time_Days >= 0),
    Unit_Price DECIMAL(10,2) NOT NULL CHECK (Unit_Price >= 0),
    Effective_From_Date DATE NOT NULL,
    Effective_To_Date DATE,
    Is_Preferred BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_SupplierMaterial_Supplier FOREIGN KEY (Supplier_ID) REFERENCES dbo.Supplier(Supplier_ID),
    CONSTRAINT FK_SupplierMaterial_Material FOREIGN KEY (Material_ID) REFERENCES dbo.Material(Material_ID),
    CONSTRAINT UQ_Supplier_Material UNIQUE (Supplier_ID, Material_ID, Effective_From_Date)
);

-- =============================================
-- TRANSACTIONAL TABLES
-- =============================================

-- Lot Table (Batch tracking)
CREATE TABLE dbo.Lot (
    Lot_ID INT IDENTITY(1,1) PRIMARY KEY,
    Lot_Number VARCHAR(50) NOT NULL UNIQUE,
    Material_ID INT NOT NULL,
    Supplier_ID INT NOT NULL,
    Production_Date DATE NOT NULL,
    Expiry_Date DATE NOT NULL,
    Receipt_Date DATE NOT NULL,
    Quantity DECIMAL(12,3) NOT NULL CHECK (Quantity > 0),
    Status VARCHAR(20) NOT NULL DEFAULT 'Received',
    Version INT NOT NULL DEFAULT 1,
    Created_Date DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Lot_Material FOREIGN KEY (Material_ID) REFERENCES dbo.Material(Material_ID),
    CONSTRAINT FK_Lot_Supplier FOREIGN KEY (Supplier_ID) REFERENCES dbo.Supplier(Supplier_ID),
    CONSTRAINT CHK_Lot_Dates CHECK (Production_Date <= Expiry_Date AND Receipt_Date >= Production_Date)
);

-- Quality Test Table
CREATE TABLE dbo.Quality_Test (
    Test_ID INT IDENTITY(1,1) PRIMARY KEY,
    Lot_ID INT NOT NULL,
    Lot_Number VARCHAR(50) NOT NULL,
    Test_Type VARCHAR(50) NOT NULL,
    Test_Date DATETIME NOT NULL DEFAULT GETDATE(),
    Result VARCHAR(500),
    Pass_Flag BIT NOT NULL,
    Tested_By VARCHAR(100) NOT NULL,
    Certificate_Number VARCHAR(50),
    Notes VARCHAR(1000),
    CONSTRAINT FK_QualityTest_Lot FOREIGN KEY (Lot_ID) REFERENCES dbo.Lot(Lot_ID)
);

-- Inventory Table
CREATE TABLE dbo.Inventory (
    Inventory_ID INT IDENTITY(1,1) PRIMARY KEY,
    Lot_ID INT NOT NULL,
    Warehouse_ID INT NOT NULL,
    Location_In_Warehouse VARCHAR(50),
    Quantity_On_Hand DECIMAL(12,3) NOT NULL CHECK (Quantity_On_Hand >= 0),
    Reserved_Quantity DECIMAL(12,3) NOT NULL DEFAULT 0 CHECK (Reserved_Quantity >= 0),
    Status VARCHAR(20) NOT NULL DEFAULT 'Available',
    Last_Movement_Date DATETIME NOT NULL DEFAULT GETDATE(),
    Dwell_Days AS DATEDIFF(DAY, Last_Movement_Date, GETDATE()),
    CONSTRAINT FK_Inventory_Lot FOREIGN KEY (Lot_ID) REFERENCES dbo.Lot(Lot_ID),
    CONSTRAINT FK_Inventory_Warehouse FOREIGN KEY (Warehouse_ID) REFERENCES dbo.Warehouse(Warehouse_ID),
    CONSTRAINT CHK_Inventory_Reserved CHECK (Reserved_Quantity <= Quantity_On_Hand)
);

-- Production Table
CREATE TABLE dbo.Production (
    Production_ID INT IDENTITY(1,1) PRIMARY KEY,
    Batch_Number VARCHAR(50) NOT NULL UNIQUE,
    Lot_ID INT NOT NULL,
    Process_Type VARCHAR(50) NOT NULL,
    Start_Date DATETIME NOT NULL,
    End_Date DATETIME,
    Yield_Percentage DECIMAL(5,2) CHECK (Yield_Percentage >= 0 AND Yield_Percentage <= 100),
    Waste_Amount DECIMAL(12,3) DEFAULT 0 CHECK (Waste_Amount >= 0),
    Operator VARCHAR(100),
    Status VARCHAR(20) NOT NULL DEFAULT 'In Progress',
    CONSTRAINT FK_Production_Lot FOREIGN KEY (Lot_ID) REFERENCES dbo.Lot(Lot_ID)
);

-- Orders Table
CREATE TABLE dbo.Orders (
    Order_ID INT IDENTITY(1,1) PRIMARY KEY,
    Order_Number VARCHAR(50) NOT NULL UNIQUE,
    Customer_ID INT NOT NULL,
    Warehouse_ID INT NOT NULL,
    Order_Date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    Required_Date DATE,
    Order_Total DECIMAL(12,2) NOT NULL CHECK (Order_Total >= 0),
    Payment_Method VARCHAR(50),
    Order_Status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    Created_Date DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Order_Customer FOREIGN KEY (Customer_ID) REFERENCES dbo.Customer(Customer_ID),
    CONSTRAINT FK_Order_Warehouse FOREIGN KEY (Warehouse_ID) REFERENCES dbo.Warehouse(Warehouse_ID)
);

-- Order Details Table
CREATE TABLE dbo.Order_Details (
    Order_Detail_ID INT IDENTITY(1,1) PRIMARY KEY,
    Order_ID INT NOT NULL,
    Lot_ID INT NOT NULL,
    Quantity_Ordered DECIMAL(12,3) NOT NULL CHECK (Quantity_Ordered > 0),
    Unit_Price DECIMAL(10,2) NOT NULL CHECK (Unit_Price >= 0),
    Line_Total DECIMAL(12,2) NOT NULL CHECK (Line_Total >= 0),
    Discount_Applied DECIMAL(5,2) DEFAULT 0 CHECK (Discount_Applied >= 0 AND Discount_Applied <= 100),
    Tax_Amount DECIMAL(10,2) DEFAULT 0 CHECK (Tax_Amount >= 0),
    CONSTRAINT FK_OrderDetails_Order FOREIGN KEY (Order_ID) REFERENCES dbo.Orders(Order_ID),
    CONSTRAINT FK_OrderDetails_Lot FOREIGN KEY (Lot_ID) REFERENCES dbo.Lot(Lot_ID)
);

-- Shipment Table
CREATE TABLE dbo.Shipment (
    Shipment_ID INT IDENTITY(1,1) PRIMARY KEY,
    Shipment_Number VARCHAR(50) NOT NULL UNIQUE,
    Warehouse_ID INT NOT NULL,
    Customer_ID INT NOT NULL,
    Carrier VARCHAR(100),
    Estimated_Departure_Date DATETIME,
    Actual_Departure_Date DATETIME,
    Tracking_Number VARCHAR(100),
    Status VARCHAR(20) NOT NULL DEFAULT 'Preparing',
    Temperature_Log VARCHAR(MAX),
    Created_Date DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Shipment_Warehouse FOREIGN KEY (Warehouse_ID) REFERENCES dbo.Warehouse(Warehouse_ID),
    CONSTRAINT FK_Shipment_Customer FOREIGN KEY (Customer_ID) REFERENCES dbo.Customer(Customer_ID)
);

-- Shipment Lot (Junction for Shipment and Lot)
CREATE TABLE dbo.Shipment_Lot (
    Shipment_Lot_ID INT IDENTITY(1,1) PRIMARY KEY,
    Shipment_ID INT NOT NULL,
    Lot_ID INT NOT NULL,
    Quantity_Shipped DECIMAL(12,3) NOT NULL CHECK (Quantity_Shipped > 0),
    Line_Price DECIMAL(10,2) NOT NULL CHECK (Line_Price >= 0),
    Temperature_Log VARCHAR(MAX),
    CONSTRAINT FK_ShipmentLot_Shipment FOREIGN KEY (Shipment_ID) REFERENCES dbo.Shipment(Shipment_ID),
    CONSTRAINT FK_ShipmentLot_Lot FOREIGN KEY (Lot_ID) REFERENCES dbo.Lot(Lot_ID)
);

-- Recall Table
CREATE TABLE dbo.Recall (
    Recall_ID INT IDENTITY(1,1) PRIMARY KEY,
    Recall_Number VARCHAR(50) NOT NULL UNIQUE,
    Recall_Date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    Reason VARCHAR(500) NOT NULL,
    Severity VARCHAR(20) NOT NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'Active',
    Initiated_By VARCHAR(100) NOT NULL,
    Regulatory_Body VARCHAR(100),
    Resolution_Date DATE,
    Notes VARCHAR(MAX)
);

-- Recall Lots (Junction for Recall and Lot)
CREATE TABLE dbo.Recall_Lots (
    Recall_Lot_ID INT IDENTITY(1,1) PRIMARY KEY,
    Recall_ID INT NOT NULL,
    Lot_ID INT NOT NULL,
    Quantity_Recalled DECIMAL(12,3) NOT NULL CHECK (Quantity_Recalled > 0),
    Affected_Customers_Notes VARCHAR(MAX),
    CONSTRAINT FK_RecallLots_Recall FOREIGN KEY (Recall_ID) REFERENCES dbo.Recall(Recall_ID),
    CONSTRAINT FK_RecallLots_Lot FOREIGN KEY (Lot_ID) REFERENCES dbo.Lot(Lot_ID)
);

-- Genealogy Table (Lot Transformations)
CREATE TABLE dbo.Genealogy (
    Genealogy_ID INT IDENTITY(1,1) PRIMARY KEY,
    Parent_Lot_ID INT NOT NULL,
    Child_Lot_ID INT NOT NULL,
    Quantity_Used DECIMAL(12,3) NOT NULL CHECK (Quantity_Used > 0),
    Yield_Percentage DECIMAL(5,2) CHECK (Yield_Percentage >= 0 AND Yield_Percentage <= 100),
    Waste_Amount DECIMAL(12,3) DEFAULT 0 CHECK (Waste_Amount >= 0),
    Transformation_Date DATETIME NOT NULL DEFAULT GETDATE(),
    Notes VARCHAR(500),
    CONSTRAINT FK_Genealogy_ParentLot FOREIGN KEY (Parent_Lot_ID) REFERENCES dbo.Lot(Lot_ID),
    CONSTRAINT FK_Genealogy_ChildLot FOREIGN KEY (Child_Lot_ID) REFERENCES dbo.Lot(Lot_ID)
);

-- =============================================
-- GOVERNANCE & TRACKING TABLES
-- =============================================

-- Audit Log Table
CREATE TABLE dbo.Audit_Log (
    Log_ID INT IDENTITY(1,1) PRIMARY KEY,
    Table_Name VARCHAR(100) NOT NULL,
    Record_ID INT NOT NULL,
    Action VARCHAR(20) NOT NULL,
    Old_Value VARCHAR(MAX),
    New_Value VARCHAR(MAX),
    Changed_By VARCHAR(100) NOT NULL,
    Timestamp DATETIME NOT NULL DEFAULT GETDATE()
);

-- Data Quality Table
CREATE TABLE dbo.Data_Quality (
    Quality_ID INT IDENTITY(1,1) PRIMARY KEY,
    System_ID INT NOT NULL,
    Issue_Type VARCHAR(100) NOT NULL,
    Table_Name VARCHAR(100) NOT NULL,
    Record_ID INT,
    Issue_Description VARCHAR(500) NOT NULL,
    Severity VARCHAR(20) NOT NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'Open',
    Remediation_Date DATE,
    CONSTRAINT FK_DataQuality_SourceSystem FOREIGN KEY (System_ID) REFERENCES dbo.Source_System(System_ID)
);

GO

-- =============================================
-- CREATE INDEXES FOR PERFORMANCE
-- =============================================


PRINT 'Database schema created successfully!';
PRINT 'Total Tables Created: 18';
PRINT 'Primary Keys: 18 | Foreign Keys: 20 | Check Constraints: 22+';