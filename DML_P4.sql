-- =============================================
-- Food Supply Chain Traceability System - DML Script
-- Data Insertion Script (10+ rows per table)
-- Team: Group 1 | Course: DMDD
-- =============================================

USE FoodSupplyChainDB;
GO

PRINT '============================================='
PRINT 'Starting Data Insertion Process...'
PRINT '============================================='

-- =============================================
-- INSERT MASTER DATA
-- =============================================

PRINT 'Inserting Master Data...'

-- Insert Suppliers (15 suppliers)
INSERT INTO dbo.Supplier (Supplier_Code, Name, Country, Contact_Email, Contact_Phone, Rating, Certification_Status, Is_Active)
VALUES
    ('SUP001', 'Green Valley Farms LLC', 'USA', 'contact@greenvalley.com', '+1-555-0101', 4.5, 'Certified', 1),
    ('SUP002', 'Organic Produce International', 'Canada', 'info@organicproduce.ca', '+1-416-555-0202', 4.8, 'Certified', 1),
    ('SUP003', 'Fresh Dairy Solutions', 'USA', 'sales@freshdairy.com', '+1-555-0303', 4.2, 'Certified', 1),
    ('SUP004', 'Global Grain Traders', 'Australia', 'trade@globalgrain.au', '+61-2-555-0404', 3.9, 'Pending', 1),
    ('SUP005', 'Mediterranean Olive Co', 'Spain', 'export@medolive.es', '+34-91-555-0505', 4.7, 'Certified', 1),
    ('SUP006', 'Sunrise Poultry Farms', 'Brazil', 'orders@sunrisepoultry.br', '+55-11-555-0606', 4.3, 'Certified', 1),
    ('SUP007', 'Pacific Seafood Distributors', 'Japan', 'info@pacificseafood.jp', '+81-3-555-0707', 4.6, 'Certified', 1),
    ('SUP008', 'Alpine Meat Processors', 'Switzerland', 'sales@alpinemeat.ch', '+41-22-555-0808', 4.4, 'Certified', 1),
    ('SUP009', 'Tropical Fruit Exports', 'Costa Rica', 'export@tropicalfruit.cr', '+506-555-0909', 4.1, 'Certified', 1),
    ('SUP010', 'Northern Spice Company', 'India', 'trade@northernspice.in', '+91-22-555-1010', 4.0, 'Pending', 1),
    ('SUP011', 'Euro Bakery Supplies', 'Germany', 'info@eurobakery.de', '+49-30-555-1111', 4.5, 'Certified', 1),
    ('SUP012', 'Asian Rice Cooperative', 'Thailand', 'export@asianrice.th', '+66-2-555-1212', 4.2, 'Certified', 1),
    ('SUP013', 'South American Beverages', 'Argentina', 'sales@sabeverages.ar', '+54-11-555-1313', 3.8, 'Pending', 1),
    ('SUP014', 'Premium Coffee Importers', 'Colombia', 'info@premiumcoffee.co', '+57-1-555-1414', 4.9, 'Certified', 1),
    ('SUP015', 'Island Sugar Refiners', 'Mauritius', 'trade@islandsugar.mu', '+230-555-1515', 4.1, 'Certified', 1);

PRINT 'Suppliers inserted: 15'

-- Insert Materials (15 materials)
INSERT INTO dbo.Material (Material_Code, Name, Type, Unit_Of_Measure, Shelf_Life_Days, Min_Temperature_C, Max_Temperature_C, Is_Active)
VALUES
    ('MAT001', 'Organic Tomatoes', 'Vegetables', 'KG', 14, 2.0, 8.0, 1),
    ('MAT002', 'Whole Milk', 'Dairy', 'Liters', 7, 1.0, 4.0, 1),
    ('MAT003', 'Wheat Flour', 'Grains', 'KG', 365, 10.0, 25.0, 1),
    ('MAT004', 'Extra Virgin Olive Oil', 'Oils', 'Liters', 730, 15.0, 25.0, 1),
    ('MAT005', 'Fresh Chicken Breast', 'Meat', 'KG', 5, -2.0, 2.0, 1),
    ('MAT006', 'Wild Caught Salmon', 'Seafood', 'KG', 3, -18.0, -15.0, 1),
    ('MAT007', 'Ground Beef', 'Meat', 'KG', 4, -2.0, 2.0, 1),
    ('MAT008', 'Fresh Bananas', 'Fruits', 'KG', 10, 13.0, 15.0, 1),
    ('MAT009', 'Black Pepper', 'Spices', 'KG', 730, 15.0, 25.0, 1),
    ('MAT010', 'Bread Flour', 'Grains', 'KG', 180, 10.0, 25.0, 1),
    ('MAT011', 'Jasmine Rice', 'Grains', 'KG', 365, 10.0, 25.0, 1),
    ('MAT012', 'Orange Juice Concentrate', 'Beverages', 'Liters', 90, -18.0, -15.0, 1),
    ('MAT013', 'Arabica Coffee Beans', 'Beverages', 'KG', 365, 15.0, 25.0, 1),
    ('MAT014', 'Raw Cane Sugar', 'Sweeteners', 'KG', 730, 10.0, 25.0, 1),
    ('MAT015', 'Cheddar Cheese', 'Dairy', 'KG', 60, 2.0, 6.0, 1);

PRINT 'Materials inserted: 15'

