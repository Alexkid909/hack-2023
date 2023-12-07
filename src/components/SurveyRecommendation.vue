<template>
  <li
    class="survey-recommendation mb-4 text-left"
    v-html="recommendationsMessage"
  ></li>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    recommendationKey: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["getRecommendationMessages"]),
    recommendationsMessage() {
      const recommendationMessage =
        this.getRecommendationMessages[this.recommendationKey];
      if (!recommendationMessage) {
        return "";
      }
      const { message, cta } = recommendationMessage;
      const link = `<a href="${cta.destination}" target="_blank">${cta.label}</a>`;
      return message.replace("(link)", link) || "";
    },
  },
};
</script>
