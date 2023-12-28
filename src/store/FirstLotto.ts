import { TLotto } from 'pages/Lotto';
import { create } from 'zustand';

type FirstLotto = {
  lotto: TLotto;
  setLotto: (list: TLotto) => void;
};

export const useFirstLottoStore = create<FirstLotto>((set: any) => ({
  lotto: {
    bnusNo: '',
    drwNo1: '',
    drwNo2: '',
    drwNo3: '',
    drwNo4: '',
    drwNo5: '',
    drwNo6: '',
    drwNoDate: '',
    firstAccumamnt: '',
    firstPrzwnerCo: '',
    no: '',
  },
  setLotto: (list: TLotto) => set({ lotto: list }),
}));
