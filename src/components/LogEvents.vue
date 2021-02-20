<template>
    <div class="log">
        <h2>Logged events</h2><br />
        <div v-for="log in logged" :key="log.id">
            <p> {{log.time}}: {{log.msg}} </p>
        </div>
    </div>
</template>
<script>
  export default {
    data: () => ({
        logged: [],
    }),
    created: function(){
        this.$store.state.log.forEach(element => {
            this.logged.push(element)
        });
    }
    
  }
</script>
<style scoped>
.log{
    display: block;
    padding: 9.5px;
    margin: 0 0;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>