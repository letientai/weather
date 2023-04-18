<template lang="">
  <div class="wrapper">
    <div class="section-content">
      <div class="row">
        <div class="col-lg-6 col-12">
          <h1>OpenWeather</h1>
          <h2>
            Weather forecasts, nowcasts and history in a fast and elegant way
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "header-vue",
  methods: {},
};
</script>
<style>
.wrapper {
  background-image: url("../assets/spring1.jpg");
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 250px;
  background-position: center;
  display: flex;
  align-items: center;
}
.section-content {
  margin: auto;
  width: 100%;
  display: grid;
}
.section-content h1 {
  color: #ffffff;
  font-weight: bolder;
}

.section-content h2 {
  font-weight: bolder;
  color: #383838;
  font-size: 24px;
}
@media screen and (min-width: 900px) {
  .section-content {
    max-width: 900px;
  }
}
</style>
