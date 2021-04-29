<script>
    import { tick } from 'svelte';

    import columns from '../constants/columns';

    export let rows;

    let searchAmount = 0;
    let closestIncome = 0;
    let incomeRows = {};
    let tableRef = null;

    async function scrollToNearestIncome() {
        await tick();
        const index = rows.findIndex((row) => row.income > searchAmount) - 1;
        if (index != null) {
            closestIncome = rows[index].income;
            incomeRows[closestIncome].scrollIntoView();
            tableRef.scrollTop -= 37;
        }
    }

    $: searchAmount, scrollToNearestIncome();
</script>

<div class="table-section">
    <label class="table-income">
        <h5>Search for your income</h5>
        <input class="table-income-input" bind:value={searchAmount} type="number" />
    </label>
    <div class="table" bind:this={tableRef}>
        <div class="table-row table-header">
            {#each columns as { key, label } (key)}
                <h6>{label}</h6>
            {/each}
        </div>
        {#each rows as row (row.income)}
            <div class="table-row" class:closest={row.income === closestIncome} bind:this={incomeRows[row.income]}>
                {#each columns as { key, formatter } (key)}
                    <div>{formatter(row[key])}</div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .table-income {
        display: flex;
        justify-content: stretch;
        align-items: center;
        margin-bottom: 1rem;
        flex: 0 3rem;
    }

    .table-income > * {
        margin-right: 1rem;
    }

    .table-section {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .table {
        display: flex;
        flex-direction: column;
        flex: 1 0;
        height: 100%;
        overflow-y: auto;
        position: relative;
    }

    .table-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .table-row > * {
        padding: 0.3rem;
        border: 0.1rem solid #f0f0f0;
    }

    .table-row.closest {
        background: rgba(0,0,0,0.05);
    }

    .table-header {
        position: sticky;
        background: white;
        top: 0;
    }

    .table-header > * {
        padding: 0.6rem 0.6rem 0.9rem 0.6rem;
    }
</style>