-- Insert Warehouses (12 warehouses)
INSERT INTO dbo.Warehouse (Warehouse_Code, Name, Location, Address, Capacity_Cubic_Meters, Temperature_Zones, Manager, Is_Active)
VALUES
    ('WH001', 'Boston Central Distribution', 'Boston, MA', '100 Harbor Ave, Boston, MA 02210', 50000.00, 'Ambient, Chilled, Frozen', 'John Anderson', 1),
    ('WH002', 'Chicago Cold Storage', 'Chicago, IL', '500 Industrial Blvd, Chicago, IL 60601', 35000.00, 'Chilled, Frozen', 'Sarah Mitchell', 1),
    ('WH003', 'Los Angeles Fresh Hub', 'Los Angeles, CA', '2000 Logistics Way, Los Angeles, CA 90001', 45000.00, 'Ambient, Chilled', 'Michael Chen', 1),
    ('WH004', 'Seattle Fresh Storage', 'Seattle, WA', '800 Port Road, Seattle, WA 98101', 30000.00, 'Chilled, Frozen', 'Emily Rodriguez', 1),
    ('WH005', 'Miami Tropical Center', 'Miami, FL', '1500 Trade Plaza, Miami, FL 33101', 28000.00, 'Ambient, Chilled', 'David Martinez', 1),
    ('WH006', 'New York Metro Warehouse', 'New York, NY', '300 Distribution Dr, Bronx, NY 10451', 55000.00, 'Ambient, Chilled, Frozen', 'Lisa Thompson', 1),
    ('WH007', 'Dallas Dry Goods', 'Dallas, TX', '700 Supply Chain Rd, Dallas, TX 75201', 40000.00, 'Ambient', 'Robert Johnson', 1),
    ('WH008', 'Denver Mountain Storage', 'Denver, CO', '900 Mountain View, Denver, CO 80201', 32000.00, 'Ambient, Chilled', 'Jennifer Brown', 1),
    ('WH009', 'Atlanta Regional Hub', 'Atlanta, GA', '400 Commerce St, Atlanta, GA 30301', 38000.00, 'Ambient, Chilled', 'William Davis', 1),
    ('WH010', 'Phoenix Desert Depot', 'Phoenix, AZ', '600 Desert Way, Phoenix, AZ 85001', 25000.00, 'Ambient', 'Patricia Wilson', 1),
    ('WH011', 'Portland Northwest Center', 'Portland, OR', '1200 Pacific Blvd, Portland, OR 97201', 33000.00, 'Ambient, Chilled', 'Christopher Lee', 1),
    ('WH012', 'Minneapolis Cold Chain', 'Minneapolis, MN', '1000 North Industrial, Minneapolis, MN 55401', 36000.00, 'Chilled, Frozen', 'Amanda Taylor', 1);

PRINT 'Warehouses inserted: 12'

-- Insert Customers (15 customers)
INSERT INTO dbo.Customer (Customer_Code, Name, Type, Shipping_Address, Contact_Email, Contact_Phone, Credit_Terms, Registration_Date, Is_Active)
VALUES
    ('CUST001', 'Whole Foods Market', 'Retail Chain', '550 Bowie St, Austin, TX 78703', 'orders@wholefoods.com', '+1-512-555-2001', 'Net 30', '2023-01-15', 1),
    ('CUST002', 'Restaurant Group USA', 'Food Service', '1200 Main St, New York, NY 10001', 'purchasing@restaurantusa.com', '+1-212-555-2002', 'Net 45', '2023-02-20', 1),
    ('CUST003', 'Fresh Market Co', 'Retail Chain', '800 Market St, San Francisco, CA 94102', 'supply@freshmarket.com', '+1-415-555-2003', 'Net 30', '2023-03-10', 1),
    ('CUST004', 'Premium Grocers Inc', 'Retail Chain', '300 Commerce Dr, Chicago, IL 60601', 'orders@premiumgrocers.com', '+1-312-555-2004', 'Net 30', '2023-01-25', 1),
    ('CUST005', 'Hospitality Services LLC', 'Food Service', '2000 Hotel Blvd, Las Vegas, NV 89101', 'procurement@hospitalityservices.com', '+1-702-555-2005', 'Net 60', '2023-04-05', 1),
    ('CUST006', 'Natural Foods Distributor', 'Wholesaler', '500 Distribution Way, Seattle, WA 98101', 'sales@naturalfoods.com', '+1-206-555-2006', 'Net 30', '2023-02-15', 1),
    ('CUST007', 'Campus Dining Solutions', 'Institutional', '100 University Ave, Boston, MA 02115', 'foodservice@campusdining.edu', '+1-617-555-2007', 'Net 45', '2023-05-20', 1),
    ('CUST008', 'Organic Market Network', 'Retail Chain', '700 Green St, Portland, OR 97201', 'purchasing@organicmarket.com', '+1-503-555-2008', 'Net 30', '2023-03-30', 1),
    ('CUST009', 'Healthcare Food Services', 'Institutional', '400 Hospital Dr, Miami, FL 33101', 'supply@healthcarefood.com', '+1-305-555-2009', 'Net 60', '2023-06-10', 1),
    ('CUST010', 'Gourmet Restaurants Inc', 'Food Service', '900 Culinary Way, Los Angeles, CA 90001', 'orders@gourmetrestaurants.com', '+1-323-555-2010', 'Net 45', '2023-04-18', 1),
    ('CUST011', 'Regional Supermarkets', 'Retail Chain', '1500 Retail Plaza, Denver, CO 80201', 'procurement@regionalsupermarkets.com', '+1-303-555-2011', 'Net 30', '2023-07-22', 1),
    ('CUST012', 'School Nutrition Program', 'Institutional', '200 Education Blvd, Atlanta, GA 30301', 'nutrition@schoolprogram.gov', '+1-404-555-2012', 'Net 90', '2023-05-05', 1),
    ('CUST013', 'Specialty Food Stores', 'Retail Chain', '1100 Gourmet Ave, Dallas, TX 75201', 'orders@specialtyfood.com', '+1-214-555-2013', 'Net 30', '2023-08-15', 1),
    ('CUST014', 'Corporate Catering Services', 'Food Service', '600 Business Park, Phoenix, AZ 85001', 'catering@corporateservices.com', '+1-602-555-2014', 'Net 45', '2023-06-30', 1),
    ('CUST015', 'Farm to Table Markets', 'Retail Chain', '300 Local Ave, Minneapolis, MN 55401', 'supply@farmtotable.com', '+1-612-555-2015', 'Net 30', '2023-09-12', 1);

PRINT 'Customers inserted: 15'

-- Insert Source Systems (10 systems)
INSERT INTO dbo.Source_System (System_Name, System_Type, Connection_Method, Data_Format, Update_Frequency, Is_Active, Last_Sync_Date)
VALUES
    ('SAP ERP Production', 'ERP', 'API', 'JSON', 'Real-time', 1, '2024-11-10 08:00:00'),
    ('Oracle WMS', 'Warehouse Management', 'SFTP', 'XML', 'Hourly', 1, '2024-11-10 09:00:00'),
    ('QA Lab System', 'Quality Management', 'Database Link', 'SQL', 'Every 15 minutes', 1, '2024-11-10 09:30:00'),
    ('Supplier Portal', 'Procurement', 'REST API', 'JSON', 'Real-time', 1, '2024-11-10 08:30:00'),
    ('Transportation Management', 'Logistics', 'API', 'JSON', 'Every 30 minutes', 1, '2024-11-10 09:15:00'),
    ('Customer Order Portal', 'E-Commerce', 'Webhook', 'JSON', 'Real-time', 1, '2024-11-10 09:45:00'),
    ('IoT Sensor Network', 'Monitoring', 'MQTT', 'Binary', 'Every 5 minutes', 1, '2024-11-10 09:50:00'),
    ('Compliance Reporting System', 'Regulatory', 'Batch Upload', 'CSV', 'Daily', 1, '2024-11-10 06:00:00'),
    ('Third-Party Audit System', 'Audit', 'Secure FTP', 'PDF/XML', 'Weekly', 1, '2024-11-08 10:00:00'),
    ('Legacy Inventory System', 'Legacy', 'File Transfer', 'Flat File', 'Daily', 1, '2024-11-10 07:00:00');

