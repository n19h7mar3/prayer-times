<script>
	export let error;
</script>


<style>
    .rootDiv {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 10;
        background-color: #030d11;
    }

    article {
        text-align: center;
        padding: 150px;
        font: 20px Helvetica, sans-serif;
        color: #c3423f;
        text-align: left;
        width: 650px;
        margin: 0 auto;
    }

    h1 {
        font-size: 50px;
    }
</style>

<div class="rootDiv">
    <article>
        <h1>Something went wrong!</h1>
        <div>
            <pre>— Error: {error.message}</pre>
        </div>
    </article>
</div>
