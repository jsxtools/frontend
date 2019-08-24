import { useEffect, useState } from 'react';
import useDebouncedStateFactory from '@jsxtools/use-debounced-state-factory';
import useEqualStateFactory from '@jsxtools/use-equal-state-factory';
import useFetchFactory from '@jsxtools/use-fetch-factory';
import useLocalStorageFactory from '@jsxtools/use-local-storage-factory';
import usePromiseFactory from '@jsxtools/use-promise-factory';

const hooks = { useEffect: <UseEffect>useEffect, useState: <UseState<any>>useState } as HookList;

const useDebounce = useDebouncedStateFactory(hooks);
const useEqual = useEqualStateFactory(hooks);
const useFetch = useFetchFactory(hooks);
const useLocalStorage = useLocalStorageFactory(hooks);
const usePromise = usePromiseFactory(hooks);

export {
	useDebounce,
	useEqual,
	useFetch,
	useLocalStorage,
	usePromise,
};
