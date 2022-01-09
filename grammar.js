
/*
 *  The MIT License (MIT)
 *  
 *  Copyright (c) 2022 Andrea Piseri
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

// Large portions of the code below are verbatim copies of code published by Max Brunsfeld 
// and available at the link: https://github.com/tree-sitter/tree-sitter-go.
// The license for it is included here:
  
/*
 *  
 *  The MIT License (MIT)
 *  
 *  Copyright (c) 2014 Max Brunsfeld
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *  
 */


const
  PREC = {
    primary: 8,
    or_else: 8,
    unary: 7,
    multiplicative: 6,
    additive: 5,
    range: 4,
    comparative: 3,
    and: 2,
    or: 1,
    composite_literal: -1,
  },

  multiplicative_operators = ['*', '/', '%', '<<', '>>', '&', '&~'],
  additive_operators = ['+', '-', '|', '~'],
  comparative_operators = ['==', '!=', '<', '<=', '>', '>=', 'in', 'not_in'],
  assignment_operators = multiplicative_operators.concat(additive_operators).map(operator => operator + '=').concat('='),

  unicodeLetter = /\p{L}/,
  unicodeDigit = /[0-9]/,
  unicodeChar = /./,
  unicodeValue = unicodeChar,
  letter = choice(unicodeLetter, '_'),

  newline = '\n',
  terminator = choice(newline, ';'),

  hexDigit = /[0-9a-fA-F]/,
  octalDigit = /[0-7]/,
  decimalDigit = /[0-9]/,
  binaryDigit = /[01]/,

  hexDigits = seq(hexDigit, repeat(seq(optional('_'), hexDigit))),
  octalDigits = seq(octalDigit, repeat(seq(optional('_'), octalDigit))),
  decimalDigits = seq(decimalDigit, repeat(seq(optional('_'), decimalDigit))),
  binaryDigits = seq(binaryDigit, repeat(seq(optional('_'), binaryDigit))),

  hexLiteral = seq('0', choice('x', 'X'), optional('_'), hexDigits),
  octalLiteral = seq('0', choice('o', 'O'), optional('_'), octalDigits),
  decimalLiteral = choice('0', seq(/[1-9]/, optional(seq(optional('_'), decimalDigits)))),
  binaryLiteral = seq('0', choice('b', 'B'), optional('_'), binaryDigits),

  intLiteral = choice(binaryLiteral, decimalLiteral, octalLiteral, hexLiteral),

  decimalExponent = seq(choice('e', 'E'), optional(choice('+', '-')), decimalDigits),
  decimalFloatLiteral = prec(-1, choice(
    seq(decimalDigits, '.', optional(decimalDigits), optional(decimalExponent)),
    seq(decimalDigits, decimalExponent),
    seq('.', decimalDigits, optional(decimalExponent)),
  )),

  hexExponent = seq(choice('p', 'P'), optional(choice('+', '-')), decimalDigits),
  hexMantissa = choice(
    seq(optional('_'), hexDigits, '.', optional(hexDigits)),
    seq(optional('_'), hexDigits),
    seq('.', hexDigits),
  ),
  hexFloatLiteral = seq('0', choice('x', 'X'), hexMantissa, hexExponent),

  floatLiteral = choice(decimalFloatLiteral, hexFloatLiteral),

  imaginaryLiteral = seq(choice(decimalDigits, intLiteral, floatLiteral), 'i')

