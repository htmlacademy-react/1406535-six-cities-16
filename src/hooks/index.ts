import { TypedUseSelectorHook, useDispatch, useSelector } from'react-redux';
import { State, AppDispatch } from '../store/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
