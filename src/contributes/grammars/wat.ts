/* eslint @typescript-eslint/unbound-method: "off" */

import * as basis from "./basis";
import * as schema from "./schema";

const { Token, alt, capture, include, lastWords, lookAhead, lookBehind, manyOne, opt, seq, set, words } = basis;

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
        expr: this.expr(),
        expr1: this.expr1(),
        expr1Block: this.expr1Block(),
        expr1Call: this.expr1Call(),
        expr1If: this.expr1If(),
        expr1Loop: this.expr1Loop(),
        expr1Plain: this.expr1Plain(),
        extra: this.extra(),
        funcType: this.funcType(),
        globalType: this.globalType(),
        importDesc: this.importDesc(),
        inlineExport: this.inlineExport(),
        inlineImport: this.inlineImport(),
        instr: this.instr(),
        instrBlock: this.instrBlock(),
        instrCall: this.instrCall(),
        instrPlain: this.instrPlain(),
        limits: this.limits(),
        lineComment: this.lineComment(),
        local: this.local(),
        memType: this.memType(),
        module: this.module(),
        moduleField: this.moduleField(),
        moduleFieldData: this.moduleFieldData(),
        moduleFieldElem: this.moduleFieldElem(),
        moduleFieldExport: this.moduleFieldExport(),
        moduleFieldFunc: this.moduleFieldFunc(),
        moduleFieldGlobal: this.moduleFieldGlobal(),
        moduleFieldImport: this.moduleFieldImport(),
        moduleFieldMem: this.moduleFieldMem(),
        moduleFieldStart: this.moduleFieldStart(),
        moduleFieldTable: this.moduleFieldTable(),
        moduleFieldType: this.moduleFieldType(),
        offset: this.offset(),
        offsetConstExpr: this.offsetConstExpr(),
        param: this.param(),
        result: this.result(),
        resultType: this.resultType(),
        string: this.string(),
        stringCharacterEscape: this.stringCharacterEscape(),
        tableType: this.tableType(),
        typeUse: this.typeUse(),
        valType: this.valType(),
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
      patterns: [],
    };
  }

  expr(): schema.Rule {
    return {
      begin: Token.LEFT_PARENTHESIS,
      beginCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      end: Token.RIGHT_PARENTHESIS,
      endCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      patterns: [include(this.expr1)],
    };
  }

  expr1(): schema.Rule {
    return {
      patterns: [
        include(this.expr1Plain),
        include(this.expr1Call),
        include(this.expr1Block),
        include(this.expr1Loop),
        include(this.expr1If),
      ],
    };
  }

  expr1Block(): schema.Rule {
    return {
      patterns: [],
    };
  }

  expr1Call(): schema.Rule {
    return {
      patterns: [],
    };
  }

  expr1If(): schema.Rule {
    return {
      patterns: [],
    };
  }

  expr1Loop(): schema.Rule {
    return {
      patterns: [],
    };
  }

  expr1Plain(): schema.Rule {
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
          patterns: [include(this.extra), include(this.param), include(this.result)],
        },
      ],
    };
  }

  globalType(): schema.Rule {
    return {
      patterns: [],
    };
  }

  importDesc(): schema.Rule {
    return {
      name: "meta.importdesc.wasm",
      begin: Token.LEFT_PARENTHESIS,
      beginCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      end: Token.RIGHT_PARENTHESIS,
      endCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      patterns: [
        {
          begin: words(Token.FUNC),
          beginCaptures: {
            0: { name: "storage.type.function.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.extra),
            {
              name: "entity.name.function.wasm",
              match: Token.id,
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
              patterns: [include(this.typeUse)],
            },
          ],
        },
        {
          begin: words(Token.TABLE),
          beginCaptures: {
            0: { name: "storage.type.table.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.extra),
            {
              begin: Token.id,
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [include(this.extra), include(this.tableType)],
            },
            include(this.tableType),
          ],
        },
        {
          begin: words(Token.MEMORY),
          beginCaptures: {
            0: { name: "storage.type.memory.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.extra),
            {
              begin: Token.id,
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [include(this.extra), include(this.tableType)],
            },
            include(this.memType),
          ],
        },
        {
          begin: words(Token.GLOBAL),
          beginCaptures: {
            0: { name: "storage.type.global.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.extra),
            {
              begin: Token.id,
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [include(this.extra), include(this.tableType)],
            },
            include(this.globalType),
          ],
        },
      ],
    };
  }

  inlineExport(): schema.Rule {
    return {
      name: "meta.export.inline.wasm",
      begin: lastWords(Token.EXPORT),
      beginCaptures: {
        0: { name: "keyword.control.export.wasm" },
      },
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
    };
  }

  inlineImport(): schema.Rule {
    return {
      name: "meta.import.inline.wasm",
      begin: lastWords(Token.IMPORT),
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
        include(this.importDesc),
      ],
    };
  }

  instr(): schema.Rule {
    return {
      patterns: [include(this.instrPlain), include(this.instrCall), include(this.instrBlock), include(this.expr)],
    };
  }

  instrBlock(): schema.Rule {
    return {
      patterns: [],
    };
  }

  instrCall(): schema.Rule {
    return {
      patterns: [],
    };
  }

  instrPlain(): schema.Rule {
    return {
      patterns: [],
    };
  }

  limits(): schema.Rule {
    return {
      patterns: [],
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

  local(): schema.Rule {
    return {
      patterns: [],
    };
  }

  memType(): schema.Rule {
    return {
      patterns: [],
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
        include(this.moduleFieldMem),
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
          patterns: [include(this.extra), include(this.offset), include(this.string)],
        },
      ],
    };
  }

  moduleFieldElem(): schema.Rule {
    return {
      patterns: [],
    };
  }

  moduleFieldExport(): schema.Rule {
    return {
      name: "meta.export.wasm",
      begin: words(Token.EXPORT),
      beginCaptures: {
        0: { name: "keyword.control.export.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.extra), include(this.inlineExport)],
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
              patterns: [include(this.moduleFieldExport), include(this.moduleFieldImport), include(this.typeUse)],
            },
          ],
        },
      ],
    };
  }

  moduleFieldGlobal(): schema.Rule {
    return {
      patterns: [],
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
      patterns: [include(this.extra), include(this.inlineImport)],
    };
  }

  moduleFieldMem(): schema.Rule {
    return {
      patterns: [],
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
      patterns: [],
    };
  }

  moduleFieldType(): schema.Rule {
    return {
      name: "meta.type.declaration.wasm",
      begin: words(Token.TYPE),
      beginCaptures: {
        0: { name: "storage.type.type.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          begin: Token.id,
          beginCaptures: {
            0: { name: "entity.name.type.alias.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [include(this.extra), include(this.funcType)],
        },
        include(this.funcType),
      ],
    };
  }

  offset(): schema.Rule {
    return {
      patterns: [include(this.offsetConstExpr), include(this.expr)],
    };
  }

  offsetConstExpr(): schema.Rule {
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
          begin: words(Token.OFFSET),
          beginCaptures: {
            0: { name: "storage.modifier.offset.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [include(this.extra), include(this.instr)],
        },
      ],
    };
  }

  param(): schema.Rule {
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
        include(this.valType),
      ],
    };
  }

  result(): schema.Rule {
    return {
      begin: words(Token.RESULT),
      beginCaptures: {
        0: { name: "keyword.control.result.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.extra), include(this.valType)],
    };
  }

  resultType(): schema.Rule {
    return {
      patterns: [],
    };
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

  tableType(): schema.Rule {
    return {
      patterns: [],
    };
  }

  typeUse(): schema.Rule {
    return {
      patterns: [
        {
          begin: words(Token.TYPE),
          beginCaptures: {
            0: { name: "storage.type.type.wasm" },
          },
          end: Token.idx,
          endCaptures: {
            0: { name: "entity.name.type.alias.wasm" },
          },
        },
        include(this.param),
        include(this.result),
      ],
    };
  }

  valType(): schema.Rule {
    return {
      patterns: [
        {
          name: "entity.name.type.alias.wasm",
          match: words(alt("i32", "i64", "f32", "f64")),
        },
      ],
    };
  }
}

export default new Wat().render();
