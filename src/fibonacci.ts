export const computeFibonacciNumber = (position: number, recursion: boolean = false): number => {
    if (position === null) {
        position = 1;
    }

    if (position === 0) {
        return 0;
    }

    if (position < 0) {
        if (recursion) {
            return recursiveFibonacciNeg(position);
        }

        return computeNegativeFibonacci(position);
    }

    if (recursion) {
        return recursiveFibonacci(1, 1, position - 2);
    }


    let smallFibonacciNumber = 1;
    let largeFibonacciNumber = 1;

    let currentPosition = 2;

    while (currentPosition < position) {
        const nextFibonacciNumber = smallFibonacciNumber + largeFibonacciNumber;
        smallFibonacciNumber = largeFibonacciNumber;
        largeFibonacciNumber = nextFibonacciNumber;
        currentPosition++;
    }

    return largeFibonacciNumber;
};

const computeNegativeFibonacci = (position: number): number => {
    if (position >= 0) {
        throw new Error(`Position must be less than zero! Received: ${position}.`);
    }
    const resultIsNegative = position % 2 === 0;
    const absoluteResult = computeFibonacciNumber(-position);
    return resultIsNegative ? absoluteResult * -1 : absoluteResult;
}

export const computeFibonacciArray = (start: number, endInclusive: number): number[] => {
    const inputArray = [...Array(endInclusive - start + 1).keys()].map(i => i + start);
    return inputArray.map(x => computeFibonacciNumber(x));
}

const recursiveFibonacci = (previous: number, current: number, stepsLeft: number): number => {
    if (stepsLeft < 0) {
        return 1;
    }
    switch (stepsLeft) {
        case 0:
            return current;
        default:
            return recursiveFibonacci(current, previous + current, stepsLeft - 1);
    }
}

const recursiveFibonacciNeg = (initialPosition: number, left: number = 0, right: number = 1, position?: number): number => {
    const currentPosition = position ?? initialPosition;
    if (initialPosition === 0) return 0;
    if (currentPosition === 0) return left;
    if (initialPosition > 0) {
        return recursiveFibonacciNeg(initialPosition, right, left + right, currentPosition - 1);
    } else {
        return recursiveFibonacciNeg(initialPosition, right - left, left, currentPosition + 1);
    }
}
