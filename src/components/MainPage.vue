<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      msg: 'Aardvark technical task application'
    }
  },
  created: function(){
    this.$store.commit("log", 'Main page was opened')
  },
  destroyed: function(){
    this.$store.commit("log", 'Main page was closed')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>