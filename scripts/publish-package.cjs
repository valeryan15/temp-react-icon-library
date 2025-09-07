#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute command and log output
function exec(command) {
  console.log(`Executing: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf-8' });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Error executing: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Check if we're on the main branch
console.log('Checking current branch...');
const currentBranch = exec('git rev-parse --abbrev-ref HEAD').trim();
if (currentBranch !== 'main') {
  console.error('You must be on the main branch to publish. Current branch:', currentBranch);
  process.exit(1);
}

// Check if there are uncommitted changes
console.log('Checking for uncommitted changes...');
const status = exec('git status --porcelain');
if (status.trim() !== '') {
  console.error('You have uncommitted changes. Please commit or stash them before publishing.');
  process.exit(1);
}

// Pull latest changes
console.log('Pulling latest changes...');
exec('git pull origin main');

// Run tests
console.log('Running tests...');
exec('npm test');

// Build the package
console.log('Building the package...');
exec('npm run build');

// Check if package.json exists
const packagePath = path.join(__dirname, '..', 'package.json');
if (!fs.existsSync(packagePath)) {
  console.error('package.json not found');
  process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
const currentVersion = packageJson.version;

console.log(`Current version: ${currentVersion}`);

// Ask user for version bump type
console.log('\nSelect version bump type:');
console.log('1. Patch (bug fixes)');
console.log('2. Minor (new features)');
console.log('3. Major (breaking changes)');
console.log('4. Custom version');

// For simplicity in this script, we'll just bump the patch version
// In a more advanced script, you could prompt the user for input
const bumpType = 'patch';

// Bump version using npm version
console.log(`\nBumping ${bumpType} version...`);
exec(`npm version ${bumpType} -m "Bump version to %s"`);

// Get new version
const newVersion = JSON.parse(fs.readFileSync(packagePath, 'utf-8')).version;
console.log(`New version: ${newVersion}`);

// Publish to npm
console.log('\nPublishing to npm...');
exec('npm publish --access public');

// Push changes to GitHub
console.log('\nPushing changes to GitHub...');
exec('git push origin main --tags');

console.log('\nPackage published successfully!');
console.log(`Version ${newVersion} is now available on npm.`);