module.exports = grammar({
  name: 'odin',

  extras: $ => [
    $.comment,
    /\s/
  ],

  inline: $ => [
    $._type,
    $._type_identifier,
    $._field_identifier,
    $._package_identifier,
    $._top_level_declaration,
    $._string_literal,
  ],

  word: $ => $.identifier,

  conflicts: $ => [
    [$._simple_type, $._expression],
    [$._simple_type, $._expression, $.qualified_type],
    [$.qualified_type, $._expression],
    [$.const_declaration, $.var_declaration],
    [$.const_declaration, $.var_declaration, $.range_clause],
    // [$.generic_type, $._expression],
    // [$.generic_type, $._simple_type],
    // [$.parameter_declaration, $.type_arguments],
    [$.parameter_declaration, $._simple_type, $._expression],
    // [$.parameter_declaration, $.generic_type, $._expression],
    [$.parameter_declaration, $._expression],
    // [$.func_literal, $.function_type],
    // [$.function_type],
    [$.parameter_declaration, $._simple_type],
  ],

  supertypes: $ => [
    $._expression,
    $._type,
    $._simple_type,
    $._statement,
    $._simple_statement,
  ],

  rules: {
    source_file: $ => repeat(choice(
      seq($._statement, terminator),
      seq($._top_level_declaration, optional(terminator)),
    )),

    _top_level_declaration: $ => choice(
      $.package_clause,
      $.import_declaration
    ),

    package_clause: $ => seq(
      'package',
      $._package_identifier
    ),

    import_declaration: $ => seq(
      'import',
      optional(field('name', choice(
        $.blank_identifier,
        $._package_identifier
      ))),
      field('path', $._string_literal)
    ),
    blank_identifier: $ => '_',

    _declaration: $ => choice(
      $.const_declaration,
      // $.type_declaration,
      $.var_declaration
    ),

    const_declaration: $ => prec.left(seq(
      field('name', commaSep1(alias($.identifier, $.const_identifier))), ':',
      choice(
        seq(
          field('type', $._type),
          optional(seq(':', field('value', commaSep1($._expression))))
        ),
        seq(':', field('value', commaSep1($._expression)))
      )
    )),

    var_declaration : $ => prec(10, seq(
      field('name', commaSep1($.identifier)), ':',
      choice(
        seq(
          field('type', $._type),
          optional(seq('=', field('value', commaSep1($._expression))))
        ),
        seq('=', field('value', commaSep1($._expression)))
      )
    )),

    proc_literal: $ => prec.right(1, seq(
      field('type', $.proc_type),
      field('body', choice(alias($._raw_block, $.block), alias('---', $.deinitialized))),
    )),

    parameter_list: $ => seq(
      '(',
      optional(seq(
        commaSep1(choice($.parameter_declaration, $.variadic_parameter_declaration)),
        optional(',')
      )),
      ')'
    ),

    parameter_declaration: $ => seq(
      optional(seq(field('name', commaSep1($.identifier)), ':')),
      field('type', $._type),
      optional(seq('=', field('value', $._expression))),
    ),

    variadic_parameter_declaration: $ => seq(
      '..',
      field('name', optional(seq($.identifier, ':'))),
      field('type', $._type)
    ),

    field_name_list: $ => commaSep1($._field_identifier),

    expression_list: $ => prec(1, commaSep1($._expression)),

    _type: $ => choice(
      $._simple_type,
      prec.dynamic(-1, $.parenthesized_type)
    ),

    parenthesized_type: $ => seq('(', $._type, ')'),

    _simple_type: $ => choice(
      prec.dynamic(-1, $._type_identifier),
      // $.generic_type,
      $.qualified_type,
      $.pointer_type,
      $.struct_type,
      $.enum_type,
      $.union_type,
      $.array_type,
      $.dynamic_array_type,
      $.slice_type,
      $.map_type,
      $.proc_type,
      $.unambiguous_type,
    ),

    unambiguous_type: $ => seq($._type_directive, $._type),


    // generic_type: $ => seq(
    //   field('type', $._type_identifier),
    //   field('type_arguments', $.type_arguments),
    // ),

    pointer_type: $ => prec(PREC.unary, seq('^', $._type)),

    array_type: $ => seq(
      '[',
      field('length', choice($._expression, alias('?', $.operator))),
      ']',
      field('element', $._type)
    ),

    dynamic_array_type: $ => prec(10, seq(
      '[', alias('dynamic', $.operator), ']',
      field('element', $._type)
    )),

    slice_type: $ => seq(
      '[', ']', field('element', $._type)
    ),

    struct_type: $ => seq(
      'struct',
      $.field_declaration_list
    ),

    field_declaration_list: $ => seq(
      '{',
      optional(seq(
        $.field_declaration,
        repeat(seq(',', $.field_declaration)),
        optional(',')
      )),
      '}'
    ),

    field_declaration: $ => seq(
      field('name', commaSep1($._field_identifier)),
      ':',
      field('type', $._type),
    ),

    union_type: $ => seq(
      'union',
      '{',
      commaSep($._type),
      '}',
    ),

    enum_type: $ => seq(
      'enum', optional(field('underlying', $._type)),
      '{',
      commaSep(alias($.identifier, $.enum_variant)),
      '}',
    ),

    map_type: $ => seq(
      'map',
      '[',
      field('key', $._type),
      ']',
      field('value', $._type)
    ),

    proc_type: $ => seq(
      'proc',
      optional($._calling_convention),
      field('parameters', $.parameter_list),
      field('result', optional(seq('->', choice($.parameter_list, $._simple_type))))
    ),

    _calling_convention: $ => alias($.interpreted_string_literal,$.calling_convention),

    block: $ => seq(optional($.label), $._raw_block),
   
    _raw_block: $ => prec(-1, seq(
      repeat($.compiler_directive),
      '{',
      optional($._statement_list),
      '}'
    )),

    _statement_list: $ => seq(
      $._statement,
      repeat(seq(terminator, $._statement)),
      optional(terminator)
     ),

    _statement: $ => choice(
      $._simple_statement,
      $.return_statement,
      $.defer_statement,
      $.if_statement,
      $.for_statement,
      $.expression_switch_statement,
      $.type_switch_statement,
      $.fallthrough_statement,
      $.break_statement,
      $.continue_statement,
      $.block,
      $.empty_statement
    ),

    empty_statement: $ => ';',

    _simple_statement: $ => prec(1, choice(
      $._declaration,
      $._expression,
      $.assignment_statement,
    )),

    label: $ => prec.dynamic(-1, seq(alias($.identifier, $.label_name), ':')),

    assignment_statement: $ => seq(
      field('left', $.expression_list),
      field('operator', choice(...assignment_operators)),
      field('right', $.expression_list)
    ),


    // This is a hack to prevent `fallthrough_statement` from being parsed as
    // a single token. For consistency with `break_statement` etc it should
    // be parsed as a parent node that *contains* a `fallthrough` token.
    fallthrough_statement: $ => prec.left('fallthrough'),

    break_statement: $ => seq('break', optional(alias($.identifier, $.label_name))),

    continue_statement: $ => seq('continue', optional(alias($.identifier, $.label_name))),

    return_statement: $ => seq('return', optional($.expression_list)),

    defer_statement: $ => seq('defer', $._expression),

    if_statement: $ => seq(
      optional($.label),
      'if',
      optional(seq(
        field('initializer', $._simple_statement),
        ';'
      )),
      field('condition', $._expression),
      field('consequence', $._raw_block),
      optional(seq(
        'else',
        field('alternative', choice($._raw_block, $.if_statement))
      ))
    ),

    for_statement: $ => seq(
      optional($.label),
      'for',
      optional(choice($.range_clause, $._expression, $.for_clause)),
      field('body', $._raw_block)
    ),

    for_clause: $ => prec.left(seq(
      field('initializer', optional($._simple_statement)),
      ';',
      field('condition', optional($._expression)),
      ';',
      field('update', optional($._simple_statement))
    )),

    range_clause: $ => prec(10, seq(
      field('left', commaSep1($.identifier)), 
      'in', 
      field('right', choice($._expression, $.range_expression))
    )),

    range_expression: $ => seq(field('left', $._expression), '..', field('right', $._expression)),

    expression_switch_statement: $ => prec(1, seq(
      'switch',
      optional(seq(
        field('initializer', $._simple_statement),
        ';'
      )),
      field('value', optional($._expression)),
      '{',
      repeat(choice($.expression_case, $.default_case)),
      '}'
    )),

    expression_case: $ => seq(
      'case',
      field('value', $.expression_list),
      ':',
      optional($._statement_list)
    ),

    default_case: $ => seq(
      'default',
      ':',
      optional($._statement_list)
    ),

    type_switch_statement: $ => seq(
      optional($.label),
      'switch',
      $._type_switch_header,
      '{',
      repeat(choice($.type_case, $.default_case)),
      '}'
    ),

    _type_switch_header: $ => seq(
      optional(seq(
        field('initializer', $._simple_statement),
        ';'
      )),
      optional(seq(field('alias', $.expression_list), ':=')),
      field('value', $._expression),
      '.',
      '(',
      'type',
      ')'
    ),

    type_case: $ => seq(
      'case',
      field('type', commaSep1($._type)),
      ':',
      optional($._statement_list)
    ),

    _expression: $ => choice(
      $.dereference_expression,
      $.unary_expression,
      $.binary_expression,
      $.selector_expression,
      $.index_expression,
      $.slice_expression,
      $.call_expression,
      $.type_assertion_expression,
      $.type_conversion_expression,
      $.identifier,
      // alias(choice('new', 'make'), $.identifier),
      //// TODO: make this take precedence over a selector expression in case of namespaced types
      $.composite_literal, 
      $.proc_literal,
      $._string_literal,
      $.int_literal,
      $.float_literal,
      $.imaginary_literal,
      $.rune_literal,
      $.nil,
      $.true,
      $.false,
      $.parenthesized_expression,
      prec(-10, $._type), // assign a type literal only if completely unambiguous
    ),

    parenthesized_expression: $ => seq(
      '(',
      $._expression,
      ')'
    ),

    call_expression: $ => prec(PREC.primary, seq(
      field('function', $._expression),
      field('arguments', $.argument_list)
    )),

    variadic_argument: $ => prec.right(seq(
      '..',
      $._expression
    )),

    // special_argument_list: $ => seq(
    //   '(',
    //   $._type,
    //   repeat(seq(',', $._expression)),
    //   optional(','),
    //   ')'
    // ),

    argument_list: $ => seq(
      '(',
      optional(seq(
        choice($._expression, $.variadic_argument),
        repeat(seq(',', choice($._expression, $.variadic_argument))),
        optional(',')
      )),
      ')'
    ),

    selector_expression: $ => prec(PREC.primary, seq(
      field('operand', $._expression),
      '.',
      field('field', $._field_identifier)
    )),

    index_expression: $ => prec(PREC.primary, seq(
      field('operand', $._expression),
      '[',
      field('index', $._expression),
      ']'
    )),

    slice_expression: $ => prec(PREC.primary, seq(
      field('operand', $._expression),
      '[', field('start', optional($._expression)), ':', field('end', optional($._expression)), ']',
    )),

    type_assertion_expression: $ => prec(PREC.primary, seq(
      field('operand', $._expression), '.', '(', field('type', $._type), ')'
    )),

    type_conversion_expression: $ => prec.dynamic(-1, choice(
      seq(choice('cast', 'transmute'), '(', field('type', $._type), ')', field('operand', $._expression)),
      seq(field('type', $._type), '(', field('operand', $._expression), ')'),
    )),

    composite_literal: $ => prec(PREC.composite_literal, seq(
      optional(field('type', choice(
        $.map_type,
        $.slice_type,
        $.array_type,
        $.dynamic_array_type,
        $.map_type,
        $.struct_type,
        $._type_identifier,
        // $.generic_type,
        $.qualified_type
      ))),
      field('body', $.literal_value)
    )),

    literal_value: $ => seq(
      '{',
      optional(seq(
        choice($.element, $.keyed_element),
        repeat(seq(',', choice($.element, $.keyed_element))),
        optional(',')
      )),
      '}'
    ),

    keyed_element: $ => seq(
      choice(
        seq($._expression, '='),
        seq($.literal_value, '='),
        prec(1, seq($._field_identifier, '='))
      ),
      choice(
        $._expression,
        $.literal_value
      )
    ),

    element: $ => choice(
      $._expression,
      $.literal_value
    ),

    unary_expression: $ => choice(prec(PREC.unary, seq(
        field('operator', alias(choice('+', '-', '!', '~', '&'), $.operator)),
        field('operand', $._expression)
      )),
      prec(PREC.primary, seq(
        field('operand', $._expression), 
        field('operator', alias('or_return', $.operator)),
      )),
    ),

    dereference_expression: $ => prec(PREC.primary, seq(
      field('operand', $._expression), alias('^', $.operator),
    )),

    binary_expression: $ => {
      const table = [
        [PREC.multiplicative, choice(...multiplicative_operators)],
        [PREC.additive, choice(...additive_operators)],
        [PREC.comparative, choice(...comparative_operators)],
        [PREC.and, '&&'],
        [PREC.or, '||'],
        [PREC.or_else, 'or_else'],
      ];

      return choice(...table.map(([precedence, operator]) =>
        prec.left(precedence, seq(
          field('left', $._expression),
          field('operator', alias(operator, $.operator)),
          field('right', $._expression)
        ))
      ));
    },

    qualified_type: $ => prec(-10, seq(
      field('package', $._package_identifier),
      '.',
      field('name', $._type_identifier)
    )),

    identifier: $ => token(seq(
      letter,
      repeat(choice(letter, unicodeDigit))
    )),

    compiler_directive: $ => choice(
        seq('#', $.identifier)
    ),
    _type_directive: $ => alias('#type', $.compiler_directive) ,
  


    _type_identifier: $ => alias($.identifier, $.type_identifier),
    _field_identifier: $ => alias($.identifier, $.field_identifier),
    _package_identifier: $ => alias($.identifier, $.package_identifier),

    _string_literal: $ => choice(
      $.raw_string_literal,
      $.interpreted_string_literal
    ),

    raw_string_literal: $ => token(seq(
      '`',
      repeat(/[^`]/),
      '`'
    )),

    interpreted_string_literal: $ => seq(
      '"',
      repeat(choice(
        token.immediate(prec(1, /[^"\n\\]+/)),
        $.escape_sequence
      )),
      '"'
    ),

    escape_sequence: $ => token.immediate(seq(
      '\\',
      choice(
        /[^xuU]/,
        /\d{2,3}/,
        /x[0-9a-fA-F]{2,}/,
        /u[0-9a-fA-F]{4}/,
        /U[0-9a-fA-F]{8}/
      )
    )),

    int_literal: $ => token(intLiteral),

    float_literal: $ => token(floatLiteral),

    imaginary_literal: $ => token(imaginaryLiteral),

    rune_literal: $ => token(seq(
      "'",
      choice(
        /[^'\\]/,
        seq(
          '\\',
          choice(
            seq('x', hexDigit, hexDigit),
            seq(octalDigit, octalDigit, octalDigit),
            seq('u', hexDigit, hexDigit, hexDigit, hexDigit),
            seq('U', hexDigit, hexDigit, hexDigit, hexDigit, hexDigit, hexDigit, hexDigit, hexDigit),
            seq(choice('a', 'b', 'f', 'n', 'r', 't', 'v', '\\', "'", '"'))
          )
        )
      ),
      "'"
    )),

    nil: $ => 'nil',
    true: $ => 'true',
    false: $ => 'false',
    iota: $ => 'iota',

    // http://stackoverflow.com/questions/13014947/regex-to-match-a-c-style-multiline-comment/36328890#36328890
    comment: $ => token(choice(
      seq('//', /.*/),
      seq(
        '/*',
        /[^*]*\*+([^/*][^*]*\*+)*/,
        '/'
      )
    ))
  }
})

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)))
}

function commaSep(rule) {
  return optional(commaSep1(rule))
}
