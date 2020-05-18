/* eslint @typescript-eslint/unbound-method: "off" */

import * as basis from "./basis";
import * as schema from "./schema";

const { Token /*, alt*/, capture, include, lastWords, lookAhead, lookBehind, manyOne, opt, seq, set, words } = basis;

export class Wat implements basis.Render {
  constructor() {
    return this;
  }

  public render(): schema.Grammar {
    return {
      name: "WebAssembly Module",
      scopeName: "source.wasm.wat",
      fileTypes: [".wat"],
      patterns: [include(this.extra), include(this.module)],
      repository: {
        annotation: this.annotation(),
        blockComment: this.blockComment(),
        comment: this.comment(),
        elemType: this.elemType(),
        export: this.export(),
        expr: this.expr(),
        extra: this.extra(),
        funcType: this.funcType(),
        funcTypeParams: this.funcTypeParams(),
        funcTypeResults: this.funcTypeResults(),
        globalType: this.globalType(),
        globalTypeImm: this.globalTypeImm(),
        globalTypeMut: this.globalTypeMut(),
        identifier: this.identifier(),
        import: this.import(),
        inlineImport: this.inlineImport(),
        limits: this.limits(),
        lineComment: this.lineComment(),
        module: this.module(),
        moduleField: this.moduleField(),
        moduleFieldData: this.moduleFieldData(),
        moduleFieldElem: this.moduleFieldElem(),
        moduleFieldExport: this.moduleFieldExport(),
        moduleFieldFunc: this.moduleFieldFunc(),
        moduleFieldGlobal: this.moduleFieldGlobal(),
        moduleFieldImport: this.moduleFieldImport(),
        moduleFieldMemory: this.moduleFieldMemory(),
        moduleFieldStart: this.moduleFieldStart(),
        moduleFieldTable: this.moduleFieldTable(),
        moduleFieldType: this.moduleFieldType(),
        name: this.name(),
        string: this.string(),
        stringCharacterEscape: this.stringCharacterEscape(),
        tableFieldsElem: this.tableFieldsElem(),
        tableFieldsType: this.tableFieldsType(),
        tableType: this.tableType(),
        typeField: this.typeField(),
        valueType: this.valueType(),
      },
    };
  }

  annotation(): schema.Rule {
    return {
      patterns: [],
    };
  }

  blockComment(): schema.Rule {
    return {
      name: "meta.comment.block.wasm comment.block.wasm",
      begin: capture("\\(;"),
      beginCaptures: {
        1: { name: "punctuation.definition.comment.wasm" },
      },
      end: capture(";\\)"),
      endCaptures: {
        1: { name: "punctuation.definition.comment.wasm" },
      },
    };
  }

  comment(): schema.Rule {
    return {
      patterns: [include(this.lineComment), include(this.blockComment)],
    };
  }

  elemType(): schema.Rule {
    return {
      name: "storage.type.wasm",
      match: words(Token.FUNCREF),
    };
  }

  export(): schema.Rule {
    return {
      patterns: [],
    };
  }

  expr(): schema.Rule {
    return {
      patterns: [],
    };
  }

  extra(): schema.Rule {
    return {
      patterns: [include(this.comment), include(this.annotation)],
    };
  }

  funcType(): schema.Rule {
    return {
      patterns: [include(this.funcTypeParams), include(this.funcTypeResults)],
    };
  }

  funcTypeParams(): schema.Rule {
    return {
      begin: words(Token.PARAM),
      beginCaptures: {
        0: { name: "keyword.control.param.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "entity.name.type.alias.wasm",
          match: Token.id,
        },
        include(this.valueType),
      ],
    };
  }

