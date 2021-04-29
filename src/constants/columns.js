export function roundNumber(num, units) {
    const roundedNumString = num.toFixed(units);
    return parseFloat(roundedNumString);
}

function numberFormatter(val) {
    return `$${roundNumber(val, 2).toLocaleString()}`;
}

function percentFormatter(val) {
    return `${roundNumber(val * 100, 2)}%`;
}

export default [
    {
        key: 'income',
        label: 'Income',
        formatter: numberFormatter,
    },
    {
        key: 'marginalRate',
        label: 'Marginal Rate',
        formatter: percentFormatter,
    },
    {
        key: 'tax',
        label: 'Tax Due',
        formatter: numberFormatter,
    },
    {
        key: 'actualRate',
        label: 'Actual Rate',
        formatter: percentFormatter,
    },
];
