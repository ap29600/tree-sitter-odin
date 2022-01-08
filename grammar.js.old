const
  terminator = ';',

// |   alternation
// ()  grouping
// []  option (0 or 1 times)
// {}  repetition (0 to n times)

// letter        = unicode_letter | "_" .
// binary_digit  = "0" … "1" .
// octal_digit   = "0" … "7" .
// decimal_digit = "0" … "9" .
// dozenal_digit = "0" … "9" | "A" … "B" | "a" … "b" .
// hex_digit     = "0" … "9" | "A" … "F" | "a" … "f" .

// binary_char  = binary_digit  | "_" .
// octal_char   = octal_digit   | "_" .
// decimal_char = decimal_digit | "_" .
// dozenal_char = dozenal_digit | "_" .
// hex_char     = hex_digit     | "_" .

// decimals = decimal_digit { decimal_char } .


  binaryDigit = /[01]/,
  octalDigit = /[0-7]/,
  decimalDigit = /[0-9]/,
  dozenalDigit = /[0-9a-bA-B]/,
  hexDigit = /[0-9a-fA-F]/,

  decimalChar = choice(decimalDigit, '_'),

  decimals = seq(decimalDigit, repeat(decimalChar))

// NOTE(lucypero): I did integer and floating point literals before reading the spec well, so they are unnecessarily complicated... could do a rewrite
  binaryDigits = seq(binaryDigit, repeat(seq(repeat('_'), binaryDigit))),
  octalDigits = seq(octalDigit, repeat(seq(repeat('_'), octalDigit))),
  decimalDigits = seq(decimalDigit, repeat(seq(repeat('_'), decimalDigit))),
  dozenalDigits = seq(dozenalDigit, repeat(seq(repeat('_'), dozenalDigit))),
  hexDigits = seq(hexDigit, repeat(seq(repeat('_'), hexDigit))),

  binaryLiteral = seq('0', 'b', repeat('_'), binaryDigits, repeat('_')),
  octalLiteral = seq('0', 'o', repeat('_'), octalDigits, repeat('_')),
  decimalLiteral = seq(optional(seq('0', 'd', repeat('_'))), decimalDigits, repeat('_')),
  dozenalLiteral = seq('0', 'z', repeat('_'), dozenalDigits, repeat('_')),
  hexLiteral = seq('0', choice('x', 'X'), repeat('_'), hexDigits, repeat('_')),

  intLiteral = choice(binaryLiteral, octalLiteral, decimalLiteral, 
    dozenalLiteral, hexLiteral),


  // float_lit = decimal_float_lit | hexadecimal_float32_lit | hexadecimal_float64_lit .
  // decimal_float_lit = decimals "." [decimals] [exponent] |
  //                     decimals exponent |
  //                     "." decimals [exponent] .
  // decimals = decimal_digit { decimal_char } .
  // exponent = ( "e" | "E" ) [ "+" | "-" ] decimals .

  // hexadecimal_float32_lit = "0h" hex_digit hex_char hex_char hex_char
//                           hex_char hex_char hex_char hex_char .
  // hexadecimal_float64_lit = "0h" hex_digit hex_char hex_char hex_char
//                           hex_char hex_char hex_char hex_char
//                           hex_char hex_char hex_char hex_char
//                           hex_char hex_char hex_char hex_char .



  //decimal and hexadecimal

floatNoExp = choice(
  seq(decimalDigits, repeat('_'), '.', repeat('_'), optional(decimalDigits), repeat('_')),
  seq(optional(seq(decimalDigits, repeat('_'))), '.', repeat('_'), decimalDigits, repeat('_'))),

  floatDecimal = seq(choice(
    floatNoExp,
    seq(decimalDigits, repeat('_'))),
    optional(seq(
      choice('e','E'), 
      optional(choice('+', '-')),
      repeat('_'),
      optional(decimalDigits),
      repeat('_')))),

  hexDigitWithUnderscore = seq(hexDigit, repeat('_')),

  floatHexadecimal32 = seq('0', 'h', repeat('_'), hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore),

  floatHexadecimal64 = seq('0', 'h', repeat('_'), hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore, hexDigitWithUnderscore),

  floatLiteral = choice(floatDecimal, floatHexadecimal32, floatHexadecimal64),


