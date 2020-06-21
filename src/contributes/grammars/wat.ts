/* eslint @typescript-eslint/unbound-method: "off" */

import * as basis from "./basis";
import * as schema from "./schema";

const {
  Token,
  alt,
  capture,
  group,
  include,
  lastWords,
  lookAhead,
  lookBehind,
  manyOne,
  ops,
  opt,
  seq,
  set,
  words,
} = basis;

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
        blockBlock: this.blockBlock(),
        blockComment: this.blockComment(),
        blockIf: this.blockIf(),
        blockLoop: this.blockLoop(),
        comment: this.comment(),
        elemType: this.elemType(),
        exportDesc: this.exportDesc(),
        exportDescFunc: this.exportDescFunc(),
        exportDescGlobal: this.exportDescGlobal(),
        exportDescMemory: this.exportDescMemory(),
        exportDescTable: this.exportDescTable(),
        expr: this.expr(),
        exprBlock: this.exprBlock(),
        exprCall: this.exprCall(),
        exprIf: this.exprIf(),
        exprLoop: this.exprLoop(),
        exprPlain: this.exprPlain(),
        extra: this.extra(),
        funcLocals: this.funcLocals(),
        funcType: this.funcType(),
        funcTypeParams: this.funcTypeParams(),
        funcTypeResults: this.funcTypeResults(),
        globalType: this.globalType(),
        globalTypeImm: this.globalTypeImm(),
        globalTypeMut: this.globalTypeMut(),
        importDesc: this.importDesc(),
        importDescFuncType: this.importDescFuncType(),
        importDescGlobalType: this.importDescGlobalType(),
        importDescMemoryType: this.importDescMemoryType(),
        importDescTableType: this.importDescTableType(),
        inlineExport: this.inlineExport(),
        inlineImport: this.inlineImport(),
        inlineImportNames: this.inlineImportNames(),
        instr: this.instr(),
        instrBlock: this.instrBlock(),
        instrCall: this.instrCall(),
        instrList: this.instrList(),
        instrPlain: this.instrPlain(),
        instrPlainBinary: this.instrPlainBinary(),
        instrPlainBr: this.instrPlainBr(),
        instrPlainBrIf: this.instrPlainBrIf(),
        instrPlainBrTable: this.instrPlainBrTable(),
        instrPlainCall: this.instrPlainCall(),
        instrPlainCompare: this.instrPlainCompare(),
        instrPlainConvert: this.instrPlainConvert(),
        instrPlainConst: this.instrPlainConst(),
        instrPlainDrop: this.instrPlainDrop(),
        instrPlainGlobalGet: this.instrPlainGlobalGet(),
        instrPlainGlobalSet: this.instrPlainGlobalSet(),
        instrPlainLoad: this.instrPlainLoad(),
        instrPlainLocalGet: this.instrPlainLocalGet(),
        instrPlainLocalSet: this.instrPlainLocalSet(),
        instrPlainLocalTee: this.instrPlainLocalTee(),
        instrPlainMemorySize: this.instrPlainMemorySize(),
        instrPlainMemoryGrow: this.instrPlainMemoryGrow(),
        instrPlainNop: this.instrPlainNop(),
        instrPlainReturn: this.instrPlainReturn(),
        instrPlainStore: this.instrPlainStore(),
        instrPlainTest: this.instrPlainTest(),
        instrPlainUnary: this.instrPlainUnary(),
        instrPlainUnreachable: this.instrPlainUnreachable(),
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
        offsetConstExpr: this.offsetConstExpr(),
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
      name: "meta.PARSE.wasm",
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
      name: "meta.annotationParens.wasm",
      begin: Token.LEFT_PARENTHESIS,
      end: Token.RIGHT_PARENTHESIS,
      patterns: [include(this.annotationPart)],
    };
  }

  annotationPart(): schema.Rule {
    return {
      name: "meta.annotationPart.wasm",
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

  blockBlock(): schema.Rule {
    return {
      name: "meta.blockBlock.wasm",
      patterns: [],
    };
  }

  blockIf(): schema.Rule {
    return {
      name: "meta.blockIf.wasm",
      patterns: [],
    };
  }

  blockLoop(): schema.Rule {
    return {
      name: "meta.blockLoop.wasm",
      patterns: [],
    };
  }

  blockComment(): schema.Rule {
    return {
      name: "meta.blockComment.wasm comment.block.wasm",
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
      name: "meta.comment.wasm",
      patterns: [include(this.lineComment), include(this.blockComment)],
    };
  }

  elemType(): schema.Rule {
    return {
      name: "meta.elemType.wasm storage.type.wasm",
      match: words(Token.FUNCREF),
    };
  }

  exportDesc(): schema.Rule {
    return {
      name: "meta.exportDesc.wasm",
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
      name: "meta.exportDescFunc.wasm",
      begin: words(Token.FUNC),
      beginCaptures: {
        0: { name: "keyword.control.func.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [{ match: Token.index }],
    };
  }

  exportDescGlobal(): schema.Rule {
    return {
      name: "meta.exportDescGlobal.wasm",
      begin: words(Token.GLOBAL),
      beginCaptures: {
        0: { name: "keyword.control.global.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [{ match: Token.index }],
    };
  }

  exportDescMemory(): schema.Rule {
    return {
      name: "meta.exportDescMemory.wasm",
      begin: words(Token.MEMORY),
      beginCaptures: {
        0: { name: "keyword.control.memory.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [{ match: Token.index }],
    };
  }

  exportDescTable(): schema.Rule {
    return {
      name: "meta.exportDescTable.wasm",
      begin: words(Token.TABLE),
      beginCaptures: {
        0: { name: "keyword.control.table.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [{ match: Token.index }],
    };
  }

  expr(): schema.Rule {
    return {
      name: "meta.expr.wasm",
      patterns: [
        include(this.exprPlain),
        include(this.exprCall),
        include(this.exprBlock),
        include(this.exprLoop),
        include(this.exprIf),
        {
          // NOTE: should this be included here or alongside expr in the parent rule?
          begin: Token.LEFT_PARENTHESIS,
          beginCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          end: Token.RIGHT_PARENTHESIS,
          endCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          patterns: [include(this.expr)],
        },
      ],
    };
  }

  exprBlock(): schema.Rule {
    return {
      name: "meta.exprBlock.wasm",
      begin: words(Token.BLOCK),
      beginCaptures: {
        0: { name: "keyword.control.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.block.global.wasm",
          match: Token.identifier,
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
            include(this.typeUse),
            include(this.funcTypeParams),
            include(this.funcTypeResults),
            include(this.expr),
          ],
        },
        include(this.instrList),
      ],
    };
  }

  exprCall(): schema.Rule {
    return {
      name: "meta.exprCall.wasm",
      patterns: [
        {
          name: "keyword.control.wasm",
          match: words(Token.CALL_INDIRECT),
        },
      ],
    };
  }

  exprIf(): schema.Rule {
    return {
      name: "meta.exprIf.wasm",
      patterns: [
        {
          name: "keyword.control.wasm",
          match: words(Token.IF),
        },
      ],
    };
  }

  exprLoop(): schema.Rule {
    return {
      name: "meta.exprLoop.wasm",
      patterns: [
        {
          name: "keyword.control.wasm",
          match: words(Token.LOOP),
        },
      ],
    };
  }

  exprPlain(): schema.Rule {
    return {
      name: "meta.exprPlain.wasm",
      patterns: [
        include(this.instrPlain),
        {
          begin: Token.LEFT_PARENTHESIS,
          beginCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          end: Token.RIGHT_PARENTHESIS,
          endCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          patterns: [include(this.expr)],
        },
      ],
    };
  }

  extra(): schema.Rule {
    return {
      name: "meta.extra.wasm",
      patterns: [include(this.comment), include(this.annotation)],
    };
  }

  funcLocals(): schema.Rule {
    return {
      name: "meta.funcLocals.wasm",
      begin: words(Token.LOCAL),
      beginCaptures: {
        0: { name: "keyword.control.local.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.parameter.local.wasm",
          match: Token.identifier,
        },
        include(this.valueType),
      ],
    };
  }

  funcType(): schema.Rule {
    return {
      name: "meta.funcType.wasm",
      patterns: [include(this.funcTypeParams), include(this.funcTypeResults)],
    };
  }

  funcTypeParams(): schema.Rule {
    return {
      name: "meta.funcTypeParams.wasm",
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
      name: "meta.funcTypeResults.wasm",
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
      name: "meta.globalType.wasm",
      patterns: [include(this.globalTypeImm), include(this.globalTypeMut)],
    };
  }

  globalTypeImm(): schema.Rule {
    return {
      name: "meta.globalTypeImm.wasm",
      patterns: [include(this.valueType)],
    };
  }

  globalTypeMut(): schema.Rule {
    return {
      name: "meta.globalTypeMut.wasm",
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

  importDesc(): schema.Rule {
    return {
      name: "meta.importDesc.wasm",
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
      name: "meta.importDescFuncType.wasm",
      begin: words(Token.FUNC),
      beginCaptures: {
        0: { name: "keyword.control.func.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "entity.name.function.wasm",
          match: Token.identifier,
        },
        include(this.funcType),
        include(this.typeUse),
      ],
    };
  }

  importDescGlobalType(): schema.Rule {
    return {
      name: "meta.importDescGlobalType.wasm",
      begin: words(Token.GLOBAL),
      beginCaptures: {
        0: { name: "keyword.control.global.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.global.wasm",
          match: Token.identifier,
        },
        include(this.globalType),
      ],
    };
  }

  importDescMemoryType(): schema.Rule {
    return {
      name: "meta.importDescMemoryType.wasm",
      begin: words(Token.MEMORY),
      beginCaptures: {
        0: { name: "keyword.control.memory.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.memory.wasm",
          match: Token.identifier,
        },
        include(this.memoryType),
      ],
    };
  }

  importDescTableType(): schema.Rule {
    return {
      name: "meta.importDescTableType.wasm",
      begin: words(Token.TABLE),
      beginCaptures: {
        0: { name: "keyword.control.table.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.table.wasm",
          match: Token.identifier,
        },
        include(this.tableType),
      ],
    };
  }

  inlineExport(): schema.Rule {
    return {
      name: "meta.inlineExport.wasm",
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
      name: "meta.inlineImport.wasm",
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
      name: "meta.inlineImportNames.wasm",
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

  instr(): schema.Rule {
    return {
      name: "meta.instr.wasm",
      patterns: [
        include(this.instrPlain),
        include(this.instrCall),
        include(this.instrBlock),
        {
          begin: Token.LEFT_PARENTHESIS,
          beginCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          end: Token.RIGHT_PARENTHESIS,
          endCaptures: {
            0: { name: "meta.brace.round.wasm" },
          },
          patterns: [include(this.expr)],
        },
      ],
    };
  }

  instrBlock(): schema.Rule {
    return {
      name: "meta.instrBlock.wasm",
      patterns: [include(this.blockBlock), include(this.blockLoop), include(this.blockIf)],
    };
  }

  instrCall(): schema.Rule {
    return {
      name: "meta.instrCall.wasm",
      patterns: [],
    };
  }

  instrList(): schema.Rule {
    return {
      name: "meta.instrList.wasm",
      patterns: [include(this.instrListCall), include(this.instr)],
    };
  }

  instrListCall(): schema.Rule {
    return {
      name: "meta.instrListCall.wasm",
      patterns: [],
    };
  }

  instrPlain(): schema.Rule {
    return {
      name: "meta.instrPlain.wasm",
      patterns: [
        include(this.instrPlainUnreachable),
        include(this.instrPlainNop),
        include(this.instrPlainDrop),
        include(this.instrPlainBr),
        include(this.instrPlainBrIf),
        include(this.instrPlainBrTable),
        include(this.instrPlainReturn),
        include(this.instrPlainLocalGet),
        include(this.instrPlainLocalSet),
        include(this.instrPlainLocalTee),
        include(this.instrPlainGlobalGet),
        include(this.instrPlainGlobalSet),
        include(this.instrPlainMemorySize),
        include(this.instrPlainMemoryGrow),
        include(this.instrPlainConst),
        include(this.instrPlainTest),
        include(this.instrPlainCompare),
        include(this.instrPlainUnary),
        include(this.instrPlainBinary),
        include(this.instrPlainConvert),
        include(this.instrPlainLoad),
        include(this.instrPlainStore),
        include(this.instrPlainCall),
      ],
    };
  }

  instrPlainBinary(): schema.Rule {
    return {
      name: "meta.instrPlainBinary.wasm",
      patterns: [
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrType), ops(Token.FULL_STOP), group(alt("add", "sub", "mul"))),
        },
        {
          name: "keyword.control.wasm",
          match: seq(
            words(Token.instrTypeInt),
            ops(Token.FULL_STOP),
            group(alt("and", "or", "xor", "shl", "rotl", "rotr")),
          ),
        },
        {
          name: "keyword.control.wasm",
          match: seq(
            words(Token.instrTypeInt),
            ops(Token.FULL_STOP),
            words(seq(group(alt("div", "rem", "shr")), "_", set("su"))),
          ),
        },
        {
          name: "keyword.control.wasm",
          match: seq(
            words(Token.instrTypeFloat),
            ops(Token.FULL_STOP),
            group(alt("add", "sub", "mul", "div", "min", "max", "copysign")),
          ),
        },
      ],
    };
  }

  instrPlainBr(): schema.Rule {
    return {
      name: "meta.instrPlainBr.wasm keyword.control.wasm",
      match: words(Token.BR),
    };
  }

  instrPlainBrIf(): schema.Rule {
    return {
      name: "meta.instrPlainBrIf.wasm keyword.control.wasm",
      match: words(Token.BR_IF),
    };
  }

  instrPlainBrTable(): schema.Rule {
    return {
      name: "meta.instrPlainBrTable.wasm",
      patterns: [],
    };
  }

  instrPlainCall(): schema.Rule {
    return {
      name: "meta.instrPlainCall.wasm",
      begin: words(Token.CALL),
      beginCaptures: {
        0: { name: "keyword.control.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "variable.other.wasm",
          match: Token.index,
        },
      ],
    };
  }

  instrPlainCompare(): schema.Rule {
    return {
      name: "meta.instrPlainCompare.wasm",
      patterns: [],
    };
  }

  instrPlainConst(): schema.Rule {
    return {
      name: "meta.instrPlainConst.wasm",
      begin: seq(words(Token.instrType), ops(Token.FULL_STOP), words(Token.CONST)),
      beginCaptures: {
        0: { name: "keyword.control.wasm" },
      },
      end: alt(
        capture(seq(opt(Token.sign), words(group(alt(Token.hexfloat, seq("nan:", Token.hexfloat)))))),
        capture(seq(opt(Token.sign), Token.float)),
        capture(seq(opt(Token.sign), words(group(alt("inf", "nan"))))),
        capture(seq(opt(Token.sign), seq("0x", Token.hexnum))),
        capture(seq(opt(Token.sign), Token.num)),
      ),
      endCaptures: {
        1: { name: "constant.numeric.float.hexadecimal.wasm" },
        2: { name: "constant.numeric.float.decimal.wasm" },
        3: { name: "constant.numeric.float.wasm" },
        4: { name: "constant.numeric.integer.hexadecimal.wasm" },
        5: { name: "constant.numeric.integer.decimal.wasm" },
      },
    };
  }

  instrPlainConvert(): schema.Rule {
    return {
      name: "meta.instrPlainConvert.wasm",
      patterns: [
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrTypeInt32), ops(Token.FULL_STOP), words("wrap_i64")),
        },
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrTypeInt64), ops(Token.FULL_STOP), words(seq("extend_i32_", set("su")))),
        },
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrTypeFloat32), ops(Token.FULL_STOP), words("demote_f64")),
        },
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrTypeFloat64), ops(Token.FULL_STOP), words("promote_f32")),
        },
        {
          name: "keyword.control.wasm",
          match: seq(
            words(Token.instrTypeInt),
            ops(Token.FULL_STOP),
            words(seq("trunc", opt("_sat"), "_f", group(alt("32", "64")), "_", set("su"))),
          ),
        },
        {
          name: "keyword.control.wasm",
          match: seq(
            words(Token.instrTypeFloat),
            ops(Token.FULL_STOP),
            words(seq("convert_i", group(alt("32", "64")), "_", set("su"))),
          ),
        },
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrTypeInt32), ops(Token.FULL_STOP), words("reinterpret_f32")),
        },
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrTypeInt64), ops(Token.FULL_STOP), words("reinterpret_f64")),
        },
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrTypeFloat32), ops(Token.FULL_STOP), words("reinterpret_i32")),
        },
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrTypeFloat64), ops(Token.FULL_STOP), words("reinterpret_i64")),
        },
      ],
    };
  }

  instrPlainDrop(): schema.Rule {
    return {
      name: "meta.instrPlainDrop.wasm keyword.control.wasm",
      match: words(Token.DROP),
    };
  }

  instrPlainGlobalGet(): schema.Rule {
    return {
      name: "meta.instrPlainGlobalGet.wasm",
      begin: words(Token.GLOBAL_GET),
      beginCaptures: {
        0: { name: "keyword.control.wasm" },
      },
      end: Token.index,
      endCaptures: {
        0: { name: "variable.other.constant" },
      },
    };
  }

  instrPlainGlobalSet(): schema.Rule {
    return {
      name: "meta.instrPlainGlobalSet.wasm",
      begin: words(Token.GLOBAL_SET),
      beginCaptures: {
        0: { name: "keyword.control.wasm" },
      },
      end: Token.index,
      endCaptures: {
        0: { name: "variable.other.constant" },
      },
    };
  }

  instrPlainLoad(): schema.Rule {
    return {
      name: "meta.instrPlainLoad.wasm",
      patterns: [],
    };
  }

  instrPlainLocalGet(): schema.Rule {
    return {
      name: "meta.instrPlainLocalGet.wasm",
      patterns: [],
    };
  }

  instrPlainLocalSet(): schema.Rule {
    return {
      name: "meta.instrPlainLocalSet.wasm",
      patterns: [],
    };
  }

  instrPlainLocalTee(): schema.Rule {
    return {
      name: "meta.instrPlainLocalTee.wasm",
      patterns: [],
    };
  }

  instrPlainMemoryGrow(): schema.Rule {
    return {
      name: "meta.instrPlainMemoryGrow.wasm",
      patterns: [],
    };
  }

  instrPlainMemorySize(): schema.Rule {
    return {
      name: "meta.instrPlainMemorySize.wasm",
      patterns: [],
    };
  }

  instrPlainNop(): schema.Rule {
    return {
      name: "meta.instrPlainNop.wasm keyword.control.wasm",
      match: words(Token.NOP),
    };
  }

  instrPlainReturn(): schema.Rule {
    return {
      name: "meta.instrPlainReturn.wasm",
      patterns: [],
    };
  }

  instrPlainStore(): schema.Rule {
    return {
      name: "meta.instrPlainStore.wasm",
      patterns: [],
    };
  }

  instrPlainTest(): schema.Rule {
    return {
      name: "meta.instrPlainTest.wasm keyword.control.wasm",
      match: seq(words(Token.instrType), ops(Token.FULL_STOP), words("eqz")),
    };
  }

  instrPlainUnary(): schema.Rule {
    return {
      name: "meta.instrPlainUnary.wasm",
      patterns: [
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrTypeInt), ops(Token.FULL_STOP), words(group(alt("clz", "ctz", "popcnt")))),
        },
        {
          name: "keyword.control.wasm",
          match: seq(
            words(Token.instrTypeInt),
            ops(Token.FULL_STOP),
            words(group(seq("extend", group(alt("8", "16")), "_s"))),
          ),
        },
        {
          name: "keyword.control.wasm",
          match: seq(words(Token.instrTypeInt64), ops(Token.FULL_STOP), words("extend32_s")),
        },
        {
          name: "keyword.control.wasm",
          match: seq(
            words(Token.instrTypeFloat),
            ops(Token.FULL_STOP),
            words(group(alt("neg", "abs", "sqrt", "ceil", "floor", "trunc", "nearest"))),
          ),
        },
      ],
    };
  }

  instrPlainUnreachable(): schema.Rule {
    return {
      name: "meta.instrPlainUnreachable.wasm keyword.control.wasm",
      match: words(Token.UNREACHABLE),
    };
  }

  limits(): schema.Rule {
    return {
      name: "meta.limits.wasm",
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
      name: "meta.literal.wasm",
      patterns: [],
    };
  }

  literalNAN(): schema.Rule {
    return {
      name: "meta.literalNAN.wasm",
      patterns: [],
    };
  }

  memoryFieldsData(): schema.Rule {
    return {
      name: "meta.memoryFieldsData.wasm",
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
      name: "meta.memoryFieldsType.wasm",
      patterns: [include(this.inlineImport), include(this.memoryType)],
    };
  }

  memoryType(): schema.Rule {
    return {
      name: "meta.memoryType.wasm",
      patterns: [include(this.limits)],
    };
  }

  module(): schema.Rule {
    return {
      name: "meta.module.wasm",
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
    };
  }

  moduleField(): schema.Rule {
    return {
      name: "meta.moduleField.wasm",
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
      name: "meta.moduleFieldData.wasm",
      begin: words(Token.DATA),
      beginCaptures: {
        0: { name: "storage.type.data.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "variable.other.constant entity.name.data.wasm",
          match: Token.index,
        },
        include(this.offset),
        include(this.string),
      ],
    };
  }

  moduleFieldElem(): schema.Rule {
    return {
      name: "meta.moduleFieldElem.wasm",
      begin: words(Token.ELEM),
      beginCaptures: {
        0: { name: "storage.type.elem.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.extra), include(this.offset), { match: Token.index }],
    };
  }

  moduleFieldExport(): schema.Rule {
    return {
      name: "meta.moduleFieldExport.wasm",
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
      name: "meta.moduleFieldFunc.wasm",
      begin: words(Token.FUNC),
      beginCaptures: {
        0: { name: "storage.type.function.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "entity.name.function.wasm",
          match: Token.identifier,
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
            include(this.expr),
          ],
        },
        include(this.instrList),
      ],
    };
  }

  moduleFieldGlobal(): schema.Rule {
    return {
      name: "meta.moduleFieldGlobal.wasm",
      begin: words(Token.GLOBAL),
      beginCaptures: {
        0: { name: "storage.type.global.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "variable.other.global.wasm",
          match: Token.identifier,
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
      name: "meta.moduleFieldImport.wasm",
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
      name: "meta.moduleFieldMemory.wasm",
      begin: words(Token.MEMORY),
      beginCaptures: {
        0: { name: "storage.type.memory.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "variable.other.memory.wasm",
          match: Token.identifier,
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
      name: "meta.moduleFieldStart.wasm",
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
      name: "meta.moduleFieldTable.wasm",
      begin: words(Token.TABLE),
      beginCaptures: {
        0: { name: "storage.type.table.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "variable.other.table.wasm",
          match: Token.identifier,
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
      name: "meta.moduleFieldType.wasm",
      begin: words(Token.TYPE),
      beginCaptures: {
        0: { name: "storage.type.type.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.extra),
        {
          name: "entity.name.type.alias.wasm",
          match: Token.identifier,
        },
        include(this.typeField),
      ],
    };
  }

  offset(): schema.Rule {
    return {
      name: "meta.offset.wasm",
      begin: Token.LEFT_PARENTHESIS,
      beginCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      end: Token.RIGHT_PARENTHESIS,
      endCaptures: {
        0: { name: "meta.brace.round.wasm" },
      },
      patterns: [include(this.offsetConstExpr), include(this.offsetExpr)],
    };
  }

  offsetConstExpr(): schema.Rule {
    return {
      name: "meta.offsetConstExpr.wasm",
      begin: words(Token.OFFSET),
      beginCaptures: {
        0: { name: "storage.type.type.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [include(this.instr)],
    };
  }

  offsetExpr(): schema.Rule {
    return {
      name: "meta.offsetExpr.wasm",
      patterns: [include(this.expr)],
    };
  }

  name(): schema.Rule {
    return {
      name: "meta.name.wasm",
      patterns: [include(this.string)],
    };
  }

  string(): schema.Rule {
    return {
      name: "meta.string.wasm string.quoted.double.wasm",
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
      name: "meta.stringCharacterEscape.wasm constant.character.escape.wasm",
      match: Token.escape,
    };
  }

  tableFieldsElem(): schema.Rule {
    return {
      name: "meta.tableFieldsElem.wasm",
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
      name: "meta.tableFieldsType.wasm",
      patterns: [include(this.inlineImport), include(this.tableType)],
    };
  }

  tableType(): schema.Rule {
    return {
      name: "meta.tableType.wasm",
      patterns: [include(this.limits), include(this.elemType)],
    };
  }

  typeField(): schema.Rule {
    return {
      name: "meta.typeField.wasm",
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
      name: "meta.typeUse.wasm",
      begin: words(Token.TYPE),
      beginCaptures: {
        0: { name: "storage.type.type.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        {
          name: "entity.name.type.alias.wasm",
          match: Token.index,
        },
      ],
    };
  }

  valueType(): schema.Rule {
    return {
      name: "meta.valueType.wasm storage.valueType.wasm",
      match: Token.valueType,
    };
  }
}

export default new Wat().render();
