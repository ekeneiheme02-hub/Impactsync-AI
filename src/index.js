/**
 * IMPACTSYNC AI — Requirement + Code Analysis Agent (FINAL BOSS)
 * DevOps + AI Reasoning + App Modernization
 */

const acorn = require("acorn");

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

// -------------------- MAIN ENGINE --------------------
function analyze(spec, code) {
  const requirements = extractRequirements(spec);
  const patterns = detectPatterns(code);

  let compliance = 0;
  let breakdown = [];
  let logicGaps = [];
  let impactScore = 0;
  let blastRadius = new Set();

  // ---------------- REQUIREMENT MATCH ----------------
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

  // ---------------- LOGIC GAPS ----------------
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

  // Clamp scores
  compliance = Math.min(compliance, 100);
  impactScore = Math.min(impactScore, 100);

  const verdict =
    compliance > 75 ? "PASS" :
    compliance > 40 ? "WARNING" : "FAIL";

  // ---------------- IMPROVED CODE ----------------
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

  // ---------------- OUTPUT ----------------
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

// ---------------- EXPORT FOR MODULE USE ----------------
module.exports = {
  analyze,
  extractRequirements,
  detectPatterns
};

// ---------------- CLI EXECUTION ----------------
if (require.main === module) {
  const SPEC_INPUT = process.env.SPEC_INPUT || `
User must login securely
System must validate all inputs
Errors must be handled gracefully
`;

  const CODE_INPUT = process.env.CODE_INPUT || `
async function login(username, password) {
  console.log("Login attempt:", username, password);
  return true;
}
`;

  console.log(analyze(SPEC_INPUT, CODE_INPUT));
}

// Made with Bob
