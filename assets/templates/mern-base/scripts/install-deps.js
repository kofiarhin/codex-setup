const { spawnSync } = require('child_process');
const path = require('path');

function runNpmInstall(targetDir) {
  const command = process.platform === 'win32' ? 'cmd.exe' : 'npm';
  const args = process.platform === 'win32' ? ['/c', 'npm', 'install'] : ['install'];

  const result = spawnSync(command, args, {
    cwd: targetDir,
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`npm install failed in ${targetDir}`);
  }
}

function main() {
  const projectRoot = path.resolve(__dirname, '..');

  runNpmInstall(path.join(projectRoot, 'client'));
  runNpmInstall(path.join(projectRoot, 'server'));
}

main();