PRINT 'Source Systems inserted: 10'

-- =============================================
-- INSERT TRANSACTIONAL DATA
-- =============================================

PRINT 'Inserting Transactional Data...'

-- Insert Supplier-Material Relationships (20 relationships)
INSERT INTO dbo.Supplier_Material (Supplier_ID, Material_ID, Lead_Time_Days, Unit_Price, Effective_From_Date, Effective_To_Date, Is_Preferred)
VALUES
    (1, 1, 3, 2.50, '2024-01-01', NULL, 1),
    (2, 1, 4, 2.45, '2024-01-01', NULL, 0),
    (3, 2, 2, 1.80, '2024-01-01', NULL, 1),
    (3, 15, 2, 8.50, '2024-01-01', NULL, 1),
    (4, 3, 7, 0.65, '2024-01-01', NULL, 1),
    (4, 11, 7, 0.85, '2024-01-01', NULL, 0),
    (5, 4, 14, 12.00, '2024-01-01', NULL, 1),
    (6, 5, 1, 5.50, '2024-01-01', NULL, 1),
    (7, 6, 2, 18.00, '2024-01-01', NULL, 1),
    (8, 7, 2, 6.20, '2024-01-01', NULL, 1),
    (9, 8, 5, 1.20, '2024-01-01', NULL, 1),
    (10, 9, 10, 15.00, '2024-01-01', NULL, 1),
    (11, 10, 5, 0.70, '2024-01-01', NULL, 1),
    (12, 11, 14, 0.90, '2024-01-01', NULL, 1),
    (13, 12, 7, 4.50, '2024-01-01', NULL, 1),
    (14, 13, 21, 22.00, '2024-01-01', NULL, 1),
    (15, 14, 10, 0.55, '2024-01-01', NULL, 1),
    (1, 8, 4, 1.25, '2024-01-01', NULL, 0),
    (6, 7, 1, 6.10, '2024-01-01', NULL, 0),
    (9, 1, 6, 2.60, '2024-01-01', NULL, 0);

PRINT 'Supplier-Material relationships inserted: 20'

-- Insert Lots (25 lots)
INSERT INTO dbo.Lot (Lot_Number, Material_ID, Supplier_ID, Production_Date, Expiry_Date, Receipt_Date, Quantity, Status, Version)
VALUES
    ('LOT-TOM-001', 1, 1, '2024-10-15', '2024-10-29', '2024-10-17', 5000.00, 'Released', 1),
    ('LOT-TOM-002', 1, 2, '2024-10-20', '2024-11-03', '2024-10-22', 3000.00, 'Released', 1),
    ('LOT-MLK-001', 2, 3, '2024-11-01', '2024-11-08', '2024-11-02', 2000.00, 'Released', 1),
    ('LOT-MLK-002', 2, 3, '2024-11-05', '2024-11-12', '2024-11-06', 2500.00, 'Released', 1),
    ('LOT-FLR-001', 3, 4, '2024-08-01', '2025-07-31', '2024-08-10', 10000.00, 'Released', 1),
    ('LOT-OIL-001', 4, 5, '2024-06-01', '2026-05-31', '2024-06-15', 1500.00, 'Released', 1),
    ('LOT-CHK-001', 5, 6, '2024-11-05', '2024-11-10', '2024-11-06', 800.00, 'Released', 1),
    ('LOT-CHK-002', 5, 6, '2024-11-08', '2024-11-13', '2024-11-09', 1000.00, 'Released', 1),
    ('LOT-SAL-001', 6, 7, '2024-11-07', '2024-11-10', '2024-11-08', 500.00, 'Released', 1),
    ('LOT-BEF-001', 7, 8, '2024-11-06', '2024-11-10', '2024-11-07', 1200.00, 'Released', 1),
    ('LOT-BAN-001', 8, 9, '2024-11-01', '2024-11-11', '2024-11-03', 3500.00, 'Released', 1),
    ('LOT-PEP-001', 9, 10, '2024-05-01', '2026-04-30', '2024-05-20', 500.00, 'Released', 1),
    ('LOT-BRD-001', 10, 11, '2024-09-01', '2025-02-28', '2024-09-10', 5000.00, 'Released', 1),
    ('LOT-RIC-001', 11, 12, '2024-07-01', '2025-07-01', '2024-07-20', 8000.00, 'Released', 1),
    ('LOT-JUI-001', 12, 13, '2024-10-01', '2024-12-30', '2024-10-10', 1000.00, 'Released', 1),
    ('LOT-COF-001', 13, 14, '2024-06-15', '2025-06-14', '2024-07-01', 2000.00, 'Released', 1),
    ('LOT-SUG-001', 14, 15, '2024-04-01', '2026-03-31', '2024-04-20', 15000.00, 'Released', 1),
    ('LOT-CHE-001', 15, 3, '2024-10-15', '2024-12-14', '2024-10-17', 600.00, 'Released', 1),
    ('LOT-TOM-003', 1, 1, '2024-11-01', '2024-11-15', '2024-11-03', 4500.00, 'Quarantine', 1),
    ('LOT-CHK-003', 5, 6, '2024-11-09', '2024-11-14', '2024-11-10', 900.00, 'Hold', 1),
    ('LOT-MLK-003', 2, 3, '2024-11-08', '2024-11-15', '2024-11-09', 2200.00, 'Released', 1),
    ('LOT-BAN-002', 8, 9, '2024-11-05', '2024-11-15', '2024-11-07', 3000.00, 'Released', 1),
    ('LOT-FLR-002', 3, 4, '2024-09-01', '2025-08-31', '2024-09-15', 12000.00, 'Released', 1),
    ('LOT-BEF-002', 7, 8, '2024-11-08', '2024-11-12', '2024-11-09', 1500.00, 'Released', 1),
    ('LOT-SAL-002', 6, 7, '2024-11-09', '2024-11-12', '2024-11-10', 600.00, 'Released', 1);

PRINT 'Lots inserted: 25'

