/* eslint @typescript-eslint/unbound-method: "off" */

import * as basis from "./basis";
import * as schema from "./schema";

export class Wast implements basis.Render {
  constructor() {
    return this;
  }

  public render(): schema.Grammar {
    return {
      name: "WebAssembly Script",
      scopeName: "source.wasm.wast",
      fileTypes: [".wast"],
      patterns: [{ include: "source.wasm.wat" }],
      repository: {},
    };
  }
}

export default new Wast().render();
