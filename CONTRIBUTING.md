# Contributing to ImpactSync AI

Thank you for your interest in contributing to ImpactSync AI! We welcome contributions from the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and help them learn
- ✅ Focus on constructive feedback
- ✅ Accept responsibility and apologize for mistakes
- ❌ No harassment, trolling, or discriminatory behavior
- ❌ No spam or off-topic content

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Impactsync-AI.git
   cd Impactsync-AI
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ekeneiheme02-hub/Impactsync-AI.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```

## 🤝 How to Contribute

### Types of Contributions

- 🐛 **Bug Fixes**: Fix issues and improve stability
- ✨ **New Features**: Add new functionality
- 📚 **Documentation**: Improve or add documentation
- 🧪 **Tests**: Add or improve test coverage
- 🎨 **UI/UX**: Improve user interface and experience
- ⚡ **Performance**: Optimize code performance
- 🔒 **Security**: Fix security vulnerabilities

## 💻 Development Setup

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn
- Git

### Setup Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Start development server**:
   ```bash
   npm run server
   ```

4. **Run tests**:
   ```bash
   npm test
   npm run test:api
   ```

## 📝 Coding Standards

### JavaScript Style Guide

- Use **ES6+** features
- Use **const** and **let** instead of **var**
- Use **arrow functions** where appropriate
- Use **async/await** instead of callbacks
- Add **JSDoc comments** for functions
- Keep functions **small and focused**
- Use **meaningful variable names**

### Example:

```javascript
/**
 * Analyzes code against requirements
 * @param {string} spec - Requirements specification
 * @param {string} code - Code to analyze
 * @returns {string} Analysis report
 */
function analyze(spec, code) {
  // Implementation
}
```

### File Structure

```
src/
├── index.js          # CLI tool
├── analyzer/         # Analysis logic
├── parsers/          # Code parsers
└── utils/            # Utility functions

server.js             # API server
test-api.js          # API tests
examples/            # Example code
```

### Naming Conventions

- **Files**: `kebab-case.js`
- **Functions**: `camelCase()`
- **Classes**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Variables**: `camelCase`

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run API tests
npm run test:api

# Run specific test file
node examples/test-analysis.js
```

### Writing Tests

- Add tests for new features
- Ensure tests pass before submitting PR
- Aim for high test coverage
- Test edge cases and error scenarios

### Test Example:

```javascript
// Test case
const result = analyze(spec, code);
if (result.includes("PASS")) {
  console.log("✅ Test passed");
} else {
  console.log("❌ Test failed");
}
```

## 🔄 Pull Request Process

### Before Submitting

1. ✅ **Update your fork**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. ✅ **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. ✅ **Make your changes**:
   - Write clean, documented code
   - Add tests for new features
   - Update documentation

4. ✅ **Test your changes**:
   ```bash
   npm test
   npm run test:api
   ```

5. ✅ **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

### Commit Message Format

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Test changes
- `refactor:` Code refactoring
- `style:` Code style changes
- `chore:` Maintenance tasks

**Examples:**
```
feat: add input validation to analyzer
fix: resolve async/await issue in parser
docs: update API documentation
test: add tests for edge cases
```

### Submitting PR

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub:
   - Use a clear, descriptive title
   - Reference related issues
   - Describe your changes
   - Add screenshots if applicable

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Testing
   - [ ] Tests pass locally
   - [ ] Added new tests
   - [ ] Updated documentation

   ## Related Issues
   Closes #123
   ```

### Review Process

- Maintainers will review your PR
- Address feedback and requested changes
- Once approved, your PR will be merged
- Your contribution will be credited

## 🐛 Reporting Bugs

### Before Reporting

- Check if the bug has already been reported
- Verify it's reproducible
- Collect relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g., Windows 11]
- Node.js version: [e.g., 18.0.0]
- Browser: [e.g., Chrome 120]

**Additional context**
Any other relevant information
```

## 💡 Suggesting Enhancements

### Enhancement Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem

**Describe the solution you'd like**
A clear description of what you want to happen

**Describe alternatives you've considered**
Alternative solutions or features

**Additional context**
Any other context or screenshots
```

## 📞 Getting Help

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report bugs via GitHub Issues
- 📧 **Email**: Contact maintainers directly
- 📚 **Documentation**: Check README.md and API-DOCUMENTATION.md

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to ImpactSync AI! 🎉**

Your contributions help make this project better for everyone.