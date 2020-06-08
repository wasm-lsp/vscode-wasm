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

const id = "[0-9A-Za-z!#$%&'*+-./:<=>?@\\^_'|~]+";
const uN = "[0-9][0-9_]*|0x[0-9A-Fa-f][0-9A-Fa-f_]*";
const identifier = `\\$${id}`;
const index = `(?:${uN})|(?:${identifier})`;
const valueType = "[fi](?:32|64)";

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
  CALL_INDIRECT: "call_indirect",
  CONST: "const",
  DATA: "data",
  ELEM: "elem",
  EXPORT: "export",
  FUNC: "func",
  FUNCREF: "funcref",
  GET: "get",
  GLOBAL: "global",
  IF: "if",
  IMPORT: "import",
  INPUT: "input",
  INVOKE: "invoke",
  LEFT_PARENTHESIS: "\\(",
  LOCAL: "local",
  LOOP: "loop",
  MEMORY: "memory",
  MODULE: "module",
  MUT: "mut",
  NOP: "nop",
  OFFSET: "offset",
  OUTPUT: "output",
  PARAM: "param",
  QUOTE: "quote",
  REGISTER: "register",
  RESULT: "result",
  RIGHT_PARENTHESIS: "\\)",
  SCRIPT: "script",
  START: "start",
  TABLE: "table",
  TYPE: "type",
  escape: "\\\\([0-9A-Fa-f]{2}|u\\{[0-9A-Fa-f]+\\}|[\\\\'\\\\\"ntr]|$)",
  id,
  identifier,
  index: index,
  uN,
  valueType,
};

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
export const lookBehind = (arg: string): string => `(?<=${arg})`;
export const negativeLookBehind = (arg: string): string => `(?<!${arg})`;
export const seq = (...rest: string[]): string => rest.join("");
export const negativeLookAhead = (arg: string): string => `(?!${arg})`;
export const set = (...rest: string[]): string => `[${rest.join("")}]`;
export const many = (arg: string): string => `${arg}*`;
export const manyOne = (arg: string): string => `${arg}+`;
export const opt = (arg: string): string => `${arg}?`;
export const words = (arg: string): string => `\\b${arg}\\b`;
export const lookAhead = (arg: string): string => `(?=${arg})`;
export function lastWords(...rest: string[]): string {
  const result: string[] = [];
  for (const token of rest) result.push(`[^${Token.id}]${token}`, `^${token}`);
  return group(seq(lookBehind(group(alt(...result))), negativeLookAhead(`${Token.id}`)));
}

export class Scope {}

export interface Render {
  render(): schema.Grammar;
}
