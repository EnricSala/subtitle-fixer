const TIMES_REGEX = /^(\d+):(\d+):(\d+),(\d+) --> (\d+):(\d+):(\d+),(\d+)/;

function lineToTimes(line) {
    const n = line.match(TIMES_REGEX);
    const show = parseInt(n[4]) + parseInt(n[3]) * 1000
        + parseInt(n[2]) * 60 * 1000 + parseInt(n[1]) * 60 * 60 * 1000;
    const hide = parseInt(n[8]) + parseInt(n[7]) * 1000
        + parseInt(n[6]) * 60 * 1000 + parseInt(n[5]) * 60 * 60 * 1000;
    return { show, hide };
}

function timesToLine(times) {
    const { show, hide } = times;

    const s1 = Math.floor(show / 60 / 60 / 1000);
    const s2 = Math.floor((show - s1 * 60 * 60 * 1000) / 60 / 1000);
    const s3 = Math.floor((show - s1 * 60 * 60 * 1000 - s2 * 60 * 1000) / 1000);
    const s4 = Math.floor(show - s1 * 60 * 60 * 1000 - s2 * 60 * 1000 - s3 * 1000);

    const h1 = Math.floor(hide / 60 / 60 / 1000);
    const h2 = Math.floor((hide - h1 * 60 * 60 * 1000) / 60 / 1000);
    const h3 = Math.floor((hide - h1 * 60 * 60 * 1000 - h2 * 60 * 1000) / 1000);
    const h4 = Math.floor(hide - h1 * 60 * 60 * 1000 - h2 * 60 * 1000 - h3 * 1000);

    const pad2 = (num) => num > 9 ? '' + num : '0' + num;
    const pad3 = (num) => num > 99 ? '' + num : '0' + pad2(num);
    const showStr = `${pad2(s1)}:${pad2(s2)}:${pad2(s3)},${pad3(s4)}`;
    const hideStr = `${pad2(h1)}:${pad2(h2)}:${pad2(h3)},${pad3(h4)}`;
    return `${showStr} --> ${hideStr}`;
}

module.exports = { lineToTimes, timesToLine, TIMES_REGEX };
