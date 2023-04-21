<template>
  <div class="wrapper-menu">
    <div class="btn-close" @click="hideMenu"></div>
    <div class="menu">
      <div class="title d-flex">
        <h1>OpenWeather</h1>
      </div>
      <div class="content">
        <ul>
          <li @click="move('/')">Home</li>
          <li @click="move('/weather')">Weather</li>
          <li>API</li>
          <li>Dashboard</li>
          <li>Marketplace</li>
          <li>Pricing</li>
          <li>Maps</li>
          <li>Our Initiatives</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "menu-left",
  methods: {
    move(path) {
      this.$router.push(path);
    },
    hideMenu(){
      this.$emit("hideMenu")
    }
  },
};
</script>
<style scoped>
.wrapper-menu {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #7e7e7e;
  color: #fff;
  position: relative;
}
.btn-close{
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.menu {
  width: 100%;
  height: 100%;
}
.title {
  text-align: center;
}
ul {
  padding: 0;
}
li {
  list-style-type: none;
  padding: 10px 5px;
}
li:hover {
  background-color: #999999;
  cursor: pointer;
}
</style>
