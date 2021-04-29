<script>
    import columns from '../constants/columns';

    export let rows;

    let searchAmount = 0;
</script>

<div class="table-section">
    <label class="table-income">
        <h5>Search for your income</h5>
        <input class="table-income-input" bind:value={searchAmount} type='number' />
    </label>
    <div class="table">
        <div class="table-row table-header">
            {#each columns as { key, label } (key)}
                <h4>{label}</h4>
            {/each}
        </div>
        {#each rows as row (row.income)}
            <div class="table-row">
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
    }

    .table-header {
        position: sticky;
        background: white;
        top: 0;
    }

    .table-header > * {
        padding-bottom: 0.6rem;
    }
</style>
