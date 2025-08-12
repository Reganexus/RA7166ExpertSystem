export const section32 = {
  startQuestion: "Is the individual a foreigner?",

  getNextStep: (
    step: number,
    answer: string,
    state: {
      isForeigner?: boolean;
      isLawEnforcement?: boolean;
      isPrivate?: boolean;
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
      "Loss of right to vote",
      "Disqualification from public office"
    ];

    const deportationPenalty = [
      ...standardPenalties,
      "Deportation (to be enforced after the prison term has been served)"
    ];

    switch (step) {
      case 1:
        state.isForeigner = answer === "yes";
        return {
          question: state.isForeigner
            ? "Is he/she trying to be involved in the election process?"
            : "Does the individual have firearms?",
          nextStep: state.isForeigner ? 2 : 3,
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
        return answer === "yes"
          ? {
              question: "Is the firearm licensed/registered?",
              nextStep: 4,
              state,
            }
          : penalty("No Penalty");

      case 4:
        return answer === "yes"
          ? {
              question:
                "Has the individual brought a firearm or any deadly weapon into public places?",
              nextStep: 5,
              state,
            }
          : {
              question:
                "Has the individual registered their firearm during the election period?",
              nextStep: 6,
              state,
            };

      case 5:
        return answer === "yes"
          ? {
              question:
                "Is the individual a member of the Philippine National Police, Armed Forces of the Philippines, or any other law enforcement agencies of the Government?",
              nextStep: 7,
              state,
            }
          : penalty("No Penalty");

      case 6:
        return answer === "yes"
          ? {
              question:
                "Does the individual have a written authorization from the COMELEC?",
              nextStep: 10,
              state,
            }
          : penalty(formatPenalty(
              "Possession of an unregistered firearm during the election period.",
              standardPenalties
            ));

      case 7:
        state.isLawEnforcement = answer === "yes";
        return answer === "yes"
          ? {
              question:
                "Is the law enforcement officer off-duty during the election period?",
              nextStep: 8,
              state,
            }
          : {
              question:
                "Is the private individual using their private vehicle to transport firearms during the election period?",
              nextStep: 11,
              state,
            };

      case 8:
        return answer === "yes"
          ? {
              question:
                "Has the law enforcement officer brought a firearm during their off-duty hours in public places?",
              nextStep: 9,
              state,
            }
          : {
              question:
                "Is the law enforcement officer in full uniform showing clearly and legibly his/her name, rank, and serial number?",
              nextStep: 12,
              state,
            };

      case 9:
        return answer === "yes"
          ? penalty(formatPenalty(
              "Bringing a firearm while off-duty in public places.",
              standardPenalties
            ))
          : penalty("No Penalty");

      case 10:
        return answer === "yes"
          ? penalty("No Penalty")
          : penalty(formatPenalty(
              "Possession of a firearm without COMELEC authorization.",
              standardPenalties
            ));

      case 11:
        state.isPrivate = answer === "yes";
        return answer === "yes"
          ? {
              question:
                "Did the private individual obtain a written authorization from the COMELEC to transport firearms?",
              nextStep: 13,
              state,
            }
          : {
              question:
                "Did the private individual bring a firearm in public places during the election period?",
              nextStep: 14,
              state,
            };

      case 12:
        return answer === "yes"
          ? {
              question:
                "Did the law enforcement officer obtain written authorization from the COMELEC?",
              nextStep: 10,
              state,
            }
          : penalty(formatPenalty(
              "Lack of proper identification while carrying a firearm.",
              standardPenalties
            ));

      case 13:
        return answer === "yes"
          ? penalty("No Penalty")
          : penalty(formatPenalty(
              "Transporting a firearm without COMELEC authorization.",
              standardPenalties
            ));

      case 14:
        return answer === "yes"
          ? {
              question:
                "Did the private individual obtain a written authorization from the COMELEC to bring firearms in public places during the election period?",
              nextStep: 15,
              state,
            }
          : penalty("No Penalty");

      case 15:
        return answer === "yes"
          ? penalty("No Penalty")
          : penalty(formatPenalty(
              "Bringing a firearm in public places without COMELEC authorization.",
              standardPenalties
            ));

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
