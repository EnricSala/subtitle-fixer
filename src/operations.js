const parser = require('./parser.js');

function transform(line, config) {
    const { offset, duration } = config;
    if (line && parser.TIMES_REGEX.test(line)) {
        let times = parser.lineToTimes(line);
        times = applyOffset(times, offset);
        times = extendDuration(times, duration);
        return parser.timesToLine(times);
    }
    return line;
}

function applyOffset(times, offset) {
    times.show += offset;
    times.hide += offset;
    return times;
}

function extendDuration(times, duration) {
    const { increment, minimum } = duration;
    times.hide += increment;
    if (times.hide < times.show + minimum) {
        times.hide = times.show + minimum;
    }
    return times;
}

module.exports = { transform };
