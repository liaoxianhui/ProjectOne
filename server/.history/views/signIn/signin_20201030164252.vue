<template>
  <div>
      <div></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {},
  methods: {
      getData(){
          axios.get('http://localhost:3000').then(res=>{
              console.log(res.data);
          }).catch(err=>{
              console.log(err);
          })
      }
  },
  mounted() {
      this.getData()
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>

</style>