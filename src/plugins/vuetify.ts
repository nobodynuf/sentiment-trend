import Vue from 'vue';
import Vuetify, {colors} from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme : {
        themes : {
            light : {
                //primary : "#28383c",
                //secondary : colors.purple.darken3,
                reddit: "#ff7f0e",
                twitter: "#01b8aa",
                primary : colors.indigo.darken1,
                secondary : colors.purple.darken3,
                redditTab : "#FF4301",
                twitterTab : "#00acee",
                factor0_25 : colors.blue.lighten3,
                factor26_50 : colors.blue.lighten1,
                factor51_75 : colors.blue.darken2,
                factor76_100 : colors.blue.darken4,
                chart1 : '#5F0F40',
                chart2 : '#9A031E', 
                chart3 : '#fb8b24', 
                chart4 : '#e36414', 
                chart5 : '#0f4c5c'
            }
        }
    }
});
