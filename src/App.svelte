<script>
    import brackets from './constants/brackets';
    import TableSection from './subcomponents/TableSection.svelte';
    import ChartSection from './subcomponents/ChartSection.svelte';

    const rows = new Array(1000)
        .fill(1)
        .map((val, i) => i * 1000)
        .map((val) => {
            const bracket = brackets.find((bracket) => bracket.min <= val && bracket.max > val);
            const { base, rate, min } = bracket;
            const tax = base + rate * (val - min);
            const actualRate = tax / val;
            return {
                income: val,
                tax,
                marginalRate: rate,
                actualRate: isNaN(actualRate) ? 0 : actualRate,
            };
        });
</script>

<main>
    <TableSection {rows} />
    <ChartSection {rows} />
</main>

<style>
    :global(html) {
        font-size: 10px;
    }

    :global(body) {
        padding: 0;
    }

    :global(*) {
        box-sizing: border-box;
    }

    main {
        text-align: center;
        padding: 1rem;
        margin: 0 auto;
        font-size: 1.4rem;
        
        width: 100vw;
        height: 100vh;
    }

    :global(h4), :global(h5), :global(h6) {
        margin: 0;
    }

    :global(h4) {
        color: #ff3e00;
        font-size: 2rem;
        font-weight: 400;
    }

    :global(h5) {
        color: #ff4040;
        font-size: 1.8rem;
        font-weight: 400;
    }

    :global(h6) {
        color: #ff3e00;
        font-size: 1.6rem;
        font-weight: 200;
    }

    :global(.table-section),
    :global(.chart-section) {
        max-width: 56rem;
    }
</style>
