import { SelectionSetNode, SelectionNode } from 'graphql';
import { FragmentMap, StoreObject, Reference } from '../../utilities';
import { NormalizedCache, ReadMergeModifyContext, MergeTree } from './types';
import { StoreReader } from './readFromStore';
import { InMemoryCache } from './inMemoryCache';
import { Cache } from '../../core';
export interface WriteContext extends ReadMergeModifyContext {
    readonly written: {
        [dataId: string]: SelectionSetNode[];
    };
    readonly fragmentMap?: FragmentMap;
    merge<T>(existing: T, incoming: T): T;
    overwrite: boolean;
    incomingById: Map<string, {
        fields: StoreObject;
        mergeTree?: MergeTree;
        selections: Set<SelectionNode>;
    }>;
    clientOnly: boolean;
}
export declare class StoreWriter {
    readonly cache: InMemoryCache;
    private reader?;
    constructor(cache: InMemoryCache, reader?: StoreReader | undefined);
    writeToStore(store: NormalizedCache, { query, result, dataId, variables, overwrite, }: Cache.WriteOptions): Reference | undefined;
    private processSelectionSet;
    private processFieldValue;
    private applyMerges;
}
//# sourceMappingURL=writeToStore.d.ts.map