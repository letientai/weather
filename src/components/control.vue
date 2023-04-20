<template>
  <div class="grey-container">
    <div class="section-content">
      <div class="d-flex justify-content-between aline-item-center">
        <div class="search-block d-flex my-4">
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
                v-show="listSuggest.length == 0 || v$.dataSearch.$error"
                style="font-size: 11px; padding: 10px 5px 0"
              >
                {{ $t("errorSearch") }}
              </div>
              <suggest-vue v-bind:listSuggest="listSuggest"></suggest-vue>
            </div>
          </div>
          <button class="btn-search" v-on:click="handleSearch">
            {{ $t("btnSearch") }}
          </button>
        </div>
        <div class="controls my-4 d-flex">
          <div class="language">
            <select
              v-model="selected"
              class="selected-language"
              @change="changeLang"
            >
              <option value="en">English</option>
              <option value="vi">Tiếng việt</option>
            </select>
          </div>
          <div class="owm-switch d-flex">
            <div class="option mx-2">Metric: °C, m/s</div>
            <div class="option">Imperial: °F, mph</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import suggestVue from "./suggest.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "control-vue",
  components: {
    suggestVue,
  },
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      selected: "",
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

  created() {
    this.selected = this.getLanguage;
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
      if (!this.v$.dataSearch.$error) {
        await this.findCountry(this.dataSearch);
      } else {
        this.listSuggest = [];
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

    changeLang() {
      this.$i18n.locale = this.selected;
      this.setLanguage(this.selected);
    },
  },
};
</script>
<style scoped>
.grey-container {
  background-color: #f2f2f2;
}
.search-block {
  width: 55%;
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
  width: 90px;
}
.controls {
  width: 37%;
  justify-content: space-between;
}
.language {
}
.selected-language {
  background-color: #acacac;
  font-size: 14px;
  border: none;
  color: #fff;
  outline: none;
  padding: 5px;
}
.form-input {
  width: 80%;
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
  margin-left: 1px;
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
.owm-switch {
  font-size: 12px;
}
.option {
  background: #dfdfdf;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  cursor: pointer;
}
</style>
