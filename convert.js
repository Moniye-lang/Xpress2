import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'public'); // Adjust if images are in a subfolder
const outputDir = path.join(__dirname, 'public/webp');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir);

files.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const fileName = path.parse(file).name;
    
    sharp(path.join(inputDir, file))
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, `${fileName}.webp`))
      .then(() => console.log(`✅ Converted: ${file}`))
      .catch(err => console.error(`❌ Error converting ${file}:`, err));
  }
});