-- Insert Quality Tests (30 tests)
INSERT INTO dbo.Quality_Test (Lot_ID, Lot_Number, Test_Type, Test_Date, Result, Pass_Flag, Tested_By, Certificate_Number, Notes)
VALUES
    (1, 'LOT-TOM-001', 'Microbiology', '2024-10-17 10:00:00', 'Negative for pathogens', 1, 'Dr. Sarah Johnson', 'CERT-2024-1001', 'All tests passed'),
    (1, 'LOT-TOM-001', 'Pesticide Residue', '2024-10-17 14:00:00', 'Below detection limit', 1, 'Lab Tech Mike Chen', 'CERT-2024-1002', 'Compliant with regulations'),
    (2, 'LOT-TOM-002', 'Microbiology', '2024-10-22 09:00:00', 'Negative for pathogens', 1, 'Dr. Sarah Johnson', 'CERT-2024-1003', 'Passed'),
    (3, 'LOT-MLK-001', 'Microbiology', '2024-11-02 08:00:00', 'Negative', 1, 'Dr. Lisa Thompson', 'CERT-2024-1004', 'Standard test passed'),
    (3, 'LOT-MLK-001', 'Fat Content', '2024-11-02 11:00:00', '3.5% fat', 1, 'Lab Tech Anna Martinez', 'CERT-2024-1005', 'Within specification'),
    (4, 'LOT-MLK-002', 'Microbiology', '2024-11-06 08:30:00', 'Negative', 1, 'Dr. Lisa Thompson', 'CERT-2024-1006', 'Passed'),
    (5, 'LOT-FLR-001', 'Protein Content', '2024-08-10 10:00:00', '12% protein', 1, 'Lab Tech Robert Brown', 'CERT-2024-1007', 'Standard grade'),
    (5, 'LOT-FLR-001', 'Moisture', '2024-08-10 14:00:00', '13% moisture', 1, 'Lab Tech Robert Brown', 'CERT-2024-1008', 'Within limits'),
    (6, 'LOT-OIL-001', 'Acidity', '2024-06-15 10:00:00', '0.3% acidity', 1, 'Dr. Maria Garcia', 'CERT-2024-1009', 'Extra virgin grade'),
    (7, 'LOT-CHK-001', 'Microbiology', '2024-11-06 09:00:00', 'Negative for Salmonella', 1, 'Dr. James Wilson', 'CERT-2024-1010', 'Safe for consumption'),
    (7, 'LOT-CHK-001', 'Temperature Check', '2024-11-06 09:30:00', '1.5°C', 1, 'QA Inspector Tom Davis', 'CERT-2024-1011', 'Cold chain maintained'),
    (8, 'LOT-CHK-002', 'Microbiology', '2024-11-09 08:00:00', 'Negative', 1, 'Dr. James Wilson', 'CERT-2024-1012', 'Passed'),
    (9, 'LOT-SAL-001', 'Microbiology', '2024-11-08 10:00:00', 'Negative', 1, 'Dr. Emily Rodriguez', 'CERT-2024-1013', 'Fresh and safe'),
    (9, 'LOT-SAL-001', 'Mercury Level', '2024-11-08 13:00:00', '0.05 ppm', 1, 'Lab Tech Kevin Lee', 'CERT-2024-1014', 'Below FDA limit'),
    (10, 'LOT-BEF-001', 'Microbiology', '2024-11-07 09:00:00', 'Negative for E. coli', 1, 'Dr. James Wilson', 'CERT-2024-1015', 'Safe'),
    (11, 'LOT-BAN-001', 'Visual Inspection', '2024-11-03 10:00:00', 'Grade A quality', 1, 'QA Inspector Patricia Moore', 'CERT-2024-1016', 'No defects'),
    (12, 'LOT-PEP-001', 'Piperine Content', '2024-05-20 11:00:00', '5.2%', 1, 'Lab Tech David Kim', 'CERT-2024-1017', 'High quality'),
    (13, 'LOT-BRD-001', 'Protein Content', '2024-09-10 10:00:00', '13% protein', 1, 'Lab Tech Robert Brown', 'CERT-2024-1018', 'Bread grade'),
    (14, 'LOT-RIC-001', 'Broken Grain %', '2024-07-20 09:00:00', '2%', 1, 'QA Inspector Jennifer White', 'CERT-2024-1019', 'Premium grade'),
    (15, 'LOT-JUI-001', 'Vitamin C', '2024-10-10 10:00:00', '45 mg/100ml', 1, 'Lab Tech Michelle Taylor', 'CERT-2024-1020', 'Good nutrition'),
    (16, 'LOT-COF-001', 'Cupping Score', '2024-07-01 14:00:00', '87 points', 1, 'Coffee Expert Carlos Santos', 'CERT-2024-1021', 'Specialty grade'),
    (17, 'LOT-SUG-001', 'Purity', '2024-04-20 10:00:00', '99.8%', 1, 'Lab Tech Amanda Brown', 'CERT-2024-1022', 'High purity'),
    (18, 'LOT-CHE-001', 'Fat Content', '2024-10-17 11:00:00', '32%', 1, 'Lab Tech Anna Martinez', 'CERT-2024-1023', 'Standard cheddar'),
    (19, 'LOT-TOM-003', 'Microbiology', '2024-11-03 10:00:00', 'Elevated coliform', 0, 'Dr. Sarah Johnson', 'CERT-2024-1024', 'Failed - requires retest'),
    (20, 'LOT-CHK-003', 'Microbiology', '2024-11-10 09:00:00', 'Pending retest', 0, 'Dr. James Wilson', NULL, 'Hold for additional testing'),
    (21, 'LOT-MLK-003', 'Microbiology', '2024-11-09 08:00:00', 'Negative', 1, 'Dr. Lisa Thompson', 'CERT-2024-1025', 'Passed'),
    (22, 'LOT-BAN-002', 'Visual Inspection', '2024-11-07 10:00:00', 'Grade A', 1, 'QA Inspector Patricia Moore', 'CERT-2024-1026', 'Excellent quality'),
    (23, 'LOT-FLR-002', 'Protein Content', '2024-09-15 10:00:00', '12.5%', 1, 'Lab Tech Robert Brown', 'CERT-2024-1027', 'Standard'),
    (24, 'LOT-BEF-002', 'Microbiology', '2024-11-09 09:00:00', 'Negative', 1, 'Dr. James Wilson', 'CERT-2024-1028', 'Safe'),
    (25, 'LOT-SAL-002', 'Microbiology', '2024-11-10 10:00:00', 'Negative', 1, 'Dr. Emily Rodriguez', 'CERT-2024-1029', 'Fresh');

