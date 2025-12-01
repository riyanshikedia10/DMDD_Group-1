// import React, { useState, useEffect } from 'react';
// import { AlertCircle, Package, Truck, Users, Warehouse, FileText, Database, Plus, Edit, Trash2, Search, X, Check, AlertTriangle, Beaker, GitBranch, RefreshCw, Loader, LogOut, User, Shield, Eye, ShoppingCart, ArrowLeft, MapPin } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:5000/api';

// const DEMO_USERS = [
//     { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'System Administrator' },
//     { id: 2, username: 'manager', password: 'manager123', role: 'admin', name: 'Operations Manager' },
//     { id: 3, username: 'wholefoods', password: 'customer123', role: 'customer', name: 'Whole Foods Market', customerId: 1 },
//     { id: 4, username: 'restaurant', password: 'customer123', role: 'customer', name: 'Restaurant Group USA', customerId: 2 },
//     { id: 5, username: 'freshmarket', password: 'customer123', role: 'customer', name: 'Fresh Market Co', customerId: 3 },
// ];

// const LoginPage = ({ onLogin }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleLogin = () => {
//         if (!username || !password) { setError('Please enter both username and password'); return; }
//         setIsLoading(true);
//         setError('');
//         setTimeout(() => {
//             const user = DEMO_USERS.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
//             if (user) { onLogin(user); } else { setError('Invalid username or password'); }
//             setIsLoading(false);
//         }, 500);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
//                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"><Database className="w-8 h-8 text-blue-600" /></div>
//                     <h1 className="text-2xl font-bold text-white">Food Supply Chain</h1>
//                     <p className="text-blue-100 text-sm mt-1">Traceability System - DMDD Group 1</p>
//                 </div>
//                 <div className="p-8">
//                     <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Sign In</h2>
//                     {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5" />{error}</div>}
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                             <div className="relative">
//                                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter username" />
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                             <div className="relative">
//                                 <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter password" />
//                             </div>
//                         </div>
//                         <button onClick={handleLogin} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
//                             {isLoading && <Loader className="w-5 h-5 animate-spin" />}{isLoading ? 'Signing in...' : 'Sign In'}
//                         </button>
//                     </div>
//                     <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//                         <p className="text-xs text-gray-500 font-medium mb-2">Demo Credentials:</p>
//                         <div className="grid grid-cols-2 gap-2 text-xs">
//                             <div className="bg-blue-50 p-2 rounded"><p className="font-semibold text-blue-800">Admin:</p><p className="text-blue-600">admin / admin123</p></div>
//                             <div className="bg-green-50 p-2 rounded"><p className="font-semibold text-green-800">Customer:</p><p className="text-green-600">wholefoods / customer123</p></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const CustomerPortal = ({ user, onLogout }) => {
//     const [activeSection, setActiveSection] = useState('dashboard');
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [trackingNumber, setTrackingNumber] = useState('');
//     const [trackedOrder, setTrackedOrder] = useState(null);

//     useEffect(() => { fetchCustomerData(); }, []);

//     const fetchCustomerData = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch(`${API_BASE_URL}/orders`);
//             const data = await res.json();
//             // Filter orders for this specific customer only
//             const customerOrders = Array.isArray(data) ? data.filter(o => o.customer === user.name) : [];
//             setOrders(customerOrders);
//         } catch (err) { console.error(err); setOrders([]); }
//         finally { setLoading(false); }
//     };

//     const handleTrackOrder = () => {
//         const found = orders.find(o => o.orderNumber?.toLowerCase().includes(trackingNumber.toLowerCase()));
//         setTrackedOrder(found || null);
//     };

//     const getStatusColor = (s) => ({ Shipped: 'bg-blue-100 text-blue-800', Delivered: 'bg-emerald-100 text-emerald-800', Processing: 'bg-yellow-100 text-yellow-800', Pending: 'bg-orange-100 text-orange-800' }[s] || 'bg-gray-100 text-gray-800');
//     const getProgress = (status) => ({ Pending: 10, Processing: 35, Shipped: 65, Delivered: 100 }[status] || 0);

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <header className="bg-gradient-to-r from-green-600 to-teal-600 shadow-lg">
//                 <div className="px-6 py-4 flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center"><ShoppingCart className="w-5 h-5 text-green-600" /></div>
//                         <div><h1 className="text-xl font-bold text-white">Customer Portal</h1><p className="text-green-100 text-sm">Food Supply Chain Traceability</p></div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <div className="text-right"><p className="text-white font-medium">{user.name}</p><p className="text-green-100 text-sm">Customer Account</p></div>
//                         <button onClick={onLogout} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2"><LogOut className="w-4 h-4" />Logout</button>
//                     </div>
//                 </div>
//                 <nav className="px-6 flex gap-1">
//                     {['dashboard', 'orders', 'tracking'].map(s => (
//                         <button key={s} onClick={() => setActiveSection(s)} className={`px-4 py-3 text-sm font-medium rounded-t-lg ${activeSection === s ? 'bg-white text-green-600' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
//                             {s === 'dashboard' ? 'Dashboard' : s === 'orders' ? 'My Orders' : 'Track Shipments'}
//                         </button>
//                     ))}
//                 </nav>
//             </header>
//             <main className="p-6">
//                 {loading && <div className="flex justify-center py-8"><Loader className="w-8 h-8 text-green-600 animate-spin" /></div>}

//                 {!loading && activeSection === 'dashboard' && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {user.name}</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                             <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Total Orders</p><p className="text-3xl font-bold">{orders.length}</p></div><FileText className="w-12 h-12 text-blue-500" /></div></div>
//                             <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">In Transit</p><p className="text-3xl font-bold">{orders.filter(o => o.status === 'Shipped').length}</p></div><Truck className="w-12 h-12 text-yellow-500" /></div></div>
//                             <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Delivered</p><p className="text-3xl font-bold">{orders.filter(o => o.status === 'Delivered').length}</p></div><Check className="w-12 h-12 text-green-500" /></div></div>
//                         </div>
//                         <div className="bg-white rounded-xl shadow-sm p-6">
//                             <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
//                             {orders.length === 0 ? <p className="text-gray-500">No orders found</p> : (
//                                 <div className="space-y-3">
//                                     {orders.slice(0, 5).map((o, i) => (
//                                         <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                                             <div><p className="font-medium">{o.orderNumber}</p><p className="text-sm text-gray-500">{o.date}</p></div>
//                                             <div className="text-right"><p className="font-medium">${Number(o.total || 0).toLocaleString()}</p><span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(o.status)}`}>{o.status}</span></div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {!loading && activeSection === 'orders' && (
//                     <div>
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-2xl font-bold">My Orders</h2>
//                             <button onClick={fetchCustomerData} className="text-green-600 flex items-center gap-2"><RefreshCw className="w-4 h-4" />Refresh</button>
//                         </div>
//                         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//                             {orders.length === 0 ? <p className="p-8 text-center text-gray-500">No orders found</p> : (
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                     <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
//                                     <tbody className="divide-y divide-gray-200">
//                                         {orders.map((o, i) => (
//                                             <tr key={i} className="hover:bg-gray-50">
//                                                 <td className="px-6 py-4 text-sm font-medium">{o.orderNumber}</td>
//                                                 <td className="px-6 py-4 text-sm text-gray-500">{o.date}</td>
//                                                 <td className="px-6 py-4 text-sm text-gray-500">{o.warehouse}</td>
//                                                 <td className="px-6 py-4 text-sm">${Number(o.total || 0).toLocaleString()}</td>
//                                                 <td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(o.status)}`}>{o.status}</span></td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {!loading && activeSection === 'tracking' && (
//                     <div>
//                         <h2 className="text-2xl font-bold mb-6">Track Shipments</h2>
//                         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//                             <div className="flex gap-4 mb-6">
//                                 <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()} placeholder="Enter Order Number (e.g., ORD-2024-001)" className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500" />
//                                 <button onClick={handleTrackOrder} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"><Search className="w-4 h-4" />Track</button>
//                             </div>

