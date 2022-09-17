import { paths, components, operations } from "./schema/types";
import { petstoreJSON } from "./schema/json";

export type FilterOutConditionally<Source, Condition> = Pick<
  Source,
  { [K in keyof Source]: Source[K] extends Condition ? never : K }[keyof Source]
>;

export type ObjectHasKey<O, P extends string> = {
  [Key in keyof O & string]: P extends keyof O[Key] ? O[Key] : never;
};

// Examples
type GetMethodPaths = keyof FilterOutConditionally<
  ObjectHasKey<paths, "get">,
  never
>;
type PostMethodPaths = keyof FilterOutConditionally<
  ObjectHasKey<paths, "post">,
  never
>;

export type Method = "get" | "post" | "put" | "delete" | "patch";
// Generalize Types
export type MethodPaths<M extends Method> = keyof FilterOutConditionally<
  ObjectHasKey<paths, M>,
  never
>;

// Generalize Types from JSON

type JSONPaths = typeof petstoreJSON.paths;
type JSONPathsKeys = keyof typeof petstoreJSON.paths;
export type JSONMethodPaths<M extends Method> = keyof FilterOutConditionally<
  ObjectHasKey<JSONPaths, M>,
  never
>;

// Examples
type getPaths = MethodPaths<"get">;

// Get Operation Data
export type Operation<M extends Method, P extends MethodPaths<M>> = paths[P];
export type JSONOperation<
  M extends Method,
  P extends JSONMethodPaths<M>
> = typeof petstoreJSON.paths[P];

type myRequest = Operation<"get", "/pet/{petId}">;
type myJSONRequest = JSONOperation<"get", "/pet/{petId}">;

const jsonOperation =
  petstoreJSON.paths["/pet/findByStatus"]["get"].responses[200].content[
    "application/json"
  ];
// function getHeader<P extends JSONPathsKeys, M extends keyof JSONPaths[P]>(path:P,method:M){
//   let operation = petstoreJSON.paths[path][method].responses
// }
// export function requestFactory<M extends Method, P extends MethodPaths<M>>(method:M, path:P){
//   const baseURL = 'https://petstore.swagger.io/v2'
//   fetch(`${baseURL}${path}`,{headers,method,body})
// }
