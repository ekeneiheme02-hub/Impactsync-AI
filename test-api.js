/**
 * ImpactSync AI - API Test Script
 * Tests the backend API endpoints
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';

// Helper function to make HTTP requests
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: JSON.parse(body)
          };
          resolve(response);
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test cases
async function runTests() {
  console.log('🧪 Starting API Tests...\n');
  console.log('=' .repeat(80));

  let passed = 0;
  let failed = 0;

  // Test 1: Health Check
  console.log('\n📋 TEST 1: Health Check (GET /)');
  console.log('-'.repeat(80));
  try {
    const response = await makeRequest('/');
    if (response.statusCode === 200 && response.body.status === 'online') {
      console.log('✅ PASSED - Server is online');
      console.log('Response:', JSON.stringify(response.body, null, 2));
      passed++;
    } else {
      console.log('❌ FAILED - Unexpected response');
      console.log('Response:', response);
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED - Request error:', error.message);
    failed++;
  }

  // Test 2: Analyze with valid input
  console.log('\n📋 TEST 2: Analyze Code - Valid Input');
  console.log('-'.repeat(80));
  try {
    const data = {
      spec: 'User must login securely\nSystem must validate all inputs\nErrors must be handled gracefully',
      code: 'async function login(username, password) {\n  console.log("Login attempt:", username, password);\n  return true;\n}'
    };

    const response = await makeRequest('/analyze', 'POST', data);
    
    if (response.statusCode === 200 && response.body.success) {
      console.log('✅ PASSED - Analysis completed successfully');
      console.log('Result preview:', response.body.result.substring(0, 200) + '...');
      passed++;
    } else {
      console.log('❌ FAILED - Unexpected response');
      console.log('Response:', response);
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED - Request error:', error.message);
    failed++;
  }

  // Test 3: Missing spec parameter
  console.log('\n📋 TEST 3: Analyze Code - Missing Spec');
  console.log('-'.repeat(80));
  try {
    const data = {
      code: 'function test() { return true; }'
    };

    const response = await makeRequest('/analyze', 'POST', data);
    
    if (response.statusCode === 400 && response.body.error) {
      console.log('✅ PASSED - Correctly rejected missing spec');
      console.log('Error:', response.body.error);
      passed++;
    } else {
      console.log('❌ FAILED - Should return 400 error');
      console.log('Response:', response);
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED - Request error:', error.message);
    failed++;
  }

  // Test 4: Missing code parameter
  console.log('\n📋 TEST 4: Analyze Code - Missing Code');
  console.log('-'.repeat(80));
  try {
    const data = {
      spec: 'Test requirement'
    };

    const response = await makeRequest('/analyze', 'POST', data);
    
    if (response.statusCode === 400 && response.body.error) {
      console.log('✅ PASSED - Correctly rejected missing code');
      console.log('Error:', response.body.error);
      passed++;
    } else {
      console.log('❌ FAILED - Should return 400 error');
      console.log('Response:', response);
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED - Request error:', error.message);
    failed++;
  }

  // Test 5: Invalid JavaScript syntax
  console.log('\n📋 TEST 5: Analyze Code - Invalid Syntax');
  console.log('-'.repeat(80));
  try {
    const data = {
      spec: 'Test requirement',
      code: 'function test() { this is invalid syntax'
    };

    const response = await makeRequest('/analyze', 'POST', data);
    
    if (response.statusCode === 400 && response.body.error === 'Invalid JavaScript syntax') {
      console.log('✅ PASSED - Correctly rejected invalid syntax');
      console.log('Error:', response.body.error);
      passed++;
    } else {
      console.log('❌ FAILED - Should return syntax error');
      console.log('Response:', response);
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED - Request error:', error.message);
    failed++;
  }

  // Test 6: Secure code analysis
  console.log('\n📋 TEST 6: Analyze Code - Secure Implementation');
  console.log('-'.repeat(80));
  try {
    const data = {
      spec: 'Secure user authentication\nValidate all inputs\nHandle errors properly',
      code: `async function secureLogin({ username, password }, db) {
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
}`
    };

    const response = await makeRequest('/analyze', 'POST', data);
    
    if (response.statusCode === 200 && response.body.success) {
      console.log('✅ PASSED - Secure code analyzed successfully');
      console.log('Result preview:', response.body.result.substring(0, 200) + '...');
      passed++;
    } else {
      console.log('❌ FAILED - Unexpected response');
      console.log('Response:', response);
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED - Request error:', error.message);
    failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Total: ${passed + failed}`);
  console.log(`🎯 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(2)}%`);
  console.log('='.repeat(80));

  if (failed === 0) {
    console.log('\n🎉 All tests passed! API is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the server logs.');
  }
}

// Check if server is running before tests
async function checkServer() {
  try {
    await makeRequest('/');
    return true;
  } catch (error) {
    return false;
  }
}

// Main execution
(async () => {
  console.log('🔍 Checking if server is running...');
  const serverRunning = await checkServer();

  if (!serverRunning) {
    console.log('❌ Server is not running!');
    console.log('Please start the server first:');
    console.log('  npm run server');
    console.log('  or');
    console.log('  node server.js');
    process.exit(1);
  }

  console.log('✅ Server is running!\n');
  await runTests();
})();

// Made with Bob
