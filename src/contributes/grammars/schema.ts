export type Patterns = Array<Rule>;

export interface Grammar {
  name: string;
  scopeName: string;
  fileTypes: string[];
  patterns: Patterns;
  repository: Repository;
}

export interface MatchScopes {
  [key: string]: RuleSimple;
}

export type Rule = RuleSimple | RuleCapturing | RuleDelimited | RuleReference;

export interface RuleCapturing {
  match: string;
  name?: string;
  captures?: MatchScopes;
  patterns?: Patterns;
}

export interface RuleDelimited {
  begin: string;
  end: string;
  applyEndPatternLast?: boolean;
  name?: string;
  contentName?: string;
  beginCaptures?: MatchScopes;
  endCaptures?: MatchScopes;
  patterns?: Patterns;
}

export interface RuleReference {
  include: string;
}

export type RuleSimple =
  | {
      name: string;
      patterns?: Patterns;
    }
  | {
      name?: string;
      patterns: Patterns;
    };

export interface Repository {
  [key: string]: Rule;
}
