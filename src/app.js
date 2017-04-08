const files = require('./files.js');
const operations = require('./operations.js');

INPUT_FILE = '/movies/The.Matrix.srt';
OUTPUT_FILE = '/movies/The.Matrix_fixed.srt';

CONFIG = {
    offset: 1250,
    duration: {
        increment: 0,
        minimum: 50
    }
};

files.writeTo(OUTPUT_FILE,
    files.linesOf(INPUT_FILE)
        .map(line => operations.transform(line, CONFIG)));
