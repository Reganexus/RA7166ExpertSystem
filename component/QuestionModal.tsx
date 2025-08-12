import { useEffect, useRef, useState } from "react";

type Message = {
  type: "question" | "answer" | "result";
  text: string;
};

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
  const [state, setState] = useState({});
  const [done, setDone] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: "question", text: logic.startQuestion }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAnswer = (answer: string) => {
    setMessages((prev) => [...prev, { type: "answer", text: answer.toUpperCase() }]);

    const result = logic.getNextStep(step, answer, state);

    if (result.done) {
      setMessages((prev) => [...prev, { type: "result", text: result.question }]);
      setDone(true);
    } else {
      setMessages((prev) => [...prev, { type: "question", text: result.question }]);
    }

    setStep(result.nextStep ?? step);
    setState(result.state);
    setDone(result.done ?? false);
  };

  return (
    <div className="flex flex-col max-h-[70dvh] h-[70dvh] bg-[var(--base-1)] rounded-lg">
      {/* Chat bubbles */}
      <div
        className="flex-1 overflow-y-auto space-y-4 p-4 custom-scrollbar"
        style={{ scrollbarColor: "white transparent", scrollbarWidth: "thin" }}
      >
        {messages.map((msg, idx) => (
          <div
            style={{ whiteSpace: "pre-line" }}
            key={idx}
            className={`max-w-[75%] p-3 px-4 rounded-lg ${msg.type === "question"
                ? "bg-[var(--base-3)] text-white self-start"
                : msg.type === "answer"
                  ? "bg-[var(--base-2)] text-white w-max self-end ml-auto"
                  : "bg-green-500 text-white self-start"
              }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Buttons */}
      {!done ? (
        <div className="flex gap-4 p-4 border-t border-white/10">
          <button
            onClick={() => handleAnswer("yes")}
            className="border-2 border-green-600 w-full hover:bg-green-600 text-green-600 hover:text-white font-semibold transition-all ease-in-out px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer("no")}
            className="border-2 border-red-600 w-full hover:bg-red-600 text-red-600 hover:text-white font-semibold transition-all ease-in-out px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      ) : (
        <div className="p-4 border-t border-white/10 flex items-center justify-center">
          <button
            onClick={onClose}
            className="border-2 border-[var(--base-2)] bg-[var(--base-1)] hover:bg-[var(--base-2)] text-white/50 hover:text-white px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
