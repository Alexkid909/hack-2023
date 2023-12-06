<template>
  <div class="root">
    <v-app>
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <!-- <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
  
          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          /> -->
        </div>

        <v-spacer></v-spacer>

        <!-- <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="mr-2">Latest Release</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn> -->
      </v-app-bar>

      <v-main>
        <v-container class="mt-10 d-flex justify-center">
          <v-sheet color="white" elevation="5" width="66%">
            <v-form>
              <v-card height="100%" class="px-10 text-center">
                <v-card-title class="justify-center"
                  ><h1 class="text-h4">Self Assesement Survey</h1>
                </v-card-title>
                <v-card-subtitle class="text-subtitle-1"
                  >Take this quick survey about your gaming behaviours to see
                  how we can help you gamble responsibly</v-card-subtitle
                >
                <v-card-text class="text-body-1">
                  {{ currentQuestion?.question || "" }}
                </v-card-text>
                <v-card-actions class="flex-wrap justify-center">
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
                          class="mx-2 my-2 survey-button"
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
                  <v-btn :disabled="!canGoToPrev" @click="goToPrevQuestion()"
                    >Prev</v-btn
                  >
                  <v-btn :disabled="!canGoToNext" @click="goToNextQuestion()"
                    >Next</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-form>
          </v-sheet>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  components: {},

  data: () => ({
    answerRange: {
      start: 1,
      end: 10,
    },
    currentQuestionIndex: 0,
    questions: [],
    answers: {},
    selectedAnswer: null,
  }),
  computed: {
    answerNumbers() {
      const { start, end } = this.answerRange;
      return Array.from({ length: end }, (_, i) => start + i);
    },
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    currentAnswer() {
      return this.answers[this.currentQuestionIndex] || null;
    },
    canGoToNext() {
      return (
        this.currentQuestionIndex < this.questions.length - 1 &&
        !!this.selectedAnswer
      );
    },
    canGoToPrev() {
      return this.currentQuestionIndex > 0;
    },
  },
  async created() {
    const res = await axios.get("./questions.json");
    this.questions = res.data;

    console.log("this.qna", this.questions);
  },
  methods: {
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
  },
  watch: {
    currentQuestionIndex(newVal) {
      this.selectedAnswer = this.answers[newVal];
    },
  },
};
</script>

<style lang="scss">
.root {
  .survey-button {
    min-width: 44px !important;
  }

  .v-input {
    div[role="radiogroup"] {
      display: flex;
      flex-direction: row !important;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .v-radio {
    position: relative;
    > div {
      visibility: hidden;
      position: absolute;
      width: 0;
      height: 0;
    }
  }

  .key {
    width: 100%;
  }
}
</style>
