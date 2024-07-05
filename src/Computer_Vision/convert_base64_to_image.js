const fs = require('fs');

const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAyAAAAJYCAYAAACadoJwAAN2PElEQVR4AezGBaGGABgDQNxK04cSFKDT0ALP5b/7ZCveAQAAAAAA';
const imageBuffer = Buffer.from(base64Image, 'base64');

fs.writeFileSync('test_image_converted.png', imageBuffer);
console.log('Image buffer converted to file: test_image_converted.png');
