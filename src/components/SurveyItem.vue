<template>
  <div class="survey-item">
    <v-radio-group
      v-model="selectedAnswer"
      :column="false"
      class="d-flex flex-column"
    >
      <v-radio
        v-for="(answerNum, index) in answerNumbers"
        :key="index"
        :value="answerNum"
      >
        <template #label>
          <v-btn
            class="mx-1 my-2 survey-button"
            width="1"
            large
            tile
            :depressed="answerNum === selectedAnswer"
            >{{ answerNum }}</v-btn
          >
        </template>
      </v-radio>
      <div class="key d-flex justify-space-between">
        <div><p>Does not apply</p></div>
        <div><p>Applies</p></div>
      </div>
    </v-radio-group>
  </div>
</template>
<script>
export default {
  props: {
    question: {
      type: Object,
      default: () => ({
        question: "",
        answerRange: {
          start: 1,
          end: 10,
        },
      }),
    },
  },
  data() {
    return {
      selectedAnswer: null,
    };
  },
  computed: {
    answerNumbers() {
      const { start, end } = this.question.answerRange;
      return Array.from({ length: end }, (_, i) => start + i);
    },
    currentQuestion() {
      return this.question.question;
    },
  },
  methods: {
    resetAnswer() {
      this.selectedAnswer = null;
    },
  },
  watch: {
    selectedAnswer(newVal) {
      this.$emit("answer-changed", newVal);
    },
    currentQuestion: {
      handler() {
        this.selectedAnswer = this.question.answer;
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss"></style>
