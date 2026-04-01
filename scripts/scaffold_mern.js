#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const TEMPLATE_ROOT = path.resolve(__dirname, '..', 'assets', 'templates', 'mern-base');
const REQUIRED_FILES = [
  '.editorconfig',
  '.env.example',
  '.gitignore',
  '.prettierrc.json',
  'README.md',
  'package.json',
  path.join('client', '.env.example'),
  path.join('client', 'package.json'),
  path.join('client', 'src', 'App.jsx'),
  path.join('client', 'src', 'app', 'providers', 'AppProviders.jsx'),
  path.join('client', 'src', 'pages', 'HomePage', 'HomePage.jsx'),
  path.join('server', '.env.example'),
  path.join('server', 'app.js'),
  path.join('server', 'package.json'),
  path.join('server', 'routes', 'health.routes.js'),
  path.join('server', 'tests', 'health.test.js'),
];

function printHelp() {
  console.log(`repo-bootstrap-mern\n\nUsage:\n  node scripts/scaffold_mern.js <target-path> [options]\n\nOptions:\n  --project-name <name>  Display name used in generated docs and UI\n  --install              Install generated dependencies with npm\n  --git                  Initialize a git repository in the target directory\n  --force                Allow scaffolding into a non-empty target directory\n  --smoke-check          Run the generated server test after install\n  --dry-run              Validate inputs without writing files\n  -h, --help             Show this help message\n`);
}

function toProjectSlug(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function toProjectName(input) {
  return input
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function buildTokens({ projectName, projectSlug }) {
  return {
    __PROJECT_NAME__: projectName,
    __PROJECT_SLUG__: projectSlug,
    __SERVER_PORT__: '5000',
    __CLIENT_URL__: 'http://localhost:5173',
    __API_URL__: 'http://localhost:5000/api',
    __MONGODB_URI__: `mongodb://127.0.0.1:27017/${projectSlug}`,
  };
}

function parseArgs(argv) {
  const options = {
    install: false,
    initGit: false,
    force: false,
    smokeCheck: false,
    dryRun: false,
    help: false,
  };

  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--project-name') {
      const value = argv[index + 1];

      if (!value) {
        throw new Error('Missing value for --project-name.');
      }

      options.projectName = value;
      index += 1;
      continue;
    }

    if (argument === '--install') {
      options.install = true;
      continue;
    }

    if (argument === '--git') {
      options.initGit = true;
      continue;
    }

    if (argument === '--force') {
      options.force = true;
      continue;
    }

    if (argument === '--smoke-check') {
      options.smokeCheck = true;
      continue;
    }

    if (argument === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (argument === '--help' || argument === '-h') {
      options.help = true;
      continue;
    }

    if (argument.startsWith('--')) {
      throw new Error(`Unknown option: ${argument}`);
    }

    positional.push(argument);
  }

  if (options.help) {
    return options;
  }

  if (positional.length === 0) {
    throw new Error('A target path is required.');
  }

  const targetInput = positional[0];
  const targetDir = path.resolve(process.cwd(), targetInput);
  const fallbackName = path.basename(targetDir);
  const rawProjectName = options.projectName || fallbackName;
  const projectSlug = toProjectSlug(rawProjectName || fallbackName);

  if (!projectSlug) {
    throw new Error('Project name must include letters or numbers.');
  }

  return {
    ...options,
    targetInput,
    targetDir,
    projectSlug,
    projectName: toProjectName(rawProjectName.replace(/[-_]+/g, ' ')),
  };
}

function ensureTemplateExists() {
  if (!fs.existsSync(TEMPLATE_ROOT)) {
    throw new Error(`Template directory not found: ${TEMPLATE_ROOT}`);
  }
}

function validateTargetDirectory(targetDir, force) {
  if (!fs.existsSync(targetDir)) {
    return;
  }

  const stat = fs.statSync(targetDir);

  if (!stat.isDirectory()) {
    throw new Error(`Target path is not a directory: ${targetDir}`);
  }

  const existingEntries = fs.readdirSync(targetDir);

  if (existingEntries.length > 0 && !force) {
    throw new Error(`Target directory is not empty: ${targetDir}. Use --force to continue.`);
  }
}

function replaceTokens(content, tokens) {
  return Object.entries(tokens).reduce((nextContent, [token, value]) => {
    return nextContent.split(token).join(value);
  }, content);
}

function copyTemplateDirectory(sourceDir, targetDir, tokens) {
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyTemplateDirectory(sourcePath, targetPath, tokens);
      continue;
    }

    const fileContents = fs.readFileSync(sourcePath, 'utf8');
    fs.writeFileSync(targetPath, replaceTokens(fileContents, tokens), 'utf8');
  }
}

