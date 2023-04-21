<template lang="">
  <div class="search d-flex">
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
    <button class="btn-search" v-on:click="handleSearch">
      {{ $t("btnSearch") }}
    </button>
  </div>
</template>
<script>
import suggestVue from "../suggest.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "input-vue",

  components: {
    suggestVue,
  },
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      submit: false,
      listSuggest: [],
      dataSearch: "",
    };
  },
  computed: {
    ...mapGetters("language", ["getLanguage"]),
    ...mapGetters("weather", ["getListCountry"]),
  },
  validations() {
    return {
      dataSearch: { required, minLength: minLength(3) }, // Matches this.firstName
    };
  },

  mounted() {
    document.removeEventListener("click", this.handleClickOutside, true);
  },

  watch: {
    getListCountry(newVal) {
      this.listSuggest = newVal;
      console.log(newVal);
    },
  },
  methods: {
    ...mapActions("language", ["setLanguage"]),
    ...mapActions("weather", ["findCountry"]),

    async handleSearch() {
      this.v$.$validate();
      this.listSuggest = [];
      if (!this.v$.dataSearch.$error) {
        await this.findCountry(this.dataSearch);
      }
      this.submit = true;
      if (this.submit) {
        document.addEventListener("click", this.handleClickOutside, true);
      } else {
        document.removeEventListener("click", this.handleClickOutside, true);
      }
    },

    //Sử lý close form suggest
    handleClickOutside(event) {
      if (!this.$refs.suggest.contains(event.target)) {
        this.submit = false;
        document.removeEventListener("click", this.handleClickOutside, true);
      }
    },

    closeSuggest() {
      this.submit = false;
    },
  },
};
</script>
<style scoped>
.form-input {
  width: 100%;
  position: relative;
}
.input-search {
  border-radius: 0px !important;
  border: none;
  background: #ffffff;
  outline: none;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  font-size: 14px;
}
.suggest {
  position: absolute;
  width: 100%;
  background: #ffffff;
  /* border: 1px solid #c9c9c9;
  border-top: none; */
  height: inherit;
  top: 33px;
  display: none;
}
.submit {
  display: block;
}
.search {
  width: 80%;
  /* background: cadetblue; */
}
.btn-search {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  outline: none;
  border: 1px #f2f2f2;
  background: #424242;
  color: white;
  padding: 5px 15px;
  font-size: 14px;
  width: 80px;
}
</style>
