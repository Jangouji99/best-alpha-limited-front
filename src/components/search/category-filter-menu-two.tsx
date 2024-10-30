import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'src/app/i18n/client';
import { FaCheck } from 'react-icons/fa';
import useQueryParam from '@utils/use-query-params';

function checkIsActive(arr: any, item: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}
function CategoryFilterMenuItemTwo({
  className = 'hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  depth = 0,
  lang,
}: any) {
  const router = useRouter();
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string[]>([]);
  const baseurl = process.env.NEXT_PUBLIC_URL_CATEGORY_IMG
  const isActive =
    checkIsActive(formState, item.slug) ||
    item?.children?.some((_item: any) => checkIsActive(formState, _item.slug));
  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [subItemAction, setSubItemAction] = useState<boolean>(false);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { slug, translatedName, subcategories, image } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }
  const handleChange = () => {
    setSubItemAction(!subItemAction);
  };

  const hasQueryKey = searchParams?.get('category');

  useEffect(() => {
    updateQueryparams('category', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey?.split(',') ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  function onClick() {
    if (Array.isArray(subcategories) && !!subcategories.length) {
      toggleCollapse();
    } else {
      router.push(`/${lang}/categories/${slug}`);
      displaySidebar && closeSidebar();
    }
  }



  let expandIcon;
  if (Array.isArray(subcategories) && subcategories.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-brand-dark text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-brand-dark text-opacity-40" />
    );
  }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          'flex justify-between items-center transition text-sm md:text-15px',
          { 'bg-fill-base': isOpen },
          className,
        )}
      >
        <button
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group',
            { 'py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3': depth > 0 },
          )}
        // onClick={handleChange}
        >
          {image?.desktop && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto ltr:mr-2.5 rtl:ml-2.5 md:ltr:mr-4 md:rtl:ml-4 2xl:ltr:mr-3 2xl:rtl:ml-3 3xl:ltr:mr-4 3xl:rtl:ml-4">
              <Image
                src={`${baseurl}${image.desktop}`}
                alt={translatedName || t('text-category-thumbnail')}
                width={40}
                height={40}
                style={{ width: 'auto' }}
              />
            </div>
          )}
          <span className="text-brand-dark capitalize py-0.5">{translatedName}</span>
          {/* {depth > 0 && (
            <span
              className={`w-[22px] h-[22px] text-13px flex items-center justify-center border-2 border-border-four rounded-full ltr:ml-auto rtl:mr-auto transition duration-500 ease-in-out group-hover:border-yellow-100 text-brand-light ${formState.includes(item.slug) &&
                'border-yellow-100 bg-yellow-100'
                }`}
            >
              {formState.includes(item.slug) && <FaCheck />}
            </span>
          )} */}
          {expandIcon && (
            <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
          )}
        </button>
      </li>
      {Array.isArray(subcategories) && isOpen ? (
        <li>
          <ul key="content" className="px-4 text-xs">
            {subcategories?.map((currentItem: any) => {
              const childDepth = depth + 1;
              return (
                <CategoryFilterMenuItemTwo
                  key={`${currentItem.name}${currentItem.slug}`}
                  item={currentItem}
                  depth={childDepth}
                  className="px-0 border-t border-border-base first:border-t-0 mx-[3px] bg-transparent"
                  lang={lang}
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function CategoryFilterMenuTwo({ items, className, lang }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <CategoryFilterMenuItemTwo
          key={`${item.slug}-key-${item.id}`}
          item={item}
          lang={lang}
        />
      ))}
    </ul>
  );
}

export default CategoryFilterMenuTwo;
