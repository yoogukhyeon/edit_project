import { useState } from 'react';

function useAlert(initialState: boolean) {
  const [value, setValue] = useState<boolean | any>(initialState);

  return [value, setValue];
}

export default useAlert;
