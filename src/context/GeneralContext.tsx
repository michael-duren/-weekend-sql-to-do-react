import React, { createContext, useEffect, useState } from 'react';
import ToDo from '../models/todo';
import agent from '../api/agent';

export interface IGeneralContext {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  unCompleteToDoList: ToDo[];
  setUnCompleteToDoList: React.Dispatch<React.SetStateAction<ToDo[]>>;
  selectedTodo: ToDo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<ToDo | null>>;
  completeToDoList: ToDo[];
  setCompleteToDoList: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

export const GeneralContext = createContext<IGeneralContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const GeneralContextProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unCompleteToDoList, setUnCompleteToDoList] = useState<ToDo[]>([]);
  const [completeToDoList, setCompleteToDoList] = useState<ToDo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<ToDo | null>(null);

  useEffect(() => {
    agent.TodoItems.listUnComplete()
      .then((items) => {
        setUnCompleteToDoList(items);
        setSelectedTodo(items[0]);
      })
      .catch((error) => console.error(error));

    agent.TodoItems.listComplete()
      .then((items) => setCompleteToDoList(items))
      .catch((error) => console.error(error));
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        unCompleteToDoList,
        setUnCompleteToDoList,
        selectedTodo,
        setSelectedTodo,
        completeToDoList,
        setCompleteToDoList,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
