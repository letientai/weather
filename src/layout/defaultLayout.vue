<template lang="">
  <div class="default-layout d-flex">
    <div
      class="menu"
      :class="{ hideMenu: menu === 'hide', showMenu: menu === 'show' }"
    >
      <menuLeft @hideMenu="hideMenu" />
    </div>
    <div class="btn-open" @click="showMenu">
      <div className="sidenav-toggler-inner">
        <i className="sidenav-toggler-line"></i>
        <i className="sidenav-toggler-line"></i>
        <i className="sidenav-toggler-line"></i>
      </div>
    </div>
    <div class="content"><slot></slot></div>
  </div>
</template>
<script>
import menuLeft from "@/components/menuLeft.vue";
export default {
  components: {
    menuLeft,
  },
  data() {
    return {
      menu: "",
    };
  },
  methods: {
    hideMenu() {
      this.menu = "hide";
    },
    showMenu() {
      this.menu = "show";
    },
  },
};
</script>
<style scoped>
.default-layout {
  position: relative;
}
.menu {
  width: 20%;
  position: absolute;
  width: 330px;
  height: 100vh;
  z-index: 30;
  transform: translateX(-330px);
}
.showMenu {
  animation: showMenu ease-in-out 700ms forwards;
}
.hideMenu {
  animation: hideMenu ease-in-out 700ms forwards;
}
.btn-open {
  position: absolute;
  z-index: 20;
  top: 30px;
  left: 30px;
  cursor: pointer;
}
.sidenav-toggler-inner,
.sidenav-toggler-line {
  width: 30px;
  transition: all 0.15s ease;
}
.sidenav-toggler-inner {
  position: relative;
}
.sidenav-toggler-inner:after,
::before {
  box-sizing: border-box;
}
.sidenav-toggler-line:not(:last-child) {
  margin-bottom: 7px;
}
.sidenav-toggler-line {
  position: relative;
  display: block;
  height: 2px;
  background-color: #9b9b9b;
}
.content {
  width: 100%;
}

@keyframes hideMenu {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-330px);
  }
}
@keyframes showMenu {
  from {
    transform: translateX(-330px);
  }
  to {
    transform: translateX(0);
  }
}
</style>
