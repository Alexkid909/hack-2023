<template>
  <div class="survey-form">
    <v-form>
      <v-card-title class="justify-center"
        ><h1 class="text-h4">Self Assessement Survey</h1>
      </v-card-title>
      <v-card-subtitle class="text-subtitle-1"
        >Take this quick survey about your gaming behaviours to see how we can
        help you gamble responsibly</v-card-subtitle
      >
      <v-card-text class="text-body-1">
        {{ currentQuestion?.question || "" }}
      </v-card-text>
      <v-card-actions class="flex-wrap justify-center flex-column">
        <div>
          <SurveyItem
            :question="questions[currentQuestionIndex]"
            @answer-changed="setAnswer"
          ></SurveyItem>
        </div>
        <div>
          <v-btn
            class="mx-1 my-1"
            :disabled="!canGoToPrev"
            @click="goToPrevQuestion()"
            >Prev</v-btn
          >
          <v-btn
            class="mx-1 my-1"
            v-if="currentQuestionIndex === questions.length - 1"
            :disabled="!canGetResults"
            @click="submitResults"
            >Get results</v-btn
          >
          <v-btn
            v-else
            class="mx-1 my-1"
            :disabled="!canGoToNext"
            @click="goToNextQuestion()"
            >Next</v-btn
          >
        </div>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import SurveyItem from "./SurveyItem.vue";
import { mapActions } from "vuex";

export default {
  data: () => ({
    currentQuestionIndex: 0,
    questions: [],
    answers: {},
  }),
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    currentAnswer() {
      return this.currentQuestion.answer || null;
    },
    canGoToNext() {
      return (
        this.currentQuestionIndex < this.questions.length - 1 &&
        !!this.currentAnswer
      );
    },
    canGoToPrev() {
      return this.currentQuestionIndex > 0;
    },
    canGetResults() {
      return !!this.currentAnswer;
    },
  },
  async created() {
    const res = await axios.get("./questions.json");
    this.questions = res.data.map((question) => ({
      ...question,
      answer: undefined,
    }));
  },
  methods: {
    ...mapActions(["setCategoryScores"]),
    goToNextQuestion() {
      if (!this.canGoToNext) {
        return;
      }
      this.answers[this.currentQuestionIndex] = this.selectedAnswer;
      ++this.currentQuestionIndex;
    },
    goToPrevQuestion() {
      if (!this.canGoToPrev) {
        return;
      }
      this.answers[this.currentQuestionIndex] = this.selectedAnswer;
      --this.currentQuestionIndex;
    },
    setAnswer(newAnswer) {
      this.questions[this.currentQuestionIndex].answer = newAnswer;
    },
    submitResults() {
      const categoryScores = this.questions.reduce(
        (accumulator, currentValue) => {
          const { category, answer } = currentValue;
          if (!accumulator[category]) {
            accumulator[category] = answer;
          } else {
            accumulator[category] = accumulator[category] + answer;
          }
          return accumulator;
        },
        {}
      );

      this.setCategoryScores(categoryScores);
      this.$router.push("/results");
    },
  },
  components: { SurveyItem },
};
</script>

<style lang="scss"></style>
