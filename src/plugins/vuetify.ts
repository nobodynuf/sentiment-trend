import Vue from 'vue';
import Vuetify, {colors} from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme : {
        themes : {
            light : {
                primary : "#28383c",
                secondary : colors.purple.darken3,
                reddit: "#ff7f0e",
                twitter: "#01b8aa"
            }
        }
    }
});
