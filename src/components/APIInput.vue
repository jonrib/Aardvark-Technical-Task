<template>
   <v-text-field
      label="API URL:"
      :rules="rules"
      hide-details="auto"
      v-model="apiURL"
      @input="handleAPIChange"
    ></v-text-field>
</template>
<script>
  export default {
    data: () => ({
      apiURL: '',
      rules: [
        value => !!value || 'Required.',
      ],
    }),
    created: function(){
        this.apiURL = this.$store.state.apiURL
    },
    methods: {
      handleAPIChange: function(){
        this.$store.commit("changeAPIUrl", this.apiURL)
        this.$emit('apiChange')
        this.$store.commit("log", 'API URL changed to: '+this.apiURL)
      }
    }
  }
</script>