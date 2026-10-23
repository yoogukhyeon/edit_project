import { CategoryStyle } from 'constants/tools';
import { IconType } from 'react-icons';

type Props = { icon: IconType; style: CategoryStyle; size?: 'xs' | 'sm' | 'md' | 'lg' };

const SIZES = {
  xs: { box: 'h-6 w-6 rounded-md', icon: 14 },
  sm: { box: 'h-8 w-8 rounded-lg', icon: 18 },
  md: { box: 'h-10 w-10 rounded-xl', icon: 22 },
  lg: { box: 'h-12 w-12 rounded-xl', icon: 26 },
};

// 카테고리 색 배경 위의 흰색 아이콘 타일
const ToolIcon = ({ icon: Icon, style, size = 'md' }: Props) => (
  <span className={`flex shrink-0 items-center justify-center shadow-sm ${style.icon} ${SIZES[size].box}`} aria-hidden="true">
    {/* 전역 svg 색 규칙보다 우선하도록 ! 사용 */}
    <Icon size={SIZES[size].icon} className="!text-white" />
  </span>
);

export default ToolIcon;
