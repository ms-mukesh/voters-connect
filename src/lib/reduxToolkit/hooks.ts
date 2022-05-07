/**
 * While it is possible to import RootState and AppDispatch types into each components,
 * it is better to create one typed versions of useDispatch and useSelector hooks for usage in the application.
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
