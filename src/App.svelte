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
                remaining: val - tax,
            };
        });
</script>

<main>
    <div class="intro">
        <h4>What This Is About</h4>
        <p>
            <a
                href="https://weimingwu.medium.com/half-of-americans-dont-understand-marginal-taxes-so-i-made-a-web-page-to-showing-how-it-works-d3bde0269124"
            >
                Read my write-up on Medium.
            </a>
        </p>
    </div>
    <div id="illustration">
        <TableSection {rows} />
        <ChartSection {rows} />
    </div>
    <p style="font-size: 1rem; padding-top: 0.7rem;">(© Weiming Wu 2021)</p>
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
        color: #555;
        font-size: 1.4rem;
    }

    main {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: stretch;

        width: 100vw;
        height: 100vh;
    }

    .intro > * {
        margin-bottom: 0.75rem;
    }

    #illustration {
        text-align: center;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 100%;
        flex: 1 0;
        overflow: hidden;
        margin-top: 1rem;
    }

    #illustration > :global(*) {
        flex: 1 0;
        margin-right: 1.5rem;
    }

    :global(h4),
    :global(h5),
    :global(h6),
    :global(p) {
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
        font-weight: 400;
    }

    :global(.table-section),
    :global(.chart-section) {
        max-width: 56rem;
    }
</style>