function collectFiles(directory) {
  const files = [];
  const ignoredDirectories = new Set(['.git', 'node_modules', 'dist', 'coverage']);

  function walk(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const absolutePath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (ignoredDirectories.has(entry.name)) {
          continue;
        }

        walk(absolutePath);
        continue;
      }

      files.push(absolutePath);
    }
  }

  walk(directory);

  return files;
}

function verifyScaffold(targetDir) {
  const missingFiles = REQUIRED_FILES.filter((relativePath) => {
    return !fs.existsSync(path.join(targetDir, relativePath));
  });

  const tokenLeaks = collectFiles(targetDir)
    .filter((filePath) => {
      const contents = fs.readFileSync(filePath, 'utf8');
      return contents.includes('__PROJECT_') || contents.includes('__SERVER_') || contents.includes('__CLIENT_') || contents.includes('__API_') || contents.includes('__MONGODB_');
    })
    .map((filePath) => path.relative(targetDir, filePath));

  return {
    missingFiles,
    tokenLeaks,
  };
}

function runCommand(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(' ')}`);
  }
}

function runNpmCommand(args, cwd) {
  if (process.platform === 'win32') {
    runCommand('cmd.exe', ['/c', 'npm', ...args], cwd);
    return;
  }

  runCommand('npm', args, cwd);
}

function runGitCommand(args, cwd) {
  if (process.platform === 'win32') {
    runCommand('cmd.exe', ['/c', 'git', ...args], cwd);
    return;
  }

  runCommand('git', args, cwd);
}

function scaffoldMern(options) {
  ensureTemplateExists();
  validateTargetDirectory(options.targetDir, options.force);

  const tokens = buildTokens(options);

  if (options.dryRun) {
    return {
      ...options,
      dryRun: true,
      verification: { missingFiles: [], tokenLeaks: [] },
    };
  }

  fs.mkdirSync(options.targetDir, { recursive: true });
  copyTemplateDirectory(TEMPLATE_ROOT, options.targetDir, tokens);

  const verification = verifyScaffold(options.targetDir);

  if (verification.missingFiles.length > 0 || verification.tokenLeaks.length > 0) {
    throw new Error(
      `Scaffold verification failed. Missing files: ${verification.missingFiles.join(', ') || 'none'}. Token leaks: ${verification.tokenLeaks.join(', ') || 'none'}.`,
    );
  }

  if (options.initGit) {
    runGitCommand(['init'], options.targetDir);
  }

  if (options.install) {
    runNpmCommand(['install'], options.targetDir);
  }

  if (options.install && options.smokeCheck) {
    runNpmCommand(['run', 'test', '--prefix', 'server'], options.targetDir);
  }

  return {
    ...options,
    verification,
  };
}

function runCli() {
  try {
    const options = parseArgs(process.argv.slice(2));

    if (options.help) {
      printHelp();
      return;
    }

    const result = scaffoldMern(options);

    console.log(`Created ${result.projectName} at ${result.targetDir}`);
    console.log(`- install: ${result.install ? 'yes' : 'no'}`);
    console.log(`- git: ${result.initGit ? 'yes' : 'no'}`);
    console.log(`- smoke check: ${result.install && result.smokeCheck ? 'server test run' : 'structure only'}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  buildTokens,
  parseArgs,
  scaffoldMern,
  toProjectName,
  toProjectSlug,
  verifyScaffold,
};
