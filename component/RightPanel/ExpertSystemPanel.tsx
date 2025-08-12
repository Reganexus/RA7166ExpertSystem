import QuestionModal from '@/component/QuestionModal';

type Props = {
  logic: any;
  onClose: () => void;
};

export default function ExpertSystemPanel({ logic, onClose }: Props) {
  return (
    <div className="bg-[var(--base-1)] rounded-lg shadow-md min-h-[70vh] h-max w-full">
      <QuestionModal logic={logic} onClose={onClose} />
    </div>
  );
}
