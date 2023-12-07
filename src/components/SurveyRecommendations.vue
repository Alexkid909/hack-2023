<template>
  <div class="survey-recommendations">
    <v-card-title class="justify-center"
      ><h1 class="text-h4">Our recommendations</h1>
    </v-card-title>
    <v-card-subtitle class="text-subtitle-1"
      >Here are some recommendations based on the results of your
      survey</v-card-subtitle
    >
    <!-- <div class="pb-4"> -->
    <v-card-text>
      <ul>
        <SurveyRecommendation
          v-for="(recommendation, index) in getCategoriesRecommendations"
          :key="index"
          :recommendation-key="recommendation"
        ></SurveyRecommendation>
      </ul>
    </v-card-text>
    <v-btn to="/">Start over</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import SurveyRecommendation from "./SurveyRecommendation.vue";

export default {
  components: { SurveyRecommendation },
  props: {
    currentRecommendations: [],
  },
  data() {
    return {
      recommendationsMessages: [],
    };
  },
  computed: {
    ...mapGetters(["getCategoriesRecommendations"]),
  },
  async created() {
    const res = await axios.get("./recommendationsMessaging.json");
    this.setRecommendatonMessages(res.data);
    console.log("this.reccomendationsMessages", this.recomendationsMessages);
  },
  methods: {
    ...mapActions(["setRecommendatonMessages"]),
  },
};
</script>
