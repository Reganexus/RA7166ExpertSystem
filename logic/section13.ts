export const section13 = {
  startQuestion:
    "Did the candidate exceed the authorized spending limit for the election campaign?",

  getNextStep: (
    step: number,
    answer: string,
    state: { falseCounter?: number; counterMax?: number } = {}
  ) => {
    const falseCounter = state.falseCounter ?? 0;
    const counterMax = state.counterMax ?? 0;

    const incrementedState = {
      falseCounter: answer === "no" ? falseCounter + 1 : falseCounter,
      counterMax: counterMax + 1,
    };

    const penaltyText =
      "Penalty: 1-6 years imprisonment is not subject to probation<br>" +
      "Penalty: Sentenced to suffer disqualification to hold public office and deprivation of the right of suffrage.<br>" +
      "Penalty: Sentenced to pay a fine not less than ten thousand pesos (10,000) if found guilty.";

    const penaltyTextWithDeportation =
      penaltyText +
      "<br>Penalty: Sentenced to deportation which shall be enforced after the prison term has been served.";

    const antiGraftText =
      "Corollary: Anti-Graft and Corrupt Practices Act (Republic Act No. 3019)";

    switch (step) {
      case 1:
        return {
          question: "Did the political party exceed its authorized spending limit?",
          nextStep: 2,
          state: incrementedState,
        };

      case 2:
        return {
          question:
            "Were all contributions (in cash or in kind) to the candidate or political party properly reported to the Commission on Elections (COMELEC)?",
          nextStep: 3,
          state: incrementedState,
        };

      case 3:
        return {
          question:
            "Were any unreported contributions received by the candidate or political party?",
          nextStep: 4,
          state: incrementedState,
        };

      case 4:
        return {
          question:
            "Did the candidate or political party attempt to evade gift tax obligations by failing to report contributions?",
          nextStep: 5,
          state: incrementedState,
        };

      case 5:
        return {
          question: "Are there any foreigners involved in the political party?",
          nextStep: 6,
          state: incrementedState,
        };

      case 6: {
        if (falseCounter === counterMax) {
          return {
            question: "No Penalty",
            nextStep: null,
            state,
            done: true,
          };
        }

        const penalty =
          answer === "yes" ? penaltyTextWithDeportation : penaltyText;

        return {
          question: `${penalty}<br>${antiGraftText}`,
          nextStep: null,
          state,
          done: true,
        };
      }

      default:
        return {
          question: "No further questions.",
          nextStep: null,
          state,
          done: true,
        };
    }
  },
};
