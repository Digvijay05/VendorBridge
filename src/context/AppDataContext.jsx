import { createContext, useContext, useReducer, useEffect } from 'react';
import { mockVendors, mockRFQs, mockQuotations, mockApprovals, mockPurchaseOrders, mockActivityLogs } from '../data/mockData';

const AppDataContext = createContext(null);

const initialState = {
  vendors: mockVendors,
  rfqs: mockRFQs,
  quotations: mockQuotations,
  approvals: mockApprovals,
  purchaseOrders: mockPurchaseOrders,
  activityLogs: mockActivityLogs,
};

function loadState() {
  try {
    const saved = localStorage.getItem('vb_appdata');
    return saved ? JSON.parse(saved) : initialState;
  } catch { return initialState; }
}

function reducer(state, action) {
  const addLog = (s, type, title, description) => ({
    ...s,
    activityLogs: [
      { id: 'log' + Date.now(), type, title, description, timestamp: new Date().toISOString(), user: 'Current User' },
      ...s.activityLogs,
    ],
  });

  switch (action.type) {
    case 'ADD_VENDOR': {
      const newVendor = { id: 'v' + Date.now(), status: 'pending', rating: 0, ...action.payload };
      let s = { ...state, vendors: [...state.vendors, newVendor] };
      return addLog(s, 'vendor', 'Vendor Added', `${newVendor.name} registered and pending verification`);
    }
    case 'UPDATE_VENDOR': {
      const vendors = state.vendors.map(v => v.id === action.payload.id ? { ...v, ...action.payload } : v);
      return { ...state, vendors };
    }
    case 'CREATE_RFQ': {
      const rfq = { id: 'rfq' + Date.now(), status: action.payload.isDraft ? 'draft' : 'pending_quotation', createdAt: new Date().toISOString().split('T')[0], ...action.payload };
      let s = { ...state, rfqs: [...state.rfqs, rfq] };
      const label = action.payload.isDraft ? 'RFQ Saved as Draft' : 'RFQ Published';
      const desc = action.payload.isDraft ? `${rfq.title} saved as draft` : `${rfq.title} sent to ${rfq.assignedVendors?.length || 0} vendors`;
      return addLog(s, 'rfq', label, desc);
    }
    case 'SUBMIT_QUOTATION': {
      const q = { id: 'q' + Date.now(), status: 'submitted', submittedAt: new Date().toISOString().split('T')[0], ...action.payload };
      let s = { ...state, quotations: [...state.quotations, q] };
      return addLog(s, 'quotation', 'Quotation Submitted', `${q.vendorName} submitted quotation for RFQ`);
    }
    case 'SELECT_VENDOR': {
      const approval = {
        id: 'apr' + Date.now(), rfqId: action.payload.rfqId, quotationId: action.payload.quotationId,
        vendorId: action.payload.vendorId, vendorName: action.payload.vendorName,
        amount: action.payload.amount, status: 'awaiting_l1', currentStep: 1,
        chain: [
          { level: 'L1', name: 'Rahul Mehta', role: 'Procurement Head', status: 'awaiting', date: new Date().toISOString().split('T')[0], time: '' },
          { level: 'L2', name: 'Priya Shah', role: 'Finance Manager', status: 'pending', date: '', time: '' },
        ],
      };
      let s = { ...state, approvals: [...state.approvals, approval] };
      return addLog(s, 'quotation', 'Quotation Selected', `${action.payload.vendorName} selected — approval workflow initiated`);
    }
    case 'APPROVE': {
      const approvals = state.approvals.map(a => {
        if (a.id !== action.payload.id) return a;
        const chain = a.chain.map((c, i) => {
          if (i === a.currentStep - 1) return { ...c, status: 'approved', date: new Date().toISOString().split('T')[0], time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
          if (i === a.currentStep) return { ...c, status: 'awaiting', date: new Date().toISOString().split('T')[0] };
          return c;
        });
        const nextStep = a.currentStep + 1;
        const isComplete = nextStep > chain.length;
        return { ...a, chain, currentStep: nextStep, status: isComplete ? 'approved' : `awaiting_l${nextStep}` };
      });
      let s = { ...state, approvals };
      return addLog(s, 'approval', 'Approval Granted', `${action.payload.level} approved by ${action.payload.approverName}`);
    }
    case 'REJECT': {
      const approvals = state.approvals.map(a => {
        if (a.id !== action.payload.id) return a;
        const chain = a.chain.map((c, i) => i === a.currentStep - 1 ? { ...c, status: 'rejected' } : c);
        return { ...a, chain, status: 'rejected' };
      });
      let s = { ...state, approvals };
      return addLog(s, 'approval', 'Approval Rejected', `Procurement request rejected by ${action.payload.approverName}`);
    }
    case 'GENERATE_PO': {
      const po = { id: 'po' + Date.now(), poNumber: `PO-2025-${String(state.purchaseOrders.length + 68).padStart(4, '0')}`, status: 'pending_payment', poDate: new Date().toISOString().split('T')[0], invoiceDate: new Date().toISOString().split('T')[0], dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0], ...action.payload };
      let s = { ...state, purchaseOrders: [...state.purchaseOrders, po] };
      return addLog(s, 'invoice', 'PO Generated', `${po.poNumber} generated for ${po.vendorName}`);
    }
    case 'MARK_PAID': {
      const purchaseOrders = state.purchaseOrders.map(po => po.id === action.payload.id ? { ...po, status: 'paid' } : po);
      let s = { ...state, purchaseOrders };
      return addLog(s, 'invoice', 'Payment Recorded', `${action.payload.poNumber} marked as paid`);
    }
    case 'RESET_DATA':
      return initialState;
    default:
      return state;
  }
}

export function AppDataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  useEffect(() => {
    localStorage.setItem('vb_appdata', JSON.stringify(state));
  }, [state]);

  return (
    <AppDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppDataContext.Provider>
  );
}

export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
};