// imaginary_lit = (decimals | float_lit) "i" .

  imaginaryLiteral = seq(choice(decimals, floatLiteral), 'i');

// Runes


// newline        = /* the Unicode code point U+000A */
// unicode_char   = /* an arbitrary Unicode code point except newline */
// unicode_letter = /* a Unicode code point classified as "Letter" */
// unicode_digit  = /* a Unicode code point classified as "Number, decimal digit" */

// rune_lit         = "'" ( unicode_value | byte_value ) "'" .
// unicode_value    = unicode_char | little_u_value | big_u_value | escaped_char .
// byte_value       = octal_byte_value | hex_byte_value .
// octal_byte_value = `\` octal_digit octal_digit octal_digit .
// hex_byte_value   = `\` "x" hex_digit hex_digit .
// little_u_value   = `\` "u" hex_digit hex_digit hex_digit hex_digit .
// big_u_value      = `\` "U" hex_digit hex_digit hex_digit hex_digit
//                            hex_digit hex_digit hex_digit hex_digit .
// escaped_char     = `\` ( "a" | "b" | "e" | f" | "n" | "r" | "t" | "v" | `\` | "'" | `"` ) .


// rune // signed 32 bit integer
//      // represents a Unicode code point
//      // is a distinct type to `i32`

  unicodeChar = /./,
  unicodeLetter = /[a-zA-Zα-ωΑ-Ωµ]/,
  unicodeDigit = /[0-9]/,

  littleUValue = seq('\\', 'u', hexDigit, hexDigit, hexDigit, hexDigit),
  bigUValue = seq('\\', 'U', hexDigit, hexDigit, hexDigit, hexDigit, 
                             hexDigit, hexDigit, hexDigit, hexDigit),
  escapedChar = seq('\\', choice('a', 'b', 'e', 'f', 'n', 'r', 't', 'v', '\\', "'", '"')),
  unicodeValue = choice(unicodeChar, littleUValue, bigUValue, escapedChar),

  octalByteValue = seq('\\', octalDigit, octalDigit, octalDigit),
  hexByteValue = seq('\\', 'x', hexDigit, hexDigit),
  byteValue = choice(octalByteValue, hexByteValue),

  runeLiteral = seq("'",choice(unicodeValue, byteValue),"'"),


// strings

// string_lit             = raw_string_lit | interpreted_string_lit .
// raw_string_lit         = "`" { unicode_char | newline } "`" .
// interpreted_string_lit = `"` { unicode_value | byte_value } `"` .


  newline = /\n/,

  rawStringLiteral = seq('`', repeat(choice(unicodeChar, newline)),'`'),
  interpretedStringLiteral = seq('"', repeat(choice(unicodeValue, byteValue)), '"'),

  stringLit = choice(rawStringLiteral, interpretedStringLiteral),
  // stringLiteral = interpretedStringLiteral,

  letter = choice(unicodeLetter, '_'),