//                             {trackedOrder && (
//                                 <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
//                                     <div className="flex items-center justify-between mb-4">
//                                         <div>
//                                             <p className="text-lg font-bold text-gray-900">{trackedOrder.orderNumber}</p>
//                                             <p className="text-sm text-gray-600">From: {trackedOrder.warehouse}</p>
//                                             <p className="text-sm text-gray-600">Customer: {trackedOrder.customer}</p>
//                                         </div>
//                                         <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(trackedOrder.status)}`}>{trackedOrder.status}</span>
//                                     </div>
//                                     <div className="mb-2">
//                                         <div className="flex justify-between text-sm text-gray-600 mb-1">
//                                             <span>Progress</span>
//                                             <span>{getProgress(trackedOrder.status)}%</span>
//                                         </div>
//                                         <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//                                             <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${getProgress(trackedOrder.status)}%` }}></div>
//                                         </div>
//                                     </div>
//                                     <div className="flex justify-between mt-4 text-xs text-gray-500">
//                                         <div className="text-center"><div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getProgress(trackedOrder.status) >= 10 ? 'bg-green-500' : 'bg-gray-300'}`}></div>Pending</div>
//                                         <div className="text-center"><div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getProgress(trackedOrder.status) >= 35 ? 'bg-green-500' : 'bg-gray-300'}`}></div>Processing</div>
//                                         <div className="text-center"><div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getProgress(trackedOrder.status) >= 65 ? 'bg-green-500' : 'bg-gray-300'}`}></div>Shipped</div>
//                                         <div className="text-center"><div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getProgress(trackedOrder.status) >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}></div>Delivered</div>
//                                     </div>
//                                 </div>
//                             )}
//                             {trackingNumber && !trackedOrder && <p className="text-center text-gray-500 py-4">No order found with that number</p>}
//                         </div>

//                         <div className="bg-white rounded-xl shadow-sm p-6">
//                             <h3 className="font-semibold mb-4">Active Shipments</h3>
//                             {orders.filter(o => o.status === 'Shipped' || o.status === 'Processing').length === 0 ? (
//                                 <p className="text-gray-500 text-center py-4">No active shipments</p>
//                             ) : (
//                                 <div className="space-y-4">
//                                     {orders.filter(o => o.status === 'Shipped' || o.status === 'Processing').map((o, i) => (
//                                         <div key={i} className="border rounded-lg p-4">
//                                             <div className="flex items-center justify-between mb-3">
//                                                 <div><p className="font-medium">{o.orderNumber}</p><p className="text-sm text-gray-500">From: {o.warehouse}</p></div>
//                                                 <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(o.status)}`}>{o.status}</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: `${getProgress(o.status)}%` }}></div></div>
//                                                 <span className="text-sm text-gray-600">{getProgress(o.status)}%</span>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// const AdminDashboard = ({ user, onLogout }) => {
//     const [activeTab, setActiveTab] = useState('dashboard');
//     const [activeModule, setActiveModule] = useState('lots');
//     const [showModal, setShowModal] = useState(false);
//     const [modalMode, setModalMode] = useState('create');
//     const [selectedRecord, setSelectedRecord] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [notification, setNotification] = useState(null);
//     const [formData, setFormData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [activeReport, setActiveReport] = useState(null);
//     const [reportData, setReportData] = useState([]);
//     const [traceInput, setTraceInput] = useState('');

//     const [lots, setLots] = useState([]);
//     const [suppliers, setSuppliers] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [inventory, setInventory] = useState([]);
//     const [qualityTests, setQualityTests] = useState([]);
//     const [recalls, setRecalls] = useState([]);
//     const [warehouses, setWarehouses] = useState([]);
//     const [customers, setCustomers] = useState([]);
//     const [materials, setMaterials] = useState([]);

//     const apiEndpoints = { lots: 'lots', suppliers: 'suppliers', orders: 'orders', inventory: 'inventory', quality: 'quality', recalls: 'recalls', warehouses: 'warehouses', customers: 'customers', materials: 'materials' };

//     const fetchData = async (module) => {
//         try {
//             const res = await fetch(`${API_BASE_URL}/${apiEndpoints[module]}`);
//             const data = await res.json();
//             const arr = Array.isArray(data) ? data : [];
//             const setters = { lots: setLots, suppliers: setSuppliers, orders: setOrders, inventory: setInventory, quality: setQualityTests, recalls: setRecalls, warehouses: setWarehouses, customers: setCustomers, materials: setMaterials };
//             setters[module]?.(arr);
//         } catch (err) { console.error(err); }
//     };

//     const fetchAllData = async () => { setLoading(true); await Promise.all(Object.keys(apiEndpoints).map(e => fetchData(e))); setLoading(false); };

//     useEffect(() => { fetchAllData(); }, []);
//     useEffect(() => { if (activeTab === 'data') fetchData(activeModule); }, [activeModule]);

//     const showNotif = (msg, type = 'success') => { setNotification({ message: msg, type }); setTimeout(() => setNotification(null), 3000); };

//     const handleCreate = () => { setModalMode('create'); setSelectedRecord(null); setFormData({}); setShowModal(true); };
//     const handleEdit = (r) => { setModalMode('edit'); setSelectedRecord(r); setFormData({ ...r }); setShowModal(true); };

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this record?')) return;
//         try {
//             await fetch(`${API_BASE_URL}/${apiEndpoints[activeModule]}/${id}`, { method: 'DELETE' });
//             showNotif('Record deleted successfully');
//             fetchData(activeModule);
//         } catch (err) { showNotif('Error deleting record', 'error'); }
//     };

//     const handleSave = async () => {
//         try {
//             const url = modalMode === 'create' ? `${API_BASE_URL}/${apiEndpoints[activeModule]}` : `${API_BASE_URL}/${apiEndpoints[activeModule]}/${selectedRecord.id}`;
//             await fetch(url, { method: modalMode === 'create' ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
//             showNotif(modalMode === 'create' ? 'Record created successfully' : 'Record updated successfully');
//             setShowModal(false);
//             fetchData(activeModule);
//         } catch (err) { showNotif('Error saving record', 'error'); }
//     };

//     const handleInputChange = (field, value) => { setFormData({ ...formData, [field]: value }); };

//     const fetchReport = async (endpoint) => {
//         setLoading(true);
//         try {
//             const res = await fetch(`${API_BASE_URL}${endpoint}`);
//             const data = await res.json();
//             setReportData(Array.isArray(data) ? data : []);
//         } catch (err) { console.error(err); setReportData([]); }
//         finally { setLoading(false); }
//     };

//     const handleTraceability = async () => {
//         if (!traceInput) return;
//         setLoading(true);
//         try {
//             const res = await fetch(`${API_BASE_URL}/reports/lot-traceability/${encodeURIComponent(traceInput)}`);
//             const data = await res.json();
//             setReportData(Array.isArray(data) ? data : []);
//         } catch (err) { setReportData([]); }
//         finally { setLoading(false); }
//     };

//     const modules = [
//         { id: 'lots', name: 'Lots', icon: Package },
//         { id: 'suppliers', name: 'Suppliers', icon: Truck },
//         { id: 'orders', name: 'Orders', icon: FileText },
//         { id: 'inventory', name: 'Inventory', icon: Warehouse },
//         { id: 'quality', name: 'Quality', icon: Beaker },
//         { id: 'recalls', name: 'Recalls', icon: AlertTriangle },
//         { id: 'warehouses', name: 'Warehouses', icon: Database },
//         { id: 'customers', name: 'Customers', icon: Users },
//         { id: 'materials', name: 'Materials', icon: GitBranch }
//     ];

//     const reports = [
//         { id: 'quality', title: 'Lot Quality Summary', desc: 'QA pass/fail rates by lot', icon: Beaker, color: 'text-indigo-600', endpoint: '/reports/lot-quality-summary' },
//         { id: 'inventory', title: 'Inventory by Warehouse', desc: 'Stock levels by location', icon: Warehouse, color: 'text-green-600', endpoint: '/reports/inventory-by-warehouse' },
//         { id: 'recalls', title: 'Active Recalls', desc: 'Current recall status', icon: AlertTriangle, color: 'text-red-600', endpoint: '/reports/active-recalls' },
//         { id: 'traceability', title: 'Lot Traceability', desc: 'Track lot through supply chain', icon: GitBranch, color: 'text-blue-600', endpoint: null }
//     ];

//     const getStatusColor = (s) => ({ Released: 'bg-green-100 text-green-800', Received: 'bg-blue-100 text-blue-800', Quarantine: 'bg-yellow-100 text-yellow-800', Hold: 'bg-red-100 text-red-800', Shipped: 'bg-blue-100 text-blue-800', Processing: 'bg-purple-100 text-purple-800', Pending: 'bg-orange-100 text-orange-800', Certified: 'bg-green-100 text-green-800', Available: 'bg-green-100 text-green-800', Active: 'bg-green-100 text-green-800', Closed: 'bg-gray-100 text-gray-800', High: 'bg-red-100 text-red-800', Medium: 'bg-yellow-100 text-yellow-800', Low: 'bg-blue-100 text-blue-800', Delivered: 'bg-emerald-100 text-emerald-800' }[s] || 'bg-gray-100 text-gray-800');

//     const getCurrentData = () => ({ lots, suppliers, orders, inventory, quality: qualityTests, recalls, warehouses, customers, materials }[activeModule] || []);
//     const filterData = (d) => !searchTerm ? d : d.filter(i => Object.values(i).some(v => String(v).toLowerCase().includes(searchTerm.toLowerCase())));