PRINT 'Quality Tests inserted: 30'

-- Insert Inventory (30 records)
INSERT INTO dbo.Inventory (Lot_ID, Warehouse_ID, Location_In_Warehouse, Quantity_On_Hand, Reserved_Quantity, Status, Last_Movement_Date)
VALUES
    (1, 1, 'A-101', 2000.00, 500.00, 'Available', '2024-10-17 15:00:00'),
    (1, 3, 'B-205', 3000.00, 1000.00, 'Available', '2024-10-18 10:00:00'),
    (2, 2, 'C-310', 3000.00, 800.00, 'Available', '2024-10-22 14:00:00'),
    (3, 1, 'CHILL-A1', 1000.00, 200.00, 'Available', '2024-11-02 16:00:00'),
    (3, 6, 'CHILL-B3', 1000.00, 300.00, 'Available', '2024-11-03 09:00:00'),
    (4, 1, 'CHILL-A2', 1500.00, 400.00, 'Available', '2024-11-06 15:00:00'),
    (4, 6, 'CHILL-B4', 1000.00, 250.00, 'Available', '2024-11-07 10:00:00'),
    (5, 7, 'DRY-101', 5000.00, 0.00, 'Available', '2024-08-10 12:00:00'),
    (5, 9, 'DRY-205', 5000.00, 1000.00, 'Available', '2024-08-11 14:00:00'),
    (6, 3, 'AMB-150', 800.00, 0.00, 'Available', '2024-06-15 16:00:00'),
    (6, 5, 'AMB-220', 700.00, 150.00, 'Available', '2024-06-16 11:00:00'),
    (7, 2, 'CHILL-C1', 400.00, 100.00, 'Available', '2024-11-06 17:00:00'),
    (7, 4, 'CHILL-D2', 400.00, 150.00, 'Available', '2024-11-07 09:00:00'),
    (8, 2, 'CHILL-C2', 600.00, 200.00, 'Available', '2024-11-09 16:00:00'),
    (8, 12, 'CHILL-E1', 400.00, 100.00, 'Available', '2024-11-09 18:00:00'),
    (9, 4, 'FROZ-A1', 500.00, 150.00, 'Available', '2024-11-08 17:00:00'),
    (10, 2, 'CHILL-C3', 700.00, 200.00, 'Available', '2024-11-07 16:00:00'),
    (10, 12, 'CHILL-E2', 500.00, 150.00, 'Available', '2024-11-08 10:00:00'),
    (11, 5, 'AMB-225', 2000.00, 500.00, 'Available', '2024-11-03 15:00:00'),
    (11, 8, 'AMB-310', 1500.00, 300.00, 'Available', '2024-11-04 11:00:00'),
    (12, 10, 'DRY-120', 500.00, 0.00, 'Available', '2024-05-20 14:00:00'),
    (13, 7, 'DRY-105', 2500.00, 500.00, 'Available', '2024-09-10 15:00:00'),
    (13, 11, 'DRY-210', 2500.00, 600.00, 'Available', '2024-09-11 10:00:00'),
    (14, 9, 'DRY-208', 4000.00, 1000.00, 'Available', '2024-07-20 16:00:00'),
    (14, 11, 'DRY-215', 4000.00, 800.00, 'Available', '2024-07-21 12:00:00'),
    (15, 12, 'FROZ-E3', 1000.00, 200.00, 'Available', '2024-10-10 17:00:00'),
    (16, 3, 'AMB-155', 1000.00, 250.00, 'Available', '2024-07-01 18:00:00'),
    (16, 11, 'AMB-320', 1000.00, 200.00, 'Available', '2024-07-02 10:00:00'),
    (17, 7, 'DRY-110', 7500.00, 2000.00, 'Available', '2024-04-20 15:00:00'),
    (17, 10, 'DRY-125', 7500.00, 1500.00, 'Available', '2024-04-21 11:00:00');

PRINT 'Inventory records inserted: 30'

-- Insert Production (12 batches)
INSERT INTO dbo.Production (Batch_Number, Lot_ID, Process_Type, Start_Date, End_Date, Yield_Percentage, Waste_Amount, Operator, Status)
VALUES
    ('PROD-001', 5, 'Milling', '2024-08-12 08:00:00', '2024-08-12 16:00:00', 98.5, 150.00, 'John Miller', 'Completed'),
    ('PROD-002', 3, 'Pasteurization', '2024-11-02 09:00:00', '2024-11-02 11:00:00', 99.8, 4.00, 'Sarah Dairy', 'Completed'),
    ('PROD-003', 7, 'Portioning', '2024-11-06 10:00:00', '2024-11-06 14:00:00', 97.0, 24.00, 'Mike Butcher', 'Completed'),
    ('PROD-004', 9, 'Filleting', '2024-11-08 11:00:00', '2024-11-08 15:00:00', 85.0, 75.00, 'Emily Fisher', 'Completed'),
    ('PROD-005', 10, 'Grinding', '2024-11-07 09:00:00', '2024-11-07 12:00:00', 96.5, 42.00, 'Mike Butcher', 'Completed'),
    ('PROD-006', 13, 'Sifting', '2024-09-12 08:00:00', '2024-09-12 16:00:00', 99.0, 50.00, 'John Miller', 'Completed'),
    ('PROD-007', 16, 'Roasting', '2024-07-02 10:00:00', '2024-07-02 18:00:00', 94.0, 120.00, 'Carlos Roaster', 'Completed'),
    ('PROD-008', 14, 'Sorting', '2024-07-22 08:00:00', '2024-07-22 12:00:00', 99.5, 40.00, 'Jennifer Sorter', 'Completed'),
    ('PROD-009', 17, 'Refining', '2024-04-22 09:00:00', '2024-04-23 17:00:00', 97.5, 375.00, 'Amanda Refiner', 'Completed'),
    ('PROD-010', 18, 'Aging', '2024-10-18 08:00:00', '2024-11-01 16:00:00', 98.0, 12.00, 'Anna Cheesemaker', 'Completed'),
    ('PROD-011', 23, 'Milling', '2024-09-16 08:00:00', '2024-09-16 16:00:00', 98.2, 216.00, 'John Miller', 'Completed'),
    ('PROD-012', 24, 'Portioning', '2024-11-09 10:00:00', '2024-11-09 14:00:00', 97.5, 37.50, 'Mike Butcher', 'Completed');

PRINT 'Production batches inserted: 12'