module.exports = grammar({
  name: 'odin',

  extras: $ => [
    /\s/,
    $.line_comment,
    $.block_comment,
  ],

  externals: $ => [
    $.block_comment,
  ],

  rules: {

// SourceFile = PackageDecl ";" { TopLevelDecl ";" } .
    source_file: $ => seq($.package_decl, ';', repeat(seq($._top_level_decl, ';'))),

// PackageDecl = "package" PackageName .
// PackageName = identifier .
    package_decl: $ => seq('package', $._package_name),
    _package_name: $ => alias($.identifier, $.package_name),

// TopLevelDecl = ( { Attribute } (ImportDecl | ValueDecl | ForeignBlockDecl | ForeignImportDecl) ) |
//                 ConstAssertPanic .
    _top_level_decl: $ => choice(
      seq(repeat($.attribute), choice($.import_decl, $._value_decl, $.foreign_block_decl, $.foreign_import_decl)),
      $.const_assert_panic
    ),

// ConstAssertPanic = "#" ( "assert" | "panic" ) Arguments .
// ImportDecl = "import" [ PackageName ] ImportPath .
// ImportPath = string_lit .
// ForeignImportDecl = "foreign" "import" [ PackageName ] (ImportPath | ForeignImportPaths ) .
// ForeignImportPaths = "{" [ ForeignImportPathList [ "," ] ] "}" .
// ForeignImportPathList = ImportPath { "," ImportPath } .

    const_assert_panic: $ => seq('#', choice('assert', 'panic'), $.arguments),
    import_decl: $ => seq('import', optional($._package_name), $._import_path),
    _import_path: $ => alias($.string_lit, $.import_path),
    foreign_import_decl: $ => seq('foreign', 'import', optional($._package_name), choice($._import_path, $.foreign_import_paths)),
    foreign_import_paths: $ => seq('{', optional(seq($.foreign_import_path_list, optional(','))), '}'),
    foreign_import_path_list: $ => prec.right(seq($._import_path, repeat(seq(',', $._import_path)))),

// ForeignBlockDecl = "foreign" [ identifier ] "{" { { Attribute } ValueDecl } "}" .
    foreign_block_decl: $ => seq('foreign', optional($.identifier), '{', repeat(seq(repeat($.attribute), $._value_decl)), '}'),

    identifier: $ => token(seq( letter, repeat(choice(letter, unicodeDigit)))),

    _type_identifier: $ => alias($.identifier, $.type_identifier),
    _package_identifier: $ => alias($.identifier, $.package_identifier),
    _collection_identifier: $ => alias($.identifier, $.collection_identifier),

    // ----------- Statements -----------


    // ----------- Expressions -----------



    // TODO(lucypero): just doing enough for procedure literals to be parsed
// Operand =
// 	Literal |
// 	OperandName |
// 	"(" Expression ")" |
// 	TagExpr |
// 	InlineAsmExpr |
// 	ImplicitSelectorExpression .
    _operand: $ => prec(30,choice($._literal, $._operand_name, seq('(', $._expression, ')'),
                           $.implicit_selector_expression)),

    _operand_name: $ => prec(30,alias($.identifier, $.operand_name)),

    implicit_selector_expression: $ => seq('.', $.identifier),

// Literal = BasicLit | CompoundLit | ProcedureLit .
    _literal: $ => choice($.basic_lit, $._compound_lit, $.procedure_lit),

// CompoundLit = LiteralType LiteralValue .
// LiteralType =
// 	StructType | UnionType | EnumType |
// 	ArrayType | "[" "?" "]" ElementType |
// 	SliceType | DynamicArrayType |
// 	MapType |
// 	BitFieldType |
// 	BitSetType |
// 	TypeName | CallExpr .

// LiteralValue = "{" [ ElementList [ "," ] ] "}" .

    _compound_lit: $ => seq($.literal_type, $.literal_value),
    literal_type: $ => prec(40,choice($.struct_type, $.union_type, $.enum_type, $.array_type,
                              seq('[','?',']',$._element_type),
                              $.slice_type, $.dynamic_array_type, $.map_type, $.bitfield_type,
                              $.bitset_type, $.type_name, $.call_expr)),
    literal_value: $ => seq('{', optional(seq($.element_list)), '}'),

// BasicLit = int_lit | float_lit | imaginary_lit | rune_lit | string_lit .
    basic_lit: $ => choice($.int_lit, $.float_lit, $.imaginary_lit, $.rune_lit, $.string_lit),

// ProcedureLitTags = "#" ("bounds_check" | "no_bounds_check") .
// ProcedureLit = "proc" Signature [ProcedureLitTags] ProcedureBody .
// ProcedureBody = Block .
    procedure_lit_tags: $ => seq('#', choice('bounds_check', 'no_bounds_check')),
    procedure_lit: $ => seq('proc', $.signature, optional($.procedure_lit_tags), $.procedure_body),
    procedure_body: $ => alias($.block, $.procedure_body),

// Block = "{" StatementList "}" .
    block: $ => seq('{', repeat(seq($.statement, ';')), '}'),
// StatementList = { Statement ";" } .

// Statement =
// 	LabeledStmt | SimpleStmt | ReturnStmt | BreakStmt | ContinueStmt | FallthroughStmt |
// 	Block | IfStmt | SwitchStmt | ForStmt | InlineRangeStmt | WhenStmt | DeferStmt | UsingStmt |
// 	TagStmt | DeclStmt .

// SimpleStmt = EmptyStmt | ExpressionStmt | Assignment | ValueDecl .

// ReturnStmt = "return" ExpressionList .
    return_stmt: $ => seq('return', $.expression_list),

    // TODO(lucypero): do the others later... only simpleStatement for now
    statement: $ => choice($._simple_stmt, $.decl_stmt, $.return_stmt),

// NOTE(lucypero): can't have this.. this matches the empty string..
// EmptyStmt = .

// ExpressionStmt = Expression .
// Assignment = ExpressionList assign_op ExpressionList .

// assign_op = [ add_op | mul_op ] "=" .

    assign_op : $ => seq(optional(choice($.add_op, $.mul_op)), '='),

    _expression_stmt : $ => alias($._expression, $.expression_stmt),
    assignment : $ => seq($.expression_list, $.assign_op, $.expression_list),

// ProcedureGroup = "proc" "{" ExpressionList [ "," ]  "}" .
    procedure_group : $ => seq('proc', '{', $.expression_list, '}'),

// ConstExpression = Expression | ProcedureGroup | ["distinct"] Type | "(" ConstExpression ")" .
// ConstExpressionList = ConstExpression { "," ConstExpression } .
    const_expression : $ => choice($._expression, $.procedure_group, seq(optional('distinct'), $.type), seq('(', $.const_expression, ')')),
    const_expression_list : $ => seq($.const_expression, repeat(seq(',', $.const_expression))),

// ConstDecl = IdentifierList ":" [ Type ] ":" ConstExpressionList .
// VarDecl = IdentifierList ":" (Type | [Type] "=" ExpressionList)
    const_decl : $ => seq($.identifier_list, ':', optional($.type), ':', $.const_expression_list),
    var_decl : $ => prec.right(seq($.identifier_list, ':', choice($.type, seq(optional($.type), '=', $.expression_list)))),
    _value_decl : $ => choice($.const_decl, $.var_decl),

    _simple_stmt: $ => choice($._expression_stmt, $.assignment, $._value_decl),

// Attribute = "@" identifier | "@" Arguments .
    attribute: $ => choice(seq('@', $.identifier), seq('@', $.arguments)),

    // DeclStmt = { Attribute } ValueDecl .
    decl_stmt: $ => prec(20,seq(repeat($.attribute), $._value_decl)),

// Expression  = UnaryExpr | BinaryExpr | TernaryExpr .
// BinaryExpr  = Expression binary_op Expression .
// TernaryExpr = QuestionTernaryExpr | IfTernaryExpr | WhenTernaryExpr .
    _expression: $ => choice($._unary_expr, $.binary_expr, $.ternary_expr),
    binary_expr: $ => prec.right(20,seq($._expression, $.binary_op, $._expression)),
    ternary_expr: $ => choice($.question_ternary_expr, $.if_ternary_expr, $.when_ternary_expr),

// QuestionTernaryExpr = Condition "?" Expression ":" Expression .
// IfTernaryExpr       = Expression "if" Condition "else" Expression .
// WhenTernaryExpr     = Expression "when" Condition "else" Expression .

    question_ternary_expr: $ => prec.right(20,seq($.condition, '?', $._expression, ':', $._expression)),
    if_ternary_expr: $ => prec.right(20,seq($._expression, 'if', $.condition, 'else', $._expression)),
    when_ternary_expr: $ => prec.right(20,seq($._expression, 'when', $.condition, 'else', $._expression)),

    condition : $ => alias($._expression, $.condition),

// UnaryExpr =
// 	AtomExpr |
// 	unary_op UnaryExpr |
// 	inline_op CallExpr |
// 	CastExpr UnaryExpr .
    // TODO(lucypero): just want callexpr to work for now
    _unary_expr: $ => prec(20,choice($._atom_expr, seq($.unary_op, $._unary_expr), seq($.inline_op, $.call_expr),
                      seq($.cast_expr, $._unary_expr))),

// CallExpr = AtomExpr Arguments | "(" CallExpr ")" .

    
// AtomExpr =
// 	Operand |
// 	TypeConversion |
// 	AtomExpr Selector |
// 	AtomExpr ArrowSelector |
// 	AtomExpr Index |
// 	AtomExpr Slice |
// 	AtomExpr TypeAssertion |
// 	AtomExpr AutoTypeAssertion |
// 	CallExpr |
// 	AtomExpr Dereference .

    // TODO(lucypero): incomplete
    _atom_expr: $ => choice($._operand, $.type_conversion, seq($._atom_expr, $.selector),
          seq($._atom_expr, $.arrow_selector), seq($._atom_expr, $.index), seq($._atom_expr, $.slice),
          seq($._atom_expr, $.type_assertion), seq($._atom_expr, $.auto_type_assertion), $.call_expr,
          seq($._atom_expr, $.dereference)),


// Dereference = "^" .

// Selector      = "." identifier .
// ArrowSelector = "->" identifier .
// Index         = "[" Expression "]" .
// Slice         = "[" [ Expression ] ":" [ Expression ] "]" .
// TypeAssertion = "." "(" Type ")" .
// AutoTypeAssertion = "." "?" .

    selector: $ => seq('.', $.identifier),
    arrow_selector: $ => seq('->', $.identifier),
    index: $ => seq('[', $._expression, ']'),
    slice: $ => seq('[', optional($._expression), ':', optional($._expression), ']'),
    type_assertion: $ => seq('.', '(', $.type, ')'),
    auto_type_assertion: $ => seq('.', '?'),


// Dereference = "^" .
    dereference: $ => '^',
    call_expr: $ => prec(30,choice(seq($._atom_expr, $.arguments), seq('(', $.call_expr, ')'))),

// UnaryExpr =
// 	AtomExpr |
// 	unary_op UnaryExpr |
// 	inline_op CallExpr |
// 	CastExpr UnaryExpr .


    // _expression: $ => prec(20,choice(
    //   $.call_expression,
    //   $._number,
    //   $.identifier,
    //   $.rune_literal,
    //   $.string_literal,
    // )),

    // escape_sequence: $ => token.immediate(seq(
    //   '\\',
    //   choice(
    //     /[^xuU]/,
    //     /\d{2,3}/,
    //     /x[0-9a-fA-F]{2,}/,
    //     /u[0-9a-fA-F]{4}/,
    //     /U[0-9a-fA-F]{8}/
    //   )
    // )),

    // call_expression: $ => seq(
    //   optional(seq($._package_identifier,'.')),
    //   field('function', $.identifier),
    //   field('arguments', $.argument_list)
    // ),

    // argument_list: $ => seq(
    //   '(',
    //     optional(seq(
    //       choice($._expression),
    //       repeat(seq(',', choice($._expression))),
    //       optional(',')
    //     )),
    //     ')'
    // ),

    // old.. replace - /end - 


    // NOTE(lucypero): the ebnf is wrong.. it should accept any expression.. not just identifiers
// ArgumentElement = (".." identifier) | ( identifier [ "=" [".."] Expression ] ) .
// ArgumentElementList = ArgumentElement { "," ArgumentElement } .
// Arguments = "(" [ ArgumentElementList [ "," ] ] ")" .
// TypeConversion = Type "(" Expression [ "," ] ")" .
    argument_element: $ => choice(seq('..', $.identifier), seq($.identifier, optional(seq('=', optional('..'), $._expression))), $._expression),
    argument_element_list: $ => prec.right(seq($.argument_element, repeat(seq(',', $.argument_element)))),
    arguments: $ => seq('(', optional(seq($.argument_element_list, optional(','))), ')'),
    type_conversion: $ => seq($.type, '(', $._expression, optional(','), ')'),

    // ----------- Number -----------
    // https://odin-lang.org/ref/spec/#integer-literals
    // https://odin-lang.org/docs/overview/#numbers

    int_lit: $ => token(intLiteral),
    float_lit: $=> token(floatLiteral),
    imaginary_lit: $=> token(imaginaryLiteral),

    _number: $ => choice(
      $.float_lit,
      $.int_lit,
      $.imaginary_lit,
    ),

    rune_lit: $ => token(runeLiteral),
    string_lit: $ => token(stringLit),

    comment: $ => choice(
      $.line_comment,
      $.block_comment
    ),

    line_comment: $ => token(seq(
      '//', /.*/
    )),

    // ----------- Operators -----------

    // binary_op  = "||" | "&&" | rel_op | add_op | mul_op | contain_op .
    // range_op   = ".." | "..<" .
    // rel_op     = "==" | "!=" | "<" | "<=" | ">" | ">=" .
    // contain_op =  "in" | "not_in" .
    // add_op     = "+" | "-" | "|" | "~"  .
    // mul_op     = "*" | "/" | "%" | "%%" | "<<" | ">>" | "&" | "&~" .

    range_op: $ => token(choice('..', '..<')),
    rel_op: $ => choice('==', '!=', '<', '<=', '>', '>='),
    contain_op: $ => choice('in', 'not_in'),
    add_op: $ => choice('+', '-', '|', '~'),
    mul_op: $ => choice('*', '/', '%', '%%', '<<', '>>', '&', '&~'),

    binary_op: $ => choice('||', '&&', $.rel_op, $.add_op, $.mul_op, $.contain_op),

// unary_op = "+" | "-" | "!" | "&" | "~" | "auto_cast" .
    unary_op: $ => choice('+', '-', '!', '&', '~', 'auto_cast'),

// inline_op = "inline" | "no_inline" .
    inline_op: $ => choice('inline', 'no_inline'),

// CastExpr = ("cast" | "transmute") "(" Type ")" .
    cast_expr: $ => seq(choice('cast', 'transmute'), '(', $.type, ')'),


    // ----------- Types -----------

// Type = TypeName | TypeLit | "(" Type ")" | HelperType | Expression .
// TypeName = identifier | PolymorphicName .
// TypeLit = "typeid" |
//           ArrayType | SliceType | DynamicArrayType | MapType |
//           StructType | UnionType | EnumType | BitFieldType |
//           PointerType | ProcedureType |
//           BitSetType |
//           OpaqueType |
//           SimdVectorType |
//           RelativePointerType | RelativeSliceType .

// HelperType = "#" "type" Type .
// TypeOrWithSpecialization = Type | ( ("typeid" | PolymorphicName) "/" TypeOrWithSpecialization )

// ArrayLength         = Expression .
// EnumeratedArrayType = Type .
// ElementType         = Type .
// ArrayType           = [ "#" "partial" ] "[" ( ArrayLength | EnumeratedArrayType ) "]" ElementType .
// SliceType           = "[" "]" Type .
// DynamicArrayType    = "[" "dynamic" "]" Type .
// MapType             = "map" "[" Type "]" Type .
// PointerType         = "^" Type .
// BitSetKeyType       = Type | ( Expression range_op Expression ) .
// BitSetType          = "bit_set" "[" BitSetKeyType [ ";" Type ] "]" .
// OpaqueType          = "opaque" Type .
// SimdVectorType      = "#" "simd" ArrayType .
// RelativePointerType = "#" "relative" "(" Type [ "," ] ")" PointerType .
// RelativeSliceType   = "#" "relative" "(" Type [ "," ] ")" SliceType .

    _array_length: $ => prec(20,alias($._expression, $.array_length)),
    _enumerated_array_type: $ => alias($.type, $.enumerated_array_type),
    _element_type: $ => prec.left(alias($.type, $.element_type)),
    array_type: $ => seq(optional('#partial'), '[' , choice($._array_length, $._enumerated_array_type), ']', $._element_type),

    slice_type: $ => prec.right(seq('[]', $.type)),
    dynamic_array_type: $ => prec.right(seq('[dynamic]', $.type)),
    map_type: $ => prec.right(seq('map', '[', $.type, ']', $.type)),
    pointer_type: $ => prec.right(seq('^', $.type)),
    bitset_key_thing: $ => prec(60,seq($._expression, $.range_op, $._expression)),
    bitset_key_type: $ => choice($.type, $.bitset_key_thing),
    bitset_type: $ => seq('bit_set', '[', $.bitset_key_type, optional(seq(';', $.type)), ']'),
    opaque_type: $ => prec.right(seq('opaque', $.type)),
    simd_vector_type: $ => seq('#', 'simd', $.array_type),
    relative_pointer_type: $ => seq('#', 'relative', '(', $.type, optional(','), ')', $.pointer_type),
    relative_slice_type: $ => seq('#', 'relative', '(', $.type, optional(','), ')', $.slice_type),

    // NOTE(lucypero): struct type

    //identifier list (put this somewhere else)
// IdentifierList = identifier { "," identifier } .

    identifier_list: $ => prec.right(40,seq($.identifier, repeat(seq(',', $.identifier)))),

//expression list (put this somewhere else)
// ExpressionList = Expression { "," Expression } .
    expression_list: $ => prec.right(seq($._expression, repeat(seq(',', $._expression)))),

// WhereClause = "where" ExpressionList .
    where_clause: $ => seq('where', $.expression_list),


// PolymorphicParameter = (IdentifierList | PolymorphicNameList) [":"] TypeOrWithSpecialization .
// PolymorphicParameterList = "(" PolymorphicParameter { "," PolymorphicParameter } [ "," ] ")" .

// PolymorphicName = "$" identifier .
// PolymorphicNameList = PolymorphicName { "," PolymorphicName } .

    polymorphic_name : $ => seq('$', $.identifier),
    polymorphic_name_list : $ => prec.right(30,seq($.polymorphic_name, repeat(seq(',', $.polymorphic_name)))),

// TypeOrWithSpecialization = Type | ( ("typeid" | PolymorphicName) "/" TypeOrWithSpecialization ) .
    type_or_with_specialization : $ => choice($.type, seq(choice('typeid', $.polymorphic_name), '/', $.type_or_with_specialization)),

    polymorphic_parameter : $ => seq(choice($.identifier_list, $.polymorphic_name_list), ':', $.type_or_with_specialization),
    polymorphic_parameter_list: $ => seq('(', $.polymorphic_parameter, repeat(seq(',', $.polymorphic_parameter)), optional(','), ')'),

//     StructTypeTags = [ ( "#" "align" Expression ) | ("#" "packed") | ("#" "raw_union") ] .
//     UnionTypeTags  = [ ( "#" "align" Expression ) | ("#" "no_nil") |("#" "maybe") ] .
//     BitFieldTags   = [ ( "#" "align" Expression ) ] .
//     StructFieldDecl = ( [ ("using") ]  IdentifierList ":" Type ) .
//     StructFieldList = StructFieldDecl { "," StructFieldDecl } .
//     Element = identifier [ "=" Expression ] .
//     ElementList = Element { "," Element } .
//     StructType = "struct" [PolymorphicParameterList] [StructTypeTags] [WhereClause] "{" StructFieldList [ "," ] "}" .
//     UnionType  = "union"  [PolymorphicParameterList] [UnionTypeTags] [WhereClause]  "{" ExpressionList  [ "," ] "}" .
//     EnumType   = "enum" [ Type ] "{" ElementList [ "," ] "}" .
    struct_type_tags : $ => choice(seq('#', 'align', $._expression), seq('#', 'packed'), seq('#', 'raw_union')),
    union_type_tags : $ => choice(seq('#', 'align', $._expression), seq('#', 'no_nil'), seq('#', 'maybe')),
    bitfield_tags : $ => seq('#', 'align', $._expression),
    struct_field_decl : $ => seq(optional('using'), $.identifier_list, ':', $.type),
    struct_field_list : $ => prec.right(seq($.struct_field_decl, repeat(seq(',', $.struct_field_decl)), optional(','))),
    element : $ => seq($.identifier, optional(seq('=', $._expression))),
    element_list : $ => prec.right(seq($.element, repeat(seq(',', $.element)), optional(','))),
    struct_type : $ => seq('struct', optional($.polymorphic_parameter_list), optional($.struct_type_tags),
                                     optional($.where_clause),
                            '{', $.struct_field_list, '}'),
    // struct_type : $ => seq('struct', '{', $.struct_field_list, optional(','), '}'),

    // NOTE(lucypero): i have to make a special expression_list for union type for the optional comma.. this to avoid a treesitter bug
    expression_list_optional_comma : $ => prec.right(seq($._expression, repeat(seq(',', $._expression)), optional(','))),

    union_type : $ => seq('union', optional($.polymorphic_parameter_list),
                                     optional($.union_type_tags),
                                     optional($.where_clause),
                            '{', $.expression_list_optional_comma, '}'),

    enum_type : $ => prec(30,seq('enum', optional($.type), '{', $.element_list, '}')),


// BitFieldField = IdentifierList ":" Expression .
// BitFieldFieldList = BitFieldField { "," BitFieldField } .
// BitFieldFields = [ BitFieldFieldList [ "," ] ] .
// BitFieldType = "bit_field" (BitFieldTags) "{" BitFieldFields "}" .

    bitfield_field : $ => seq($.identifier_list, ':', $._expression),
    bitfield_field_list : $ => prec.right(seq($.bitfield_field, repeat(seq(',', $.bitfield_field)), optional(','))),
    bitfield_type : $ => seq('bit_field', optional($.bitfield_tags), '{', optional($.bitfield_field_list), '}'),

// ProcedureTags = "#" "optional_ok" .
// ProcedureType = "proc" Signature .
    // NOTE(lucypero): what is this.. i think this is not written well
// Signature = Parameters | [ "->" Result ] [ ProcedureTags ] .
    procedure_tags : $ => seq('#', 'optional_ok'),
    procedure_type : $ => prec.left(seq('proc', $.signature)),

    // NOTE(lucypero): this might be wrong
    signature : $ => prec.right(seq($.parameters, optional(seq('->', $.result)), optional($.procedure_tags))),

// Result = PlainParameters | Type .

    result : $ => prec(20,choice($.plain_parameters, $.type)),

// Parameters = "(" [ ParameterList [","] ] ")" .
// ParameterList = ParameterDecl { "," ParameterDecl } .
// ParameterPrefixes = "using" | ("#" "no_alias") | ("#" "c_vararg") | "auto_cast" | ("#" "const") .
// ParameterDecl = [ [ParameterPrefixes]  (IdentifierList | PolymorphicNameList) [ [":"] ".." TypeOrWithSpecialization ] ] .

    // TODO(lucypero): something is wrong with parameter_decl.. a,b,c: int is parsed as 2 separate parameter_decl.. it should be one
    parameters : $ => seq('(', optional(seq($.parameter_list, optional(','))), ')'),
    parameter_list : $ => prec.right(seq($.parameter_decl, repeat(seq(',', $.parameter_decl)))),
    parameter_prefixes : $ => choice('using', seq('#', 'no_alias'), seq('#', 'c_vararg'), 'auto_cast', seq('#', 'const')),
    parameter_decl : $ => seq(optional($.parameter_prefixes), choice($.identifier_list, $.polymorphic_name_list), optional(seq(optional(':'), optional('..'), $.type_or_with_specialization))),

// PlainParameters = "(" [ PlainParameterList [","] ] ")" .
// PlainParameterList = PlainParameterDecl { "," PlainParameterDecl } .
// PlainParameterDecl = [ (IdentifierList | PolymorphicNameList) [ [":"] ".." TypeOrWithSpecialization ] ] .

    plain_parameters : $ => seq('(', optional(seq($.plain_parameter_list, optional(','))), ')'),
    plain_parameter_list : $ => prec.right(seq($.plain_parameter_decl, repeat(seq(',', $.plain_parameter_decl)))),
    plain_parameter_decl : $ => seq(choice($.identifier_list, $.polymorphic_name_list), optional(seq(optional(':'), optional('..'), $.type_or_with_specialization))),


// HelperType = "#" "type" Type .
    helper_type : $ => prec.right(seq('#', 'type', $.type)),

    // NOTE(lucypero): bill says this is old and will be removed i think  

// PolymorphicName = "$" identifier .
// PolymorphicNameList = PolymorphicName { "," PolymorphicName } .
// Type = TypeName | TypeLit | "(" Type ")" | HelperType | Expression .
// TypeName = identifier | PolymorphicName .

    type_name: $ => prec(20,choice($.identifier, $.polymorphic_name)),

    // TODO(lucypero): 

// TypeLit = "typeid" |
//           ArrayType | SliceType | DynamicArrayType | MapType |
//           StructType | UnionType | EnumType | BitFieldType |
//           PointerType | ProcedureType |
//           BitSetType |
//           OpaqueType |
//           SimdVectorType |
//           RelativePointerType | RelativeSliceType .

    _type_literal: $ => choice('typeid', $.array_type, $.slice_type, $.dynamic_array_type,
      $.map_type, $.struct_type, $.union_type, $.enum_type, $.bitfield_type,
      $.pointer_type, $.procedure_type, $.bitset_type, 
      $.opaque_type, $.simd_vector_type, $.relative_pointer_type, $.relative_slice_type),

// Type = TypeName | TypeLit | "(" Type ")" | HelperType | Expression .
    type: $ => prec(50,choice($.type_name, $._type_literal, seq("(", $.type, ")"), $.helper_type, $._expression)),
  }
});

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)))
}

function commaSep(rule) {
  return optional(commaSep1(rule))
}
