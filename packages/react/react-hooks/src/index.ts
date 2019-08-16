declare type Fulfill = (value: Response) => void;
declare type Reject = (reason: Error) => void;

declare type UseEffectDependencyList = ReadonlyArray<any>;
declare type UseEffectCallback = () => Reject;
declare type UseEffect = (effect: UseEffectCallback, deps: UseEffectDependencyList) => void;

declare type UseFetchState = 'pending' | 'fulfilled' | 'rejected';
declare type UseFetchTuple = [ UseFetchState, undefined | Response | Error, Reject, Reject? ];

declare type UseStateDispatch<S> = (state: S) => void;
declare type UseStateAction<S> = S | ((prevState: S) => S);
declare type UseStateTuple = [ UseFetchTuple, UseStateDispatch<UseStateAction<UseFetchTuple>> ];
declare type UseState = <S> (initialState: S | (() => S)) => UseStateTuple;

import { useEffect, useState } from 'react';
import useDebouncedStateFactory from '@jsxtools/use-debounced-state-factory';
import useEqualStateFactory from '@jsxtools/use-equal-state-factory';
import useFetchFactory from '@jsxtools/use-fetch-factory';
import useLocalStorageFactory from '@jsxtools/use-local-storage-factory';
import usePromiseFactory from '@jsxtools/use-promise-factory';

const useDebounce = useDebouncedStateFactory({ useState });
const useEqual = useEqualStateFactory({ useState });
const useFetch = useFetchFactory({ useEffect: useEffect as UseEffect, useState });
const useLocalStorage = useLocalStorageFactory({ useState });
const usePromise = usePromiseFactory({ useEffect: useEffect, useState });

export {
	useDebounce,
	useEqual,
	useFetch,
	useLocalStorage,
	usePromise,
};
