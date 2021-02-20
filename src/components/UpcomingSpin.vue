<template>
    <div>
        <div class="spinTimer" v-if="!isSpin">
            <h2> Time until next spin: </h2><br />
            Hours: {{hoursUntilSpin}}, Minutes: {{minutesUntilSpin}}, Seconds: {{secondsUntilSpin}}
        </div>
        <div class="spinInProgress" v-if="isSpin">
            <h2> Spin in progress! </h2>
        </div>
    </div>
</template>

<script>
  export default {
    data: () => ({
        isSpin: false,
        hoursUntilSpin: 0,
        minutesUntilSpin: 0,
        secondsUntilSpin: 0,
        totalSeconds: 0,
        loaded: false,
    }),
    methods: {
        subtractTime: function(){
            if (!this.loaded || this.isSpin)
                return
            if (this.totalSeconds > 0){
                this.totalSeconds = this.totalSeconds - 1
                this.hoursUntilSpin = Math.floor(this.totalSeconds / 360)
                this.minutesUntilSpin = Math.floor((this.totalSeconds - (this.hoursUntilSpin * 360)) / 60)
                this.secondsUntilSpin = this.totalSeconds - (this.hoursUntilSpin * 360) - (this.minutesUntilSpin * 60)
                if (this.totalSeconds > 0)
                    setTimeout(() => {this.subtractTime()}, 1000)
            }else{
                this.isSpin = true
            }
        },
        spinning: function(uuid){
            if (!this.loaded)
                return
            this.$store.commit("log", 'GET Wheel is spinning. Will try to get a result .../game/'+uuid)
            this.$emit('logged')
            this.axios.get(this.$store.state.apiURL+'/game/'+uuid).then((response) => {
                if (response.data.result == null){
                    if (response.data.startDelta > 0){
                        this.$store.commit("log", 'No result yet. Will wait '+(response.data.startDelta*1000)+' seconds')
                        this.$emit('logged')
                        setTimeout(() => { this.spinning(uuid)}, response.data.startDelta*1000) //check for result again when it's ready
                    }else{
                        this.spinning(uuid)
                    }
                }else{
                    this.spinComplete(response.data.id, response.data.result)
                    this.isSpin = false
                    this.getNextSpin()
                }
            }).catch((error) => {
                    //handling request error
                    this.$store.commit("log", 'Error '+ error + ' calling URL '+this.$store.state.apiURL+'/game/'+uuid+' Will retry in 1 second')
                    this.$emit('logged')
                    setTimeout(() => {this.spinning(uuid)}, 1000)
            })
        },
        spinComplete: function(id, result){
            this.$store.commit("addEvent", 'Game '+id+' ended, result is '+result)
            this.$store.commit("log", 'Spin complete for game '+id+'. The result is '+result)
            this.$store.commit("addSpinResult", result)
            this.$emit('spinComplete')
        },
        getNextSpin: function(){
            if (!this.loaded)
                return
            this.$store.commit("log", 'GET Getting next spin .../nextGame')
            this.$emit('logged')
            this.axios.get(this.$store.state.apiURL+'/nextGame').then((response) => {
                this.$store.commit("log", 'Got next spin. ID '+response.data.id)
                if (this.isSpin || response.data.fakeStartDelta <= 0){
                    this.$store.commit("log", 'Game is in progress')
                    //game is in progress
                    let uuid = response.data.uuid
                    //spinning is taking place
                    this.isSpin = true
                    this.spinning(uuid)
                }else{
                    this.$store.commit("log", 'Game is not in progress')
                    this.totalSeconds = response.data.fakeStartDelta
                    this.hoursUntilSpin = Math.floor(this.totalSeconds / 360)
                    this.minutesUntilSpin = Math.floor((this.totalSeconds - (this.hoursUntilSpin * 360)) / 60)
                    this.secondsUntilSpin = this.totalSeconds - (this.hoursUntilSpin * 360) - (this.minutesUntilSpin * 60)
                    setTimeout(() => {this.getNextSpin()}, response.data.fakeStartDelta*1000)
                    this.subtractTime()
                }
                this.$emit('logged')
            }).catch((error) => {
                    //handling request error
                    this.$store.commit("log", 'Error '+ error + ' calling URL '+this.$store.state.apiURL+'/nextGame Will retry in 1 second')
                    this.$emit('logged')
                    setTimeout(() => {this.getNextSpin()}, 1000)
            })
        }
    },
    created: function(){
        this.$store.commit("log", 'Loading up spin timer')
        this.$emit('logged')
        this.loaded = true
        this.getNextSpin()
        this.$store.commit("log", 'Spin timer loaded')
    },
    destroyed: function(){
        this.loaded = false
    }
  }
</script>