import { BsX } from 'react-icons/bs';
import cn from 'classnames';

type HighlightedBarProps = {
  onClose?: (e: React.SyntheticEvent) => void;
  variant?: 'dark' | 'primary' | 'highlighted' | 'highlightedTwo';
  className?: string;
};

const variantBasedClasses = {
  dark: 'bg-gray-800',
  primary: 'bg-brand',
  highlighted: 'bg-brand',
  highlightedTwo: 'bg-brand',
};

export default function HighlightedBar({
  variant = 'primary',
  onClose,
  children,
  className,
}: React.PropsWithChildren<HighlightedBarProps>) {
  return (
    <div
      className={cn(
        'w-full min-h-[40px] py-2 px-4 md:px-6 lg:px-8 flex items-center justify-center relative text-sm text-brand-light',
        variantBasedClasses[variant],
        className,
      )}
    >
      {children}
      <button
        onClick={onClose}
        aria-label="Close Button"
        className="absolute flex items-center justify-center transition-colors duration-200 rounded-full outline-none w-7 md:w-8 h-7 md:h-8 ltr:right-0 rtl:left-0 ltr:mr-2 rtl:ml-2 md:ltr:mr-3 lg:ltr:mr-6 2xl:ltr:mr-8 md:rtl:ml-7 2xl:rtl:ml-8 hover:bg-brand-light hover:bg-opacity-10 focus:text-brand-light focus:bg-opacity-10"
      >
        <BsX className="w-6 h-6" />
      </button>
    </div>
  );
}
