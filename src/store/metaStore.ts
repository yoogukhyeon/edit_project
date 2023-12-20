import { Inputs } from 'pages/MetaTag';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type MetaInputStore = {
  inputs: Inputs;
  setInputs: (inputs: Partial<Inputs>) => void;
};

export const useMetaStore = create(
  persist<MetaInputStore>(
    (set) => ({
      inputs: { title: '', desc: '', keyword: '', url: '', writer: '', curl: '' },
      setInputs: (inputs) => set((state) => ({ inputs: { ...state.inputs, ...inputs } })),
    }),
    {
      name: 'meta-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
