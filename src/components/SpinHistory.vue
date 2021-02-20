<template>
    <div>
        <h2>Spin history</h2><br />
        <ul class="spin-history">
            <li v-for="event in events" :key="event"> {{event}} </li>
        </ul>
    </div>
</template>
<script>
  export default {
    data: () => ({
        events: [],
    }),
    created: function(){
        this.$store.state.event.forEach(element => {
            this.events.push(element)
        });
    }
    
  }
</script>
<style scoped>
.spin-history {
    padding-left:30%;
    padding-right:30%;
    
}
</style>