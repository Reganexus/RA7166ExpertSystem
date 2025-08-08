export const section14 = {
  startQuestion: "Is the individual a candidate for election?",

  getNextStep: (
    step: number,
    answer: string,
    state: Record<string, any> = {}
  ) => {
    switch (step) {
      case 1:
        return {
          question: answer === "yes"
            ? "Is the individual running for a position in the barangay?"
            : "No Penalty",
          nextStep: answer === "yes" ? 2 : null,
          state,
          done: answer !== "yes",
        };

      case 2:
        return {
          question: answer === "yes"
            ? "Has the candidate spent any money or resources for the election campaign?"
            : "No Penalty",
          nextStep: answer === "yes" ? 3 : null,
          state,
          done: answer !== "yes",
        };

      case 3:
        return {
          question: answer === "yes"
            ? "Has the elected official entered their public office after being elected without submitting SOCE after 30 days of the election?"
            : "Has the candidate submitted a nil SOCE after 30 days of election?",
          nextStep: answer === "yes" ? 4 : 5,
          state,
        };

      case 4:
        return {
          question: answer === "yes"
            ? "Penalty: An administrative offense, fine between P1,000 and P30,000."
            : "Has the elected official submitted SOCE after 30 days of the election?",
          nextStep: answer === "yes" ? null : 6,
          state,
          done: answer === "yes",
        };

      case 5:
        return {
          question: answer === "yes"
            ? "No Penalty"
            : "Has the candidate previously violated the regulations regarding the submission of the SOCE?",
          nextStep: answer === "yes" ? null : 7,
          state,
          done: answer === "yes",
        };

      case 6:
        return {
          question: answer === "yes"
            ? "No Penalty"
            : "Penalty: An administrative offense, fine between P1,000 and P30,000.",
          nextStep: null,
          state,
          done: true,
        };

      case 7:
        return {
          question: answer === "yes"
            ? "Penalty: Fine between P2,000 and P60,000."
            : "Penalty: An administrative offense, fine between P1,000 and P30,000.",
          nextStep: null,
          state,
          done: true,
        };

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
