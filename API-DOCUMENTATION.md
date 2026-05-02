# 🔌 ImpactSync AI - API Documentation

## Base URL

**Local Development:**
```
http://localhost:5000
```

**Production:**
```
https://your-backend.onrender.com
```

---

## Endpoints

### 1. Health Check

**GET** `/`

Check if the API is running.

#### Response

```json
{
  "status": "online",
  "service": "ImpactSync AI",
  "version": "1.0.0",
  "endpoints": {
    "analyze": "POST /analyze"
  }
}
```

#### Example

```bash
curl http://localhost:5000/
```

---

### 2. Analyze Code

**POST** `/analyze`

Analyze code against requirements and get comprehensive security and quality report.

#### Request Body

```json
{
  "spec": "string (required) - Requirements specification",
  "code": "string (required) - JavaScript code to analyze"
}
```

#### Request Example

```json
{
  "spec": "User must login securely\nSystem must validate all inputs\nErrors must be handled gracefully",
  "code": "async function login(username, password) {\n  console.log('Login attempt:', username, password);\n  return true;\n}"
}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "result": "Detailed analysis report (string)"
}
```

#### Error Responses

**400 Bad Request** - Missing required fields
```json
{
  "error": "Missing spec or code input"
}
```

**400 Bad Request** - Invalid JavaScript syntax
```json
{
  "error": "Invalid JavaScript syntax"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error",
  "details": "Error message"
}
```

---

## Usage Examples

### JavaScript (Fetch API)

```javascript
const analyzeCode = async (spec, code) => {
  try {
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spec, code })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log(data.result);
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
};

// Usage
const spec = `
User must login securely
System must validate all inputs
Errors must be handled gracefully
`;

const code = `
async function login(username, password) {
  console.log("Login attempt:", username, password);
  return true;
}
`;

analyzeCode(spec, code);
```

### React Example

```jsx
import { useState } from 'react';

function CodeAnalyzer() {
  const [spec, setSpec] = useState('');
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spec, code })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.result);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`Request failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea 
        placeholder="Enter requirements..."
        value={spec}
        onChange={(e) => setSpec(e.target.value)}
      />
      <textarea 
        placeholder="Enter code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      <pre>{result}</pre>
    </div>
  );
}
```

### cURL

```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "spec": "Implement secure login with validation and error handling",
    "code": "function login(p){ console.log(p); return true; }"
  }'
```

### Python (requests)

```python
import requests
import json

url = "http://localhost:5000/analyze"

payload = {
    "spec": "User must login securely\nSystem must validate all inputs",
    "code": "async function login(username, password) { return true; }"
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    data = response.json()
    if data.get("success"):
        print(data["result"])
    else:
        print(f"Error: {data.get('error')}")
else:
    print(f"Request failed with status {response.status_code}")
```

### Postman

1. **Method:** POST
2. **URL:** `http://localhost:5000/analyze`
3. **Headers:**
   - `Content-Type: application/json`
4. **Body (raw JSON):**
```json
{
  "spec": "User must login securely\nSystem must validate all inputs\nErrors must be handled gracefully",
  "code": "async function login(username, password) {\n  console.log('Login attempt:', username, password);\n  return true;\n}"
}
```

---

## Analysis Report Structure

The API returns a comprehensive 12-point analysis:

1. **Compliance Score** (0-100)
2. **Verdict** (PASS/WARNING/FAIL)
3. **Requirement Breakdown** (✅ Met / ⚠️ Partial / ❌ Missing)
4. **Logic Gaps** (Security and quality issues)
5. **Impact Score** (0-100)
6. **Blast Radius** (Affected systems)
7. **Cascade Failure** (Chain reaction scenarios)
8. **Failure Scenarios** (Specific risks)
9. **Business Impact** (Revenue, trust, compliance)
10. **Performance Impact** (Efficiency issues)
11. **Suggested Fix** (Production-ready code)
12. **Improvement Summary** (What was fixed)

---

## CORS Configuration

The API is configured with CORS enabled, allowing requests from any origin. For production, configure specific origins:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider adding rate limiting:

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/analyze', limiter);
```

---

## Error Handling

All errors are returned in JSON format with appropriate HTTP status codes:

- **400** - Bad Request (invalid input)
- **500** - Internal Server Error

---

## Security Considerations

1. **Input Validation:** All inputs are validated before processing
2. **Syntax Checking:** Code is parsed with Acorn to prevent malicious input
3. **Request Size Limit:** JSON payload limited to 1MB
4. **CORS:** Configure for production environments
5. **Rate Limiting:** Implement for production use

---

## Deployment

### Local Development

```bash
npm install
npm run server
```

### Production (Render, Heroku, etc.)

1. Set `PORT` environment variable
2. Deploy with `npm start` or `npm run server`
3. Configure CORS for your frontend domain

---

## Support

For issues or questions:
- 🐛 [Report a Bug](https://github.com/ekeneiheme02-hub/Impactsync-AI/issues)
- 📧 Contact: your-email@example.com

---

**Made with ❤️ by the ImpactSync AI Team**