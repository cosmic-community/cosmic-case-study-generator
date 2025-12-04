const fs = require('fs');
const path = require('path');

const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';
const BUILD_DIR = path.join(process.cwd(), '.next');

function injectScriptIntoHTML(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(SCRIPT_TAG)) {
      console.log(`Script already injected in ${filePath}`);
      return;
    }
    
    content = content.replace('</head>', `${SCRIPT_TAG}\n</head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Script injected into ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function walkDir(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.html')) {
        injectScriptIntoHTML(filePath);
      }
    });
  } catch (error) {
    console.error(`Error walking directory ${dir}:`, error.message);
  }
}

if (fs.existsSync(BUILD_DIR)) {
  console.log('Starting console capture script injection...');
  walkDir(BUILD_DIR);
  console.log('Console capture script injection complete!');
} else {
  console.log('Build directory not found. Run "npm run build" first.');
}