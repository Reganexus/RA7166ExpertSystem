export const section25 = {
  startQuestion: "Is the individual a foreigner?",

  getNextStep: (
    step: number,
    answer: string,
    state: { foreigner?: boolean } = {}
  ) => {
    const penalty = (msg: string) => ({
      question: msg,
      nextStep: null,
      state,
      done: true,
    });

    switch (step) {
      case 0:
        state.foreigner = answer === "yes";
        return {
          question: state.foreigner
            ? "Is he/she trying to be involved in the election process?"
            : "Is the individual a member of the Board of Election Inspectors (Chairman, Poll Clerk, Third Member)?",
          nextStep: state.foreigner ? -1 : 1,
          state,
        };

      case -1:
        return answer === "yes"
          ? penalty(
              `Penalty: Guilty of violating Section 24 of the Omnibus Election Code.<br>Imprisonment: 1 to 6 years, sentenced to deportation which shall be enforced after the prison term has been served.`
            )
          : penalty("No Penalty");

      case 1:
        return {
          question:
            "Is the member of BEI blocking the watchers or public from having a clear view of the ballots, election return, or tally board?",
          nextStep: 2,
          state,
        };

      case 2:
        return answer === "yes"
          ? penalty(
              `Penalty: Guilty of obstructing the view of the public.<br>Imprisonment: 1 to 6 years, Disqualification from Public Office, Loss of Voting Rights.`
            )
          : {
              question:
                "Is the table cluttered with unrelated materials like pens, papers, or personal items?",
              nextStep: 4,
              state,
            };

      case 3:
        return {
          question:
            "Is the watcher or poll worker trying to touch the tally board, ballots, or election return?",
          nextStep: 5,
          state,
        };

      case 4:
        return answer === "yes"
          ? penalty(
              `Penalty: Guilty of violating Section 23 and 24 of the Omnibus Election Code.<br>Imprisonment: 1 to 6 years, Disqualification from Public Office, Loss of Voting Rights.`
            )
          : {
              question:
                "Are the BEI members following procedural requirements like reading ballots aloud and recording votes in real-time?",
              nextStep: 7,
              state,
            };

      case 5:
        return answer === "yes"
          ? penalty(
              `Penalty: Guilty of violating Section 23 and 24 of the Omnibus Election Code.<br>Imprisonment: 1 to 6 years, Disqualification from Public Office, Loss of Voting Rights.`
            )
          : penalty("No Penalty");

      case 6:
        return {
          question:
            "Is the registered voter trying to touch the tally board, ballots, or election return?",
          nextStep: 8,
          state,
        };

      case 7:
        return answer === "no"
          ? penalty(
              `Penalty: Guilty of violating Section 23 and 24 of the Omnibus Election Code.<br>Imprisonment: 1 to 6 years, Disqualification from Public Office, Loss of Voting Rights.`
            )
          : {
              question:
                "Are unauthorized individuals getting too close to ballots or documents?",
              nextStep: 10,
              state,
            };

      case 8:
        return answer === "yes"
          ? penalty(
              `Penalty: Guilty of violating Section 23 and 24 of the Omnibus Election Code.<br>Imprisonment: 1 to 6 years, Disqualification from Public Office, Loss of Voting Rights.`
            )
          : penalty("No Penalty");

      case 9:
        return answer === "yes"
          ? penalty(
              `Penalty: Guilty of violating Section 23 and 24 of the Omnibus Election Code.<br>Imprisonment: 1 to 6 years, Disqualification from Public Office, Loss of Voting Rights.`
            )
          : penalty("No Penalty");

      case 10:
        return answer === "yes"
          ? penalty(
              `Penalty: Guilty of violating Section 23 and 24 of the Omnibus Election Code.<br>Imprisonment: 1 to 6 years, Disqualification from Public Office, Loss of Voting Rights.`
            )
          : penalty("No Penalty");

      case 99: // fallback
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
