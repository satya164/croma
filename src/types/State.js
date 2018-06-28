/* @flow strict */

import type { Reducers } from '../reducers';

type $ExtractFunctionReturn = <V>(v: (...args: *) => V) => V;

export type State = $Exact<$ObjMap<Reducers, $ExtractFunctionReturn>>;
