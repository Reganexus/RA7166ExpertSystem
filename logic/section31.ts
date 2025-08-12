export const section31 = {
  startQuestion: "Is the individual a foreigner?",

  getNextStep: (
    step: number,
    answer: string,
    state: {
      foreigner?: boolean;
      bei?: boolean;
      official?: boolean;
    } = {}
  ) => {
    const formatPenalty = (description: string, penalties: string[]) =>
      `Penalty: ${description}\n${penalties.map(p => `• ${p}`).join("\n")}`;

    const penalty = (msg: string) => ({
      question: msg,
      nextStep: null,
      state,
      done: true,
    });

    const standardPenalties = [
      "1–6 years imprisonment (not subject to probation)",
      "Disqualification from public office",
      "Loss of voting rights"
    ];

    const deportationPenalty = [
      ...standardPenalties,
      "Deportation (to be enforced after the prison term has been served)"
    ];

    const penaltyWrongPerDiem = formatPenalty(
      "Guilty of violating Sections 23 and 24 of the Omnibus Election Code due to incorrect per diem rates.",
      standardPenalties
    );

    const penaltyDelayedPayment = formatPenalty(
      "Guilty of violating Sections 23 and 24 of the Omnibus Election Code for unjustifiable delays in payment of per diems when funds are available.",
      standardPenalties
    );

    switch (step) {
      case 1:
        state.foreigner = answer === "yes";
        return {
          question: state.foreigner
            ? "Is he/she trying to be involved in the election process?"
            : "Is the individual a member of Board of Election Inspectors (BEI)?",
          nextStep: state.foreigner ? 2 : 3,
          state,
        };

      case 2:
        return answer === "yes"
          ? penalty(formatPenalty(
              "Guilty of violating Section 24 of the Omnibus Election Code.",
              deportationPenalty
            ))
          : penalty("No Penalty");

      case 3:
        state.bei = answer === "yes";
        return {
          question: state.bei
            ? "Is the member of BEI participated in the election process specifically in registration and revision activities?"
            : "Is the individual responsible to process the payments (cashier or finance officer) from Department of Education, Culture and Sports, or Commission on Elections?",
          nextStep: state.bei ? 4 : 5,
          state,
        };

      case 4:
        return answer === "yes"
          ? {
              question:
                "Has the member of BEI received Per Diem within fifteen (15) days after the day of (Registration, Revision, and Election)?",
              nextStep: 6,
              state,
            }
          : penalty("No Violation?");

      case 5:
        return {
          question:
            "Are the funds available to pay the election inspectors?",
          nextStep: 9,
          state,
        };

      case 6:
        return {
          question:
            "Is the per diem received by the member in accordance with the specified per diem rate?",
          nextStep: 7,
          state,
        };

      case 7:
        return answer === "yes"
          ? penalty("No Penalty")
          : penalty(penaltyWrongPerDiem);

      case 8:
        return answer === "yes"
          ? penalty(penaltyDelayedPayment)
          : penalty("No Penalty");

      case 9:
        return {
          question:
            "Are the Officials received the correct amount of Per Diem based on the Per Diem Rate?",
          nextStep: 10,
          state,
        };

      case 10:
        return answer === "yes"
          ? penalty("No Penalty")
          : penalty(penaltyWrongPerDiem);

      case 11:
        return answer === "yes"
          ? penalty("No Penalty")
          : penalty(penaltyDelayedPayment);

      case 12:
        state.official = answer === "yes";
        return answer === "yes"
          ? {
              question:
                "Has the official received Per Diem within fifteen (15) days after the day of election?",
              nextStep: 13,
              state,
            }
          : penalty("No Penalty");

      case 13:
        return {
          question:
            "Is the per diem received by the official in accordance with the specified per diem rate?",
          nextStep: 14,
          state,
        };

      case 14:
        return answer === "yes"
          ? penalty("No Penalty")
          : penalty(penaltyWrongPerDiem);

      case 15:
        return answer === "yes"
          ? penalty(penaltyDelayedPayment)
          : penalty("No Penalty");

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