-- Insert Orders (15 orders)
INSERT INTO dbo.Orders (Order_Number, Customer_ID, Warehouse_ID, Order_Date, Required_Date, Order_Total, Payment_Method, Order_Status)
VALUES
    ('ORD-2024-001', 1, 1, '2024-10-20', '2024-10-25', 15750.00, 'Net 30', 'Shipped'),
    ('ORD-2024-002', 2, 6, '2024-10-22', '2024-10-27', 28500.00, 'Net 45', 'Shipped'),
    ('ORD-2024-003', 3, 3, '2024-10-25', '2024-10-30', 22400.00, 'Net 30', 'Shipped'),
    ('ORD-2024-004', 4, 2, '2024-11-01', '2024-11-06', 18900.00, 'Net 30', 'Shipped'),
    ('ORD-2024-005', 5, 4, '2024-11-02', '2024-11-07', 31200.00, 'Net 60', 'Shipped'),
    ('ORD-2024-006', 6, 11, '2024-11-03', '2024-11-08', 26750.00, 'Net 30', 'Shipped'),
    ('ORD-2024-007', 7, 1, '2024-11-04', '2024-11-09', 19850.00, 'Net 45', 'Shipped'),
    ('ORD-2024-008', 8, 11, '2024-11-05', '2024-11-10', 24300.00, 'Net 30', 'Processing'),
    ('ORD-2024-009', 9, 5, '2024-11-06', '2024-11-11', 17650.00, 'Net 60', 'Processing'),
    ('ORD-2024-010', 10, 3, '2024-11-07', '2024-11-12', 29400.00, 'Net 45', 'Processing'),
    ('ORD-2024-011', 11, 8, '2024-11-08', '2024-11-13', 21800.00, 'Net 30', 'Pending'),
    ('ORD-2024-012', 12, 9, '2024-11-08', '2024-11-18', 33500.00, 'Net 90', 'Pending'),
    ('ORD-2024-013', 13, 7, '2024-11-09', '2024-11-14', 19200.00, 'Net 30', 'Pending'),
    ('ORD-2024-014', 14, 10, '2024-11-09', '2024-11-14', 16750.00, 'Net 45', 'Pending'),
    ('ORD-2024-015', 15, 12, '2024-11-10', '2024-11-15', 25600.00, 'Net 30', 'Pending');

PRINT 'Orders inserted: 15'

-- Insert Order Details (35 line items)
INSERT INTO dbo.Order_Details (Order_ID, Lot_ID, Quantity_Ordered, Unit_Price, Line_Total, Discount_Applied, Tax_Amount)
VALUES
    (1, 1, 500.00, 3.50, 1750.00, 0, 140.00),
    (1, 3, 200.00, 2.80, 560.00, 0, 44.80),
    (1, 5, 1000.00, 1.20, 1200.00, 5, 90.00),
    (2, 7, 100.00, 8.50, 850.00, 0, 68.00),
    (2, 8, 150.00, 8.50, 1275.00, 0, 102.00),
    (2, 10, 200.00, 9.20, 1840.00, 0, 147.20),
    (3, 2, 800.00, 3.60, 2880.00, 0, 230.40),
    (3, 6, 150.00, 15.00, 2250.00, 0, 180.00),
    (3, 11, 500.00, 1.80, 900.00, 5, 67.50),
    (4, 4, 300.00, 2.90, 870.00, 0, 69.60),
    (4, 7, 100.00, 8.50, 850.00, 0, 68.00),
    (4, 14, 1000.00, 1.50, 1500.00, 0, 120.00),
    (5, 8, 100.00, 8.50, 850.00, 0, 68.00),
    (5, 9, 150.00, 22.00, 3300.00, 0, 264.00),
    (5, 12, 100.00, 18.00, 1800.00, 0, 144.00),
    (6, 13, 500.00, 1.40, 700.00, 0, 56.00),
    (6, 14, 800.00, 1.55, 1240.00, 5, 93.00),
    (6, 16, 250.00, 28.00, 7000.00, 0, 560.00),
    (7, 1, 500.00, 3.50, 1750.00, 0, 140.00),
    (7, 4, 400.00, 2.90, 1160.00, 0, 92.80),
    (7, 11, 300.00, 1.80, 540.00, 0, 43.20),
    (8, 13, 600.00, 1.40, 840.00, 0, 67.20),
    (8, 16, 200.00, 28.00, 5600.00, 0, 448.00),
    (8, 17, 2000.00, 0.95, 1900.00, 5, 142.50),
    (9, 6, 150.00, 15.00, 2250.00, 0, 180.00),
    (9, 18, 250.00, 12.00, 3000.00, 0, 240.00),
    (10, 5, 1000.00, 1.20, 1200.00, 0, 96.00),
    (10, 14, 1000.00, 1.55, 1550.00, 0, 124.00),
    (10, 17, 1500.00, 0.95, 1425.00, 5, 106.88),
    (11, 11, 500.00, 1.80, 900.00, 0, 72.00),
    (11, 13, 500.00, 1.40, 700.00, 0, 56.00),
    (12, 5, 1000.00, 1.20, 1200.00, 0, 96.00),
    (12, 14, 1000.00, 1.55, 1550.00, 0, 124.00),
    (13, 16, 250.00, 28.00, 7000.00, 0, 560.00),
    (14, 10, 150.00, 9.20, 1380.00, 0, 110.40);

PRINT 'Order Details inserted: 35'

