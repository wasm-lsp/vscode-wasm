/* eslint @typescript-eslint/unbound-method: "off" */

import * as basis from "./basis";
import * as schema from "./schema";

const { include } = basis;

export class Wast implements basis.Render {
  constructor() {
    return this;
  }

  public render(): schema.Grammar {
    return {
      name: "WebAssembly Script",
      scopeName: "source.wasm.wast",
      fileTypes: [".wast"],
      patterns: [include(this.PARSE)],
      repository: {
        PARSE: this.PARSE(),
      },
    };
  }

  PARSE(): schema.Rule {
    return {
      patterns: [{ include: "source.wasm.wat" }],
    };
  }
}

export default new Wast().render();
