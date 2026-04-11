import { defineConfig } from 'vite';
import { resolve, relative } from 'path';
import fs from 'fs';

function getHtmlFiles(dir, files_ = []) {
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = resolve(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      if (files[i] !== 'node_modules' && files[i] !== 'dist' && files[i] !== 'public' && !files[i].startsWith('.')) {
        getHtmlFiles(name, files_);
      }
    } else if (name.endsWith('.html')) {
      files_.push(name);
    }
  }
  return files_;
}

const htmlFiles = getHtmlFiles(__dirname);
const input = {};

htmlFiles.forEach((file) => {
  const relPath = relative(__dirname, file);
  // Create a reasonable key name for the entry point
  let key = relPath.replace(/\.html$/, '').replace(/\\/g, '/');
  
  if (key === 'index') {
    key = 'main';
  } else if (key.endsWith('/index')) {
    key = key.slice(0, -6);
  }
  
  input[key] = file;
});

export default defineConfig({
  build: {
    rollupOptions: {
      input: input,
    },
  },
});

