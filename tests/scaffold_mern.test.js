const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { scaffoldMern, verifyScaffold } = require('../scripts/scaffold_mern');

test('scaffoldMern creates the expected MERN baseline', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-bootstrap-mern-'));
  const targetDir = path.join(tempRoot, 'kitchen-portal');

  try {
    const result = scaffoldMern({
      targetDir,
      projectName: 'Kitchen Portal',
      projectSlug: 'kitchen-portal',
      install: false,
      initGit: false,
      force: false,
      smokeCheck: false,
      dryRun: false,
    });

    const verification = verifyScaffold(targetDir);
    const rootPackageJson = JSON.parse(fs.readFileSync(path.join(targetDir, 'package.json'), 'utf8'));
    const appSlice = fs.readFileSync(
      path.join(targetDir, 'client', 'src', 'features', 'app', 'appSlice.js'),
      'utf8',
    );

    assert.equal(result.projectSlug, 'kitchen-portal');
    assert.deepEqual(verification.missingFiles, []);
    assert.deepEqual(verification.tokenLeaks, []);
    assert.equal(rootPackageJson.name, 'kitchen-portal');
    assert.match(appSlice, /Kitchen Portal/);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('scaffoldMern rejects non-empty directories without force', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-bootstrap-mern-'));
  const targetDir = path.join(tempRoot, 'existing-app');

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'keep.txt'), 'occupied', 'utf8');

  try {
    assert.throws(() => {
      scaffoldMern({
        targetDir,
        projectName: 'Existing App',
        projectSlug: 'existing-app',
        install: false,
        initGit: false,
        force: false,
        smokeCheck: false,
        dryRun: false,
      });
    }, /Target directory is not empty/);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});
