export const mockUsers = [
  { id: 'u1', email: 'officer@vendorbridge.com', password: 'pass123', firstName: 'Rahul', lastName: 'Mehta', role: 'procurement_officer', phone: '+91 98765 43210', country: 'India', avatar: 'RM' },
  { id: 'u2', email: 'vendor@vendorbridge.com', password: 'pass123', firstName: 'Amit', lastName: 'Patel', role: 'vendor', phone: '+91 87654 32109', country: 'India', avatar: 'AP' },
  { id: 'u3', email: 'manager@vendorbridge.com', password: 'pass123', firstName: 'Priya', lastName: 'Shah', role: 'manager', phone: '+91 76543 21098', country: 'India', avatar: 'PS' },
  { id: 'u4', email: 'admin@vendorbridge.com', password: 'pass123', firstName: 'Vikram', lastName: 'Singh', role: 'admin', phone: '+91 65432 10987', country: 'India', avatar: 'VS' },
];

export const mockVendors = [
  { id: 'v1', name: 'Infra Supplies Pvt Ltd', category: 'Construction', gst: '27AABCS1429BZ0', contact: '+91 22 4567 8901', email: 'info@infrasupplies.com', status: 'active', rating: 4.5, address: '456, Industrial Estate, Surat', gstin: '27AABCS1429BZ0' },
  { id: 'v2', name: 'Tech Core LTD', category: 'IT', gst: '29AADCT3456KZ1', contact: '+91 80 3456 7890', email: 'sales@techcore.com', status: 'active', rating: 3.8, address: '12, Tech Park, Bangalore', gstin: '29AADCT3456KZ1' },
  { id: 'v3', name: 'FastLog Transport', category: 'Logistics', gst: '24AAECF7890LZ2', contact: '+91 79 2345 6789', email: 'ops@fastlog.com', status: 'blocked', rating: 3.2, address: '78, Transport Nagar, Ahmedabad', gstin: '24AAECF7890LZ2' },
  { id: 'v4', name: 'Office Need Co.', category: 'Office Supplies', gst: '27BBBCO2345MZ3', contact: '+91 22 1234 5678', email: 'order@officeneed.com', status: 'active', rating: 4.2, address: '34, Commerce Hub, Mumbai', gstin: '27BBBCO2345MZ3' },
  { id: 'v5', name: 'Green Energy Solutions', category: 'Energy', gst: '06AAFGE5678NZ4', contact: '+91 124 567 8901', email: 'hello@greenenergy.com', status: 'pending', rating: 0, address: '56, Green Avenue, Gurugram', gstin: '06AAFGE5678NZ4' },
  { id: 'v6', name: 'BuildRight Materials', category: 'Construction', gst: '27CCDBR9012PZ5', contact: '+91 22 8901 2345', email: 'supply@buildright.com', status: 'active', rating: 4.0, address: '89, Builder Lane, Pune', gstin: '27CCDBR9012PZ5' },
  { id: 'v7', name: 'DataStream Analytics', category: 'IT', gst: '29DDDSA3456QZ6', contact: '+91 80 4567 8901', email: 'info@datastream.com', status: 'active', rating: 4.3, address: '45, IT Corridor, Hyderabad', gstin: '29DDDSA3456QZ6' },
  { id: 'v8', name: 'SwiftShip Logistics', category: 'Logistics', gst: '24EESSW7890RZ7', contact: '+91 79 5678 9012', email: 'dispatch@swiftship.com', status: 'pending', rating: 0, address: '23, Cargo Complex, Delhi', gstin: '24EESSW7890RZ7' },
  { id: 'v9', name: 'ClearView Optics', category: 'Manufacturing', gst: '33FFCVO1234SZ8', contact: '+91 44 6789 0123', email: 'sales@clearview.com', status: 'active', rating: 4.1, address: '67, Factory Road, Chennai', gstin: '33FFCVO1234SZ8' },
  { id: 'v10', name: 'ProClean Services', category: 'Facility Management', gst: '27GGPCS5678TZ9', contact: '+91 22 7890 1234', email: 'service@proclean.com', status: 'pending', rating: 0, address: '12, Service Block, Navi Mumbai', gstin: '27GGPCS5678TZ9' },
];

