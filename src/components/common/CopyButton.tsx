import { toast } from 'react-toastify';

type Props = { text: string; label?: string };

const CopyButton = ({ text, label = '복사' }: Props) => {
  const onCopy = async () => {
    if (!text) {
      toast.error('복사할 내용이 없습니다.');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success('복사했습니다.');
    } catch (error) {
      toast.error('복사에 실패했습니다. 직접 선택해 복사해주세요.');
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="min-h-[36px] rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-sky-500 hover:text-sky-600 dark:border-gray-600 dark:text-gray-200"
    >
      {label}
    </button>
  );
};

export default CopyButton;
