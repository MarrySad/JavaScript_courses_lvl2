const summ = (a, b) => {
    if (a === null || b === null) {
        return null;
    }

    if (a === undefined || b === undefined) {
        return undefined;
    }

    return +a + +b;
}

const subt = (a, b) => {
    if (a === null || b === null) {
        return null;
    }

    if (a === undefined || b === undefined) {
        return undefined;
    }

    return a - b;
}

const mult = (a, b) => {
    if (a === null || b === null) {
        return null;
    }

    if (a === undefined || b === undefined) {
        return undefined;
    }

    return a * b;
}

const div = (a, b) => {
    if (a === null || b === null) {
        return null;
    }

    if ((a === undefined || b === undefined) || b == 0) {
        return undefined;
    }

    return a / b;
}

module.exports = {
    summ: summ,
    subt: subt,
    mult: mult,
    div: div
}