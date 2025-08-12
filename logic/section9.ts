export const section9 = {
  startQuestion: "Is there a registration that happened fifteen (15) days before the election?",

  getNextStep: (
    step: number,
    answer: string,
    state: { falseCounter?: number; counterMax?: number } = {}
  ) => {
    const falseCounter = state.falseCounter ?? 0;
    const counterMax = state.counterMax ?? 0;

    switch (step) {
      case 1:
        return {
          question:
            "Did the Commission designate an additional date of registration in that area?",
          nextStep: 2,
          state: {
            falseCounter: answer === "yes" ? falseCounter + 1 : falseCounter,
            counterMax: counterMax + 1,
          },
        };

      case 2:
        return {
          question:
            "Were you or someone else who is registered not listed as a voter at your assigned precinct?",
          nextStep: 3,
          state: {
            falseCounter: answer === "yes" ? falseCounter + 1 : falseCounter,
            counterMax: counterMax + 1,
          },
        };

      case 3:
        return {
          question:
            "Did the board of election post the list of all voters outside the precinct?",
          nextStep: 4,
          state: {
            falseCounter: answer === "no" ? falseCounter + 1 : falseCounter,
            counterMax: counterMax + 1,
          },
        };

      case 4:
        return {
          question: "Are there any foreigners involved in the political party?",
          nextStep: 5,
          state: {
            falseCounter: answer === "yes" ? falseCounter + 1 : falseCounter,
            counterMax: counterMax + 1,
          },
        };

      case 5: {
        const penalties = [
          "1–6 years imprisonment (not subject to probation)",
          "Disqualification to hold public office and deprivation of the right of suffrage",
          "Fine not less than ten thousand pesos (₱10,000) if found guilty"
        ];

        const extendedPenalties = [
          ...penalties,
          "Deportation (to be enforced after the prison term has been served)"
        ];

        // If all answers are "no" based on counter logic, no penalty applies
        if (falseCounter === counterMax) {
          return {
            question: "No Penalty",
            nextStep: null,
            state,
            done: true,
          };
        }

        const penaltyList = (answer === "yes" ? extendedPenalties : penalties)
          .map(p => `• ${p}`)
          .join("\n");

        return {
          question: `Penalty:\n${penaltyList}`,
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
