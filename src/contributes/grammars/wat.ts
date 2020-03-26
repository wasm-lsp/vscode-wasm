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
      patterns: [include(this.comment), include(this.module)],
      repository: {
        _blockchar: this._blockchar(),
        _digit: this._digit(),
        // _format: this._format(),
        _hexdigit: this._hexdigit(),
        _hexnum: this._hexnum(),
        _iN: this._iN(),
        _linechar: this._linechar(),
        _num: this._num(),
        _sign: this._sign(),
        _sN: this._sN(),
        // _space: this._space(),
        _uN: this._uN(),
        blockcomment: this.blockcomment(),
        comment: this.comment(),
        data: this.data(),
        elem: this.elem(),
        elemtype: this.elemtype(),
        export: this.export(),
        func: this.func(),
        funcidx: this.funcidx(),
        functype: this.functype(),
        global: this.global(),
        globalidx: this.globalidx(),
        globaltype: this.globaltype(),
        import: this.import(),
        importdesc: this.importdesc(),
        inlineExport: this.inlineExport(),
        inlineImport: this.inlineImport(),
        instr: this.instr(),
        labelidx: this.labelidx(),
        limits: this.limits(),
        linecomment: this.linecomment(),
        local: this.local(),
        localidx: this.localidx(),
        mem: this.mem(),
        memidx: this.memidx(),
        memtype: this.memtype(),
        module: this.module(),
        modulefield: this.modulefield(),
        param: this.param(),
        result: this.result(),
        resulttype: this.resulttype(),
        start: this.start(),
        table: this.table(),
        tableidx: this.tableidx(),
        tabletype: this.tabletype(),
        type: this.type(),
        typeidx: this.typeidx(),
        typeuse: this.typeuse(),
        uN: this.uN(),
        valtype: this.valtype(),
      },
    };
  }

  // ====================================================== //
  // =================== Lexical Format =================== //
  // ====================================================== //

  /**************
   * Whitespace *
   **************/

  // _space(): schema.Rule {
  //   return {
  //     patterns: [],
  //   };
  // }

  // _format(): schema.Rule {
  //   return {
  //     patterns: [],
  //   };
  // }

  /************
   * Comments *
   ************/

  comment(): schema.Rule {
    return {
      patterns: [include(this.linecomment), include(this.blockcomment)],
    };
  }

  linecomment(): schema.Rule {
    return {
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

  _linechar(): schema.Rule {
    return {
      patterns: [],
    };
  }

  blockcomment(): schema.Rule {
    return {
      name: "comment.block.wasm",
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

  _blockchar(): schema.Rule {
    return {
      patterns: [],
    };
  }

  // ====================================================== //
  // ======================= Values ======================= //
  // ====================================================== //

  /************
   * Integers *
   ************/

  _sign(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _digit(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _hexdigit(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _num(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _hexnum(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _uN(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _sN(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _iN(): schema.Rule {
    return {
      patterns: [],
    };
  }

  uN(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /******************
   * Floating-Point *
   ******************/

  _frac(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _hexfrac(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _float(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _hexfloat(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _fN(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _fNmag(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /**********
   * String *
   **********/

  _string(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _stringelem(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _stringchar(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _char(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _ascii(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _asciiline(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _utf8cont(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _utf8enc(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _utf8(): schema.Rule {
    return {
      patterns: [],
    };
  }

  _utf8line(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /*********
   * Names *
   *********/

  /***************
   * Identifiers *
   ***************/

  // ====================================================== //
  // ======================== Types ======================= //
  // ====================================================== //

  valtype(): schema.Rule {
    return {
      patterns: [
        {
          name: "entity.name.type.alias.wasm",
          match: words(alt("i32", "i64", "f32", "f64")),
        },
      ],
    };
  }

  /****************
   * Result Types *
   ****************/

  resulttype(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /******************
   * Function Types *
   ******************/

  functype(): schema.Rule {
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
        include(this.comment),
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
          patterns: [include(this.comment), include(this.param), include(this.result)],
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
        include(this.comment),
        {
          name: "entity.name.type.alias.wasm",
          match: Token.id,
        },
        include(this.valtype),
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
      patterns: [include(this.comment), include(this.valtype)],
    };
  }

  /**********
   * Limits *
   **********/

  limits(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /****************
   * Memory Types *
   ****************/

  memtype(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /***************
   * Table Types *
   ***************/

  tabletype(): schema.Rule {
    return {
      patterns: [],
    };
  }

  elemtype(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /****************
   * Global Types *
   ****************/

  globaltype(): schema.Rule {
    return {
      patterns: [],
    };
  }

  // ====================================================== //
  // ==================== Instructions ==================== //
  // ====================================================== //

  instr(): schema.Rule {
    return {
      patterns: [],
    };
  }

  // ====================================================== //
  // ======================= Modules ====================== //
  // ====================================================== //

  /***********
   * Indices *
   ***********/

  typeidx(): schema.Rule {
    return {
      patterns: [],
    };
  }

  funcidx(): schema.Rule {
    return {
      patterns: [],
    };
  }

  tableidx(): schema.Rule {
    return {
      patterns: [],
    };
  }

  memidx(): schema.Rule {
    return {
      patterns: [],
    };
  }

  globalidx(): schema.Rule {
    return {
      patterns: [],
    };
  }

  localidx(): schema.Rule {
    return {
      patterns: [],
    };
  }

  labelidx(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /*********
   * Types *
   *********/

  type(): schema.Rule {
    return {
      name: "meta.type.declaration.wasm",
      begin: words(Token.TYPE),
      beginCaptures: {
        0: { name: "storage.type.type.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.comment),
        {
          begin: Token.id,
          beginCaptures: {
            0: { name: "entity.name.type.alias.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [include(this.comment), include(this.functype)],
        },
        include(this.functype),
      ],
    };
  }

  /*************
   * Type Uses *
   *************/

  typeuse(): schema.Rule {
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
        include(this.comment),
        {
          begin: words(Token.TYPE),
          beginCaptures: {
            0: { name: "storage.type.type.wasm" },
          },
          end: Token.typeidx,
          endCaptures: {
            0: { name: "entity.name.type.alias.wasm" },
          },
        },
        include(this.param),
        include(this.result),
      ],
    };
  }

  /***********
   * Imports *
   ***********/

  import(): schema.Rule {
    return {
      name: "meta.import.wasm",
      begin: words(Token.IMPORT),
      beginCaptures: {
        0: { name: "keyword.control.import.wasm" },
      },
      end: lookAhead(Token.RIGHT_PARENTHESIS),
      patterns: [
        include(this.comment),
        {
          begin: lastWords(Token.IMPORT),
          beginCaptures: {},
          end: lookBehind('"'),
          patterns: [
            include(this.comment),
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
        include(this.importdesc),
      ],
    };
  }

  importdesc(): schema.Rule {
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
        {
          begin: words(Token.FUNC),
          beginCaptures: {
            0: { name: "storage.type.function.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.comment),
            {
              name: "entity.name.function.wasm",
              match: Token.id,
            },
            include(this.typeuse),
          ],
        },
        {
          begin: words(Token.TABLE),
          beginCaptures: {
            0: { name: "storage.type.table.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.comment),
            {
              begin: Token.id,
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [include(this.comment), include(this.tabletype)],
            },
            include(this.tabletype),
          ],
        },
        {
          begin: words(Token.MEMORY),
          beginCaptures: {
            0: { name: "storage.type.memory.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.comment),
            {
              begin: Token.id,
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [include(this.comment), include(this.tabletype)],
            },
            include(this.memtype),
          ],
        },
        {
          begin: words(Token.GLOBAL),
          beginCaptures: {
            0: { name: "storage.type.global.wasm" },
          },
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.comment),
            {
              begin: Token.id,
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [include(this.comment), include(this.tabletype)],
            },
            include(this.globaltype),
          ],
        },
      ],
    };
  }

  /*************
   * Functions *
   *************/

  func(): schema.Rule {
    return {
      begin: Token.LEFT_PARENTHESIS,
      end: Token.RIGHT_PARENTHESIS,
    };
  }

  local(): schema.Rule {
    return {
      patterns: [],
    };
  }

  inlineImport(): schema.Rule {
    return {
      patterns: [],
    };
  }

  inlineExport(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /**********
   * Tables *
   **********/

  table(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /************
   * Memories *
   ************/

  mem(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /***********
   * Globals *
   ***********/

  global(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /***********
   * Exports *
   ***********/

  export(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /******************
   * Start Function *
   ******************/

  start(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /********************
   * Element Segments *
   ********************/

  elem(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /*****************
   * Data Segments *
   *****************/

  data(): schema.Rule {
    return {
      patterns: [],
    };
  }

  /***********
   * Modules *
   ***********/

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
        include(this.comment),
        {
          begin: lookBehind(Token.LEFT_PARENTHESIS),
          end: words(Token.MODULE),
          endCaptures: {
            0: { name: "meta.module.declaration.wasm storage.type.module.wasm" },
          },
          patterns: [include(this.comment)],
        },
        {
          name: "meta.module.declaration.wasm",
          begin: lastWords(Token.MODULE),
          end: lookAhead(Token.RIGHT_PARENTHESIS),
          patterns: [
            include(this.comment),
            {
              begin: Token.id,
              beginCaptures: {
                0: { name: "entity.name.type.module.wasm" },
              },
              end: lookAhead(Token.RIGHT_PARENTHESIS),
              patterns: [include(this.comment), include(this.modulefield)],
            },
            include(this.modulefield),
          ],
        },
      ],
    };
  }

  modulefield(): schema.Rule {
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
        include(this.comment),
        include(this.type),
        include(this.import),
        include(this.func),
        include(this.table),
        include(this.mem),
        include(this.global),
        include(this.export),
        include(this.start),
        include(this.elem),
        include(this.data),
      ],
    };
  }
}

export default new Wat().render();
