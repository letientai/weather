<template lang="">
  <div class="d-flex">
    <div class="wrapper-home">
      <div class="search">
        <div class="form-input">
          <input
            type="text"
            class="input-search"
            v-model="dataSearch"
            :placeholder="$t('placeholderSearch')"
            @keyup.enter="handleSearch"
          />
          <div
            class="suggest"
            v-bind:class="{ submit: submit }"
            ref="suggest"
            @click="closeSuggest"
          >
            <div
              v-if="listSuggest.length == 0 || v$.dataSearch.$error"
              style="font-size: 11px; padding: 10px 5px 0"
            >
              {{ $t("errorSearch") }}
            </div>
            <suggest-vue v-else v-bind:listSuggest="listSuggest"></suggest-vue>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import suggestVue from "@/components/suggest.vue";
import { required, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home-vue",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      listSuggest: [],
      dataSearch: "",
      submit: false,
    };
  },
  components: {
    suggestVue,
  },
  validations() {
    return {
      dataSearch: { required, minLength: minLength(3) }, // Matches this.firstName
    };
  },
  computed: {
    ...mapGetters("weather", ["getListCountry"]),
  },
  methods: {
    ...mapActions("weather", ["findCountry"]),
    async handleSearch() {
      this.v$.$validate();
      if (!this.v$.dataSearch.$error) {
        await this.findCountry(this.dataSearch);
      } else {
        this.listSuggest = [];
      }
      this.submit = true;
    },
    closeSuggest() {
      this.submit = false;
    },
  },
  watch: {
    getListCountry(newVal) {
      this.listSuggest = newVal;
    },
  },
};
</script>
<style scoped>
.wrapper-home {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search {
  width: 500px;
  padding: 20px;
}
.suggest {
  position: absolute;
  top: 45px;
  width: 100%;
  background: #ffffff;
  /* border: 1px solid #c9c9c9;
  border-top: none; */
  height: inherit;
  display: none;
}
.form-input {
  position: relative;
}
.submit {
  display: block;
}
.input-search {
  border-radius: 0px !important;
  border: none;
  background: #ffffff;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 14px;
  padding: 15px;
  background: rgba(223, 223, 223, 0.8);
}
</style>
