<template>
    <div>
        <APIInput v-on:apiChange="handleAPIChange"></APIInput>
        <div class="row">
            <div class="stats col-sm-12">
                <StatisticsBlock :key="renderKey" v-on:logged="handleLogged"></StatisticsBlock>
            </div>
            <div class="logEvents col-sm-12">
                <LogEvents :key="loggedKey"></LogEvents>
            </div>
        </div>
    </div>
</template>
<script>
const APIInput = () => import('./APIInput.vue')
const StatisticsBlock = () => import('./StatisticsBlock.vue')
const LogEvents = () => import('./LogEvents.vue')

import globals from '../globalFunctions.js'

  export default {
    data: () => ({
        renderKey: 0,
        loggedKey: 0,
        loaded: false, //same idea as spin timer
    }),
    created: function(){
        this.loaded = true
        this.$store.commit("log", 'Stats and action page was opened')
        globals.getNextSpin(this, false)
    },
    destroyed: function(){
        this.$store.commit("log", 'Stats and action page was closed')
        this.loaded = false
    },
    methods:{
        handleAPIChange: function(){
            this.renderKey++
        },
        handleSpinComplete: function(){
            this.renderKey++
        },
        handleLogged: function(){
            this.loggedKey++
        }
    },
    components:  {
        APIInput,
        StatisticsBlock,
        LogEvents,
	},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats, .spinTimer, .logEvents, .spinHistory, .gameBoard {
  padding-top: 2%;
}
</style>