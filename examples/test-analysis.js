/**
 * ImpactSync AI - Test Analysis Example
 * Demonstrates the analyzer with various code scenarios
 */

const { analyze } = require('../src/index.js');

console.log('='.repeat(80));
console.log('IMPACTSYNC AI - TEST ANALYSIS');
console.log('='.repeat(80));
console.log();

// -------------------- TEST CASE 1: INSECURE LOGIN --------------------
console.log('TEST CASE 1: Insecure Login Function');
console.log('-'.repeat(80));

const spec1 = `
User must login securely
System must validate all inputs
Errors must be handled gracefully
Authentication must use secure tokens
Password must not be logged
`;

const code1 = `
async function login(username, password) {
  console.log("Login attempt with credentials:", username, password);
  return true;
}
`;

console.log(analyze(spec1, code1));
console.log('\n' + '='.repeat(80) + '\n');

// -------------------- TEST CASE 2: PARTIAL IMPLEMENTATION --------------------
console.log('TEST CASE 2: Partial Implementation');
console.log('-'.repeat(80));

const spec2 = `
User authentication required
Input validation must be present
Error handling required
`;

const code2 = `
async function authenticate(username, password) {
  if (!username || !password) {
    return { error: "Invalid input" };
  }
  
  const user = await findUser(username);
  return { success: true, token: generateToken(user) };
}
`;

console.log(analyze(spec2, code2));
console.log('\n' + '='.repeat(80) + '\n');

// -------------------- TEST CASE 3: SECURE IMPLEMENTATION --------------------
console.log('TEST CASE 3: Secure Implementation');
console.log('-'.repeat(80));

const spec3 = `
Secure user authentication
Validate all inputs
Handle errors properly
Use JWT tokens
`;

const code3 = `
async function secureLogin({ username, password }, db) {
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

console.log(analyze(spec3, code3));
console.log('\n' + '='.repeat(80) + '\n');

// -------------------- TEST CASE 4: ASYNC MISUSE --------------------
console.log('TEST CASE 4: Async/Await Misuse');
console.log('-'.repeat(80));

const spec4 = `
Async operations must be handled correctly
Database queries must be awaited
`;

const code4 = `
async function getData() {
  const result = fetchFromDatabase();
  return result;
}
`;

console.log(analyze(spec4, code4));
console.log('\n' + '='.repeat(80) + '\n');

console.log('✅ All test cases completed!');

// Made with Bob