-- Insert Shipments (12 shipments)
INSERT INTO dbo.Shipment (Shipment_Number, Warehouse_ID, Customer_ID, Carrier, Estimated_Departure_Date, Actual_Departure_Date, Tracking_Number, Status, Temperature_Log)
VALUES
    ('SHIP-2024-001', 1, 1, 'FedEx Cold Chain', '2024-10-25 08:00:00', '2024-10-25 09:30:00', 'FDX-2024-1001', 'Delivered', '{"avg_temp": 3.2, "min": 2.1, "max": 4.5}'),
    ('SHIP-2024-002', 6, 2, 'DHL Express', '2024-10-27 10:00:00', '2024-10-27 11:15:00', 'DHL-2024-2002', 'Delivered', '{"avg_temp": 2.8, "min": 1.5, "max": 4.0}'),
    ('SHIP-2024-003', 3, 3, 'UPS Freight', '2024-10-30 07:00:00', '2024-10-30 08:20:00', 'UPS-2024-3003', 'Delivered', '{"avg_temp": 14.5, "min": 13.0, "max": 16.0}'),
    ('SHIP-2024-004', 2, 4, 'FedEx Cold Chain', '2024-11-06 08:00:00', '2024-11-06 09:45:00', 'FDX-2024-4004', 'Delivered', '{"avg_temp": 3.0, "min": 2.0, "max": 4.2}'),
    ('SHIP-2024-005', 4, 5, 'Specialized Logistics', '2024-11-07 09:00:00', '2024-11-07 10:30:00', 'SPC-2024-5005', 'Delivered', '{"avg_temp": -16.5, "min": -17.8, "max": -15.2}'),
    ('SHIP-2024-006', 11, 6, 'Regional Transport', '2024-11-08 07:30:00', '2024-11-08 08:50:00', 'REG-2024-6006', 'Delivered', '{"avg_temp": 18.0, "min": 16.5, "max": 19.5}'),
    ('SHIP-2024-007', 1, 7, 'Campus Delivery Service', '2024-11-09 11:00:00', '2024-11-09 12:15:00', 'CDS-2024-7007', 'In Transit', '{"current_temp": 3.5}'),
    ('SHIP-2024-008', 11, 8, 'Organic Freight Co', '2024-11-10 08:00:00', NULL, 'OFC-2024-8008', 'Preparing', NULL),
    ('SHIP-2024-009', 5, 9, 'Healthcare Logistics', '2024-11-11 10:00:00', NULL, 'HCL-2024-9009', 'Preparing', NULL),
    ('SHIP-2024-010', 3, 10, 'Gourmet Express', '2024-11-12 09:00:00', NULL, 'GEX-2024-1010', 'Preparing', NULL),
    ('SHIP-2024-011', 8, 11, 'Mountain Carriers', '2024-11-13 08:30:00', NULL, 'MTC-2024-1011', 'Scheduled', NULL),
    ('SHIP-2024-012', 9, 12, 'School Transport Service', '2024-11-18 07:00:00', NULL, 'STS-2024-1012', 'Scheduled', NULL);

PRINT 'Shipments inserted: 12'

-- Insert Shipment Lots (25 line items)
INSERT INTO dbo.Shipment_Lot (Shipment_ID, Lot_ID, Quantity_Shipped, Line_Price, Temperature_Log)
VALUES
    (1, 1, 500.00, 1750.00, '{"maintained": true}'),
    (1, 3, 200.00, 560.00, '{"maintained": true}'),
    (1, 5, 1000.00, 1200.00, '{"maintained": true}'),
    (2, 7, 100.00, 850.00, '{"maintained": true}'),
    (2, 8, 150.00, 1275.00, '{"maintained": true}'),
    (2, 10, 200.00, 1840.00, '{"maintained": true}'),
    (3, 2, 800.00, 2880.00, '{"maintained": true}'),
    (3, 6, 150.00, 2250.00, '{"maintained": true}'),
    (3, 11, 500.00, 900.00, '{"maintained": true}'),
    (4, 4, 300.00, 870.00, '{"maintained": true}'),
    (4, 7, 100.00, 850.00, '{"maintained": true}'),
    (4, 14, 1000.00, 1500.00, '{"maintained": true}'),
    (5, 8, 100.00, 850.00, '{"maintained": true, "frozen_transport": true}'),
    (5, 9, 150.00, 3300.00, '{"maintained": true, "frozen_transport": true}'),
    (5, 12, 100.00, 1800.00, '{"maintained": true}'),
    (6, 13, 500.00, 700.00, '{"maintained": true}'),
    (6, 14, 800.00, 1240.00, '{"maintained": true}'),
    (6, 16, 250.00, 7000.00, '{"maintained": true}'),
    (7, 1, 500.00, 1750.00, '{"current_status": "good"}'),
    (7, 4, 400.00, 1160.00, '{"current_status": "good"}'),
    (7, 11, 300.00, 540.00, '{"current_status": "good"}'),
    (8, 13, 600.00, 840.00, NULL),
    (8, 16, 200.00, 5600.00, NULL),
    (9, 6, 150.00, 2250.00, NULL),
    (9, 18, 250.00, 3000.00, NULL);

PRINT 'Shipment Lots inserted: 25'

-- Insert Genealogy (10 transformations)
INSERT INTO dbo.Genealogy (Parent_Lot_ID, Child_Lot_ID, Quantity_Used, Yield_Percentage, Waste_Amount, Transformation_Date, Notes)
VALUES
    (5, 13, 4000.00, 98.5, 60.00, '2024-09-10 16:00:00', 'Milled into bread flour'),
    (3, 4, 1000.00, 99.8, 2.00, '2024-11-06 11:00:00', 'Batch pasteurization'),
    (7, 8, 400.00, 97.0, 12.00, '2024-11-09 14:00:00', 'Portioned for retail'),
    (9, 25, 300.00, 85.0, 45.00, '2024-11-10 15:00:00', 'Filleted fresh salmon'),
    (10, 24, 600.00, 96.5, 21.00, '2024-11-09 12:00:00', 'Ground beef production'),
    (13, 23, 3000.00, 99.0, 30.00, '2024-09-16 16:00:00', 'Further milling and sifting'),
    (16, 7, 500.00, 94.0, 30.00, '2024-07-02 18:00:00', 'Coffee roasting process'),
    (14, 11, 2000.00, 99.5, 10.00, '2024-07-22 12:00:00', 'Rice sorting and cleaning'),
    (17, 15, 5000.00, 97.5, 125.00, '2024-10-10 17:00:00', 'Sugar refining'),
    (1, 2, 2000.00, 95.0, 100.00, '2024-10-22 14:00:00', 'Tomato processing');

PRINT 'Genealogy records inserted: 10'

-- Insert Recalls (3 recall events)
INSERT INTO dbo.Recall (Recall_Number, Recall_Date, Reason, Severity, Status, Initiated_By, Regulatory_Body, Resolution_Date, Notes)
VALUES
    ('RCL-2024-001', '2024-09-15', 'Potential Salmonella contamination in poultry products', 'High', 'Closed', 'Quality Assurance Manager', 'FDA', '2024-10-01', 'All affected products recalled and destroyed'),
    ('RCL-2024-002', '2024-10-28', 'Undeclared allergen (milk) in product labeling', 'Medium', 'Active', 'Compliance Director', 'FDA', NULL, 'Customer notifications sent, products being returned'),
    ('RCL-2024-003', '2024-11-05', 'Foreign material found in rice shipment', 'Low', 'Active', 'Plant Manager', 'Internal', NULL, 'Investigation ongoing, affected lots quarantined');

PRINT 'Recalls inserted: 3'