  funcTypeResults(): schema.Rule {
    return {
      begin: words(Token.RESULT),
      beginCaptures: {
        0: { name: "keyword.control.param.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.extra), include(this.valueType)],
    };
  }

  globalType(): schema.Rule {
    return {
      patterns: [include(this.globalTypeImm), include(this.globalTypeMut)],
    };
  }

  globalTypeImm(): schema.Rule {
    return {
      patterns: [include(this.valueType)],
    };
  }

  globalTypeMut(): schema.Rule {
    return {
      patterns: [
        {
          begin: Token.LEFT_PARENTHESIS,
          beginCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          end: Token.RIGHT_PARENTHESIS,
          endCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          patterns: [
            include(this.extra),
            {
              begin: lookBehind(Token.LEFT_PARENTHESIS),
              end: words(Token.MUT),
              endCaptures: {
                0: { name: "storage.modifier.wasm" },
              },
              patterns: [include(this.extra), include(this.valueType)],
            },
          ],
        },
      ],
    };
  }

  identifier(): schema.Rule {
    return {
      match: Token.id,
      name: "entity.name.type.alias.wasm",
    };
  }

  import(): schema.Rule {
    return {
      patterns: [],
    };
  }

  inlineImport(): schema.Rule {
    return {
      patterns: [
        {
          begin: Token.LEFT_PARENTHESIS,
          beginCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          end: Token.RIGHT_PARENTHESIS,
          endCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          patterns: [
            include(this.extra),
            {
              begin: words(Token.IMPORT),
              beginCaptures: {
                0: { name: "keyword.control.import.wasm" },
              },
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [
                include(this.extra),
                {
                  begin: lastWords(Token.IMPORT),
                  end: lookBehind('"'),
                  patterns: [
                    include(this.extra),
                    {
                      name: "entity.name.type.module.wasm",
                      begin: '"',
                      end: '"',
                      patterns: [
                        {
                          match: Token.escape,
                        },
                      ],
                    },
                  ],
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
            },
          ],
        },
      ],
    };
  }

  limits(): schema.Rule {
    return {
      patterns: [
        {
          name: "constant.numeric.integer",
          match: Token.uN,
        },
      ],
    };
  }

  lineComment(): schema.Rule {
    return {
      name: "meta.comment.line.wasm",
      begin: seq(opt(capture(seq("^", manyOne(set(" ", "\\t"))))), capture(capture(";;"))),
      beginCaptures: {
        1: { name: "punctuation.whitespace.comment.leading.wasm" },
        2: { name: "comment.line.double-semicolon.wasm" },
        3: { name: "punctuation.definition.comment.wasm" },
      },
      end: lookAhead("$"),
      contentName: "comment.line.double-semicolon.wasm",
    };
  }

  module(): schema.Rule {
    return {
      begin: Token.LEFT_PARENTHESIS,
      beginCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      end: Token.RIGHT_PARENTHESIS,
      endCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      patterns: [
        include(this.extra),
        {
          begin: lookBehind(Token.LEFT_PARENTHESIS),
          end: words(Token.MODULE),
          endCaptures: {
            0: { name: "meta.module.declaration.wasm storage.type.module.wasm" },
          },
          patterns: [include(this.extra)],
        },
        {
          name: "meta.module.declaration.wasm",
          begin: lastWords(Token.MODULE),
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.extra),
            {
              begin: Token.id,
              beginCaptures: {
                0: { name: "entity.name.type.module.wasm" },
              },
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [include(this.extra), include(this.moduleField)],
            },
            include(this.moduleField),
          ],
        },
      ],
    };
  }

  moduleField(): schema.Rule {
    return {
      begin: Token.LEFT_PARENTHESIS,
      beginCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      end: Token.RIGHT_PARENTHESIS,
      endCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      patterns: [
        include(this.extra),
        include(this.moduleFieldData),
        include(this.moduleFieldElem),
        include(this.moduleFieldExport),
        include(this.moduleFieldFunc),
        include(this.moduleFieldGlobal),
        include(this.moduleFieldImport),
        include(this.moduleFieldMemory),
        include(this.moduleFieldStart),
        include(this.moduleFieldTable),
        include(this.moduleFieldType),
      ],
    };
  }

  moduleFieldData(): schema.Rule {
    return {
      name: "meta.data.wasm",
      begin: words(Token.DATA),
      beginCaptures: {
        0: { name: "storage.type.data.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          begin: Token.idx,
          beginCaptures: {
            0: { name: "variable.other.constant entity.name.data.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [include(this.extra) /*, include(this.offset), include(this.string)*/],
        },
      ],
    };
  }

  moduleFieldElem(): schema.Rule {
    return {
      name: "meta.elem.wasm",
      begin: words(Token.ELEM),
      beginCaptures: {
        0: { name: "storage.type.elem.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.extra)],
    };
  }

  moduleFieldExport(): schema.Rule {
    return {
      name: "meta.export.wasm",
      begin: words(Token.EXPORT),
      beginCaptures: {},
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.extra)],
    };
  }

  moduleFieldFunc(): schema.Rule {
    return {
      begin: words(Token.FUNC),
      beginCaptures: {
        0: { name: "storage.type.function.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          begin: Token.id,
          beginCaptures: {
            0: { name: "entity.name.function.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            {
              begin: Token.LEFT_PARENTHESIS,
              beginCaptures: {
                0: { name: "meta.brace.round.wasm" },
              },
              end: Token.RIGHT_PARENTHESIS,
              endCaptures: {
                0: { name: "meta.brace.round.wasm" },
              },
              patterns: [include(this.moduleFieldExport), include(this.moduleFieldImport) /*, include(this.typeUse)*/],
            },
          ],
        },
      ],
    };
  }

  moduleFieldGlobal(): schema.Rule {
    return {
      name: "meta.global.wasm",
      begin: words(Token.GLOBAL),
      beginCaptures: {
        0: { name: "storage.type.global.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "variable.other.global.wasm",
          patterns: [include(this.identifier)],
        },
        include(this.export),
        include(this.import),
        include(this.globalType),
        include(this.expr),
      ],
    };
  }

  moduleFieldImport(): schema.Rule {
    return {
      name: "meta.import.wasm",
      begin: words(Token.IMPORT),
      beginCaptures: {
        0: { name: "keyword.control.import.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.extra) /*, include(this.inlineImport)*/],
    };
  }

  moduleFieldMemory(): schema.Rule {
    return {
      name: "meta.memory.wasm",
      begin: words(Token.MEMORY),
      beginCaptures: {},
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.extra)],
    };
  }

  moduleFieldStart(): schema.Rule {
    return {
      name: "meta.start.wasm",
      begin: words(Token.START),
      beginCaptures: {
        0: { name: "keyword.control.start.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          begin: Token.id,
          beginCaptures: {
            0: { name: "entity.name.function.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
        },
      ],
    };
  }

  moduleFieldTable(): schema.Rule {
    return {
      name: "meta.table.wasm",
      begin: words(Token.TABLE),
      beginCaptures: {
        0: { name: "storage.type.table.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "variable.other.global.wasm",
          patterns: [include(this.identifier)],
        },
        include(this.export),
        {
          patterns: [include(this.tableFieldsElem), include(this.tableFieldsType)],
        },
      ],
    };
  }

  moduleFieldType(): schema.Rule {
    return {
      name: "meta.type.wasm",
      begin: words(Token.TYPE),
      beginCaptures: {
        0: { name: "storage.type.type.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "entity.name.type.alias.wasm",
          patterns: [include(this.identifier)],
        },
        include(this.typeField),
      ],
    };
  }

  name(): schema.Rule {
    return this.string();
  }

  string(): schema.Rule {
    return {
      name: "string.quoted.double.wasm",
      begin: '"',
      beginCaptures: {
        0: { name: "punctuation.definition.string.begin.wasm" },
      },
      end: '(")|((?:[^\\\\\\n])$)',
      endCaptures: {
        1: { name: "punctuation.definition.string.end.wasm" },
        2: { name: "invalid.illegal.newline.wasm" },
      },
      patterns: [include(this.stringCharacterEscape)],
    };
  }

  stringCharacterEscape(): schema.Rule {
    return {
      name: "constant.character.escape.wasm",
      match: Token.escape,
    };
  }

  tableFieldsElem(): schema.Rule {
    return {
      patterns: [],
    };
  }

  tableFieldsType(): schema.Rule {
    return {
      patterns: [include(this.inlineImport), include(this.tableType)],
    };
  }

  tableType(): schema.Rule {
    return {
      patterns: [include(this.limits), include(this.elemType)],
    };
  }

  typeField(): schema.Rule {
    return {
      begin: Token.LEFT_PARENTHESIS,
      beginCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      end: Token.RIGHT_PARENTHESIS,
      endCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      patterns: [
        include(this.extra),
        {
          begin: lookBehind(Token.LEFT_PARENTHESIS),
          end: words(Token.FUNC),
          endCaptures: {
            0: { name: "storage.type.function.wasm" },
          },
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
          patterns: [include(this.extra), include(this.funcType)],
        },
      ],
    };
  }

  valueType(): schema.Rule {
    return {
      name: "entity.name.type.alias.wasm",
      match: Token.valueType,
    };
  }
}

export default new Wat().render();
