<script>

    // Imports
    import Loader from './Loader.svelte';
    import Error from './Error.svelte';

    async function getPrayerInfo() {

        // GET prayer info based on users IP address
        const currentIP = await fetch("https://icanhazip.com").then(response => response.text());
        const rawPrayerInfo = await fetch("https://api.pray.zone/v2/times/today.json?timeformat=1&school=4&ip=" + currentIP).then(response => response.json());

        //Check if request was 200 OK
        if (rawPrayerInfo.status !== "OK") {
            throw new Error("Failed to get prayer info from api.pray.zone");
        } else {

            return(
                {
                    "location": rawPrayerInfo.results.location.city + ", " + rawPrayerInfo.results.location.country,
                    "date": rawPrayerInfo.results.datetime[0].date.gregorian + " | " + rawPrayerInfo.results.datetime[0].date.hijri,
                    "events": [
                        {
                            "name": "Fajr",
                            "time": rawPrayerInfo.results.datetime[0].times.Fajr
                        },
                        {
                            "name": "Sunrise",
                            "time": rawPrayerInfo.results.datetime[0].times.Sunrise
                        },
                        {
                            "name": "Dhuhr",
                            "time": rawPrayerInfo.results.datetime[0].times.Dhuhr
                        },
                        {
                            "name": "Asr",
                            "time": rawPrayerInfo.results.datetime[0].times.Asr
                        },
                        {
                            "name": "Maghrib",
                            "time": rawPrayerInfo.results.datetime[0].times.Maghrib
                        },
                        {
                            "name": "Isha",
                            "time": rawPrayerInfo.results.datetime[0].times.Isha
                        },
                    ]

                }
            );

        }
	}

    // Start asynchronous fetch of prayerInfo
    let prayerInfo = getPrayerInfo();

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
        color: #d8e4f8;
    }

    h1 {
        font-size: 3.5em;
        padding-top: 0.5em;
        padding-bottom: 0.2em;
    }

    pre {
        font-size: 1em;
    }

    table {
        border-spacing: 2.3em;
    }

    td {
        font-size: 1.8em;
    }
</style>

<svelte:head>
	<title>Prayer Times</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="manifest.json">
</svelte:head>

{#await prayerInfo}	
    <Loader/>

    {:then prayerInfo}

        <div class="rootDiv">
            <center>
                <h1>Prayer Times</h1>

                <table>
                    {#each prayerInfo.events as event}
                        <tr> 
                            <td>{event.name}</td>
                            <td>{event.time}</td>
                        </tr>
                    {/each}
                </table>

                <pre> {prayerInfo.location} </pre>
                <pre> {prayerInfo.date} </pre>
            </center>
        </div>

    {:catch error} <Error {error}/>
{/await}