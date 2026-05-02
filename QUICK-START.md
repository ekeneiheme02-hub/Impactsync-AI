# 🚀 Quick Start Guide - ImpactSync AI

## 📦 Installation

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- `acorn` - JavaScript parser
- `express` - Web framework
- `cors` - Cross-origin resource sharing

---

## 🎯 Running the Application

### Option 1: Run Backend API Server

```bash
npm run server
```

or

```bash
node server.js
```

**Server will start on:** `http://localhost:5000`

### Option 2: Run CLI Analysis Tool

```bash
npm start
```

or

```bash
node src/index.js
```

### Option 3: Run Test Suite

```bash
npm test
```

or

```bash
node examples/test-analysis.js
```

### Option 4: Test API Endpoints

**First, start the server:**
```bash
npm run server
```

**Then, in a new terminal:**
```bash
npm run test:api
```

or

```bash
node test-api.js
```

---

## 🧪 Testing the API

### Using cURL

```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "spec": "User must login securely\nSystem must validate all inputs\nErrors must be handled gracefully",
    "code": "async function login(username, password) { console.log(username, password); return true; }"
  }'
```

### Using JavaScript (Fetch)

```javascript
fetch('http://localhost:5000/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    spec: 'User must login securely\nSystem must validate all inputs',
    code: 'async function login(username, password) { return true; }'
  })
})
.then(res => res.json())
.then(data => console.log(data.result))
.catch(err => console.error(err));
```

### Using Postman

1. **Method:** POST
2. **URL:** `http://localhost:5000/analyze`
3. **Headers:** `Content-Type: application/json`
4. **Body (raw JSON):**
```json
{
  "spec": "User must login securely\nSystem must validate all inputs\nErrors must be handled gracefully",
  "code": "async function login(username, password) {\n  console.log('Login attempt:', username, password);\n  return true;\n}"
}
```

---

## 📁 Project Structure

```
impactsync-ai/
├── src/
│   └── index.js              # CLI analysis tool
├── examples/
│   ├── test-analysis.js      # Test scenarios
│   └── sample-code.js        # Sample code examples
├── server.js                 # Express API server
├── test-api.js              # API test suite
├── package.json             # Dependencies & scripts
├── README.md                # Main documentation
├── API-DOCUMENTATION.md     # API reference
├── QUICK-START.md          # This file
└── .gitignore              # Git ignore rules
```

---

## 🔧 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `node src/index.js` | Run CLI analysis tool |
| `npm run server` | `node server.js` | Start API server |
| `npm run dev` | `node server.js` | Start API server (dev mode) |
| `npm test` | `node examples/test-analysis.js` | Run test scenarios |
| `npm run test:api` | `node test-api.js` | Test API endpoints |
| `npm run analyze` | `node src/index.js` | Run CLI analysis tool |

---

## 🌐 API Endpoints

### Health Check
```
GET http://localhost:5000/
```

### Analyze Code
```
POST http://localhost:5000/analyze
Content-Type: application/json

{
  "spec": "Requirements specification",
  "code": "JavaScript code to analyze"
}
```

---

## 📊 Example Output

```
1. COMPLIANCE SCORE (0–100):
40

2. VERDICT:
WARNING

3. REQUIREMENT BREAKDOWN:
• User must login securely → ⚠️ Partial
• System must validate all inputs → ❌ Missing
• Errors must be handled gracefully → ❌ Missing

4. LOGIC GAPS:
• Missing input validation
• No error handling
• Sensitive data exposure via logs
• Authentication bypass (hardcoded success)

5. IMPACT SCORE (0–100):
80

6. BLAST RADIUS:
API, Backend, Auth

7. CASCADE FAILURE:
• Invalid input bypasses validation
• Incorrect logic allows unauthorized access
• Sensitive data exposed in logs
• System integrity compromised
• Potential outage or breach

8. FAILURE SCENARIO:
• Authentication bypass
• Sensitive data leakage
• Unhandled runtime errors

9. BUSINESS IMPACT:
• Security breach risk
• User trust loss
• Revenue and compliance damage

10. PERFORMANCE IMPACT:
• Increased retries from failures
• Inefficient execution paths

11. SUGGESTED FIX (IMPROVED CODE):
[Production-ready secure implementation provided]

12. IMPROVEMENT SUMMARY:
Added validation, enforced secure authentication logic, removed unsafe patterns, 
introduced structured error handling, and improved system reliability.
```

---

## 🔥 Common Issues

### Port Already in Use

If port 5000 is already in use:

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

Or change the port:
```bash
PORT=3000 npm run server
```

### Dependencies Not Installed

```bash
npm install
```

### Server Not Starting

Check if Node.js is installed:
```bash
node --version
npm --version
```

Should be Node.js >= 14.0.0

---

## 🚀 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start the server: `npm run server`
3. ✅ Test the API: `npm run test:api`
4. ✅ Read API docs: `API-DOCUMENTATION.md`
5. ✅ Deploy to production (see `DEPLOYMENT.md`)

---

## 📞 Need Help?

- 📖 Read the full documentation: `README.md`
- 🔌 API reference: `API-DOCUMENTATION.md`
- 🐛 Report issues: [GitHub Issues](https://github.com/ekeneiheme02-hub/Impactsync-AI/issues)

---

**Happy Coding! 🎉**