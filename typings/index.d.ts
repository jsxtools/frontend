/** Accepts a function that contains imperative, possibly effectful code */
type UseEffect = (effect: EffectCallback, deps?: DependencyList) => (void | (() => void));
type EffectCallback = () => (void | (() => void));
type DependencyList = ReadonlyArray<any>;

/** Returns a mutable object whose "current" property is initialized to the passed argument */
type UseRef = <T>(initialValue: T) => MutableRefObject<T>;

interface MutableRefObject<T> {
	current: T;
}

/** Returns a stateful value, and a function to update it */
type UseState<S> = (initialState: S | (() => S)) => UseStateTuple<S>;
type UseStateTuple<S> = [S, Dispatch<SetStateAction<S>>];
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<S> = (state: S) => void;

/** An abstract object representing some of the hooks which allow reuse functionality between components */
interface HookList extends Object {
	useEffect?: UseEffect,
	useRef?: UseRef<any>,
	useState?: UseState<any>,
}

/** A fulfill-resolving function */
type Fulfill<R> = (value: R) => void;

/** A reject-resolving function */
type Reject = (reason: Error) => void;

/** A resolved value */
type Settled<R> = R | Error | void;

/** One of three mutually exclusive states of any promise */
type PromiseState = 'pending' | 'fulfilled' | 'rejected';

/** A promise or a function that resolves to a promise */
type PromiseOrPromiseCallback<R> = Promise<R> | (() => Promise<R>);

/** Returns whether two values are equality */
declare type Equality = (value1: any, value2: any) => boolean;

/** An HTML form control element that can be disabled */
declare type HTMLHasDisabledPropertyElement = HTMLButtonElement | HTMLFieldSetElement | HTMLInputElement | HTMLLinkElement | HTMLOptGroupElement | HTMLOptionElement | HTMLSelectElement | HTMLTextAreaElement;

/** An HTML form control element accessible from the elements property */
declare type HTMLInFormElementsPropertyElement = HTMLButtonElement | HTMLFieldSetElement | HTMLInputElement | HTMLObjectElement | HTMLOutputElement | HTMLSelectElement | HTMLTextAreaElement;

/** A collection of HTML form control elements. */
declare interface HTMLFormControlsCollection {
	[index: number]: HTMLInFormElementsPropertyElement
}

/** An HTML form element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements. */
declare interface HTMLFormElement {
	elements: HTMLFormControlsCollection
}

/** The current value of an HTML form control element */
declare type FormDataValue = string | File;

/** The current values of an HTML form element */
declare interface FormLikeData {
	[name: string]: FormDataValue | FormDataValue[]
}
