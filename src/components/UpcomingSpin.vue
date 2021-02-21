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
  import globals from '../globalFunctions.js'
  export default {
    data: () => ({
        isSpin: false,
        hoursUntilSpin: 0,
        minutesUntilSpin: 0,
        secondsUntilSpin: 0,
        totalSeconds: 0,
        loaded: false, //to avoid issues when timeout function is still called even after compenent is not rendered
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
    },
    created: function(){
        this.$store.commit("log", 'Loading up spin timer')
        this.$emit('logged')
        this.loaded = true
        globals.getNextSpin(this, true)
        this.$store.commit("log", 'Spin timer loaded')
    },
    destroyed: function(){
        this.loaded = false
    }
  }
</script>