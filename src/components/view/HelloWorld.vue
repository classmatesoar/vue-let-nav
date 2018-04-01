<template>
  <div class="hello">
    <input @keyup.enter="playRequire" type="text" v-model="msg" />
    <button @click="hehe">请求</button>
    <br/>
    <input @keyup.enter="playRequire(2)" type="text" v-model="msg" />
    <button @click="hehe(2)">请求</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "hh"
    };
  },
  methods: {
    hehe(num) {
      if (num === 2) {
        axios.get("http://127.0.0.1:3000/" + this.msg).then(res => {
          console.log(res);
        });
      } else {
        axios.post("http://127.0.0.1:3000/" + this.msg).then(res => {
          console.log(res);
        });
      }
    },
    playRequire(num) {
      this.hehe(num);
    }
  }
};
</script>
<style scoped>

</style>
