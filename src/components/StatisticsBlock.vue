<template>
    <div>
        <h2>Statistics block</h2><br />
        <table class="center">
            <tbody>
                <tr>
                    <td></td>
                    <th :colspan="coldSpan" class="cold">Cold</th>
                    <th :colspan="neutralSpan" class="neutral">Neutral</th>
                    <th :colspan="hotSpan" class="hot">Hot</th>
                </tr>
                <tr>
                    <th>Slot</th>
                    <td :class="stat.class" v-for="stat in stats" :key="stat.result"> {{stat.result}} </td>
                </tr>
                <tr>
                    <th>Hits</th>
                    <td :class="stat.sClass" v-for="stat in stats" :key="stat.result"> {{stat.count}} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
  export default {
    data: () => ({
        coldSpan: 0,
        hotSpan: 0,
        neutralSpan: 0,
        stats: [],
    }),
    created: function(){
        this.loadUpData()
    },
    methods: {
        loadUpData: function(){
            this.$store.commit("log", 'GET About to load statistics up .../stats')
            this.axios.get(this.$store.state.apiURL+'/stats',{params: {limit: 200}}).then((response) => { //limit used as per documentation and task requirements, although I am unsure it's implemented in the backend as it does not seem to pay attention to limit parameter
                let statistics = response.data;
                if (statistics.length > 200){ //just incase limit parameter does not actually work...
                    statistics = statistics.slice(response.length-200, response.length);
                }
                //getting colors for the numbers
                this.$store.commit("log", 'GET Getting color configuration for statistics .../configuration')
                this.axios.get(this.$store.state.apiURL+'/configuration',{params: {limit: 200}}).then((response) => {
                    //sorting data by count
                    //POSSIBLE PROBLEMS: original order of values is lost
                    statistics.sort((a, b) => {
                    return a.count - b.count;
                    })
                    this.coldSpan = (statistics.length < 5 ? statistics.length : 5)
                    for (let i = 0; i < (statistics.length < 5 ? statistics.length : 5); i++){ //mark first 5 as hot
                    statistics[i].sClass = "cold";
                    }
                    this.hotSpan = statistics.length-1 - (statistics.length < 5 ? 0 : statistics.length - 6)
                    for (let i = statistics.length-1; i > (statistics.length < 5 ? 0 : statistics.length - 6); i--){ //mark last 5 as cold
                        statistics[i].sClass = "hot";
                    }
                    this.neutralSpan = statistics.length - this.hotSpan - this.coldSpan
                    //--------------------

                    //pushing data to table
                    statistics.forEach(element => {
                        element.class = "btn-"+response.data.colors[element.result]
                        if (!element.sClass)
                            element.sClass = 'neutral'
                        this.stats.push(element); 
                    })
                    this.$store.commit("log", 'Statistics loaded')
                    this.$emit('logged')
                    //---------------------
                }).catch((error) => {
                    //handling request error
                    this.$store.commit("log", 'Error '+ error + ' calling URL '+this.$store.state.apiURL+'/configuration Will retry in 1 second')
                    this.$emit('logged')
                    setTimeout(() => {this.loadUpData()}, 1000)
                })
                //------------------------------
            }).catch((error) => {
                    //handling request error
                    this.$store.commit("log", 'Error '+ error + ' calling URL '+this.$store.state.apiURL+'/stats Will retry in 1 second')
                    this.$emit('logged')
                    setTimeout(() => {this.loadUpData()}, 1000)
            })
        }
    }
    
  }
</script>
<style scoped>
.hot {
  background-color: #ff7272;
}
.cold {
  background-color: #7676ff;
}
.neutral {
  background-color: white;
  color:black;
}
td {
    padding: 5px;
    text-align: center;
    color: white;
}
.btn-red {
    background-color: red;
}
.btn-green {
    background-color: green;
}
.btn-black {
    background-color: black;
}
.center{
    margin-left: auto;
    margin-right: auto;
}
</style>