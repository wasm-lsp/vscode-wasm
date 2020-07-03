import * as schema from "./schema";

export const Class = {
  alnum: "[:alnum:]",
  alpha: "[:alpha:]",
  ascii: "[:ascii:]",
  blank: "[:blank:]",
  cntrl: "[:cntrl:]",
  digit: "[:digit:]",
  graph: "[:graph:]",
  lower: "[:lower:]",
  print: "[:print:]",
  punct: "[:punct:]",
  space: "[:space:]",
  upper: "[:upper:]",
  word: "[:word:]",
  xdigit: "[:xdigit:]",
};

const sign = "[+-]";

const hexnum = "[0-9A-Fa-f]+(?:_?[0-9A-Fa-f]+)*";

const num = "[0-9]+(?:_?[0-9]+)*";

const float = `${num}(?:\\.(?:${num})?)?(?:[Ee](?:${sign})?${num})?`;

const hexfloat = `0x${hexnum}(?:\\.(?:${hexnum})?)?(?:[Pp](?:${sign})?${num})?`;

const fNmag = `${float}|${hexfloat}|\b(?:inf|nan|nan:0x${hexnum}\b)`;

const fN = `(?:${sign})?${fNmag}`;

const uN = `(?!0x)${num}|0x${hexnum}`;

const sN = `${sign}${uN}`;

const id = "[0-9A-Za-z!#$%&'*+-./:<=>?@\\^_'|~]+";

const identifier = `\\$${id}`;

const index = `(?:${uN})|(?:${identifier})`;

const valueType = "[fi](?:32|64)";

export function ref<T extends unknown[]>(f: (...args: T) => schema.Rule): string {
  return `#${f.name}`;
}

export function include<T extends unknown[]>(f: (...args: T) => schema.Rule): { include: string } {
  return { include: ref(f) };
}

export const alt = (...rest: string[]): string => rest.join("|");

export const capture = (arg: string): string => `(${arg})`;

export const complement = (...rest: string[]): string => `[^${rest.join("")}]`;

export const group = (arg: string): string => `(?:${arg})`;

export const lookAhead = (arg: string): string => `(?=${arg})`;

export const lookBehind = (arg: string): string => `(?<=${arg})`;

export const many = (arg: string): string => `${arg}*`;

export const manyOne = (arg: string): string => `${arg}+`;

export const negativeLookAhead = (arg: string): string => `(?!${arg})`;

export const negativeLookBehind = (arg: string): string => `(?<!${arg})`;

export const opt = (arg: string): string => `(?:${arg})?`;

export const seq = (...rest: string[]): string => rest.join("");

export const set = (...rest: string[]): string => `[${rest.join("")}]`;

export const words = (arg: string): string => `\\b${arg}\\b`;

export const ops = (arg: string): string => {
  const operatorTokens: string[] = ["\\."];
  return seq(negativeLookBehind(set(...operatorTokens)), arg, negativeLookAhead(set(...operatorTokens)));
};

export const lastOps = (...rest: string[]): string => {
  const operatorTokens: string[] = ["\\."];
  const result: string[] = [];
  for (const token of rest) {
    result.push(`[^${seq(...operatorTokens)}]${token}`, `^${token}`);
  }
  return group(seq(lookBehind(group(alt(...result))), negativeLookAhead(set(...operatorTokens))));
};

export const lastWords = (...rest: string[]): string => {
  const result: string[] = [];
  for (const token of rest) result.push(`[^${id}]${token}`, `^${token}`);
  return group(seq(lookBehind(group(alt(...result))), negativeLookAhead(`${id}`)));
};

const instrTypeInt: string = seq("i", group(alt("32", "64")));

const instrTypeInt32: string = seq("i", "32");

const instrTypeInt64: string = seq("i", "64");

const instrTypeFloat: string = seq("f", group(alt("32", "64")));

const instrTypeFloat32: string = seq("f", "32");

const instrTypeFloat64: string = seq("f", "64");

const instrType: string = group(alt(instrTypeInt, instrTypeFloat));

const instrEnd: string = negativeLookAhead(alt(set(Class.space), "$", index));

export const Token = {
  ASSERT_EXHAUSTION: "assert_exhaustion",
  ASSERT_INVALID: "assert_invalid",
  ASSERT_MALFORMED: "assert_malformed",
  ASSERT_RETURN: "assert_return",
  ASSERT_TRAP: "assert_trap",
  ASSERT_UNLINKABLE: "assert_unlinkable",
  BINARY: "binary",
  BLOCK: "block",
  BR: "br",
  BR_IF: "br_if",
  BR_TABLE: "br_table",
  CALL: "call",
  CALL_INDIRECT: "call_indirect",
  CONST: "const",
  DATA: "data",
  DROP: "drop",
  ELEM: "elem",
  ELSE: "else",
  END: "end",
  EXPORT: "export",
  FULL_STOP: "\\.",
  FUNC: "func",
  FUNCREF: "funcref",
  GET: "get",
  GLOBAL: "global(?!\\.)",
  GLOBAL_GET: "global\\.get",
  GLOBAL_SET: "global\\.set",
  IF: "if",
  IMPORT: "import",
  INPUT: "input",
  INVOKE: "invoke",
  LEFT_PARENTHESIS: "\\(",
  LOCAL: "local(?!\\.)",
  LOCAL_GET: "local\\.get",
  LOCAL_SET: "local\\.set",
  LOCAL_TEE: "local\\.tee",
  LOOP: "loop",
  MEMORY: "memory(?!\\.)",
  MEMORY_GROW: "memory\\.grow",
  MEMORY_SIZE: "memory\\.size",
  MODULE: "module",
  MUT: "mut",
  NOP: "nop",
  OFFSET: "offset",
  OUTPUT: "output",
  PARAM: "param",
  QUOTE: "quote",
  REGISTER: "register",
  RESULT: "result",
  RETURN: "return",
  RIGHT_PARENTHESIS: "\\)",
  SCRIPT: "script",
  SELECT: "select",
  START: "start",
  TABLE: "table",
  THEN: "then",
  TYPE: "type",
  UNREACHABLE: "unreachable",
  escape: "\\\\([0-9A-Fa-f]{2}|u\\{[0-9A-Fa-f]+\\}|[\\\\'\\\\\"ntr]|$)",
  float,
  fN,
  hexfloat,
  hexnum,
  id,
  identifier,
  index,
  instrEnd,
  instrType,
  instrTypeFloat,
  instrTypeFloat32,
  instrTypeFloat64,
  instrTypeInt,
  instrTypeInt32,
  instrTypeInt64,
  num,
  sign,
  sN,
  uN,
  valueType,
};

export class Scope {}

export interface Render {
  render(): schema.Grammar;
}