-- Insert Recall Lots (5 associations)
INSERT INTO dbo.Recall_Lots (Recall_ID, Lot_ID, Quantity_Recalled, Affected_Customers_Notes)
VALUES
    (1, 7, 800.00, 'Customers: Restaurant Group USA, Hospitality Services LLC. All products retrieved.'),
    (2, 18, 600.00, 'Customer: Organic Market Network. Recall notice posted, returns in progress.'),
    (2, 3, 2000.00, 'Customers: Whole Foods Market, Fresh Market Co. Products being returned from stores.'),
    (3, 14, 8000.00, 'Customers: Regional Supermarkets, School Nutrition Program. Lots quarantined at warehouse.'),
    (3, 11, 3500.00, 'Customer: Farm to Table Markets. Products held at distribution center.');

PRINT 'Recall Lots inserted: 5'

-- Insert Audit Log (20 records)
INSERT INTO dbo.Audit_Log (Table_Name, Record_ID, Action, Old_Value, New_Value, Changed_By, Timestamp)
VALUES
    ('Lot', 19, 'UPDATE', '{"status": "Received"}', '{"status": "Quarantine"}', 'QA Manager Sarah Johnson', '2024-11-03 14:30:00'),
    ('Lot', 20, 'UPDATE', '{"status": "Received"}', '{"status": "Hold"}', 'QA Manager James Wilson', '2024-11-10 10:15:00'),
    ('Inventory', 1, 'UPDATE', '{"reserved_quantity": 0}', '{"reserved_quantity": 500}', 'System - Order Processing', '2024-10-20 14:00:00'),
    ('Inventory', 2, 'UPDATE', '{"reserved_quantity": 0}', '{"reserved_quantity": 1000}', 'System - Order Processing', '2024-10-22 15:00:00'),
    ('Orders', 1, 'UPDATE', '{"order_status": "Pending"}', '{"order_status": "Processing"}', 'Order Processor Mike Davis', '2024-10-21 09:00:00'),
    ('Orders', 1, 'UPDATE', '{"order_status": "Processing"}', '{"order_status": "Shipped"}', 'Warehouse Manager John Anderson', '2024-10-25 08:00:00'),
    ('Shipment', 1, 'UPDATE', '{"status": "Preparing"}', '{"status": "In Transit"}', 'Shipping Coordinator Lisa Brown', '2024-10-25 09:30:00'),
    ('Shipment', 1, 'UPDATE', '{"status": "In Transit"}', '{"status": "Delivered"}', 'System - Carrier Update', '2024-10-26 15:45:00'),
    ('Quality_Test', 24, 'INSERT', NULL, '{"test_type": "Microbiology", "pass_flag": false}', 'Lab Technician Sarah Johnson', '2024-11-03 12:00:00'),
    ('Recall', 1, 'INSERT', NULL, '{"recall_number": "RCL-2024-001", "severity": "High"}', 'QA Manager Sarah Johnson', '2024-09-15 10:00:00'),
    ('Recall', 1, 'UPDATE', '{"status": "Active"}', '{"status": "Closed"}', 'Compliance Director Robert White', '2024-10-01 16:00:00'),
    ('Supplier', 4, 'UPDATE', '{"rating": 4.0}', '{"rating": 3.9}', 'Procurement Manager Amanda Lee', '2024-10-15 11:30:00'),
    ('Material', 1, 'UPDATE', '{"shelf_life_days": 10}', '{"shelf_life_days": 14}', 'Product Manager Tom Chen', '2024-09-20 14:00:00'),
    ('Customer', 1, 'UPDATE', '{"credit_terms": "Net 15"}', '{"credit_terms": "Net 30"}', 'Credit Manager Patricia Moore', '2024-08-10 10:00:00'),
    ('Warehouse', 1, 'UPDATE', '{"manager": "Previous Manager"}', '{"manager": "John Anderson"}', 'HR System', '2024-07-01 08:00:00'),
    ('Production', 1, 'INSERT', NULL, '{"batch_number": "PROD-001", "process_type": "Milling"}', 'Production Supervisor John Miller', '2024-08-12 08:00:00'),
    ('Production', 1, 'UPDATE', '{"status": "In Progress"}', '{"status": "Completed"}', 'Production Supervisor John Miller', '2024-08-12 16:00:00'),
    ('Inventory', 5, 'UPDATE', '{"quantity_on_hand": 1200}', '{"quantity_on_hand": 1000}', 'System - Inventory Adjustment', '2024-11-03 10:00:00'),
    ('Supplier_Material', 1, 'UPDATE', '{"unit_price": 2.40}', '{"unit_price": 2.50}', 'Procurement Manager Amanda Lee', '2024-01-01 09:00:00'),
    ('Order_Details', 1, 'INSERT', NULL, '{"quantity_ordered": 500, "unit_price": 3.50}', 'System - Order Processing', '2024-10-20 14:00:00');

PRINT 'Audit Log records inserted: 20'

-- Insert Data Quality Issues (10 records)
INSERT INTO dbo.Data_Quality (System_ID, Issue_Type, Table_Name, Record_ID, Issue_Description, Severity, Status, Remediation_Date)
VALUES
    (4, 'Missing Data', 'Supplier', 10, 'Contact phone number missing for supplier', 'Low', 'Open', NULL),
    (2, 'Data Inconsistency', 'Inventory', 15, 'Reserved quantity exceeds on-hand quantity temporarily', 'Medium', 'Resolved', '2024-11-08'),
    (1, 'Duplicate Record', 'Lot', 19, 'Potential duplicate lot number detected', 'High', 'Resolved', '2024-11-04'),
    (5, 'Invalid Format', 'Shipment', 11, 'Tracking number format does not match carrier standard', 'Low', 'Open', NULL),
    (3, 'Threshold Violation', 'Quality_Test', 24, 'Test result failed quality threshold', 'High', 'Open', NULL),
    (6, 'Missing Reference', 'Order_Details', 30, 'Order reference missing in external system', 'Medium', 'Resolved', '2024-11-09'),
    (7, 'Temperature Anomaly', 'Inventory', 16, 'Temperature reading out of acceptable range', 'High', 'Resolved', '2024-11-08'),
    (8, 'Compliance Issue', 'Lot', 20, 'Expiry date approaching without quality retest', 'Medium', 'Open', NULL),
    (2, 'Location Mismatch', 'Inventory', 20, 'Physical count does not match system quantity', 'High', 'Resolved', '2024-11-07'),
    (4, 'Late Delivery', 'Supplier', 4, 'Supplier consistently missing lead time commitments', 'Medium', 'Open', NULL);

