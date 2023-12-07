import Vue from "vue";
import Vuex from "vuex";
import { recommendations_enum } from "./enums";

const {
  playTimeReminders,
  sessionLimits,
  depositLimits,
  autoWithdraw,
  promoteWithdraw,
  takeABreak,
  selfExclude,
  casinoSpendLimits,
  casinoLossLimits,
  lotteryPurchaseLimits,
  sportsSpendLimits,
  thirdPartyAdvice,
} = recommendations_enum;

const thresholds = {
  minor: 34,
  moderate: 67,
  major: 100,
};

const getRiskBand = (category) => {
  const riskPercentage = (category.score / category.maxScore) * 100;
  const entries = Object.entries(thresholds);
  const foundEntry = entries.find((entry) => {
    return riskPercentage <= entry[1];
  });
  return foundEntry[0];
};

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    categories: [
      {
        name: "temporal",
        maxScore: 10,
        score: null,
        friendlyName: "Time",
        recommendations: {
          minor: [],
          moderate: [playTimeReminders, sessionLimits],
          major: [playTimeReminders, sessionLimits, takeABreak, selfExclude],
        },
      },
      {
        name: "financial",
        maxScore: 10,
        score: null,
        friendlyName: "Financial",
        recommendations: {
          minor: [],
          moderate: [depositLimits, promoteWithdraw, autoWithdraw],
          major: [
            depositLimits,
            promoteWithdraw,
            autoWithdraw,
            takeABreak,
            selfExclude,
          ],
        },
      },
      {
        name: "behavioural",
        maxScore: 10,
        score: null,
        friendlyName: "Stakes",
        recommendations: {
          minor: [],
          moderate: [
            casinoSpendLimits,
            casinoLossLimits,
            sportsSpendLimits,
            lotteryPurchaseLimits,
          ],
          major: [
            casinoSpendLimits,
            casinoLossLimits,
            sportsSpendLimits,
            lotteryPurchaseLimits,
            takeABreak,
            selfExclude,
          ],
        },
      },
      {
        name: "social",
        maxScore: 10,
        score: null,
        friendlyName: "Relationships",
        recommendations: {
          minor: [],
          moderate: [thirdPartyAdvice],
          major: [thirdPartyAdvice, thirdPartyAdvice, selfExclude],
        },
      },
      {
        name: "personal",
        maxScore: 10,
        score: null,
        friendlyName: "Health",
        recommendations: {
          minor: [],
          moderate: [thirdPartyAdvice],
          major: [thirdPartyAdvice, takeABreak, selfExclude],
        },
      },
    ],
    recommendationMessages: {},
  },
  mutations: {
    setRecommendatonMessages(state, payload) {
      state.recommendationMessages = { ...payload };
    },
    setCategoryScores(state, payload) {
      const categories = [...state.categories];
      categories.map((category) => {
        const { name, score } = category;
        category.score = payload[name] || score;
      });
    },
  },
  actions: {
    setRecommendatonMessages({ commit }, payload) {
      commit("setRecommendatonMessages", payload);
    },
    setCategoryScores({ commit }, payload) {
      commit("setCategoryScores", payload);
    },
  },
  getters: {
    getRecommendationMessages: (state) => {
      return { ...state.recommendationMessages };
    },
    getCategories: (state) => state.categories,
    getCategoriesRecommendations: (state, getters) => {
      const recommendations = getters.getCategoriesRiskBands.reduce(
        (accumulator, categoryRiskBand) => {
          const { name, riskBand } = categoryRiskBand;
          const riskBandRecommendations = getters.getCategories.find(
            (category) => category.name === name
          ).recommendations[riskBand];
          if (!accumulator[riskBand]) {
            accumulator[riskBand] = riskBandRecommendations;
          } else {
            const recommendationsSet = new Set(
              accumulator[riskBand].concat(riskBandRecommendations)
            );
            accumulator[riskBand] = [...recommendationsSet];
          }

          return accumulator;
        },
        {}
      );
      const { major, minor, moderate } = recommendations;
      return [...major, ...moderate, ...minor];
    },
    getCategoriesRiskBands: (state) => {
      return state.categories.map((category) => {
        const { name } = category;
        return { name, riskBand: getRiskBand(category) };
      });
    },
  },
});

export default store;
