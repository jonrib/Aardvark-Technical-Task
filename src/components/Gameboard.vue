<template>
    <v-container>
        <h2>GameBoard</h2><br />
        <div class="col-xs-11">
            <button disabled="disabled" :class="'col-xs-1 ' + position.class" v-for="position in positions" :key="position.text"> {{position.text}} </button>
        </div>
    </v-container>
</template>
<script>
  export default {
    data: () => ({
        positions: [],
        spinResult: false,
    }),
    created: function(){
        this.loadUpData()
    },
    methods: {
        loadUpData: function(){
            this.$store.commit("log", 'GET About to load gameboard up .../configuration')
            this.$emit('logged')
            this.axios.get(this.$store.state.apiURL+'/configuration').then((response) => {
                response.data.positionToId.forEach(element => {
                    this.positions.push({text: element, class:  response.data.colors[element]})
                })
                this.$store.commit("log", 'Loaded gameboard')
                this.$emit('logged')
                if (this.$store.state.spinResult){
                    this.highlightNumber(this.$store.state.spinResult, 5)
                    this.$store.commit("addSpinResult", '')
                }
            }).catch((error) => {
                //handling request error
                this.$store.commit("log", 'Error '+ error + ' calling URL '+this.$store.state.apiURL+'/stats Will retry in 1 second')
                this.$emit('logged')
                setTimeout(() => {this.loadUpData()}, 1000)
            })
        },
        highlightNumber: function(number, howManyTimes){
            if (howManyTimes > 0){
                this.positions.forEach(element => {
                    if (element.text == number){
                        element.class = element.class+ " highlight"
                        setTimeout(() => {element.class = element.class.replace(' highlight', ''); setTimeout(()=>{this.highlightNumber(number, howManyTimes-1)}, 500)}, 500)
                    }
                })
            }
        }
    }
    
  }
</script>
<style scoped>
button {
    padding: 5px;
    text-align: center;
    color: white;
}
.red {
    background-color: red;
}
.green {
    background-color: green;
}
.black {
    background-color: black;
}
.highlight {
    background-color: yellow !important;
}
.center{
    margin-left: auto;
    margin-right: auto;
}
</style>