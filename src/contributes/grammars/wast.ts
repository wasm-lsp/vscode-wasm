/* eslint @typescript-eslint/unbound-method: "off" */

import * as basis from "./basis";
import * as schema from "./schema";
import { Wat } from "./wat";

const { Token, include, lookAhead, words } = basis;

export class Wast extends Wat {
  constructor() {
    super();
    return this;
  }

  public render(): schema.Grammar {
    return {
      name: "WebAssembly Script",
      scopeName: "source.wasm.wast",
      fileTypes: [".wast"],
      patterns: [include(this.PARSE)],
      repository: {
        ...super.render().repository,
        PARSE: this.PARSE(),
        action: this.action(),
        actionGet: this.actionGet(),
        actionInvoke: this.actionInvoke(),
        command: this.command(),
      },
    };
  }

  PARSE(): schema.Rule {
    return {
      patterns: [
        include(this.extra),
        {
          begin: Token.LEFT_PARENTHESIS,
          beginCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          end: Token.RIGHT_PARENTHESIS,
          endCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          patterns: [include(this.extra), include(this.command), include(this.module), include(this.moduleField)],
        },
      ],
    };
  }

  action(): schema.Rule {
    return {
      patterns: [include(this.actionInvoke), include(this.actionGet)],
    };
  }

  actionGet(): schema.Rule {
    return {
      name: "meta.action.get.wasm",
      begin: words(Token.GET),
      beginCaptures: {
        0: { name: "keyword.control.get.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.action.get.wasm",
          patterns: [include(this.identifier)],
        },
        {
          name: "variable.other.readwrite.alias.wasm",
          begin: '"',
          end: '"',
          patterns: [
            {
              match: Token.escape,
            },
          ],
        },
      ],
    };
  }

  actionInvoke(): schema.Rule {
    return {
      name: "meta.action.invoke.wasm",
      begin: words(Token.INVOKE),
      beginCaptures: {
        0: { name: "keyword.control.invoke.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.action.get.wasm",
          patterns: [include(this.identifier)],
        },
        {
          name: "variable.other.readwrite.alias.wasm",
          begin: '"',
          end: '"',
          patterns: [
            {
              match: Token.escape,
            },
          ],
        },
        // include(this.exprPlainConst)
      ],
    };
  }

  command(): schema.Rule {
    return {
      patterns: [include(this.action)],
    };
  }
}

export default new Wast().render();