//     const formFields = {
//         lots: [
//             { name: 'lotNumber', label: 'Lot Number', type: 'text' },
//             { name: 'materialId', label: 'Material', type: 'select', options: materials.map(m => ({ value: m.id, label: m.name })) },
//             { name: 'supplierId', label: 'Supplier', type: 'select', options: suppliers.map(s => ({ value: s.id, label: s.name })) },
//             { name: 'quantity', label: 'Quantity (kg)', type: 'number' },
//             { name: 'status', label: 'Status', type: 'select', options: ['Received', 'Released', 'Quarantine', 'Hold'] },
//             { name: 'productionDate', label: 'Production Date', type: 'date' },
//             { name: 'expiryDate', label: 'Expiry Date', type: 'date' }
//         ],
//         suppliers: [
//             { name: 'code', label: 'Supplier Code', type: 'text' },
//             { name: 'name', label: 'Name', type: 'text' },
//             { name: 'country', label: 'Country', type: 'text' },
//             { name: 'email', label: 'Email', type: 'email' },
//             { name: 'phone', label: 'Phone', type: 'tel' },
//             { name: 'rating', label: 'Rating (0-5)', type: 'number' },
//             { name: 'status', label: 'Status', type: 'select', options: ['Certified', 'Pending', 'Expired'] }
//         ],
//         orders: [
//             { name: 'orderNumber', label: 'Order Number', type: 'text' },
//             { name: 'customerId', label: 'Customer', type: 'select', options: customers.map(c => ({ value: c.id, label: c.name })) },
//             { name: 'warehouseId', label: 'Warehouse', type: 'select', options: warehouses.map(w => ({ value: w.id, label: w.name })) },
//             { name: 'total', label: 'Order Total ($)', type: 'number' },
//             { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Processing', 'Shipped', 'Delivered'] },
//             { name: 'date', label: 'Order Date', type: 'date' },
//             { name: 'requiredDate', label: 'Required Date', type: 'date' },
//             { name: 'payment', label: 'Payment Terms', type: 'select', options: ['Net 30', 'Net 45', 'Net 60', 'Net 90'] }
//         ],
//         inventory: [
//             { name: 'lotId', label: 'Lot', type: 'select', options: lots.map(l => ({ value: l.id, label: l.lotNumber })) },
//             { name: 'warehouseId', label: 'Warehouse', type: 'select', options: warehouses.map(w => ({ value: w.id, label: w.name })) },
//             { name: 'location', label: 'Location', type: 'text' },
//             { name: 'quantityOnHand', label: 'Quantity On Hand', type: 'number' },
//             { name: 'reservedQty', label: 'Reserved Qty', type: 'number' },
//             { name: 'status', label: 'Status', type: 'select', options: ['Available', 'Reserved', 'Quarantine'] }
//         ],
//         quality: [
//             { name: 'lotId', label: 'Lot', type: 'select', options: lots.map(l => ({ value: l.id, label: l.lotNumber })) },
//             { name: 'lotNumber', label: 'Lot Number', type: 'text' },
//             { name: 'testType', label: 'Test Type', type: 'select', options: ['Microbiology', 'Pesticide Residue', 'Fat Content', 'Protein Content', 'Visual Inspection'] },
//             { name: 'result', label: 'Result', type: 'text' },
//             { name: 'passFlag', label: 'Pass/Fail', type: 'select', options: [{ value: true, label: 'Pass' }, { value: false, label: 'Fail' }] },
//             { name: 'testedBy', label: 'Tested By', type: 'text' },
//             { name: 'certificateNumber', label: 'Certificate #', type: 'text' }
//         ],
//         recalls: [
//             { name: 'recallNumber', label: 'Recall Number', type: 'text' },
//             { name: 'recallDate', label: 'Recall Date', type: 'date' },
//             { name: 'reason', label: 'Reason', type: 'text' },
//             { name: 'severity', label: 'Severity', type: 'select', options: ['High', 'Medium', 'Low'] },
//             { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Closed'] },
//             { name: 'initiatedBy', label: 'Initiated By', type: 'text' },
//             { name: 'regulatoryBody', label: 'Regulatory Body', type: 'text' }
//         ],
//         warehouses: [
//             { name: 'code', label: 'Warehouse Code', type: 'text' },
//             { name: 'name', label: 'Name', type: 'text' },
//             { name: 'location', label: 'Location', type: 'text' },
//             { name: 'capacity', label: 'Capacity (m³)', type: 'number' },
//             { name: 'tempZones', label: 'Temperature Zones', type: 'text' },
//             { name: 'manager', label: 'Manager', type: 'text' }
//         ],
//         customers: [
//             { name: 'code', label: 'Customer Code', type: 'text' },
//             { name: 'name', label: 'Name', type: 'text' },
//             { name: 'type', label: 'Type', type: 'select', options: ['Retail Chain', 'Food Service', 'Wholesaler', 'Institutional'] },
//             { name: 'address', label: 'Address', type: 'text' },
//             { name: 'email', label: 'Email', type: 'email' },
//             { name: 'phone', label: 'Phone', type: 'tel' },
//             { name: 'creditTerms', label: 'Credit Terms', type: 'select', options: ['Net 30', 'Net 45', 'Net 60', 'Net 90'] }
//         ],
//         materials: [
//             { name: 'code', label: 'Material Code', type: 'text' },
//             { name: 'name', label: 'Name', type: 'text' },
//             { name: 'type', label: 'Type', type: 'select', options: ['Vegetables', 'Dairy', 'Grains', 'Oils', 'Meat', 'Seafood', 'Fruits', 'Spices'] },
//             { name: 'unit', label: 'Unit', type: 'select', options: ['KG', 'Liters', 'Units'] },
//             { name: 'shelfLife', label: 'Shelf Life (days)', type: 'number' },
//             { name: 'minTemp', label: 'Min Temp (°C)', type: 'number' },
//             { name: 'maxTemp', label: 'Max Temp (°C)', type: 'number' }
//         ]
//     };

//     const renderTable = () => {
//         const data = filterData(getCurrentData());
//         if (!data.length) return <div className="p-8 text-center text-gray-500">No records found</div>;

//         const cfg = {
//             lots: { cols: ['Lot #', 'Material', 'Supplier', 'Qty', 'Status', 'Expiry'], fn: r => [r.lotNumber, r.material, r.supplier, r.quantity, <span key="s" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.status)}`}>{r.status}</span>, r.expiryDate] },
//             suppliers: { cols: ['Code', 'Name', 'Country', 'Email', 'Rating', 'Status'], fn: r => [r.code, r.name, r.country, r.email, `⭐${r.rating}`, <span key="s" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.status)}`}>{r.status}</span>] },
//             orders: { cols: ['Order #', 'Customer', 'Warehouse', 'Total', 'Status', 'Date'], fn: r => [r.orderNumber, r.customer, r.warehouse, `$${Number(r.total || 0).toLocaleString()}`, <span key="s" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.status)}`}>{r.status}</span>, r.date] },
//             inventory: { cols: ['Lot', 'Warehouse', 'Location', 'Qty', 'Reserved', 'Status'], fn: r => [r.lotNumber, r.warehouse, r.location, r.quantityOnHand, r.reservedQty, <span key="s" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.status)}`}>{r.status}</span>] },
//             quality: { cols: ['Lot', 'Type', 'Date', 'Result', 'Pass', 'By'], fn: r => [r.lotNumber, r.testType, r.testDate, r.result?.substring(0, 25), <span key="s" className={`px-2 py-1 text-xs rounded-full ${r.passFlag ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{r.passFlag ? 'PASS' : 'FAIL'}</span>, r.testedBy] },
//             recalls: { cols: ['Recall #', 'Date', 'Severity', 'Status', 'By'], fn: r => [r.recallNumber, r.recallDate, <span key="sev" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.severity)}`}>{r.severity}</span>, <span key="st" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.status)}`}>{r.status}</span>, r.initiatedBy] },
//             warehouses: { cols: ['Code', 'Name', 'Location', 'Capacity', 'Zones', 'Manager'], fn: r => [r.code, r.name, r.location, r.capacity, r.tempZones, r.manager] },
//             customers: { cols: ['Code', 'Name', 'Type', 'Email', 'Terms'], fn: r => [r.code, r.name, r.type, r.email, r.creditTerms] },
//             materials: { cols: ['Code', 'Name', 'Type', 'Unit', 'Shelf Life', 'Temp'], fn: r => [r.code, r.name, r.type, r.unit, `${r.shelfLife}d`, `${r.minTemp}-${r.maxTemp}°C`] }
//         }[activeModule];

//         if (!cfg) return null;

//         return (
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50"><tr>{cfg.cols.map((c, i) => <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{c}</th>)}<th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {data.map((r, i) => (<tr key={i} className="hover:bg-gray-50">{cfg.fn(r).map((c, j) => <td key={j} className="px-4 py-3 text-sm text-gray-700">{c}</td>)}<td className="px-4 py-3"><button onClick={() => handleEdit(r)} className="text-blue-600 hover:text-blue-800 mr-2"><Edit className="w-4 h-4" /></button><button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button></td></tr>))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     };

