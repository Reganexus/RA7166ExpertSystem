export const section5 = {
  startQuestion: "Is the candidate running for president, vice president, or senator?",

  getNextStep: (
    step: number,
    answer: string,
    state: { falseCounter?: number } = {}
  ) => {
    const falseCounter = state.falseCounter ?? 0;

    switch (step) {
      case 1:
        if (answer === "yes") {
          return {
            question:
              "Did the candidate commence the electoral campaign more than 90 days before the election excluding Maundy Thursday and Good Friday?",
            nextStep: 2,
            state,
          };
        } else {
          return {
            question:
              "Is the candidate running for member of the House of Representatives or Local Government Units (LGU)?",
            nextStep: 5,
            state,
          };
        }

      case 2:
        return {
          question:
            "Did the candidate end the electoral campaign much later than 30 days after the election?",
          nextStep: 3,
          state: answer === "yes" ? state : { ...state, falseCounter: falseCounter + 1 },
        };

      case 3:
        return {
          question: "Are there any foreigners involved in the political party?",
          nextStep: 4,
          state: answer === "yes" ? state : { ...state, falseCounter: falseCounter + 1 },
        };

      case 4: {
        const basePenalty =
          "Penalty: 1-6 years imprisonment is not subject to probation<br>" +
          "Penalty: Sentenced to suffer disqualification to hold public office and deprivation of the right of suffrage.<br>" +
          "Penalty: Sentenced to pay a fine not less than ten thousand pesos (10,000) if found guilty.";

        const extendedPenalty = basePenalty + "<br>" +
          "Penalty: Sentenced to deportation which shall be enforced after the prison term has been served.";

        const isDone = true;

        if (falseCounter >= 2) {
          return {
            question: "No Penalty",
            nextStep: null,
            state,
            done: isDone,
          };
        }

        return {
          question: answer === "yes" ? extendedPenalty : basePenalty,
          nextStep: null,
          state,
          done: isDone,
        };
      }

      case 5:
        if (answer === "yes") {
          return {
            question:
              "Did the candidate commence the electoral campaign more than 45 days before the election excluding Maundy Thursday and Good Friday?",
            nextStep: 2,
            state,
          };
        } else {
          return {
            question: "No Penalty",
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
