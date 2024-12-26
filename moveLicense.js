// moveLicense.js @ 1.0.0
// This file is used to move the LICENSE files to the root of the app directory.

const path = require('path');
const fs = require('fs-extra');

module.exports = async (context) => {
  const { appOutDir, electronPlatformName } = context;

  let unpackedDir;
  switch (electronPlatformName) {
    case 'win32':
    case 'linux':
      unpackedDir = path.join(appOutDir);
      break;
    default:
      throw new Error(`Unsupported platform: ${electronPlatformName}`);
  }

  console.log('  • Unpacked directory:', unpackedDir);

  const licenseDir = path.join(appOutDir, 'license');
  const projectLicenseDir = path.join(process.cwd(), 'license'); 

  await fs.ensureDir(licenseDir);

  const moveFile = async (src, dest) => {
    try {
      await fs.move(src, dest, { overwrite: true });
      console.log(`Moved ${src} to ${dest}`);
    } catch (error) {
      console.error(`Error moving ${src} to ${dest}:`, error);
    }
  };

  await moveFile(path.join(unpackedDir, 'LICENSE.electron.txt'), path.join(licenseDir, 'LICENSE.electron.txt'));
  await moveFile(path.join(unpackedDir, 'LICENSES.chromium.html'), path.join(licenseDir, 'LICENSES.chromium.html'));

  try {
    const files = await fs.readdir(projectLicenseDir);
    for (const file of files) {
      await moveFile(path.join(projectLicenseDir, file), path.join(licenseDir, file));
    }
  } catch (error) {
    console.error('Error copying project root LICENSE files:', error);
  }
};
