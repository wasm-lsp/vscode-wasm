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
        assertExhaustion: this.assertExhaustion(),
        assertInvalid: this.assertInvalid(),
        assertion: this.assertion(),
        assertMalformed: this.assertMalformed(),
        assertReturn: this.assertReturn(),
        assertTrap: this.assertTrap(),
        assertUnlinkable: this.assertUnlinkable(),
        command: this.command(),
        exprPlainConst: this.exprPlainConst(),
        meta: this.meta(),
        metaInput: this.metaInput(),
        metaOutput: this.metaOutput(),
        metaScript: this.metaScript(),
        register: this.register(),
        result: this.result(),
        scriptModule: this.scriptModule(),
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
          patterns: [include(this.extra), include(this.command), include(this.moduleField)],
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
          name: "variable.other.wasm",
          match: Token.identifier,
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
          name: "variable.other.wasm",
          match: Token.identifier,
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
        {
          begin: Token.LEFT_PARENTHESIS,
          beginCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          end: Token.RIGHT_PARENTHESIS,
          endCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          patterns: [include(this.exprPlainConst)],
        },
      ],
    };
  }

  assertion(): schema.Rule {
    return {
      patterns: [
        include(this.assertExhaustion),
        include(this.assertInvalid),
        include(this.assertMalformed),
        include(this.assertReturn),
        include(this.assertTrap),
        include(this.assertUnlinkable),
      ],
    };
  }

  assertExhaustion(): schema.Rule {
    return {
      name: "meta.assert.exhaustion.wasm",
      begin: words(Token.ASSERT_EXHAUSTION),
      beginCaptures: {
        0: { name: "keyword.control.assert.exhaustion.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
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
          patterns: [include(this.action)],
        },
        include(this.string),
      ],
    };
  }

  assertInvalid(): schema.Rule {
    return {
      name: "meta.assert.invalid.wasm",
      begin: words(Token.ASSERT_INVALID),
      beginCaptures: {
        0: { name: "keyword.control.assert.invalid.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
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
          patterns: [include(this.scriptModule)],
        },
        include(this.string),
      ],
    };
  }

  assertMalformed(): schema.Rule {
    return {
      name: "meta.assert.malformed.wasm",
      begin: words(Token.ASSERT_MALFORMED),
      beginCaptures: {
        0: { name: "keyword.control.assert.malformed.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
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
          patterns: [include(this.scriptModule)],
        },
        include(this.string),
      ],
    };
  }

  assertReturn(): schema.Rule {
    return {
      name: "meta.assert.return.wasm",
      begin: words(Token.ASSERT_RETURN),
      beginCaptures: {
        0: { name: "keyword.control.assert.return.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
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
          patterns: [include(this.action), include(this.result)],
        },
      ],
    };
  }

  assertTrap(): schema.Rule {
    return {
      name: "meta.assert.trap.wasm",
      begin: words(Token.ASSERT_TRAP),
      beginCaptures: {
        0: { name: "keyword.control.assert.trap.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
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
          patterns: [include(this.action), include(this.scriptModule)],
        },
        include(this.string),
      ],
    };
  }

  assertUnlinkable(): schema.Rule {
    return {
      name: "meta.assert.unlinkable.wasm",
      begin: words(Token.ASSERT_UNLINKABLE),
      beginCaptures: {
        0: { name: "keyword.control.assert.unlinkable.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
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
          patterns: [include(this.scriptModule)],
        },
        include(this.string),
      ],
    };
  }

  command(): schema.Rule {
    return {
      patterns: [
        include(this.action),
        include(this.assertion),
        include(this.meta),
        include(this.register),
        include(this.scriptModule),
      ],
    };
  }

  exprPlainConst(): schema.Rule {
    return {
      patterns: [include(this.instrPlainConst)],
    };
  }

  meta(): schema.Rule {
    return {
      patterns: [include(this.metaScript), include(this.metaInput), include(this.metaOutput)],
    };
  }

  metaScript(): schema.Rule {
    return {
      name: "meta.meta.script.wasm",
      begin: words(Token.SCRIPT),
      beginCaptures: {
        0: { name: "keyword.control.meta.script.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.wasm",
          match: Token.identifier,
        },
        include(this.command),
      ],
    };
  }

  metaInput(): schema.Rule {
    return {
      name: "meta.meta.input.wasm",
      begin: words(Token.INPUT),
      beginCaptures: {
        0: { name: "keyword.control.meta.input.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.wasm",
          match: Token.identifier,
        },
        include(this.string),
      ],
    };
  }

  metaOutput(): schema.Rule {
    return {
      name: "meta.meta.output.wasm",
      begin: words(Token.OUTPUT),
      beginCaptures: {
        0: { name: "keyword.control.meta.output.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.wasm",
          match: Token.identifier,
        },
        include(this.string),
      ],
    };
  }

  register(): schema.Rule {
    return {
      name: "meta.register.wasm",
      begin: words(Token.REGISTER),
      beginCaptures: {
        0: { name: "keyword.control.meta.output.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.name),
        {
          name: "variable.other.wasm",
          match: Token.identifier,
        },
      ],
    };
  }

  result(): schema.Rule {
    return {
      patterns: [include(this.exprPlainConst)],
    };
  }

  scriptModule(): schema.Rule {
    return {
      patterns: [
        {
          begin: words(Token.MODULE),
          beginCaptures: {
            0: { name: "storage.type.module.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.extra),
            {
              begin: `\\$${Token.id}`,
              beginCaptures: {
                0: { name: "entity.name.type.module.wasm" },
              },
              end: lookAhead(Token.RIGHT_PARENTHESIS),
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
                  patterns: [include(this.moduleField)],
                },
              ],
            },
            {
              begin: words(Token.BINARY),
              beginCaptures: {
                0: { name: "storage.modifier.module.binary.wasm" },
              },
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [include(this.extra), include(this.string)],
            },
            {
              begin: words(Token.QUOTE),
              beginCaptures: {
                0: { name: "storage.modifier.module.quote.wasm" },
              },
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [include(this.extra), include(this.string)],
            },
            {
              begin: Token.LEFT_PARENTHESIS,
              beginCaptures: {
                0: { name: "meta.brace.round.wasm" },
              },
              end: Token.RIGHT_PARENTHESIS,
              endCaptures: {
                0: { name: "meta.brace.round.wasm" },
              },
              patterns: [include(this.moduleField)],
            },
          ],
        },
      ],
    };
  }
}

export default new Wast().render();
