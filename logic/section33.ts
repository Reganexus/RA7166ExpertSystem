export const section33 = {
  startQuestion: "Is the individual a foreigner?",

  getNextStep: (
    step: number,
    answer: string,
    state: {
      isForeigner?: boolean;
      isCandidate?: boolean;
      isLawEnforcer?: boolean;
      isThreatened?: boolean;
    } = {}
  ) => {
    const penalty = (msg: string) => ({
      question: msg,
      nextStep: null,
      state,
      done: true,
    });

    switch (step) {
      case 1:
        state.isForeigner = answer === "yes";
        return {
          question: state.isForeigner
            ? "Is the foreigner trying to be involved in the election process?"
            : "Is the individual a candidate for public office, including incumbent public officers seeking election to any public office?",
          nextStep: state.isForeigner ? 2 : 3,
          state,
        };

      case 2:
        return answer === "yes"
          ? penalty(`
              <strong>Penalty for Foreign Involvement in Elections:</strong><br>
              <strong>Imprisonment:</strong> One to six years, followed by deportation.<br>
              <strong>Deportation:</strong> Enforced after sentence.
            `)
          : penalty("No Penalty.");

      case 3:
        state.isCandidate = answer === "yes";
        return {
          question: state.isCandidate
            ? "Does the candidate face any threats to life or security during the election campaign?"
            : "Is the individual a member of the Philippine National Police, Armed Forces of the Philippines, or any other law enforcement agencies of the Government?",
          nextStep: state.isCandidate ? 4 : 10,
          state,
        };

      case 4:
        state.isThreatened = answer === "yes";
        return {
          question: state.isThreatened
            ? "Are the threats to life or security validated as true for the individual candidate?"
            : "Does the candidate have security personnel and bodyguards assigned beside them during the campaign?",
          nextStep: state.isThreatened ? 5 : 6,
          state,
        };

      case 5:
        return {
          question: answer === "yes"
            ? "Does the candidate submit an application to the COMELEC to assign them a member/members of a law enforcement agency?"
            : "Does the candidate have security personnel and bodyguards assigned beside them during the campaign?",
          nextStep: answer === "yes" ? 7 : 6,
          state,
        };

      case 6:
        return answer === "yes"
          ? {
              question:
                "Does the candidate submit an application to the COMELEC to assign them a member/members of a law enforcement agency?",
              nextStep: 7,
              state,
            }
          : penalty("No Penalty.");

      case 7:
        return answer === "yes"
          ? penalty("No Penalty.")
          : penalty(`
              <strong>Penalty for Unauthorized Security Personnel:</strong><br>
              <strong>Imprisonment:</strong> One to six years.<br>
              <strong>Disqualification:</strong> Loss of right to hold office.<br>
              <strong>Voting Rights:</strong> Revoked.
            `);

      case 10:
        state.isLawEnforcer = answer === "yes";
        return answer === "yes"
          ? {
              question:
                "Are the law enforcer(s) security personnel and bodyguards of a candidate?",
              nextStep: 11,
              state,
            }
          : penalty("No Penalty.");

      case 11:
        return answer === "yes"
          ? {
              question:
                "Are the law enforcer(s) assigned by the COMELEC as security personnel and bodyguards for the individual candidate?",
              nextStep: 12,
              state,
            }
          : penalty("No Penalty.");

      case 12:
        return answer === "yes"
          ? {
              question:
                "Are the law enforcer(s) wearing full uniform clearly showing their name, rank, and serial number?",
              nextStep: 13,
              state,
            }
          : penalty(`
              <strong>Penalty for Misuse of Law Enforcement as Security Personnel:</strong><br>
              <strong>Imprisonment:</strong> One to six years.<br>
              <strong>Disqualification:</strong> Permanent from public service.<br>
              <strong>Voting Rights:</strong> Revoked.
            `);

      case 13:
        return answer === "yes"
          ? penalty("No Penalty.")
          : penalty(`
              <strong>Penalty for Misuse of Law Enforcement as Security Personnel:</strong><br>
              <strong>Imprisonment:</strong> One to six years.<br>
              <strong>Disqualification:</strong> Permanent from public service.<br>
              <strong>Voting Rights:</strong> Revoked.
            `);

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
