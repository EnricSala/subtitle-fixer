const fs = require('fs');
const readline = require('readline');
const rx = require('rxjs/Rx');

function linesOf(file) {
    const reader = readline.createInterface({
        input: fs.createReadStream(file)
    });
    return rx.Observable.fromEvent(reader, 'line')
        .takeUntil(rx.Observable.fromEvent(reader, 'close'));
}

function writeTo(file, stream) {
    const writer = fs.createWriteStream(file);
    writer.on('error', console.error);
    stream.subscribe(
        line => writer.write(line + '\n'),
        err => console.error(err),
        () => writer.end()
    );
}

module.exports = { linesOf, writeTo };