//     const renderFormModal = () => {
//         const fields = formFields[activeModule] || [];
//         return (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                 <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-bold text-gray-800">{modalMode === 'create' ? 'Create New' : 'Edit'} {modules.find(m => m.id === activeModule)?.name?.slice(0, -1) || 'Record'}</h2>
//                         <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
//                     </div>
//                     <div className="space-y-4">
//                         {fields.map((field) => (
//                             <div key={field.name}>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
//                                 {field.type === 'select' ? (
//                                     <select value={formData[field.name] ?? ''} onChange={(e) => handleInputChange(field.name, field.options?.[0]?.value !== undefined ? (typeof field.options[0].value === 'boolean' ? e.target.value === 'true' : parseInt(e.target.value) || e.target.value) : e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
//                                         <option value="">Select...</option>
//                                         {(Array.isArray(field.options) ? field.options : []).map((opt, i) => typeof opt === 'object' ? <option key={i} value={opt.value}>{opt.label}</option> : <option key={i} value={opt}>{opt}</option>)}
//                                     </select>
//                                 ) : (
//                                     <input type={field.type} value={formData[field.name] ?? ''} onChange={(e) => handleInputChange(field.name, field.type === 'number' ? parseFloat(e.target.value) || '' : e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                     <div className="flex justify-end gap-3 mt-6">
//                         <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
//                         <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><Check className="w-4 h-4" />{modalMode === 'create' ? 'Create' : 'Update'}</button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <header className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg">
//                 <div className="px-6 py-4 flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center"><Database className="w-5 h-5 text-blue-600" /></div>
//                         <div><h1 className="text-xl font-bold text-white">Food Supply Chain Traceability</h1><p className="text-blue-200 text-sm">Admin Dashboard - DMDD Group 1</p></div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         {loading && <Loader className="w-5 h-5 text-white animate-spin" />}
//                         <div className="text-right"><p className="text-white font-medium">{user.name}</p><p className="text-blue-200 text-sm">Administrator</p></div>
//                         <button onClick={onLogout} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2"><LogOut className="w-4 h-4" />Logout</button>
//                     </div>
//                 </div>
//                 <nav className="px-6 flex gap-1">
//                     {['dashboard', 'data', 'reports'].map(t => (<button key={t} onClick={() => { setActiveTab(t); setActiveReport(null); }} className={`px-4 py-3 text-sm font-medium rounded-t-lg ${activeTab === t ? 'bg-white text-blue-700' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>{t === 'data' ? 'Data Management' : t.charAt(0).toUpperCase() + t.slice(1)}</button>))}
//                 </nav>
//             </header>

//             {notification && (<div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>{notification.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}{notification.message}</div>)}

