import {defineAsyncComponent} from "vue"

export function registerGlobalComponent(app){
    app.component('default-layout', defineAsyncComponent(() => import("../layout/defaultLayout")))
    app.component('loader-vue', defineAsyncComponent(() => import("../components/ultil/loader")))
}