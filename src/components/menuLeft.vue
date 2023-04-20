<template>
  <div class="wrapper-menu">
    <div class="menu">
      <div class="title"><h1>OpenWeather</h1></div>
      <div class="content">
        <ul>
          <li @click="moveToWeather">Weather</li>
          <li>Guide</li>
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
    moveToWeather(){
        this.$router.push('/weather')
    }
  }
};
</script>
<style scoped>
.wrapper-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 100%;
  padding: 20px;
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
  background-color: rgb(240, 240, 240);
  cursor: pointer;
}
</style>