//             <main className="p-6">
//                 {activeTab === 'dashboard' && (
//                     <div>
//                         <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2><button onClick={fetchAllData} className="text-blue-600 hover:text-blue-800 flex items-center gap-2"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />Refresh</button></div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                             <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Total Lots</p><p className="text-3xl font-bold">{lots.length}</p></div><Package className="w-12 h-12 text-blue-500" /></div></div>
//                             <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Suppliers</p><p className="text-3xl font-bold">{suppliers.length}</p></div><Truck className="w-12 h-12 text-green-500" /></div></div>
//                             <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Open Orders</p><p className="text-3xl font-bold">{orders.filter(o => o.status !== 'Delivered').length}</p></div><FileText className="w-12 h-12 text-purple-500" /></div></div>
//                             <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Active Recalls</p><p className="text-3xl font-bold">{recalls.filter(r => r.status === 'Active').length}</p></div><AlertTriangle className="w-12 h-12 text-red-500" /></div></div>
//                         </div>
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                             <div className="bg-white p-6 rounded-xl shadow-sm"><h3 className="text-lg font-semibold mb-4">Recent Lots</h3>{lots.slice(0, 5).map((l, i) => (<div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"><div><p className="font-medium">{l.lotNumber}</p><p className="text-sm text-gray-500">{l.material}</p></div><span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(l.status)}`}>{l.status}</span></div>))}</div>
//                             <div className="bg-white p-6 rounded-xl shadow-sm"><h3 className="text-lg font-semibold mb-4">Recent Quality Tests</h3>{qualityTests.slice(0, 5).map((t, i) => (<div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"><div><p className="font-medium">{t.lotNumber}</p><p className="text-sm text-gray-500">{t.testType}</p></div><span className={`px-2 py-1 text-xs rounded-full ${t.passFlag ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{t.passFlag ? 'PASS' : 'FAIL'}</span></div>))}</div>
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === 'data' && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Management</h2>
//                         <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 mb-6">
//                             {modules.map(m => (<button key={m.id} onClick={() => setActiveModule(m.id)} className={`p-3 rounded-lg border-2 transition-all ${activeModule === m.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}><m.icon className={`w-6 h-6 mx-auto mb-1 ${activeModule === m.id ? 'text-blue-600' : 'text-gray-600'}`} /><p className={`text-xs font-medium ${activeModule === m.id ? 'text-blue-600' : 'text-gray-700'}`}>{m.name}</p></button>))}
//                         </div>
//                         <div className="bg-white rounded-xl shadow-sm p-6">
//                             <div className="flex items-center justify-between mb-4">
//                                 <h3 className="text-xl font-semibold text-gray-800">{modules.find(m => m.id === activeModule)?.name}</h3>
//                                 <div className="flex items-center gap-3">
//                                     <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
//                                     <button onClick={() => fetchData(activeModule)} className="p-2 text-gray-600 hover:text-blue-600"><RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /></button>
//                                     <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" />Add New</button>
//                                 </div>
//                             </div>
//                             {loading ? <div className="flex justify-center py-12"><Loader className="w-8 h-8 text-blue-600 animate-spin" /></div> : renderTable()}
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === 'reports' && !activeReport && (
//                     <div>
//                         <h2 className="text-2xl font-bold text-gray-800 mb-2">Reports & Analytics</h2>
//                         <p className="text-gray-600 mb-6">Select a report to view data from database views and functions</p>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                             {reports.map(r => (
//                                 <div key={r.id} onClick={() => { setActiveReport(r); if (r.endpoint) fetchReport(r.endpoint); else setReportData([]); }} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer border-2 border-transparent hover:border-blue-200 transition-all">
//                                     <r.icon className={`w-10 h-10 ${r.color} mb-3`} />
//                                     <h3 className="text-lg font-semibold text-gray-800">{r.title}</h3>
//                                     <p className="text-sm text-gray-500">{r.desc}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === 'reports' && activeReport && (
//                     <div>
//                         <button onClick={() => setActiveReport(null)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"><ArrowLeft className="w-4 h-4" />Back to Reports</button>
//                         <div className="bg-white rounded-xl shadow-sm p-6">
//                             <div className="flex items-center gap-3 mb-6">
//                                 <activeReport.icon className={`w-8 h-8 ${activeReport.color}`} />
//                                 <div><h2 className="text-xl font-bold text-gray-800">{activeReport.title}</h2><p className="text-sm text-gray-500">{activeReport.desc}</p></div>
//                                 {activeReport.endpoint && <button onClick={() => fetchReport(activeReport.endpoint)} className="ml-auto p-2 text-gray-600 hover:text-blue-600"><RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /></button>}
//                             </div>

//                             {activeReport.id === 'traceability' && (
//                                 <div className="mb-6">
//                                     <div className="flex gap-4">
//                                         <input type="text" value={traceInput} onChange={(e) => setTraceInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleTraceability()} placeholder="Enter Lot Number (e.g., LOT-TOM-001)" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                                         <button onClick={handleTraceability} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"><Search className="w-4 h-4" />Trace</button>
//                                     </div>
//                                 </div>
//                             )}

//                             {loading ? <div className="flex justify-center py-12"><Loader className="w-8 h-8 text-blue-600 animate-spin" /></div> : (
//                                 reportData.length > 0 ? (
//                                     activeReport.id === 'traceability' ? (
//                                         <div className="space-y-4">
//                                             {reportData.map((item, idx) => (
//                                                 <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
//                                                     <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.Stage === 'Supplier' ? 'bg-blue-100' : item.Stage === 'Quality Test' ? 'bg-purple-100' : item.Stage === 'Warehouse' ? 'bg-green-100' : 'bg-orange-100'}`}>
//                                                         {item.Stage === 'Supplier' ? <Truck className="w-6 h-6 text-blue-600" /> : item.Stage === 'Quality Test' ? <Beaker className="w-6 h-6 text-purple-600" /> : item.Stage === 'Warehouse' ? <Warehouse className="w-6 h-6 text-green-600" /> : <Package className="w-6 h-6 text-orange-600" />}
//                                                     </div>
//                                                     <div className="flex-1">
//                                                         <p className="font-semibold text-gray-800">{item.Stage}</p>
//                                                         <p className="text-sm text-gray-600">{item.Entity_Name}</p>
//                                                         <p className="text-xs text-gray-500">{item.Detail}</p>
//                                                     </div>
//                                                     <div className="text-right"><p className="text-sm text-gray-500">{item.Stage_Date}</p></div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     ) : (
//                                         <div className="overflow-x-auto">
//                                             <table className="min-w-full divide-y divide-gray-200">
//                                                 <thead className="bg-gray-50"><tr>{Object.keys(reportData[0]).map((col, i) => <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{col.replace(/_/g, ' ')}</th>)}</tr></thead>
//                                                 <tbody className="divide-y divide-gray-200">{reportData.map((row, i) => (<tr key={i} className="hover:bg-gray-50">{Object.values(row).map((val, j) => <td key={j} className="px-4 py-3 text-sm text-gray-700">{val ?? '-'}</td>)}</tr>))}</tbody>
//                                             </table>
//                                         </div>
//                                     )
//                                 ) : <p className="text-center text-gray-500 py-8">{activeReport.id === 'traceability' ? 'Enter a lot number to view its traceability chain' : 'No data available'}</p>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </main>

//             {showModal && renderFormModal()}
//         </div>
//     );
// };

// const FoodSupplyChainGUI = () => {
//     const [user, setUser] = useState(null);
//     if (!user) return <LoginPage onLogin={setUser} />;
//     if (user.role === 'customer') return <CustomerPortal user={user} onLogout={() => setUser(null)} />;
//     return <AdminDashboard user={user} onLogout={() => setUser(null)} />;
// };

// export default FoodSupplyChainGUI;


import React, { useState, useEffect } from 'react';
import { AlertCircle, Package, Truck, Users, Warehouse, FileText, Database, Plus, Edit, Trash2, Search, X, Check, AlertTriangle, Beaker, GitBranch, RefreshCw, Loader, LogOut, User, Shield, Eye, ShoppingCart, ArrowLeft, MapPin } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const DEMO_USERS = [
    // Admin Users
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'System Administrator' },
    { id: 2, username: 'manager', password: 'manager123', role: 'admin', name: 'Operations Manager' },

    // Customer Users (All 15 customers from database)
    { id: 3, username: 'wholefoods', password: 'customer123', role: 'customer', name: 'Whole Foods Market', customerId: 1 },
    { id: 4, username: 'restaurant', password: 'customer123', role: 'customer', name: 'Restaurant Group USA', customerId: 2 },
    { id: 5, username: 'freshmarket', password: 'customer123', role: 'customer', name: 'Fresh Market Co', customerId: 3 },
    { id: 6, username: 'premium', password: 'customer123', role: 'customer', name: 'Premium Grocers Inc', customerId: 4 },
    { id: 7, username: 'hospitality', password: 'customer123', role: 'customer', name: 'Hospitality Services LLC', customerId: 5 },
    { id: 8, username: 'naturalfoods', password: 'customer123', role: 'customer', name: 'Natural Foods Distributor', customerId: 6 },
    { id: 9, username: 'campus', password: 'customer123', role: 'customer', name: 'Campus Dining Solutions', customerId: 7 },
    { id: 10, username: 'organic', password: 'customer123', role: 'customer', name: 'Organic Market Network', customerId: 8 },
    { id: 11, username: 'healthcare', password: 'customer123', role: 'customer', name: 'Healthcare Food Services', customerId: 9 },
    { id: 12, username: 'gourmet', password: 'customer123', role: 'customer', name: 'Gourmet Restaurants Inc', customerId: 10 },
    { id: 13, username: 'regional', password: 'customer123', role: 'customer', name: 'Regional Supermarkets', customerId: 11 },
    { id: 14, username: 'school', password: 'customer123', role: 'customer', name: 'School Nutrition Program', customerId: 12 },
    { id: 15, username: 'specialty', password: 'customer123', role: 'customer', name: 'Specialty Food Stores', customerId: 13 },
    { id: 16, username: 'catering', password: 'customer123', role: 'customer', name: 'Corporate Catering Services', customerId: 14 },
    { id: 17, username: 'farmtotable', password: 'customer123', role: 'customer', name: 'Farm to Table Markets', customerId: 15 },
];

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        if (!username || !password) { setError('Please enter both username and password'); return; }
        setIsLoading(true);
        setError('');
        setTimeout(() => {
            const user = DEMO_USERS.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
            if (user) { onLogin(user); } else { setError('Invalid username or password'); }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"><Database className="w-8 h-8 text-blue-600" /></div>
                    <h1 className="text-2xl font-bold text-white">Food Supply Chain</h1>
                    <p className="text-blue-100 text-sm mt-1">Traceability System - DMDD Group 1</p>
                </div>
                <div className="p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Sign In</h2>
                    {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5" />{error}</div>}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter username" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter password" />
                            </div>
                        </div>
                        <button onClick={handleLogin} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
                            {isLoading && <Loader className="w-5 h-5 animate-spin" />}{isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-medium mb-2">Demo Credentials (password: customer123 for all customers):</p>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                            <div className="bg-blue-50 p-2 rounded"><p className="font-semibold text-blue-800">Admin:</p><p className="text-blue-600">admin / admin123</p></div>
                            <div className="bg-blue-50 p-2 rounded"><p className="font-semibold text-blue-800">Manager:</p><p className="text-blue-600">manager / manager123</p></div>
                        </div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Customer Logins:</p>
                        <div className="grid grid-cols-3 gap-1 text-xs">
                            <div className="bg-green-50 p-1 rounded text-green-700">wholefoods</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">restaurant</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">freshmarket</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">premium</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">hospitality</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">naturalfoods</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">campus</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">organic</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">healthcare</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">gourmet</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">regional</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">school</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">specialty</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">catering</div>
                            <div className="bg-green-50 p-1 rounded text-green-700">farmtotable</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CustomerPortal = ({ user, onLogout }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackedOrder, setTrackedOrder] = useState(null);

    useEffect(() => { fetchCustomerData(); }, []);

    const fetchCustomerData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/orders`);
            const data = await res.json();
            // Filter orders for this specific customer only
            const customerOrders = Array.isArray(data) ? data.filter(o => o.customer === user.name) : [];
            setOrders(customerOrders);
        } catch (err) { console.error(err); setOrders([]); }
        finally { setLoading(false); }
    };

    const handleTrackOrder = () => {
        const found = orders.find(o => o.orderNumber?.toLowerCase().includes(trackingNumber.toLowerCase()));
        setTrackedOrder(found || null);
    };

    const getStatusColor = (s) => ({ Shipped: 'bg-blue-100 text-blue-800', Delivered: 'bg-emerald-100 text-emerald-800', Processing: 'bg-yellow-100 text-yellow-800', Pending: 'bg-orange-100 text-orange-800' }[s] || 'bg-gray-100 text-gray-800');
    const getProgress = (status) => ({ Pending: 10, Processing: 35, Shipped: 65, Delivered: 100 }[status] || 0);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-gradient-to-r from-green-600 to-teal-600 shadow-lg">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center"><ShoppingCart className="w-5 h-5 text-green-600" /></div>
                        <div><h1 className="text-xl font-bold text-white">Customer Portal</h1><p className="text-green-100 text-sm">Food Supply Chain Traceability</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right"><p className="text-white font-medium">{user.name}</p><p className="text-green-100 text-sm">Customer Account</p></div>
                        <button onClick={onLogout} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2"><LogOut className="w-4 h-4" />Logout</button>
                    </div>
                </div>
                <nav className="px-6 flex gap-1">
                    {['dashboard', 'orders', 'tracking'].map(s => (
                        <button key={s} onClick={() => setActiveSection(s)} className={`px-4 py-3 text-sm font-medium rounded-t-lg ${activeSection === s ? 'bg-white text-green-600' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                            {s === 'dashboard' ? 'Dashboard' : s === 'orders' ? 'My Orders' : 'Track Shipments'}
                        </button>
                    ))}
                </nav>
            </header>
            <main className="p-6">
                {loading && <div className="flex justify-center py-8"><Loader className="w-8 h-8 text-green-600 animate-spin" /></div>}

                {!loading && activeSection === 'dashboard' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {user.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Total Orders</p><p className="text-3xl font-bold">{orders.length}</p></div><FileText className="w-12 h-12 text-blue-500" /></div></div>
                            <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">In Transit</p><p className="text-3xl font-bold">{orders.filter(o => o.status === 'Shipped').length}</p></div><Truck className="w-12 h-12 text-yellow-500" /></div></div>
                            <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Delivered</p><p className="text-3xl font-bold">{orders.filter(o => o.status === 'Delivered').length}</p></div><Check className="w-12 h-12 text-green-500" /></div></div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                            {orders.length === 0 ? <p className="text-gray-500">No orders found</p> : (
                                <div className="space-y-3">
                                    {orders.slice(0, 5).map((o, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div><p className="font-medium">{o.orderNumber}</p><p className="text-sm text-gray-500">{o.date}</p></div>
                                            <div className="text-right"><p className="font-medium">${Number(o.total || 0).toLocaleString()}</p><span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(o.status)}`}>{o.status}</span></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!loading && activeSection === 'orders' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">My Orders</h2>
                            <button onClick={fetchCustomerData} className="text-green-600 flex items-center gap-2"><RefreshCw className="w-4 h-4" />Refresh</button>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {orders.length === 0 ? <p className="p-8 text-center text-gray-500">No orders found</p> : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {orders.map((o, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm font-medium">{o.orderNumber}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{o.date}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{o.warehouse}</td>
                                                <td className="px-6 py-4 text-sm">${Number(o.total || 0).toLocaleString()}</td>
                                                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(o.status)}`}>{o.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

                {!loading && activeSection === 'tracking' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Track Shipments</h2>
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <div className="flex gap-4 mb-6">
                                <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()} placeholder="Enter Order Number (e.g., ORD-2024-001)" className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500" />
                                <button onClick={handleTrackOrder} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"><Search className="w-4 h-4" />Track</button>
                            </div>

                            {trackedOrder && (
                                <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-lg font-bold text-gray-900">{trackedOrder.orderNumber}</p>
                                            <p className="text-sm text-gray-600">From: {trackedOrder.warehouse}</p>
                                            <p className="text-sm text-gray-600">Customer: {trackedOrder.customer}</p>
                                        </div>
                                        <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(trackedOrder.status)}`}>{trackedOrder.status}</span>
                                    </div>
                                    <div className="mb-2">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Progress</span>
                                            <span>{getProgress(trackedOrder.status)}%</span>
                                        </div>
                                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${getProgress(trackedOrder.status)}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                                        <div className="text-center"><div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getProgress(trackedOrder.status) >= 10 ? 'bg-green-500' : 'bg-gray-300'}`}></div>Pending</div>
                                        <div className="text-center"><div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getProgress(trackedOrder.status) >= 35 ? 'bg-green-500' : 'bg-gray-300'}`}></div>Processing</div>
                                        <div className="text-center"><div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getProgress(trackedOrder.status) >= 65 ? 'bg-green-500' : 'bg-gray-300'}`}></div>Shipped</div>
                                        <div className="text-center"><div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getProgress(trackedOrder.status) >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}></div>Delivered</div>
                                    </div>
                                </div>
                            )}
                            {trackingNumber && !trackedOrder && <p className="text-center text-gray-500 py-4">No order found with that number</p>}
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="font-semibold mb-4">Active Shipments</h3>
                            {orders.filter(o => o.status === 'Shipped' || o.status === 'Processing').length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No active shipments</p>
                            ) : (
                                <div className="space-y-4">
                                    {orders.filter(o => o.status === 'Shipped' || o.status === 'Processing').map((o, i) => (
                                        <div key={i} className="border rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div><p className="font-medium">{o.orderNumber}</p><p className="text-sm text-gray-500">From: {o.warehouse}</p></div>
                                                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(o.status)}`}>{o.status}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: `${getProgress(o.status)}%` }}></div></div>
                                                <span className="text-sm text-gray-600">{getProgress(o.status)}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const AdminDashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [activeModule, setActiveModule] = useState('lots');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [activeReport, setActiveReport] = useState(null);
    const [reportData, setReportData] = useState([]);
    const [traceInput, setTraceInput] = useState('');

    const [lots, setLots] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [qualityTests, setQualityTests] = useState([]);
    const [recalls, setRecalls] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [materials, setMaterials] = useState([]);

    const apiEndpoints = { lots: 'lots', suppliers: 'suppliers', orders: 'orders', inventory: 'inventory', quality: 'quality', recalls: 'recalls', warehouses: 'warehouses', customers: 'customers', materials: 'materials' };

    const fetchData = async (module) => {
        try {
            const res = await fetch(`${API_BASE_URL}/${apiEndpoints[module]}`);
            const data = await res.json();
            const arr = Array.isArray(data) ? data : [];
            const setters = { lots: setLots, suppliers: setSuppliers, orders: setOrders, inventory: setInventory, quality: setQualityTests, recalls: setRecalls, warehouses: setWarehouses, customers: setCustomers, materials: setMaterials };
            setters[module]?.(arr);
        } catch (err) { console.error(err); }
    };

    const fetchAllData = async () => { setLoading(true); await Promise.all(Object.keys(apiEndpoints).map(e => fetchData(e))); setLoading(false); };

    useEffect(() => { fetchAllData(); }, []);
    useEffect(() => { if (activeTab === 'data') fetchData(activeModule); }, [activeModule]);

    const showNotif = (msg, type = 'success') => { setNotification({ message: msg, type }); setTimeout(() => setNotification(null), 3000); };

    const handleCreate = () => { setModalMode('create'); setSelectedRecord(null); setFormData({}); setShowModal(true); };
    const handleEdit = (r) => { setModalMode('edit'); setSelectedRecord(r); setFormData({ ...r }); setShowModal(true); };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this record?')) return;
        try {
            await fetch(`${API_BASE_URL}/${apiEndpoints[activeModule]}/${id}`, { method: 'DELETE' });
            showNotif('Record deleted successfully');
            fetchData(activeModule);
        } catch (err) { showNotif('Error deleting record', 'error'); }
    };

    const handleSave = async () => {
        try {
            const url = modalMode === 'create' ? `${API_BASE_URL}/${apiEndpoints[activeModule]}` : `${API_BASE_URL}/${apiEndpoints[activeModule]}/${selectedRecord.id}`;
            await fetch(url, { method: modalMode === 'create' ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
            showNotif(modalMode === 'create' ? 'Record created successfully' : 'Record updated successfully');
            setShowModal(false);
            fetchData(activeModule);
        } catch (err) { showNotif('Error saving record', 'error'); }
    };

    const handleInputChange = (field, value) => { setFormData({ ...formData, [field]: value }); };

    const fetchReport = async (endpoint) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}${endpoint}`);
            const data = await res.json();
            setReportData(Array.isArray(data) ? data : []);
        } catch (err) { console.error(err); setReportData([]); }
        finally { setLoading(false); }
    };

    const handleTraceability = async () => {
        if (!traceInput) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/reports/lot-traceability/${encodeURIComponent(traceInput)}`);
            const data = await res.json();
            setReportData(Array.isArray(data) ? data : []);
        } catch (err) { setReportData([]); }
        finally { setLoading(false); }
    };

    const modules = [
        { id: 'lots', name: 'Lots', icon: Package },
        { id: 'suppliers', name: 'Suppliers', icon: Truck },
        { id: 'orders', name: 'Orders', icon: FileText },
        { id: 'inventory', name: 'Inventory', icon: Warehouse },
        { id: 'quality', name: 'Quality', icon: Beaker },
        { id: 'recalls', name: 'Recalls', icon: AlertTriangle },
        { id: 'warehouses', name: 'Warehouses', icon: Database },
        { id: 'customers', name: 'Customers', icon: Users },
        { id: 'materials', name: 'Materials', icon: GitBranch }
    ];

    const reports = [
        { id: 'quality', title: 'Lot Quality Summary', desc: 'QA pass/fail rates by lot', icon: Beaker, color: 'text-indigo-600', endpoint: '/reports/lot-quality-summary' },
        { id: 'inventory', title: 'Inventory by Warehouse', desc: 'Stock levels by location', icon: Warehouse, color: 'text-green-600', endpoint: '/reports/inventory-by-warehouse' },
        { id: 'recalls', title: 'Active Recalls', desc: 'Current recall status', icon: AlertTriangle, color: 'text-red-600', endpoint: '/reports/active-recalls' },
        { id: 'traceability', title: 'Lot Traceability', desc: 'Track lot through supply chain', icon: GitBranch, color: 'text-blue-600', endpoint: null }
    ];

    const getStatusColor = (s) => ({ Released: 'bg-green-100 text-green-800', Received: 'bg-blue-100 text-blue-800', Quarantine: 'bg-yellow-100 text-yellow-800', Hold: 'bg-red-100 text-red-800', Shipped: 'bg-blue-100 text-blue-800', Processing: 'bg-purple-100 text-purple-800', Pending: 'bg-orange-100 text-orange-800', Certified: 'bg-green-100 text-green-800', Available: 'bg-green-100 text-green-800', Active: 'bg-green-100 text-green-800', Closed: 'bg-gray-100 text-gray-800', High: 'bg-red-100 text-red-800', Medium: 'bg-yellow-100 text-yellow-800', Low: 'bg-blue-100 text-blue-800', Delivered: 'bg-emerald-100 text-emerald-800' }[s] || 'bg-gray-100 text-gray-800');

    const getCurrentData = () => ({ lots, suppliers, orders, inventory, quality: qualityTests, recalls, warehouses, customers, materials }[activeModule] || []);
    const filterData = (d) => !searchTerm ? d : d.filter(i => Object.values(i).some(v => String(v).toLowerCase().includes(searchTerm.toLowerCase())));

    const formFields = {
        lots: [
            { name: 'lotNumber', label: 'Lot Number', type: 'text' },
            { name: 'materialId', label: 'Material', type: 'select', options: materials.map(m => ({ value: m.id, label: m.name })) },
            { name: 'supplierId', label: 'Supplier', type: 'select', options: suppliers.map(s => ({ value: s.id, label: s.name })) },
            { name: 'quantity', label: 'Quantity (kg)', type: 'number' },
            { name: 'status', label: 'Status', type: 'select', options: ['Received', 'Released', 'Quarantine', 'Hold'] },
            { name: 'productionDate', label: 'Production Date', type: 'date' },
            { name: 'expiryDate', label: 'Expiry Date', type: 'date' }
        ],
        suppliers: [
            { name: 'code', label: 'Supplier Code', type: 'text' },
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'country', label: 'Country', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel' },
            { name: 'rating', label: 'Rating (0-5)', type: 'number' },
            { name: 'status', label: 'Status', type: 'select', options: ['Certified', 'Pending', 'Expired'] }
        ],
        orders: [
            { name: 'orderNumber', label: 'Order Number', type: 'text' },
            { name: 'customerId', label: 'Customer', type: 'select', options: customers.map(c => ({ value: c.id, label: c.name })) },
            { name: 'warehouseId', label: 'Warehouse', type: 'select', options: warehouses.map(w => ({ value: w.id, label: w.name })) },
            { name: 'total', label: 'Order Total ($)', type: 'number' },
            { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Processing', 'Shipped', 'Delivered'] },
            { name: 'date', label: 'Order Date', type: 'date' },
            { name: 'requiredDate', label: 'Required Date', type: 'date' },
            { name: 'payment', label: 'Payment Terms', type: 'select', options: ['Net 30', 'Net 45', 'Net 60', 'Net 90'] }
        ],
        inventory: [
            { name: 'lotId', label: 'Lot', type: 'select', options: lots.map(l => ({ value: l.id, label: l.lotNumber })) },
            { name: 'warehouseId', label: 'Warehouse', type: 'select', options: warehouses.map(w => ({ value: w.id, label: w.name })) },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'quantityOnHand', label: 'Quantity On Hand', type: 'number' },
            { name: 'reservedQty', label: 'Reserved Qty', type: 'number' },
            { name: 'status', label: 'Status', type: 'select', options: ['Available', 'Reserved', 'Quarantine'] }
        ],
        quality: [
            { name: 'lotId', label: 'Lot', type: 'select', options: lots.map(l => ({ value: l.id, label: l.lotNumber })) },
            { name: 'lotNumber', label: 'Lot Number', type: 'text' },
            { name: 'testType', label: 'Test Type', type: 'select', options: ['Microbiology', 'Pesticide Residue', 'Fat Content', 'Protein Content', 'Visual Inspection'] },
            { name: 'result', label: 'Result', type: 'text' },
            { name: 'passFlag', label: 'Pass/Fail', type: 'select', options: [{ value: true, label: 'Pass' }, { value: false, label: 'Fail' }] },
            { name: 'testedBy', label: 'Tested By', type: 'text' },
            { name: 'certificateNumber', label: 'Certificate #', type: 'text' }
        ],
        recalls: [
            { name: 'recallNumber', label: 'Recall Number', type: 'text' },
            { name: 'recallDate', label: 'Recall Date', type: 'date' },
            { name: 'reason', label: 'Reason', type: 'text' },
            { name: 'severity', label: 'Severity', type: 'select', options: ['High', 'Medium', 'Low'] },
            { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Closed'] },
            { name: 'initiatedBy', label: 'Initiated By', type: 'text' },
            { name: 'regulatoryBody', label: 'Regulatory Body', type: 'text' }
        ],
        warehouses: [
            { name: 'code', label: 'Warehouse Code', type: 'text' },
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'capacity', label: 'Capacity (m³)', type: 'number' },
            { name: 'tempZones', label: 'Temperature Zones', type: 'text' },
            { name: 'manager', label: 'Manager', type: 'text' }
        ],
        customers: [
            { name: 'code', label: 'Customer Code', type: 'text' },
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'type', label: 'Type', type: 'select', options: ['Retail Chain', 'Food Service', 'Wholesaler', 'Institutional'] },
            { name: 'address', label: 'Address', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel' },
            { name: 'creditTerms', label: 'Credit Terms', type: 'select', options: ['Net 30', 'Net 45', 'Net 60', 'Net 90'] }
        ],
        materials: [
            { name: 'code', label: 'Material Code', type: 'text' },
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'type', label: 'Type', type: 'select', options: ['Vegetables', 'Dairy', 'Grains', 'Oils', 'Meat', 'Seafood', 'Fruits', 'Spices'] },
            { name: 'unit', label: 'Unit', type: 'select', options: ['KG', 'Liters', 'Units'] },
            { name: 'shelfLife', label: 'Shelf Life (days)', type: 'number' },
            { name: 'minTemp', label: 'Min Temp (°C)', type: 'number' },
            { name: 'maxTemp', label: 'Max Temp (°C)', type: 'number' }
        ]
    };

    const renderTable = () => {
        const data = filterData(getCurrentData());
        if (!data.length) return <div className="p-8 text-center text-gray-500">No records found</div>;

        const cfg = {
            lots: { cols: ['Lot #', 'Material', 'Supplier', 'Qty', 'Status', 'Expiry'], fn: r => [r.lotNumber, r.material, r.supplier, r.quantity, <span key="s" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.status)}`}>{r.status}</span>, r.expiryDate] },
            suppliers: { cols: ['Code', 'Name', 'Country', 'Email', 'Rating', 'Status'], fn: r => [r.code, r.name, r.country, r.email, `⭐${r.rating}`, <span key="s" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.status)}`}>{r.status}</span>] },
            orders: { cols: ['Order #', 'Customer', 'Warehouse', 'Total', 'Status', 'Date'], fn: r => [r.orderNumber, r.customer, r.warehouse, `$${Number(r.total || 0).toLocaleString()}`, <span key="s" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.status)}`}>{r.status}</span>, r.date] },
            inventory: { cols: ['Lot', 'Warehouse', 'Location', 'Qty', 'Reserved', 'Status'], fn: r => [r.lotNumber, r.warehouse, r.location, r.quantityOnHand, r.reservedQty, <span key="s" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.status)}`}>{r.status}</span>] },
            quality: { cols: ['Lot', 'Type', 'Date', 'Result', 'Pass', 'By'], fn: r => [r.lotNumber, r.testType, r.testDate, r.result?.substring(0, 25), <span key="s" className={`px-2 py-1 text-xs rounded-full ${r.passFlag ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{r.passFlag ? 'PASS' : 'FAIL'}</span>, r.testedBy] },
            recalls: { cols: ['Recall #', 'Date', 'Severity', 'Status', 'By'], fn: r => [r.recallNumber, r.recallDate, <span key="sev" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.severity)}`}>{r.severity}</span>, <span key="st" className={`px-2 py-1 text-xs rounded-full ${getStatusColor(r.status)}`}>{r.status}</span>, r.initiatedBy] },
            warehouses: { cols: ['Code', 'Name', 'Location', 'Capacity', 'Zones', 'Manager'], fn: r => [r.code, r.name, r.location, r.capacity, r.tempZones, r.manager] },
            customers: { cols: ['Code', 'Name', 'Type', 'Email', 'Terms'], fn: r => [r.code, r.name, r.type, r.email, r.creditTerms] },
            materials: { cols: ['Code', 'Name', 'Type', 'Unit', 'Shelf Life', 'Temp'], fn: r => [r.code, r.name, r.type, r.unit, `${r.shelfLife}d`, `${r.minTemp}-${r.maxTemp}°C`] }
        }[activeModule];

        if (!cfg) return null;

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50"><tr>{cfg.cols.map((c, i) => <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{c}</th>)}<th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((r, i) => (<tr key={i} className="hover:bg-gray-50">{cfg.fn(r).map((c, j) => <td key={j} className="px-4 py-3 text-sm text-gray-700">{c}</td>)}<td className="px-4 py-3"><button onClick={() => handleEdit(r)} className="text-blue-600 hover:text-blue-800 mr-2"><Edit className="w-4 h-4" /></button><button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button></td></tr>))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderFormModal = () => {
        const fields = formFields[activeModule] || [];
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">{modalMode === 'create' ? 'Create New' : 'Edit'} {modules.find(m => m.id === activeModule)?.name?.slice(0, -1) || 'Record'}</h2>
                        <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
                    </div>
                    <div className="space-y-4">
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                {field.type === 'select' ? (
                                    <select value={formData[field.name] ?? ''} onChange={(e) => handleInputChange(field.name, field.options?.[0]?.value !== undefined ? (typeof field.options[0].value === 'boolean' ? e.target.value === 'true' : parseInt(e.target.value) || e.target.value) : e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select...</option>
                                        {(Array.isArray(field.options) ? field.options : []).map((opt, i) => typeof opt === 'object' ? <option key={i} value={opt.value}>{opt.label}</option> : <option key={i} value={opt}>{opt}</option>)}
                                    </select>
                                ) : (
                                    <input type={field.type} value={formData[field.name] ?? ''} onChange={(e) => handleInputChange(field.name, field.type === 'number' ? parseFloat(e.target.value) || '' : e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><Check className="w-4 h-4" />{modalMode === 'create' ? 'Create' : 'Update'}</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center"><Database className="w-5 h-5 text-blue-600" /></div>
                        <div><h1 className="text-xl font-bold text-white">Food Supply Chain Traceability</h1><p className="text-blue-200 text-sm">Admin Dashboard - DMDD Group 1</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                        {loading && <Loader className="w-5 h-5 text-white animate-spin" />}
                        <div className="text-right"><p className="text-white font-medium">{user.name}</p><p className="text-blue-200 text-sm">Administrator</p></div>
                        <button onClick={onLogout} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2"><LogOut className="w-4 h-4" />Logout</button>
                    </div>
                </div>
                <nav className="px-6 flex gap-1">
                    {['dashboard', 'data', 'reports'].map(t => (<button key={t} onClick={() => { setActiveTab(t); setActiveReport(null); }} className={`px-4 py-3 text-sm font-medium rounded-t-lg ${activeTab === t ? 'bg-white text-blue-700' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>{t === 'data' ? 'Data Management' : t.charAt(0).toUpperCase() + t.slice(1)}</button>))}
                </nav>
            </header>

            {notification && (<div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>{notification.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}{notification.message}</div>)}

            <main className="p-6">
                {activeTab === 'dashboard' && (
                    <div>
                        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2><button onClick={fetchAllData} className="text-blue-600 hover:text-blue-800 flex items-center gap-2"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />Refresh</button></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Total Lots</p><p className="text-3xl font-bold">{lots.length}</p></div><Package className="w-12 h-12 text-blue-500" /></div></div>
                            <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Suppliers</p><p className="text-3xl font-bold">{suppliers.length}</p></div><Truck className="w-12 h-12 text-green-500" /></div></div>
                            <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Open Orders</p><p className="text-3xl font-bold">{orders.filter(o => o.status !== 'Delivered').length}</p></div><FileText className="w-12 h-12 text-purple-500" /></div></div>
                            <div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Active Recalls</p><p className="text-3xl font-bold">{recalls.filter(r => r.status === 'Active').length}</p></div><AlertTriangle className="w-12 h-12 text-red-500" /></div></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm"><h3 className="text-lg font-semibold mb-4">Recent Lots</h3>{lots.slice(0, 5).map((l, i) => (<div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"><div><p className="font-medium">{l.lotNumber}</p><p className="text-sm text-gray-500">{l.material}</p></div><span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(l.status)}`}>{l.status}</span></div>))}</div>
                            <div className="bg-white p-6 rounded-xl shadow-sm"><h3 className="text-lg font-semibold mb-4">Recent Quality Tests</h3>{qualityTests.slice(0, 5).map((t, i) => (<div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"><div><p className="font-medium">{t.lotNumber}</p><p className="text-sm text-gray-500">{t.testType}</p></div><span className={`px-2 py-1 text-xs rounded-full ${t.passFlag ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{t.passFlag ? 'PASS' : 'FAIL'}</span></div>))}</div>
                        </div>
                    </div>
                )}

                {activeTab === 'data' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Management</h2>
                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 mb-6">
                            {modules.map(m => (<button key={m.id} onClick={() => setActiveModule(m.id)} className={`p-3 rounded-lg border-2 transition-all ${activeModule === m.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}><m.icon className={`w-6 h-6 mx-auto mb-1 ${activeModule === m.id ? 'text-blue-600' : 'text-gray-600'}`} /><p className={`text-xs font-medium ${activeModule === m.id ? 'text-blue-600' : 'text-gray-700'}`}>{m.name}</p></button>))}
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">{modules.find(m => m.id === activeModule)?.name}</h3>
                                <div className="flex items-center gap-3">
                                    <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                                    <button onClick={() => fetchData(activeModule)} className="p-2 text-gray-600 hover:text-blue-600"><RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /></button>
                                    <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" />Add New</button>
                                </div>
                            </div>
                            {loading ? <div className="flex justify-center py-12"><Loader className="w-8 h-8 text-blue-600 animate-spin" /></div> : renderTable()}
                        </div>
                    </div>
                )}

                {activeTab === 'reports' && !activeReport && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Reports & Analytics</h2>
                        <p className="text-gray-600 mb-6">Select a report to view data from database views and functions</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {reports.map(r => (
                                <div key={r.id} onClick={() => { setActiveReport(r); if (r.endpoint) fetchReport(r.endpoint); else setReportData([]); }} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer border-2 border-transparent hover:border-blue-200 transition-all">
                                    <r.icon className={`w-10 h-10 ${r.color} mb-3`} />
                                    <h3 className="text-lg font-semibold text-gray-800">{r.title}</h3>
                                    <p className="text-sm text-gray-500">{r.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'reports' && activeReport && (
                    <div>
                        <button onClick={() => setActiveReport(null)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"><ArrowLeft className="w-4 h-4" />Back to Reports</button>
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <activeReport.icon className={`w-8 h-8 ${activeReport.color}`} />
                                <div><h2 className="text-xl font-bold text-gray-800">{activeReport.title}</h2><p className="text-sm text-gray-500">{activeReport.desc}</p></div>
                                {activeReport.endpoint && <button onClick={() => fetchReport(activeReport.endpoint)} className="ml-auto p-2 text-gray-600 hover:text-blue-600"><RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /></button>}
                            </div>

                            {activeReport.id === 'traceability' && (
                                <div className="mb-6">
                                    <div className="flex gap-4">
                                        <input type="text" value={traceInput} onChange={(e) => setTraceInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleTraceability()} placeholder="Enter Lot Number (e.g., LOT-TOM-001)" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                        <button onClick={handleTraceability} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"><Search className="w-4 h-4" />Trace</button>
                                    </div>
                                </div>
                            )}

                            {loading ? <div className="flex justify-center py-12"><Loader className="w-8 h-8 text-blue-600 animate-spin" /></div> : (
                                reportData.length > 0 ? (
                                    activeReport.id === 'traceability' ? (
                                        <div className="space-y-4">
                                            {reportData.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.Stage === 'Supplier' ? 'bg-blue-100' : item.Stage === 'Quality Test' ? 'bg-purple-100' : item.Stage === 'Warehouse' ? 'bg-green-100' : 'bg-orange-100'}`}>
                                                        {item.Stage === 'Supplier' ? <Truck className="w-6 h-6 text-blue-600" /> : item.Stage === 'Quality Test' ? <Beaker className="w-6 h-6 text-purple-600" /> : item.Stage === 'Warehouse' ? <Warehouse className="w-6 h-6 text-green-600" /> : <Package className="w-6 h-6 text-orange-600" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-800">{item.Stage}</p>
                                                        <p className="text-sm text-gray-600">{item.Entity_Name}</p>
                                                        <p className="text-xs text-gray-500">{item.Detail}</p>
                                                    </div>
                                                    <div className="text-right"><p className="text-sm text-gray-500">{item.Stage_Date}</p></div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50"><tr>{Object.keys(reportData[0]).map((col, i) => <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{col.replace(/_/g, ' ')}</th>)}</tr></thead>
                                                <tbody className="divide-y divide-gray-200">{reportData.map((row, i) => (<tr key={i} className="hover:bg-gray-50">{Object.values(row).map((val, j) => <td key={j} className="px-4 py-3 text-sm text-gray-700">{val ?? '-'}</td>)}</tr>))}</tbody>
                                            </table>
                                        </div>
                                    )
                                ) : <p className="text-center text-gray-500 py-8">{activeReport.id === 'traceability' ? 'Enter a lot number to view its traceability chain' : 'No data available'}</p>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {showModal && renderFormModal()}
        </div>
    );
};

const FoodSupplyChainGUI = () => {
    const [user, setUser] = useState(null);
    if (!user) return <LoginPage onLogin={setUser} />;
    if (user.role === 'customer') return <CustomerPortal user={user} onLogout={() => setUser(null)} />;
    return <AdminDashboard user={user} onLogout={() => setUser(null)} />;
};

export default FoodSupplyChainGUI;