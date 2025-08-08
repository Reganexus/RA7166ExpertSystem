import { useState } from 'react';

type Props = {
  logic: {
    startQuestion: string;
    getNextStep: (
      step: number,
      answer: string,
      state: any
    ) => {
      question: string;
      nextStep: number | null;
      state: any;
      done?: boolean;
    };
  };
  onClose: () => void;
};

export default function QuestionModal({ logic, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState(logic.startQuestion);
  const [state, setState] = useState({});
  const [done, setDone] = useState(false);

  const handleAnswer = (answer: string) => {
    const result = logic.getNextStep(step, answer, state);
    setQuestion(result.question);
    setStep(result.nextStep ?? step);
    setState(result.state);
    setDone(result.done ?? false);
  };

  return (
    <div>
      <div className="mb-4 text-lg font-medium" dangerouslySetInnerHTML={{ __html: question }} />

      {!done ? (
        <div className="flex gap-4">
          <button
            onClick={() => handleAnswer('yes')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer('no')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
