/**
 * Sample Code Examples for ImpactSync AI Analysis
 * These examples demonstrate various code patterns and issues
 */

// -------------------- EXAMPLE 1: INSECURE LOGIN --------------------
// Issues: Hardcoded return, sensitive data logging, no validation
async function insecureLogin(username, password) {
  console.log("User credentials:", username, password);
  return true;
}

// -------------------- EXAMPLE 2: MISSING ERROR HANDLING --------------------
// Issues: No try-catch, no validation
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data;
}

// -------------------- EXAMPLE 3: ASYNC MISUSE --------------------
// Issues: Missing await
async function processData() {
  const result = expensiveOperation();
  return result;
}

// -------------------- EXAMPLE 4: PARTIAL VALIDATION --------------------
// Issues: Incomplete validation, no error handling
function validateUser(user) {
  if (!user.email) {
    return false;
  }
  return true;
}

// -------------------- EXAMPLE 5: SECURE IMPLEMENTATION --------------------
// Good: Proper validation, error handling, no sensitive logging
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

// -------------------- EXAMPLE 6: API ENDPOINT --------------------
// Issues: No input validation, no error handling
async function createUser(req, res) {
  const user = await db.users.create(req.body);
  res.json(user);
}

// -------------------- EXAMPLE 7: SECURE API ENDPOINT --------------------
// Good: Validation, error handling, sanitization
async function secureCreateUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await db.users.create({
      username: sanitize(username),
      email: sanitize(email),
      passwordHash: hashedPassword
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email
    });

  } catch (err) {
    console.error("User creation error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  insecureLogin,
  fetchUserData,
  processData,
  validateUser,
  secureLogin,
  createUser,
  secureCreateUser
};

// Made with Bob
