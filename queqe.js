const Queue = require('bull');
const imageGenerationQueue = new Queue('image-generation', 'redis://127.0.0.1:6379');

module.exports = imageGenerationQueue;