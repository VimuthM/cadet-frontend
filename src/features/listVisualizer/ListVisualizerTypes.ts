// Source-related types
export type Data = any;
export type Pair = [Data, Data];
export type EmptyList = null;
export type List = [Data, List] | EmptyList;
// Check for Pair type before Array where suitable.
// Arrays of length 2 will be treated as pairs.
export type Array = Data[];

// Drawing-related types
export type Drawing = JSX.Element;
export type Step = Drawing[];
