<template>
  <div class="pb-1">
    <v-card-text class="text-left pl-1 pt-1 py-0"
      ><strong>{{ friendlyName }}</strong></v-card-text
    >
    <v-progress-linear
      :class="'bar-' + name"
      :value="categoryScorePercentage"
      buffer-value="0"
      height="35"
      :color="categoryScoreImpact.colour"
    >
    </v-progress-linear>
    <v-card-text class="text-left pl-1 pb-1 py-0">
      {{ categoryScoreImpactMessage }}
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      default: null,
    },
    maxScore: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: "",
    },
    friendlyName: {
      type: String,
      default: "",
    },
    messages: {
      type: [],
      default: () => [],
    },
  },
  computed: {
    categoryScorePercentage() {
      return (this.score / this.maxScore) * 100;
    },
    categoryScoreImpact() {
      if (this.categoryScorePercentage < 34)
        return { title: "minor", colour: "green" };
      if (this.categoryScorePercentage > 66)
        return { title: "major", colour: "red" };
      return { title: "moderate", colour: "orange" };
    },
    categoryScoreImpactMessage() {
      const { title } = this.categoryScoreImpact;
      const rawMessage = this.messages[title] || "";
      return rawMessage.replace("(category)", this.friendlyName.toLowerCase());
    },
  },
};
</script>