export const mockRFQs = [
  {
    id: 'rfq1',
    title: 'Office Furniture Procurement Q2',
    category: 'Furniture',
    deadline: '2025-06-15',
    description: 'Ergonomic chairs and standing desks for 3rd floor',
    status: 'quotations_received',
    createdBy: 'u1',
    createdAt: '2025-05-18',
    lineItems: [
      { id: 'li1', item: 'Ergonomic Chair', qty: 25, unit: 'NOS' },
      { id: 'li2', item: 'Standing Desk', qty: 10, unit: 'NOS' },
    ],
    assignedVendors: ['v1', 'v2', 'v4'],
  },
  {
    id: 'rfq2',
    title: 'IT Infrastructure Upgrade',
    category: 'IT Equipment',
    deadline: '2025-07-01',
    description: 'Server racks and networking switches for data center expansion',
    status: 'pending_quotation',
    createdBy: 'u1',
    createdAt: '2025-05-25',
    lineItems: [
      { id: 'li3', item: 'Server Rack 42U', qty: 5, unit: 'NOS' },
      { id: 'li4', item: 'Network Switch 48-port', qty: 8, unit: 'NOS' },
      { id: 'li5', item: 'UPS 10KVA', qty: 3, unit: 'NOS' },
    ],
    assignedVendors: ['v2', 'v7'],
  },
  {
    id: 'rfq3',
    title: 'Annual Stationery Supply',
    category: 'Office Supplies',
    deadline: '2025-06-30',
    description: 'Bulk stationery order for all departments',
    status: 'draft',
    createdBy: 'u1',
    createdAt: '2025-05-28',
    lineItems: [
      { id: 'li6', item: 'A4 Paper Ream', qty: 500, unit: 'NOS' },
      { id: 'li7', item: 'Ballpoint Pen Box', qty: 100, unit: 'BOX' },
    ],
    assignedVendors: ['v4'],
  },
];

export const mockQuotations = [
  {
    id: 'q1', rfqId: 'rfq1', vendorId: 'v1', vendorName: 'Infra Supplies Pvt Ltd',
    status: 'submitted', submittedAt: '2025-05-22',
    items: [
      { itemId: 'li1', item: 'Ergonomic Chair', qty: 25, unitPrice: 3500, total: 87500, deliveryDays: 10 },
      { itemId: 'li2', item: 'Standing Desk', qty: 10, unitPrice: 8200, total: 82000, deliveryDays: 10 },
    ],
    gstPercent: 18, subtotal: 169500, gstAmount: 30510, grandTotal: 200010,
    paymentTerms: '30 days', notes: 'Free installation included. Warranty: 3 years.',
  },
  {
    id: 'q2', rfqId: 'rfq1', vendorId: 'v2', vendorName: 'Tech Core LTD',
    status: 'submitted', submittedAt: '2025-05-23',
    items: [
      { itemId: 'li1', item: 'Ergonomic Chair', qty: 25, unitPrice: 4200, total: 105000, deliveryDays: 7 },
      { itemId: 'li2', item: 'Standing Desk', qty: 10, unitPrice: 8500, total: 85000, deliveryDays: 7 },
    ],
    gstPercent: 18, subtotal: 190000, gstAmount: 34200, grandTotal: 224200,
    paymentTerms: '15 days', notes: 'Includes next-day support for 1 year.',
  },
  {
    id: 'q3', rfqId: 'rfq1', vendorId: 'v4', vendorName: 'Office Need Co.',
    status: 'submitted', submittedAt: '2025-05-24',
    items: [
      { itemId: 'li1', item: 'Ergonomic Chair', qty: 25, unitPrice: 3800, total: 95000, deliveryDays: 14 },
      { itemId: 'li2', item: 'Standing Desk', qty: 10, unitPrice: 9000, total: 90000, deliveryDays: 14 },
    ],
    gstPercent: 18, subtotal: 185000, gstAmount: 33300, grandTotal: 218300,
    paymentTerms: '30 days', notes: 'Bulk discount applied. EMI option available.',
  },
];

export const mockApprovals = [
  {
    id: 'apr1', rfqId: 'rfq1', quotationId: 'q1', vendorId: 'v1', vendorName: 'Infra Supplies Pvt Ltd',
    amount: 200010, status: 'awaiting_l2',
    currentStep: 2,
    chain: [
      { level: 'L1', name: 'Rahul Mehta', role: 'Procurement Head', status: 'approved', date: '2025-05-20', time: '10:32 AM' },
      { level: 'L2', name: 'Priya Shah', role: 'Finance Manager', status: 'awaiting', date: '2025-05-21', time: '' },
    ],
  },
];

