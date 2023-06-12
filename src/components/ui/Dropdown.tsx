import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext } from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { GeneralContext, IGeneralContext } from '../../context/GeneralContext';

interface Item {
  option: string;
  onClick: () => void;
  ItemIcon:
    | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
      })
    | null;
  additionalStyles?: string;
}

interface DropdownProps {
  title: string;
  items: Item[];
  invert: boolean;
}

export default function Dropdown({ items, title, invert }: DropdownProps) {
  const { darkMode } = useContext(GeneralContext) as IGeneralContext;
  const invertedButton =
    invert || darkMode
      ? ' bg-none text-white focus-visible:ring-black '
      : ' bg-black text-white focus-visible:ring-white ';

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={`inline-flex w-full justify-center rounded-md bg-opacity-80  px-4 py-2 text-sm font-medium ${invertedButton} hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75`}
          >
            {title}
            <ExpandMoreOutlinedIcon
              className={`ml-2 -mr-1 h-5 w-5 text-white hover:text-white`}
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute ${
              darkMode && 'bg-opacity-90'
            } right-0 mt-2 w-56 origin-top-right divide-y 
            divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black
            ring-opacity-5 focus:outline-none`}
          >
            {items.map(({ option, onClick, ItemIcon, additionalStyles }, i) => {
              return (
                <div key={option} className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        key={i}
                        onClick={onClick}
                        className={`${
                          active ? 'bg-gray-300 bg-opacity-50' : ''
                        } ${additionalStyles} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {ItemIcon !== null &&
                          (active ? (
                            <ItemIcon className="mr-1" />
                          ) : (
                            <ItemIcon className="mr-1" />
                          ))}
                        <span className={`${additionalStyles}`}>{option}</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
