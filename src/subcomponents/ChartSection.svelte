<script>
    import merge from 'lodash/merge';
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js';

    export let rows;

    const taxesTitle = 'Taxes Due For Different Incomes';
    const rateTitle = 'Actual Tax Rate (Percent of Income Paid As Tax)';

    let averageRateGraph;
    let taxGraph;

    $: incomes = rows.map((row) => row.income);
    $: taxes = rows.map((row) => row.tax);
    $: actualRates = rows.map((row) => row.actualRate * 100);

    const baseConfig = {
        type: 'line',
        options: {
            responsive: true,
            title: { display: true },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 18,
                        },
                    },
                },
            },
            elements: {
                point: {
                    borderColor: 'rgba(255, 62, 0, 0.04)',
                    backgroundColor: 'rgba(255, 62, 0, 0.04)',
                },
                line: {
                    borderColor: 'rgba(255, 62, 0, 0.04)',
                    backgroundColor: 'rgba(255, 62, 0, 0.04)',
                },
            },
        },
    };

    onMount(() => {
        const taxGraphConfig = merge(baseConfig, {
            data: {
                labels: incomes,
                datasets: [
                    {
                        label: taxesTitle,
                        data: taxes,
                    },
                ],
            },
        });

        new Chart(taxGraph, taxGraphConfig);

        const avgRateGraphConfig = merge(baseConfig, {
            data: {
                labels: incomes,
                datasets: [
                    {
                        label: rateTitle,
                        data: actualRates,
                    },
                ],
            },
        });
        new Chart(averageRateGraph, avgRateGraphConfig);
    });
</script>

<div class="chart-section">
    <canvas bind:this={taxGraph} width="580" height="400" />
    <canvas bind:this={averageRateGraph} width="580" height="400" />
</div>

<style>
    .chart-section > * {
        margin-top: 2rem;
    }
</style>
