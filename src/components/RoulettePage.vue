<template>
    <div>
        <APIInput v-on:apiChange="handleAPIChange"></APIInput>
        <div class="row">
            <div class="stats col-sm-12">
                <StatisticsBlock :key="renderKey" v-on:logged="handleLogged"></StatisticsBlock>
            </div>
        </div>
         <div class="row">
            <div class="spinTimer col-sm-6">
                <UpcomingSpin v-on:spinComplete="handleSpinComplete" v-on:logged="handleLogged"></UpcomingSpin>
            </div>
            <div class="spinHistory col-sm-6">
                <SpinHistory :key="renderKey" v-on:logged="handleLogged"></SpinHistory>
            </div>
         </div>
         <div class="row">
            <div class="gameBoard col-sm-6">
                <GameBoard :key="renderKey" v-on:logged="handleLogged"></GameBoard>
            </div>
            <div class="logEvents col-sm-6">
                <LogEvents :key="loggedKey"></LogEvents>
            </div>
         </div>
    </div>
</template>
<script>
const APIInput = () => import('./APIInput.vue')
const StatisticsBlock = () => import('./StatisticsBlock.vue')
const UpcomingSpin = () => import('./UpcomingSpin.vue')
const SpinHistory = () => import('./SpinHistory.vue')
const LogEvents = () => import('./LogEvents.vue')
const GameBoard = () => import('./Gameboard.vue')

  export default {
    data: () => ({
        renderKey: 0,
        loggedKey: 0,
    }),
    created: function(){
        this.$store.commit("log", 'Roulette page was opened')
    },
    destroyed: function(){
        this.$store.commit("log", 'Roulette page was closed')
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
        UpcomingSpin,
        SpinHistory,
        LogEvents,
        GameBoard,
	},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats, .spinTimer, .logEvents, .spinHistory, .gameBoard {
  padding-top: 2%;
}
</style>