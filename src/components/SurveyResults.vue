<template>
  <div>
    <v-card-title class="justify-center"
      ><h1 class="text-h4">Your Results</h1>
    </v-card-title>
    <v-card-subtitle class="text-subtitle-1"
      >Here are the results of your survey</v-card-subtitle
    >
    <div class="pb-4">
      <SurveyResultsCategory
        v-for="(category, index) in getCategories"
        :key="index"
        :name="category.name"
        :friendly-name="category.friendlyName"
        :score="category.score"
        :max-score="category.maxScore"
        :messages="resultsMessages"
      ></SurveyResultsCategory>
    </div>
    <v-btn to="/recommendations">See reccommendations</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import SurveyResultsCategory from "./SurveyResultsCategory.vue";
import { mapGetters } from "vuex";

export default {
  components: { SurveyResultsCategory },
  data() {
    return {
      resultsMessages: [],
    };
  },
  computed: {
    ...mapGetters(["getCategories"]),
  },
  async created() {
    const res = await axios.get("./resultsMessaging.json");
    this.resultsMessages = res.data;
  },
};
</script>