export const mockPurchaseOrders = [
  {
    id: 'po1', poNumber: 'PO-2025-0068', rfqId: 'rfq1', quotationId: 'q1', vendorId: 'v1',
    vendorName: 'Infra Supplies Pvt Ltd', vendorAddress: '456, Industrial Estate, Surat', vendorGstin: '27AABCS1429BZ0',
    billTo: { name: 'VendorBridge Technologies Pvt Ltd', address: '123 Business Park, Ahmedabad', gstin: '24AAFCV5678QZ1' },
    poDate: '2025-05-21', invoiceDate: '2025-05-22', dueDate: '2025-06-21',
    items: [
      { item: 'Ergonomic Chair', qty: 25, unitPrice: 3500, total: 87500 },
      { item: 'Standing Desk', qty: 10, unitPrice: 8200, total: 82000 },
    ],
    subtotal: 169500, cgst: 15255, sgst: 15255, grandTotal: 200010,
    status: 'pending_payment', amount: 87000,
  },
  {
    id: 'po2', poNumber: 'PO-2025-0067', rfqId: null, quotationId: null, vendorId: 'v2',
    vendorName: 'Tech Core LTD', vendorAddress: '12, Tech Park, Bangalore', vendorGstin: '29AADCT3456KZ1',
    billTo: { name: 'VendorBridge Technologies Pvt Ltd', address: '123 Business Park, Ahmedabad', gstin: '24AAFCV5678QZ1' },
    poDate: '2025-05-15', invoiceDate: '2025-05-16', dueDate: '2025-06-15',
    items: [
      { item: 'Laptop Dell Latitude', qty: 10, unitPrice: 14000, total: 140000 },
    ],
    subtotal: 140000, cgst: 12600, sgst: 12600, grandTotal: 165200,
    status: 'pending_payment', amount: 140000,
  },
  {
    id: 'po3', poNumber: 'PO-2025-0066', rfqId: null, quotationId: null, vendorId: 'v4',
    vendorName: 'Office Need Co.', vendorAddress: '34, Commerce Hub, Mumbai', vendorGstin: '27BBBCO2345MZ3',
    billTo: { name: 'VendorBridge Technologies Pvt Ltd', address: '123 Business Park, Ahmedabad', gstin: '24AAFCV5678QZ1' },
    poDate: '2025-05-10', invoiceDate: '2025-05-11', dueDate: '2025-06-10',
    items: [
      { item: 'Printer Cartridge', qty: 50, unitPrice: 698, total: 34900 },
    ],
    subtotal: 34900, cgst: 3141, sgst: 3141, grandTotal: 41182,
    status: 'paid', amount: 34900,
  },
];

export const mockActivityLogs = [
  { id: 'log1', type: 'quotation', title: 'Quotation Selected', description: 'Infra Supplies Pvt Ltd selected for Office Furniture Q2', timestamp: '2025-05-23T21:15:00', user: 'Rahul Mehta' },
  { id: 'log2', type: 'approval', title: 'Approval Pending', description: 'PO-2025-0068 awaiting L2 approval by Priya Shah', timestamp: '2025-05-22T09:15:00', user: 'System' },
  { id: 'log3', type: 'rfq', title: 'RFQ Published', description: 'Office Furniture Q2 sent to 3 vendors', timestamp: '2025-05-19T14:30:00', user: 'Rahul Mehta' },
  { id: 'log4', type: 'vendor', title: 'Vendor Added', description: 'FastLog Transport registered and pending verification', timestamp: '2025-05-18T15:20:00', user: 'Vikram Singh' },
  { id: 'log5', type: 'invoice', title: 'Invoice Generated', description: 'Invoice for PO-2025-0066 generated and sent to Office Need Co.', timestamp: '2025-05-11T10:00:00', user: 'System' },
  { id: 'log6', type: 'approval', title: 'L1 Approved', description: 'Rahul Mehta approved Office Furniture Q2 procurement request', timestamp: '2025-05-20T10:32:00', user: 'Rahul Mehta' },
  { id: 'log7', type: 'vendor', title: 'Vendor Verified', description: 'BuildRight Materials verified and marked as active', timestamp: '2025-05-15T11:00:00', user: 'Vikram Singh' },
  { id: 'log8', type: 'rfq', title: 'RFQ Created', description: 'IT Infrastructure Upgrade RFQ created and assigned to 2 vendors', timestamp: '2025-05-25T09:00:00', user: 'Rahul Mehta' },
];

export const dashboardStats = {
  activeRFQs: 12,
  pendingApprovals: 5,
  posThisMonth: 230000,
  overdueInvoices: 3,
};

export const spendingTrends = [
  { month: 'Dec', amount: 180000 },
  { month: 'Jan', amount: 220000 },
  { month: 'Feb', amount: 195000 },
  { month: 'Mar', amount: 310000 },
  { month: 'Apr', amount: 275000 },
  { month: 'May', amount: 230000 },
];

export const spendingByCategory = [
  { category: 'IT Equipment', amount: 450000 },
  { category: 'Furniture', amount: 320000 },
  { category: 'Office Supplies', amount: 180000 },
  { category: 'Construction', amount: 260000 },
  { category: 'Logistics', amount: 120000 },
];

export const orgInfo = {
  name: 'VendorBridge Technologies Pvt Ltd',
  address: '123 Business Park, Ahmedabad',
  gstin: '24AAFCV5678QZ1',
};
