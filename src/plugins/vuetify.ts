import Vue from 'vue';
import Vuetify, {colors} from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme : {
        themes : {
            light : {
                primary : colors.teal.darken2,
                secondary : colors.purple.darken3,
                redditTab : "#FF4301",
                twitterTab : "#00acee",
                factor0_25 : colors.green.lighten3,
                factor26_50 : colors.green.lighten1,
                factor51_75 : colors.green.darken2,
                factor76_100 : colors.green.darken4,
                chart1 : '#5F0F40',
                chart2 : '#9A031E', 
                chart3 : '#fb8b24', 
                chart4 : '#e36414', 
                chart5 : '#0f4c5c'
            }
        }
    }
});
