import { InlineFragmentNode, FragmentDefinitionNode, SelectionSetNode, FieldNode } from 'graphql';
import { FragmentMap, StoreValue, StoreObject, Reference, isReference } from '../../utilities';
import { IdGetter, MergeInfo, ReadMergeModifyContext } from "./types";
import { InMemoryCache } from './inMemoryCache';
import { SafeReadonly, FieldSpecifier, ToReferenceFunction, ReadFieldFunction, ReadFieldOptions, CanReadFunction } from '../core/types/common';
import { WriteContext } from './writeToStore';
export declare type TypePolicies = {
    [__typename: string]: TypePolicy;
};
declare type KeySpecifier = (string | any[])[];
export declare type KeyFieldsContext = {
    typename?: string;
    selectionSet?: SelectionSetNode;
    fragmentMap?: FragmentMap;
    keyObject?: Record<string, any>;
};
export declare type KeyFieldsFunction = (object: Readonly<StoreObject>, context: KeyFieldsContext) => KeySpecifier | false | ReturnType<IdGetter>;
export declare type TypePolicy = {
    keyFields?: KeySpecifier | KeyFieldsFunction | false;
    merge?: FieldMergeFunction | boolean;
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: {
        [fieldName: string]: FieldPolicy<any> | FieldReadFunction<any>;
    };
};
export declare type KeyArgsFunction = (args: Record<string, any> | null, context: {
    typename: string;
    fieldName: string;
    field: FieldNode | null;
    variables?: Record<string, any>;
}) => KeySpecifier | false | ReturnType<IdGetter>;
export declare type FieldPolicy<TExisting = any, TIncoming = TExisting, TReadResult = TIncoming> = {
    keyArgs?: KeySpecifier | KeyArgsFunction | false;
    read?: FieldReadFunction<TExisting, TReadResult>;
    merge?: FieldMergeFunction<TExisting, TIncoming> | boolean;
};
export declare type StorageType = Record<string, any>;
export interface FieldFunctionOptions<TArgs = Record<string, any>, TVars = Record<string, any>> {
    args: TArgs | null;
    fieldName: string;
    storeFieldName: string;
    field: FieldNode | null;
    variables?: TVars;
    isReference: typeof isReference;
    toReference: ToReferenceFunction;
    storage: StorageType;
    cache: InMemoryCache;
    readField: ReadFieldFunction;
    canRead: CanReadFunction;
    mergeObjects: MergeObjectsFunction;
}
declare type MergeObjectsFunction = <T extends StoreObject | Reference>(existing: T, incoming: T) => T;
export declare type FieldReadFunction<TExisting = any, TReadResult = TExisting> = (existing: SafeReadonly<TExisting> | undefined, options: FieldFunctionOptions) => TReadResult | undefined;
export declare type FieldMergeFunction<TExisting = any, TIncoming = TExisting> = (existing: SafeReadonly<TExisting> | undefined, incoming: SafeReadonly<TIncoming>, options: FieldFunctionOptions) => SafeReadonly<TExisting>;
export declare type PossibleTypesMap = {
    [supertype: string]: string[];
};
export declare class Policies {
    private config;
    private typePolicies;
    private toBeAdded;
    private supertypeMap;
    private fuzzySubtypes;
    readonly cache: InMemoryCache;
    readonly rootIdsByTypename: Record<string, string>;
    readonly rootTypenamesById: Record<string, string>;
    readonly usingPossibleTypes = false;
    constructor(config: {
        cache: InMemoryCache;
        dataIdFromObject?: KeyFieldsFunction;
        possibleTypes?: PossibleTypesMap;
        typePolicies?: TypePolicies;
    });
    identify(object: StoreObject, selectionSet?: SelectionSetNode, fragmentMap?: FragmentMap): [string?, StoreObject?];
    addTypePolicies(typePolicies: TypePolicies): void;
    private updateTypePolicy;
    private setRootTypename;
    addPossibleTypes(possibleTypes: PossibleTypesMap): void;
    private getTypePolicy;
    private getFieldPolicy;
    private getSupertypeSet;
    fragmentMatches(fragment: InlineFragmentNode | FragmentDefinitionNode, typename: string | undefined, result?: Record<string, any>, variables?: Record<string, any>): boolean;
    hasKeyArgs(typename: string | undefined, fieldName: string): boolean;
    getStoreFieldName(fieldSpec: FieldSpecifier): string;
    readField<V = StoreValue>(options: ReadFieldOptions, context: ReadMergeModifyContext): SafeReadonly<V> | undefined;
    getMergeFunction(parentTypename: string | undefined, fieldName: string, childTypename: string | undefined): FieldMergeFunction | undefined;
    runMergeFunction(existing: StoreValue, incoming: StoreValue, { field, typename, merge }: MergeInfo, context: WriteContext, storage?: StorageType): any;
}
export {};
//# sourceMappingURL=policies.d.ts.map