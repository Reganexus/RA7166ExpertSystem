export const section24 = {
  startQuestion:
    "Did the Chairman of the board of election inspectors affix his/her signature at the back of the official ballot in the presence of the voter?",

  getNextStep: (
    step: number,
    answer: string,
    state: { falseCounter?: number } = {}
  ) => {
    const formatPenalty = (items: string[]) =>
      `Penalty:\n${items.map(p => `• ${p}`).join("\n")}`;

    let falseCounter = state.falseCounter ?? 0;

    switch (step) {
      case 1:
        if (answer === "yes") falseCounter++;
        return {
          question:
            "Is the ballot with the signature of the chairman of the board of election been authenticated?",
          nextStep: 2,
          state: { falseCounter },
        };

      case 2:
        if (answer === "yes") falseCounter++;
        return {
          question: "Are there any foreigners involved in the political party?",
          nextStep: 3,
          state: { falseCounter },
        };

      case 3: {
        const penalties = [
          "1–6 years imprisonment (not subject to probation)",
          "Disqualification to hold public office and deprivation of the right of suffrage",
          "Fine not less than ten thousand pesos (₱10,000) if found guilty"
        ];

        const extendedPenalties = [
          ...penalties,
          "Deportation (to be enforced after the prison term has been served)"
        ];

        if (falseCounter >= 2) {
          return {
            question: "No Penalty",
            nextStep: null,
            state,
            done: true,
          };
        }

        return {
          question: answer === "yes"
            ? formatPenalty(extendedPenalties)
            : formatPenalty(penalties),
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
