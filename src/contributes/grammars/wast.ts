/* eslint @typescript-eslint/unbound-method: "off" */

import * as basis from "./basis";
import * as schema from "./schema";
import { Wat } from "./wat";

const { Token, include } = basis;

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

  command(): schema.Rule {
    return {
      patterns: [],
    };
  }
}

export default new Wast().render();
