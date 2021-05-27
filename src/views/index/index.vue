<template>
  <div class="box">
    <child1 :count="count"></child1>
    <child2 :line="line" v-if="line.length > 0"></child2>
    <child3
      :radar="radar"
      :pie="pie"
      :histogram="histogram"
      v-if="radar.length > 0 && pie.length > 0 && histogram.length > 0"
    ></child3>
    <child4
      :orderData="orderData"
      :todolist="todolist"
      :progress="progress"
      v-if="orderData.length > 0 && todolist.length > 0 && progress.length > 0"
    ></child4>
  </div>
</template>

<script>
import child1 from "../../components/index/child1";
import child2 from "../../components/index/child2";
import child3 from "../../components/index/child3";
import child4 from "../../components/index/child4";
import axios from "axios";

export default {
  name: "",
  props: {},
  data() {
    return {
      count: {},
      line: [],
      radar: [],
      pie: [],
      histogram: [],
      orderData: [],
      todolist: [],
      progress: []
    };
  },
  components: {
    child1,
    child2,
    child3,
    child4
  },
  methods: {
    getData() {
      axios
        .get("/api/homeData")
        .then(res => {
          this.count = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getline() {
      axios
        .get("/api/homeChat")
        .then(res => {
          this.line = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getradar() {
      axios
        .get("/api/radarChat")
        .then(res => {
          this.radar = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getpie() {
      axios
        .get("/api/ringChat")
        .then(res => {
          this.pie = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    gethistogram() {
      axios
        .get("/api/homeChat")
        .then(res => {
          this.histogram = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getorderData() {
      axios
        .get("/api/orderData")
        .then(res => {
          this.orderData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    gettodolist() {
      axios
        .get("/api/todolist")
        .then(res => {
          this.todolist = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getprogress() {
      axios
        .get("/api/progress")
        .then(res => {
          this.progress = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
    this.getline();
    this.getradar();
    this.getpie();
    this.gethistogram();
    this.getorderData();
    this.gettodolist();
    this.getprogress();
  },
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
</style>