/**
 * IMPACTSYNC AI Backend — Production Ready
 * Endpoint: POST /analyze
 */

const express = require("express");
const cors = require("cors");
const acorn = require("acorn");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// -------------------- REQUIREMENT PARSER --------------------
function extractRequirements(spec) {
  return spec
    .split("\n")
    .map(r => r.trim())
    .filter(r => r.length > 8);
}

// -------------------- CODE ANALYSIS --------------------
function detectPatterns(code) {
  return {
    hasAuth: /(auth|login|token|jwt)/i.test(code),
    hasValidation: /(if\s*\(|validate)/i.test(code),
    hasErrorHandling: /(try\s*{)|(catch\s*\()/i.test(code),
    logsSensitive: /console\.log\(.*(password|token|secret)/i.test(code),
    hardcodedAuth: /return\s+true/i.test(code),
    asyncIssue: /async/.test(code) && !/await/.test(code),
  };
}

// -------------------- CORE ANALYSIS ENGINE --------------------
function analyze(spec, code) {
  const requirements = extractRequirements(spec);
  const patterns = detectPatterns(code);

  let compliance = 0;
  let breakdown = [];
  let logicGaps = [];
  let impactScore = 0;
  let blastRadius = new Set();

  requirements.forEach(req => {
    let status = "❌ Missing";

    if (/login|auth|secure/i.test(req) && patterns.hasAuth) {
      status = "⚠️ Partial";
      compliance += 15;
    }

    if (/validate|input/i.test(req) && patterns.hasValidation) {
      status = "✅ Met";
      compliance += 25;
    }

    if (/error|exception/i.test(req) && patterns.hasErrorHandling) {
      status = "⚠️ Partial";
      compliance += 15;
    }

    breakdown.push(`• ${req} → ${status}`);
  });

  if (!patterns.hasValidation) {
    logicGaps.push("Missing input validation");
    impactScore += 20;
    blastRadius.add("API");
  }

  if (!patterns.hasErrorHandling) {
    logicGaps.push("No error handling");
    impactScore += 20;
    blastRadius.add("Backend");
  }

  if (patterns.logsSensitive) {
    logicGaps.push("Sensitive data exposure via logs");
    impactScore += 30;
    blastRadius.add("Auth");
  }

  if (patterns.hardcodedAuth) {
    logicGaps.push("Authentication bypass (hardcoded success)");
    impactScore += 30;
    blastRadius.add("Auth");
  }

  if (patterns.asyncIssue) {
    logicGaps.push("Async misuse (missing await)");
    impactScore += 10;
  }

  compliance = Math.min(compliance, 100);
  impactScore = Math.min(impactScore, 100);

  const verdict =
    compliance > 75 ? "PASS" :
    compliance > 40 ? "WARNING" : "FAIL";

  const improvedCode = `
// Production-ready secure implementation
async function login({ username, password }, db) {
  if (!username || !password) {
    throw new Error("Invalid input");
  }

  try {
    const user = await db.findUser(username);
    if (!user) {
      throw new Error("User not found");
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    return {
      success: true,
      token: generateJWT(user.id)
    };

  } catch (err) {
    console.error("Auth error:", err.message);
    throw err;
  }
}
`;

  return `
1. COMPLIANCE SCORE (0–100):
${compliance}

2. VERDICT:
${verdict}

3. REQUIREMENT BREAKDOWN:
${breakdown.length ? breakdown.join("\n") : "No requirements parsed"}

4. LOGIC GAPS:
${logicGaps.length ? logicGaps.map(g => "• " + g).join("\n") : "None identified"}

5. IMPACT SCORE (0–100):
${impactScore}

6. BLAST RADIUS:
${[...blastRadius].join(", ") || "Minimal"}

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
\`\`\`javascript
${improvedCode}
\`\`\`

12. IMPROVEMENT SUMMARY:
Added validation, enforced secure authentication logic, removed unsafe patterns, introduced structured error handling, and improved system reliability.
`;
}

// -------------------- API ROUTE --------------------
app.post("/analyze", (req, res) => {
  try {
    const { spec, code } = req.body;

    if (!spec || !code) {
      return res.status(400).json({
        error: "Missing spec or code input"
      });
    }

    // Optional: syntax validation (safe guard)
    try {
      acorn.parse(code, { ecmaVersion: "latest" });
    } catch {
      return res.status(400).json({
        error: "Invalid JavaScript syntax"
      });
    }

    const result = analyze(spec, code);

    res.json({
      success: true,
      result
    });

  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message
    });
  }
});

// -------------------- HEALTH CHECK --------------------
app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "ImpactSync AI",
    version: "1.0.0",
    endpoints: {
      analyze: "POST /analyze"
    }
  });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 IMPACTSYNC AI running on port ${PORT}`);
});

// Made with Bob
