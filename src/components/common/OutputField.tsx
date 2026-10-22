import { textareaClass } from 'constants/ui';
import CopyButton from './CopyButton';

type Props = { id: string; label: string; value: string; rows?: number; placeholder?: string };

// 변환 결과 표시용 읽기 전용 입력칸 + 복사 버튼
const OutputField = ({ id, label, value, rows = 5, placeholder = '입력하면 결과가 바로 표시됩니다.' }: Props) => (
  <div>
    <div className="mb-2 flex items-center justify-between">
      <label htmlFor={id} className="text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <CopyButton text={value} />
    </div>
    <textarea id={id} rows={rows} readOnly value={value} placeholder={placeholder} className={textareaClass} />
  </div>
);

export default OutputField;
