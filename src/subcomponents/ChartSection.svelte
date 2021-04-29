<script>
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js';

    export let rows;

    let averageRateGraph;
    let taxGraph;

    $: incomes = rows.map((row) => row.income);
    $: taxes = rows.map((row) => row.tax);
    $: actualRates = rows.map((row) => row.actualRate);

    onMount(() => {
        const config = {
            type: 'line',
            data: {
                labels: incomes,
                datasets: [
                    {
                        label: 'Taxes Due For Income',
                        data: taxes,
                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: 'World population per region (in millions)',
                },
            },
        };
        new Chart(taxGraph, config);
    });
</script>

<div class="chart-section">
    <canvas bind:this={taxGraph} />
    <canvas bind:this={averageRateGraph} />
</div>
