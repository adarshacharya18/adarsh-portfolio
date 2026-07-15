import { useContext } from 'react';
import { ScrollContext } from '../context/ScrollContext';

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
export default useScroll;
