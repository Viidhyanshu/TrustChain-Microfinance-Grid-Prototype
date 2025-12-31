# 🔗 TrustChain Microfinance Grid Prototype

> Blockchain-powered ecosystem for transparent and inclusive rural microfinance in India

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML](https://img.shields.io/badge/HTML-23.9%25-orange)](https://github.com/Viidhyanshu/TrustChain-Microfinance-Grid-Prototype)
[![JavaScript](https://img.shields.io/badge/JavaScript-60.3%25-yellow)](https://github.com/Viidhyanshu/TrustChain-Microfinance-Grid-Prototype)
[![CSS](https://img.shields.io/badge/CSS-15.8%25-blue)](https://github.com/Viidhyanshu/TrustChain-Microfinance-Grid-Prototype)

## 📖 Overview

TrustChain Microfinance Grid is a fully functional blockchain prototype designed to revolutionize India's rural microfinance ecosystem. This interactive web application demonstrates a complete microfinance workflow with multi-layer blockchain architecture, smart contract automation, trust scoring, and real-time analytics - all running directly in your browser.

## 🎯 Mission

To develop a trust-based microfinance infrastructure that is:
- **Inclusive**: Accessible to digitally underserved communities
- **Accountable**: Transparent workflows with regulatory compliance
- **Equitable**: Fair access to credit for rural borrowers
- **Scalable**: Built for widespread adoption across rural India

## ✨ Key Features

### 🏗️ Multi-Layered Blockchain Architecture
- **Public Layer**: Transparent transaction tracking for community oversight
- **Permissioned Layer**: Controlled access for institutional participants (banks, MFIs)
- **Sidechain**: Privacy-preserving storage for sensitive borrower data
- Switch between layers seamlessly in the UI
- Independent block producers and transaction queues per layer

### 📝 Smart Contract State Machine
Complete loan lifecycle automation with 5-state workflow:
```
REQUEST → APPROVE → DISBURSE → REPAY → CLOSE
```
- One-click loan request submission
- Automated approval workflow
- Fund disbursement tracking  
- Repayment monitoring with partial payment support
- Contract closure and settlement

### 🎖️ Dynamic Trust Scoring System
- Real-time trust score calculation (40-99 range)
- Algorithm: `40 + (repaid/total × 50) + random(0-10)`
- Tracks loan history across all layers
- Reputation-based lending decisions
- Fraud detection via trust score degradation

### 📱 Multi-Modal Authentication (Simulated)
- **Biometric**: Fingerprint/facial recognition simulation
- **Voice Authentication**: Voice-based user verification  
- **USSD**: `*99*XXXX` code generation for offline access
- Designed for low-literacy and low-connectivity environments

### 📊 Real-Time Analytics Dashboard
- **Total Loans**: Active loan request tracking
- **Active Borrowers**: Unique user counting
- **Layer Distribution**: Interactive Chart.js visualization showing tx distribution
- **Unified Feed**: Cross-layer transaction timeline with media support
- **Block Explorer**: View last 10 blocks with timestamps, tx counts, and hashes

### 🎭 Role-Based Access Control
Four distinct user roles with different permissions:
- **Borrower**: Request loans, view trust scores
- **Lender**: Approve/reject loans, disburse funds, mine blocks
- **Regulator**: Monitor all transactions, view compliance data
- **Analyst**: Access NLP tools, risk analysis

## 🛠️ Technology Stack

- **Frontend**: Pure HTML5, CSS3 (weave.css), Vanilla JavaScript (wisdom.js)
- **Charts**: Chart.js 4.4.0 for data visualization
- **Icons**: Font Awesome 6.5.0
- **Storage**: Browser LocalStorage for persistence
- **Styling**: Custom CSS with glassmorphism effects
- **Blockchain**: Custom JavaScript implementation
  - Multi-layer ledger system
  - Block production with hashing
  - Transaction queue management
  - Cross-layer synchronization

## 🎨 Design Features

### Modern Dark Theme
- **Primary**: Golden yellow accent (#FFD60A, #FFB703)
- **Background**: Deep black gradient (#000 → #1A1A1A)
- **Panels**: Glassmorphism with blur(6px) and backdrop filters
- **Shadows**: Glowing card shadows (0 10px 30px rgba(255,214,10,0.15))

### Responsive Layout
- 3-column grid: 320px sidebar | flexible main | 420px analytics
- Collapses to single column on mobile (<1100px)
- Smooth animations and hover effects
- Custom scrollbars for ledger and feed

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript enabled
- LocalStorage enabled (for data persistence)
- Internet connection (for CDN assets: Chart.js, Font Awesome)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Viidhyanshu/TrustChain-Microfinance-Grid-Prototype.git
cd TrustChain-Microfinance-Grid-Prototype
```

2. **Open the application**
```bash
# Method 1: Direct file open
# Double-click index.html in file explorer

# Method 2: Local server (recommended)
python -m http.server 8000
# or
python3 -m http.server 8000
# or
npx serve

# Then open: http://localhost:8000
```

3. **No build process required!** Pure vanilla JavaScript, runs directly in browser.

## 🎮 Complete Usage Guide

### Step 1: Create a User Profile
1. Enter user details:
   - **Name**: e.g., "Rajesh Kumar"
   - **Phone**: e.g., "9876543210"  
   - **Village/Region**: e.g., "Jaipur, Rajasthan"
2. Click **"Create User"** → generates unique user ID
3. Simulate authentication methods:
   - **Biometric**: Simulates fingerprint/facial recognition
   - **Voice Auth**: Simulates voice verification
   - **USSD**: Generates offline USSD code `*99*XXXX`
4. View your auto-calculated **TrustScore** (starts around 40-50)

### Step 2: Configure Layer & Role
- **Layer Selection** (top-right dropdown):
  - `Public`: For transparent community transactions
  - `Permissioned`: For institutional lending
  - `Sidechain`: For privacy-sensitive data
- **Role Selection** (top-right dropdown):
  - `Borrower`: Request and track loans
  - `Lender`: Approve loans and mine blocks (shows Mine button)
  - `Regulator`: Monitor and audit
  - `Analyst`: NLP and risk analysis

### Step 3: Request a Loan (Borrower Role)
1. Fill loan details:
   - **Loan Amount**: e.g., 50000 (INR)
   - **Tenure**: e.g., 12 (months)
   - **Purpose**: e.g., "Dairy equipment" or "Seeds"
2. Click **"Request Loan"**
3. Transaction added to pending queue (visible in "Offline queue" count)
4. Appears in Smart Contract section as "REQUESTED"

### Step 4: Process Loans (Lender Role)
1. Switch role to **Lender** (Mine button appears)
2. View pending loans in **Smart Contract** panel
3. Use action buttons for each loan:
   - **Approve**: Change state to APPROVED
   - **Disburse**: Release funds (state → DISBURSED)
   - **Mark Repay**: Record payment (calculates amount/4)
   - **Close**: Complete loan cycle (state → CLOSED)
4. Click **"Produce Block"** to commit all pending transactions
5. Block appears in ledger with:
   - Block number (#1, #2, etc.)
   - Timestamp
   - Transaction count
   - Hash (first 8 chars shown)

### Step 5: Monitor & Analyze

**Block Explorer**
- Shows last 10 blocks on active layer
- Block index, timestamp, tx count, hash preview
- Real-time updates every 1.5 seconds

**Analytics Dashboard**
- Total Loans: Count of all loan transactions
- Active Borrowers: Unique user count
- Chart: Bar graph showing tx distribution by layer (Public/Permissioned/Sidechain)

**Unified Feed**
- Cross-layer transaction timeline
- Shows all actions: loans, approvals, disbursements, etc.
- Displays user, timestamp, layer badge, description
- Supports media attachments (images, videos)

**NLP Risk Analysis**
1. Paste text in textarea (social media posts, field notes)
2. Click **"Ingest"**: Adds entries to public layer with risk flags
3. Click **"Analyze"**: Shows count of risky mentions
4. Detects keywords: default, late, fraud, fake, evade, dispute, overdue, repay, loan shark

### Special Features

**Sync Pending** (top-right button)
- Commits all pending transactions on ALL three layers
- Creates blocks automatically
- Useful for batch processing

**Zero-Knowledge Verification**
- Click **"Verify"** button in main panel
- Simulates ZK-proof validation (80% success rate)
- Message: "Proof Verified no borrower PII disclosed" or "Proof Failed..."

**Reset Demo**
- Clears all LocalStorage data
- Removes all blocks, transactions, and user profiles
- Confirms before reset
- Page reloads automatically

## 💡 How It Works

### Blockchain Data Structure

**Layer Storage Keys**
```javascript
{
  public: 'tc_public_v1',
  permissioned: 'tc_permissioned_v1', 
  sidechain: 'tc_sidechain_v1'
}
```

**Block Structure**
```javascript
{
  index: 1,              // Sequential block number
  ts: 1704067200000,     // Unix timestamp (ms)
  txs: [...],            // Array of transactions
  prev: "abc123def",     // Previous block hash
  hash: "456789abc"      // Current block hash (custom algorithm)
}
```

**Transaction Structure**
```javascript
{
  id: "tx1704067200abc",    // Unique tx ID
  action: "REQUEST_LOAN",    // Action type
  userId: "user_abc123",     // User identifier
  amount: 50000,             // Loan amount (INR)
  tenure: 12,                // Months
  purpose: "Seeds",          // Description
  state: "REQUESTED",        // Current state
  ts: 1704067200000,         // Timestamp
  layer: "public"            // Origin layer
}
```

### Hash Algorithm
Custom hash function for demo purposes:
```javascript
function fakeHash(s) {
  let h = 0;
  for(let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0; // Convert to 32-bit integer
  }
  return (Math.abs(h)).toString(16);
}
```

### Trust Score Calculation
```javascript
Base Score: 40
+ (Repaid Loans / Total Loans) × 50  
+ Random Variance: 0-10
= Final Score (capped at 99)

Example:
- 0 loans: 40 + 0 + random(0-10) = 40-50
- 2/4 loans repaid: 40 + 25 + random(0-10) = 65-75
- 4/4 loans repaid: 40 + 50 + random(0-10) = 90-99
```

### Auto-Refresh System
```javascript
setInterval(() => {
  renderLedger();
  renderFeed();
  renderCharts();
  renderContractView();
  updatePendingCount();
}, 1500); // Updates every 1.5 seconds
```

## 📋 File Structure

```
TrustChain-Microfinance-Grid-Prototype/
├── index.html          # Main application interface (23.9%)
├── wisdom.js           # Core blockchain logic (60.3%)
├── weave.css          # Custom styling and theme (15.8%)
└── README.md          # Documentation
```


## 🔐 Privacy & Security

### Data Protection
- **Layer Isolation**: Sensitive data stored in Sidechain
- **Local-Only Storage**: All data in browser LocalStorage (no server transmission)
- **ZK Simulation**: Zero-knowledge proof verification (80% success rate)
- **Hash Integrity**: Custom hashing for block validation
- **No External Calls**: Pure client-side application

### Compliance Features
- **Immutable Audit Trail**: All transactions timestamped and hashed
- **Role-Based Permissions**: Different access levels per role
- **Public Oversight**: Public layer for transparency
- **Cross-Layer Queries**: Unified feed shows all activity

### Known Security Limitations (Demo)
⚠️ **This is a prototype for demonstration only**
- LocalStorage is not encrypted
- Hash function is simplified (not SHA-256)
- No actual cryptographic signatures
- Biometric/Voice auth are UI simulations
- No server-side validation
- No real blockchain consensus

## 🤝 Contributing

Contributions from developers, blockchain enthusiasts, and social impact advocates are welcome!

### How to Contribute

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open Pull Request**

### Areas for Contribution

**Code Improvements**
- [ ] Add input validation on forms
- [ ] Implement proper error boundaries
- [ ] Write unit tests (Jest/Mocha)
- [ ] Add JSDoc comments
- [ ] Optimize re-rendering logic

**Features**
- [ ] Export transaction history (JSON/CSV)
- [ ] Import seed data for demos
- [ ] Add search/filter in feed
- [ ] Pagination for block explorer
- [ ] Loan calculator widget
- [ ] Dispute resolution workflow

**UI/UX**
- [ ] Mobile-responsive improvements
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Loading states and skeletons
- [ ] Toast notifications instead of alerts
- [ ] Improved form validation feedback
- [ ] Onboarding tutorial/walkthrough

**Documentation**
- [ ] API documentation
- [ ] Architecture diagrams
- [ ] Video tutorial/demo
- [ ] Translation (Hindi, regional languages)
- [ ] Developer guide

## 🐛 Known Issues & Limitations

### Browser Compatibility
- Requires modern browser with ES6+ support
- LocalStorage must be enabled
- CDN assets need internet connection

### Data Persistence
- Data cleared when browser cache is cleared
- No server-side backup
- Max LocalStorage ~5-10MB per domain
- Not suitable for production use

### Authentication
- Biometric/Voice/USSD are UI simulations only
- No actual device integration
- No session management
- No password protection

### Blockchain
- Simplified hash function (not SHA-256)
- No consensus mechanism
- No network distribution
- Single-user only (no peer-to-peer)

### Performance
- Auto-refresh every 1.5s may impact performance with many transactions
- Chart.js re-renders on every update
- No pagination on feed (limited to 100 items)

## ⚠️ Troubleshooting

**Data not persisting after refresh?**
- Check if LocalStorage is enabled in browser settings
- Don't use private/incognito mode
- Check available storage: `navigator.storage.estimate()`
- Try different browser

**Chart not rendering?**
- Verify Chart.js CDN is accessible (check Network tab)
- Check browser console for errors
- Ensure internet connection for CDN
- Try hard refresh: `Ctrl+Shift+R` (Win) or `Cmd+Shift+R` (Mac)

**UI elements missing or misaligned?**
- Check browser console for JavaScript errors
- Verify all files (index.html, wisdom.js, weave.css) are present
- Check Font Awesome CDN is loading
- Try clearing browser cache

**Buttons not working?**
- Open browser console (F12) to see errors
- Ensure JavaScript is enabled
- Check if element IDs match in HTML and JS
- Try clicking "Reset" and starting fresh

**"Cannot read property of null" errors?**
- Some DOM elements may be missing
- Check browser console for specific element ID
- Verify HTML structure hasn't been modified

**Pending transactions not showing?**
- Click "Mine Block" to commit transactions
- Check active layer (top-right dropdown)
- View "Offline queue" count in sidebar
- Try "Sync Pending" button

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025 Viidhyanshu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## Project Lead & Developer
- GitHub: [@Viidhyanshu](https://github.com/Viidhyanshu)
- Role: Full-stack development, blockchain architecture, UI/UX design

## 🙏 Acknowledgments
- **Rural India**: For inspiring this solution to real-world financial inclusion challenges
- **Blockchain Community**: For open-source tools and knowledge
- **Chart.js**: For excellent data visualization library
- **Font Awesome**: For beautiful icon set
- **MDN Web Docs**: For comprehensive JavaScript documentation

## 🌍 Social Impact & UN SDGs
TrustChain contributes to:
- **SDG 1**: No Poverty - Accessible microloans for rural entrepreneurs
- **SDG 8**: Decent Work and Economic Growth - Supporting small business creation
- **SDG 9**: Industry, Innovation & Infrastructure - Blockchain for financial inclusion
- **SDG 10**: Reduced Inequalities - Equal access to credit for underserved communities
- **SDG 17**: Partnerships for the Goals - Connecting lenders, borrowers, regulators

---
