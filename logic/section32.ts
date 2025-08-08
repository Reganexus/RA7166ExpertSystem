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
            ? "Is he/she trying to be involved in the election process?"
            : "Does the individual have firearms?",
          nextStep: state.isForeigner ? 2 : 3,
          state,
        };

      case 2:
        return answer === "yes"
          ? penalty(
              "Penalty: Guilty of violating Section 24 of the Omnibus Election Code.<br>Imprisonment: One to six years, sentenced to deportation which shall be enforced after the prison term has been served."
            )
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
          : penalty(
              "Penalty: Imprisonment: One to six years, loss of right to vote, disqualification from public office."
            );

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
          ? penalty(
              "Penalty: Imprisonment: One to six years due to bringing a firearm while off-duty, loss of current position or future roles in public service, loss of right to vote."
            )
          : penalty("No Penalty");

      case 10:
        return answer === "yes"
          ? penalty("No Penalty")
          : penalty(
              "Penalty: Imprisonment: One to six years due to lack of COMELEC authorization, loss of current position or future roles in public service, loss of right to vote."
            );

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
          : penalty(
              "Penalty: Imprisonment: One to six years due to lack of proper identification, loss of current position or future roles in public service, loss of right to vote."
            );

      case 13:
        return answer === "yes"
          ? penalty("No Penalty")
          : penalty(
              "Penalty: Imprisonment: One to six years due to transporting a firearm without authorization, loss of current position or future roles in public service, loss of right to vote."
            );

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
          : penalty(
              "Penalty: Imprisonment: One to six years due to bringing a firearm in public places without authorization, loss of current position or future roles in public service, loss of right to vote."
            );

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
