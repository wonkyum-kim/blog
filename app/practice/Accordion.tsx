'use client';

import { ChevronDown, Eye, BookMarked, NotebookPen } from 'lucide-react';
import { useState } from 'react';
import { accordionItems } from './accordionItems';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface AccordionListProps {
  name: string;
  img: string;
  source: string;
  see: string;
  description: string;
  selected: string;
  expandAll: boolean;
  handleClick: (name: string) => void;
}

export default function Accordion() {
  const [selected, setSelected] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  const handleClick = (name: string) => {
    setSelected((prev) => {
      if (prev === name) return '';
      return name;
    });
  };

  const handleExpand = () => {
    setExpandAll((prev) => !prev);
  };

  return (
    <div className='w-full flex flex-col'>
      <button onClick={handleExpand} className='hover:underline'>
        {expandAll ? 'Collapse all' : 'Expand all'}
      </button>
      {accordionItems.map((item) => {
        return (
          <AccordionList
            key={item.name}
            {...item}
            selected={selected}
            handleClick={handleClick}
            expandAll={expandAll}
          />
        );
      })}
    </div>
  );
}

function AccordionList({
  name,
  img,
  see,
  source,
  description,
  selected,
  expandAll,
  handleClick,
}: AccordionListProps) {
  const checked = selected === name || expandAll;
  return (
    <div
      className={clsx(
        'h-[52px] transition-all duration-300',
        checked && 'md:h-auto min-[0px]:h-auto'
      )}
    >
      <div
        className='w-full py-4 flex items-center justify-between border-b-2 cursor-pointer'
        onClick={() => {
          handleClick(name);
        }}
      >
        <div className='font-semibold hover:underline decoration-blue-500 decoration-2 dark:decoration-white'>
          {name}
        </div>
        <ChevronDown
          className={clsx(
            'transition-all duration-500',
            checked && 'rotate-180'
          )}
        />
      </div>
      {checked && (
        <div className='min-h-[250px] w-full flex flex-col gap-2 items-center md:flex-row '>
          {img !== '' && (
            <Image
              alt={name}
              src={img}
              width={250}
              height={250}
              className='p-4 object-cover'
            />
          )}
          <ul className='w-full h-[20px] flex items-center justify-center gap-3 md:gap-6'>
            {see !== '' && (
              <li className='cursor-pointer'>
                <Link
                  href={see}
                  className='flex items-center justify-center gap-2 '
                >
                  <Eye />
                  See
                </Link>
              </li>
            )}
            {source !== '' && (
              <li className='flex items-center justify-center gap-2 cursor-pointer'>
                <BookMarked />
                <Link href={source}>source</Link>
              </li>
            )}
            {description !== '' && (
              <li className='flex items-center justify-center gap-2 cursor-pointer'>
                <NotebookPen />
                <Link href={description}>description</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
