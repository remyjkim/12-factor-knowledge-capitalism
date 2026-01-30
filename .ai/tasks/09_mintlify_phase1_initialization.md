# Phase 1: Mintlify Project Initialization

## Objective
Set up the foundational Mintlify project structure, verify tooling works correctly, and establish development workflow.

---

## Prerequisites

### System Requirements
- **Node.js**: v20.17.0 or higher ([Mintlify docs](https://www.mintlify.com/docs/installation))
- **Git**: For version control
- **npm**: Included with Node.js

### Recommended Tools
- **nvm** (macOS/Linux) or **nvm-windows** (Windows) for Node version management
- **VS Code** with MDX extension for syntax highlighting

---

## Step-by-Step Tasks

### Task 1.1: Verify Node.js Version
```bash
# Check current Node version
node --version

# If using nvm, install and use Node 20+
nvm install 20
nvm use 20
```

**Expected Output**: `v20.17.0` or higher

**Acceptance Criteria**:
- [ ] Node.js v20.17.0+ installed
- [ ] `node --version` returns valid version

---

### Task 1.2: Install Mintlify CLI
```bash
# Install globally
npm i -g mint

# Verify installation
mint --version
```

**Troubleshooting**:
- If "permission denied", use `sudo npm i -g mint` (macOS/Linux)
- If `mint version` shows client as "none", check VPN/firewall blocking `releases.mintlify.com`

**Acceptance Criteria**:
- [ ] `mint --version` returns valid version
- [ ] No installation errors
- [ ] Command available in PATH

---

### Task 1.3: Choose Project Structure

**Option A: Create in Current Directory** (Recommended for this project)
```bash
# Creates Mintlify files in current directory
cd /Users/pureicis/dev/12-factor-info-capitalism
mint new . --name "12 Factors of Knowledge Capitalism" --theme mint --force
```

**Option B: Create Separate docs/ Subdirectory**
```bash
# Keeps root directory clean
cd /Users/pureicis/dev/12-factor-info-capitalism
mkdir docs
cd docs
mint new . --name "12 Factors of Knowledge Capitalism" --theme mint --force
```

**Recommendation**: Use Option A (root directory) since this is a documentation-focused repo.

**Acceptance Criteria**:
- [ ] Decision made on project structure
- [ ] Documented in this task file

**Decision**: [  ] Root directory  [  ] docs/ subdirectory

---

### Task 1.4: Initialize Mintlify Project
```bash
# Initialize with required flags for non-interactive mode
mint new . \
  --name "12 Factors of Knowledge Capitalism" \
  --theme mint \
  --force
```

**What This Creates**:
- `docs.json` - Configuration and navigation
- `introduction.mdx` - Default homepage
- `essentials/` - Example pages (can be deleted later)

**Acceptance Criteria**:
- [ ] `docs.json` file exists
- [ ] At least one `.mdx` file exists
- [ ] No error messages during initialization

---

### Task 1.5: Start Local Dev Server
```bash
# Start development server
mint dev

# Optional: Use custom port
mint dev --port 3333
```

**Expected Output**:
```
✔ Loaded docs.json
✔ Docs are live at http://localhost:3000
```

**Browser Test**:
- Open `http://localhost:3000`
- Verify starter page loads
- Check navigation sidebar renders

**Acceptance Criteria**:
- [ ] Server starts without errors
- [ ] Browser loads local preview
- [ ] No console errors in browser
- [ ] Hot reload works (edit a file and see changes)

---

### Task 1.6: Git Branch Strategy
```bash
# Check current git status
git status

# Create feature branch for Mintlify work
git checkout -b feature/mintlify-conversion

# Optional: Create backup branch from main
git checkout main
git branch backup/pre-mintlify
git checkout feature/mintlify-conversion
```

**Acceptance Criteria**:
- [ ] Feature branch created
- [ ] Backup branch created (optional)
- [ ] Working on correct branch
- [ ] No uncommitted changes from previous work

---

### Task 1.7: Initial Git Commit
```bash
# Stage Mintlify files
git add docs.json introduction.mdx essentials/

# Commit with descriptive message
git commit -m "Initialize Mintlify project structure

- Add docs.json configuration
- Create starter pages
- Set up for 12-factor documentation conversion

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**Acceptance Criteria**:
- [ ] Mintlify files committed
- [ ] Clean working directory
- [ ] Commit message follows conventions

---

### Task 1.8: Validate Baseline Configuration

**Test Checklist**:
1. `mint dev` starts without errors
2. Navigation sidebar appears on left
3. Main content area renders
4. Search bar is visible (even if empty)
5. Can navigate between starter pages
6. Hot reload works (edit content, see changes)
7. No JavaScript errors in browser console

**Browser DevTools Check**:
```javascript
// In browser console, verify no errors
console.log('Mintlify loaded successfully')
```

**Acceptance Criteria**:
- [ ] All 7 test items pass
- [ ] No console errors
- [ ] Site feels responsive

---

### Task 1.9: Clean Up Starter Content (Optional)

**Decision Point**: Keep or remove starter pages?

**Option A: Keep for Reference**
- Useful to see examples while building
- Can reference component usage
- Delete later

**Option B: Remove Immediately**
```bash
# Remove example content
rm -rf essentials/

# Update docs.json to remove references
# (Manual edit required)
```

**Recommendation**: Keep for now, remove in Phase 5.

**Acceptance Criteria**:
- [ ] Decision documented
- [ ] If removed, docs.json updated
- [ ] Site still loads after changes

---

### Task 1.10: Document Local Development Workflow

Create `DEVELOPMENT.md` in project root:

```markdown
# Development Workflow

## Starting Local Server
\`\`\`bash
mint dev
\`\`\`

## Project Structure
- `docs.json` - Navigation and settings
- `*.mdx` - Content pages
- `public/` - Static assets

## Making Changes
1. Edit `.mdx` files
2. Changes auto-reload in browser
3. Check console for errors

## Troubleshooting
- If server won't start: `rm -rf ~/.mintlify && mint dev`
- If changes don't appear: Hard refresh browser (Cmd+Shift+R)
- If build fails: Check MDX syntax
\`\`\`

**Acceptance Criteria**:
- [ ] DEVELOPMENT.md created
- [ ] Contains startup instructions
- [ ] Includes troubleshooting tips

---

## Phase 1 Completion Checklist

### Technical Setup
- [ ] Node.js v20.17.0+ installed
- [ ] Mintlify CLI installed globally
- [ ] `mint --version` works
- [ ] Project initialized with `mint new`
- [ ] docs.json exists and valid
- [ ] Local dev server runs (`mint dev`)
- [ ] Preview loads at http://localhost:3000

### Git Workflow
- [ ] Feature branch created
- [ ] Initial Mintlify files committed
- [ ] Clean working directory
- [ ] Backup branch exists (optional)

### Validation
- [ ] Hot reload works
- [ ] No console errors
- [ ] Navigation sidebar renders
- [ ] Can edit and see changes
- [ ] Search bar visible

### Documentation
- [ ] DEVELOPMENT.md created
- [ ] Project structure decision documented
- [ ] Workflow documented

---

## Common Issues & Solutions

### Issue 1: "Cannot find module 'sharp'"
**Cause**: Native dependency build issue
**Solution**:
```bash
npm uninstall -g mint
npm install -g mint
```

### Issue 2: "Permission denied" on npm install
**Cause**: Global npm permissions
**Solution**:
```bash
sudo npm i -g mint
```

### Issue 3: Port 3000 already in use
**Solution**:
```bash
mint dev --port 3333
```

### Issue 4: Changes not appearing in browser
**Solution**:
1. Hard refresh browser (Cmd+Shift+R)
2. Restart dev server
3. Check terminal for build errors

---

## Next Steps

After Phase 1 completion:
1. Proceed to **Phase 2: Core Configuration** (task 10)
2. Configure branding and navigation structure
3. Set up color scheme and theme

---

## Time Estimate

**Total**: 1-2 hours
- Tasks 1.1-1.2: 10 minutes
- Tasks 1.3-1.5: 20 minutes
- Tasks 1.6-1.7: 15 minutes
- Tasks 1.8-1.10: 30 minutes
- Testing & validation: 15 minutes

---

## References

- [Mintlify Installation Guide](https://www.mintlify.com/docs/installation)
- [Mintlify CLI Commands](https://www.mintlify.com/docs/development)
- Node Version Manager: [nvm](https://github.com/nvm-sh/nvm)
