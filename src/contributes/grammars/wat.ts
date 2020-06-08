/* eslint @typescript-eslint/unbound-method: "off" */

import * as basis from "./basis";
import * as schema from "./schema";

const { Token, alt, capture, group, include, lastWords, lookAhead, lookBehind, manyOne, opt, seq, set, words } = basis;

export class Wat implements basis.Render {
  constructor() {
    return this;
  }

  public render(): schema.Grammar {
    return {
      name: "WebAssembly Module",
      scopeName: "source.wasm.wat",
      fileTypes: [".wat"],
      patterns: [include(this.PARSE)],
      repository: {
        PARSE: this.PARSE(),
        annotation: this.annotation(),
        annotationParens: this.annotationParens(),
        annotationPart: this.annotationPart(),
        blockComment: this.blockComment(),
        comment: this.comment(),
        elemType: this.elemType(),
        exportDesc: this.exportDesc(),
        exportDescFunc: this.exportDescFunc(),
        exportDescGlobal: this.exportDescGlobal(),
        exportDescMemory: this.exportDescMemory(),
        exportDescTable: this.exportDescTable(),
        expr: this.expr(),
        extra: this.extra(),
        funcLocals: this.funcLocals(),
        funcType: this.funcType(),
        funcTypeParams: this.funcTypeParams(),
        funcTypeResults: this.funcTypeResults(),
        globalType: this.globalType(),
        globalTypeImm: this.globalTypeImm(),
        globalTypeMut: this.globalTypeMut(),
        identifier: this.identifier(),
        importDesc: this.importDesc(),
        importDescFuncType: this.importDescFuncType(),
        importDescGlobalType: this.importDescGlobalType(),
        importDescMemoryType: this.importDescMemoryType(),
        importDescTableType: this.importDescTableType(),
        index: this.index(),
        inlineExport: this.inlineExport(),
        inlineImport: this.inlineImport(),
        inlineImportNames: this.inlineImportNames(),
        instrList: this.instrList(),
        instrPlainConst: this.instrPlainConst(),
        instrType: this.instrType(),
        instrTypeInt: this.instrTypeInt(),
        instrTypeFloat: this.instrTypeFloat(),
        limits: this.limits(),
        lineComment: this.lineComment(),
        literal: this.literalNAN(),
        literalNAN: this.literalNAN(),
        memoryFieldsData: this.memoryFieldsData(),
        memoryFieldsType: this.memoryFieldsType(),
        memoryType: this.memoryType(),
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
        offset: this.offset(),
        offsetExpr: this.offsetExpr(),
        string: this.string(),
        stringCharacterEscape: this.stringCharacterEscape(),
        tableFieldsElem: this.tableFieldsElem(),
        tableFieldsType: this.tableFieldsType(),
        tableType: this.tableType(),
        typeField: this.typeField(),
        typeUse: this.typeUse(),
        valueType: this.valueType(),
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
          patterns: [include(this.extra), include(this.module), include(this.moduleField)],
        },
      ],
    };
  }

  annotation(): schema.Rule {
    return {
      name: "meta.annotation.wasm",
      begin: seq(Token.LEFT_PARENTHESIS, lookAhead("@")),
      beginCaptures: {
        0: { name: "meta.brace.round.annotation.wasm punctuation.definition.tag" },
      },
      end: Token.RIGHT_PARENTHESIS,
      endCaptures: {
        0: { name: "meta.brace.round.annotation.wasm punctuation.definition.tag" },
      },
      patterns: [
        {
          begin: "@",
          beginCaptures: {
            0: { name: "meta.annotation.name.wasm punctuation.definition.tag" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          endCaptures: {
            0: { name: "meta.brace.round.annotation.wasm" },
          },
          patterns: [
            {
              begin: Token.id,
              beginCaptures: {
                0: { name: "meta.annotation.wasm constant.regexp" },
              },
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              contentName: "comment.wasm",
              patterns: [include(this.annotationPart)],
            },
          ],
        },
      ],
    };
  }

  annotationParens(): schema.Rule {
    return {
      begin: Token.LEFT_PARENTHESIS,
      end: Token.RIGHT_PARENTHESIS,
      patterns: [include(this.annotationPart)],
    };
  }

  annotationPart(): schema.Rule {
    return {
      patterns: [
        include(this.comment),
        include(this.annotationParens),
        // include(this.uN),
        // include(this.sN),
        // include(this.fN),
        {
          match: Token.id,
        },
        {
          begin: '"',
          end: '(")|((?:[^\\\\\\n])$)',
          patterns: [
            {
              name: "constant.character.escape.wasm",
            },
          ],
        },
      ],
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

  exportDesc(): schema.Rule {
    return {
      patterns: [
        include(this.exportDescFunc),
        include(this.exportDescTable),
        include(this.exportDescMemory),
        include(this.exportDescGlobal),
      ],
    };
  }

  exportDescFunc(): schema.Rule {
    return {
      begin: words(Token.FUNC),
      beginCaptures: {
        0: { name: "keyword.control.func.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.index)],
    };
  }

  exportDescGlobal(): schema.Rule {
    return {
      begin: words(Token.GLOBAL),
      beginCaptures: {
        0: { name: "keyword.control.global.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.index)],
    };
  }

  exportDescMemory(): schema.Rule {
    return {
      begin: words(Token.MEMORY),
      beginCaptures: {
        0: { name: "keyword.control.memory.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.index)],
    };
  }

  exportDescTable(): schema.Rule {
    return {
      begin: words(Token.TABLE),
      beginCaptures: {
        0: { name: "keyword.control.table.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.index)],
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

  funcLocals(): schema.Rule {
    return {
      begin: words(Token.LOCAL),
      beginCaptures: {
        0: { name: "keyword.control.local.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.parameter.local.wasm",
          patterns: [include(this.identifier)],
        },
        include(this.valueType),
      ],
    };
  }

  funcType(): schema.Rule {
    return {
      patterns: [include(this.funcTypeParams), include(this.funcTypeResults)],
    };
  }

  funcTypeParams(): schema.Rule {
    return {
      name: "meta.func-type.params.wasm",
      begin: words(Token.PARAM),
      beginCaptures: {
        0: { name: "keyword.control.param.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        include(this.valueType),
        {
          name: "entity.name.type.alias.wasm",
          match: Token.id,
        },
      ],
    };
  }

  funcTypeResults(): schema.Rule {
    return {
      name: "meta.func-type.results.wasm",
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
      name: "entity.name.type.alias.wasm",
      match: `\\$${Token.id}`,
    };
  }

  importDesc(): schema.Rule {
    return {
      name: "meta.import-desc.wasm",
      begin: Token.LEFT_PARENTHESIS,
      beginCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      end: Token.RIGHT_PARENTHESIS,
      endCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      patterns: [
        include(this.importDescFuncType),
        include(this.importDescGlobalType),
        include(this.importDescMemoryType),
        include(this.importDescTableType),
      ],
    };
  }

  importDescFuncType(): schema.Rule {
    // NOTE: merged with importDescTypeUse
    return {
      name: "meta.import-desc.func-type.wasm",
      begin: words(Token.FUNC),
      beginCaptures: {
        0: { name: "keyword.control.func.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "entity.name.function.wasm",
          patterns: [include(this.identifier)],
        },
        include(this.funcType),
        include(this.typeUse),
      ],
    };
  }

  importDescGlobalType(): schema.Rule {
    return {
      name: "meta.import-desc.global-type.wasm",
      begin: words(Token.GLOBAL),
      beginCaptures: {
        0: { name: "keyword.control.global.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.global.wasm",
          patterns: [include(this.identifier)],
        },
        include(this.globalType),
      ],
    };
  }

  importDescMemoryType(): schema.Rule {
    return {
      name: "meta.import-desc.memory-type.wasm",
      begin: words(Token.MEMORY),
      beginCaptures: {
        0: { name: "keyword.control.memory.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.memory.wasm",
          patterns: [include(this.identifier)],
        },
        include(this.memoryType),
      ],
    };
  }

  importDescTableType(): schema.Rule {
    return {
      name: "meta.import-desc.table-type.wasm",
      begin: words(Token.TABLE),
      beginCaptures: {
        0: { name: "keyword.control.table.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.table.wasm",
          patterns: [include(this.identifier)],
        },
        include(this.tableType),
      ],
    };
  }

  index(): schema.Rule {
    return {
      name: "variable.other.constant",
      match: Token.index,
    };
  }

  inlineExport(): schema.Rule {
    return {
      name: "meta.export.wasm",
      begin: words(Token.EXPORT),
      beginCaptures: {
        0: { name: "keyword.control.export.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "variable.other.readwrite.alias.wasm",
          begin: '"',
          end: '(")|((?:[^\\\\\\n])$)',
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
      begin: words(Token.IMPORT),
      beginCaptures: {
        0: { name: "keyword.control.import.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.extra), include(this.inlineImportNames)],
    };
  }

  inlineImportNames(): schema.Rule {
    return {
      patterns: [
        {
          begin: lastWords(Token.IMPORT),
          end: lookBehind('"'),
          patterns: [
            include(this.extra),
            {
              name: "entity.name.type.module.wasm",
              begin: '"',
              end: '(")|((?:[^\\\\\\n])$)',
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
          end: '(")|((?:[^\\\\\\n])$)',
          patterns: [
            {
              match: Token.escape,
            },
          ],
        },
      ],
    };
  }

  instrList(): schema.Rule {
    return {
      patterns: [],
    };
  }

  instrPlainConst(): schema.Rule {
    return {
      patterns: [
        include(this.instrType),
        {
          name: "punctuation.accessor.wasm",
          match: "\\.",
        },
        {
          name: "keyword.control.const.wasm",
          match: words(Token.CONST),
        },
        include(this.literal),
      ],
    };
  }

  instrType(): schema.Rule {
    return {
      patterns: [include(this.instrTypeInt), include(this.instrTypeFloat)],
    };
  }

  instrTypeInt(): schema.Rule {
    return {
      name: "storage.type.int.wasm",
      match: seq("i", group(alt("32", "64"))),
    };
  }

  instrTypeFloat(): schema.Rule {
    return {
      name: "storage.type.float.wasm",
      match: seq("f", group(alt("32", "64"))),
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

  literal(): schema.Rule {
    return {
      patterns: [],
    };
  }

  literalNAN(): schema.Rule {
    return {
      patterns: [],
    };
  }

  memoryFieldsData(): schema.Rule {
    return {
      begin: words(Token.DATA),
      beginCaptures: {
        0: { name: "storage.type.memory.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.string)],
    };
  }

  memoryFieldsType(): schema.Rule {
    return {
      patterns: [include(this.inlineImport), include(this.memoryType)],
    };
  }

  memoryType(): schema.Rule {
    return {
      patterns: [include(this.limits)],
    };
  }

  module(): schema.Rule {
    return {
      name: "meta.module.wasm",
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
          begin: Token.index,
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
      beginCaptures: {
        0: { name: "keyword.control.export.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "variable.other.readwrite.alias.wasm",
          begin: '"',
          end: '(")|((?:[^\\\\\\n])$)',
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
          patterns: [include(this.exportDesc)],
        },
      ],
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
          name: "entity.name.function.wasm",
          patterns: [include(this.identifier)],
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
          patterns: [
            include(this.inlineExport),
            include(this.inlineImport),
            include(this.typeUse),
            include(this.funcTypeParams),
            include(this.funcTypeResults),
            include(this.funcLocals),
          ],
        },
        include(this.instrList),
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
        {
          begin: Token.LEFT_PARENTHESIS,
          beginCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          end: Token.RIGHT_PARENTHESIS,
          endCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          patterns: [include(this.extra), include(this.inlineExport), include(this.inlineImport)],
        },
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
      patterns: [include(this.extra), include(this.inlineImportNames), include(this.importDesc)],
    };
  }

  moduleFieldMemory(): schema.Rule {
    return {
      name: "meta.memory.wasm",
      begin: words(Token.MEMORY),
      beginCaptures: {
        0: { name: "storage.type.memory.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "variable.other.memory.wasm",
          patterns: [include(this.identifier)],
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
          patterns: [include(this.inlineExport), include(this.memoryFieldsData), include(this.memoryFieldsType)],
        },
      ],
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
          name: "variable.other.table.wasm",
          patterns: [include(this.identifier)],
        },
        include(this.elemType),
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
            include(this.inlineExport),
            include(this.tableFieldsElem),
            include(this.tableFieldsType),
          ],
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

  offset(): schema.Rule {
    return {
      begin: Token.LEFT_PARENTHESIS,
      beginCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      end: Token.RIGHT_PARENTHESIS,
      endCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      patterns: [],
    };
  }

  offsetExpr(): schema.Rule {
    return {
      patterns: [include(this.expr)],
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
      name: "meta.table-fields.elem.wasm",
      begin: words(Token.ELEM),
      beginCaptures: {
        0: { name: "storage.type.elem.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.extra)],
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

  typeUse(): schema.Rule {
    return {
      name: "meta.type-use.wasm",
      begin: words(Token.TYPE),
      beginCaptures: {
        0: { name: "storage.type.type.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.index)],
    };
  }

  valueType(): schema.Rule {
    return {
      name: "storage.type.value.wasm",
      match: Token.valueType,
    };
  }
}

export default new Wat().render();
