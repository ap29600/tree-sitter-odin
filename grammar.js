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
  multiplicative_operators = ['*', '/', '%', '<<', '>>', '&', '&~'],
  additive_operators = ['+', '-', '~', '|'],
  comparison_operators = ['>', '<', '<=', '>=', '=='],
  assignment_operators = multiplicative_operators
                          .concat(additive_operators)
                          .map(operator => operator + '=')
                          .concat('='),


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
    $._label_identifier,
    $._package_identifier,
    $._top_level_declaration,
    $._string_literal,
  ],

  word: $ => $.identifier,

  conflicts: $ => [
    [$._statement, $._expression],
    [$.parameter_declaration, $._simple_type],
    [$.var_declaration, $.const_declaration],
    [$.var_declaration, $.const_declaration, $._expression],
    [$.empty_statement, $._for_clause],
    [$.single_assignment, $.assignment_statement],
    [$.initializer_list, $.assignment_statement],
    [$.namespaced_type, $.namespaced_identifier],
  ],

  // supertypes: $ => [
  //   $._expression,
  //   $._type,
  //   $._simple_type,
  //   $._statement,
  //   $._simple_statement,
  // ],

  rules: {
    source_file: $ => seq(
      $.package_clause,
      repeat(choice(
        seq($._toplevel_statement, terminator),
        seq($.import_declaration, terminator),
      ))
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


    _toplevel_statement: $ => choice(
      $._declaration,
    ),

    _statement: $ => choice(
      $._declaration,
      $.assignment_statement,
      $.empty_statement,
      $.proc_call,
      $.if_statement,
      $.for_statement,
    ),

    empty_statement: $ => ';',

    _declaration: $ => choice(
      $.var_declaration, 
      $.const_declaration,
    ),

    var_declaration: $ => prec.right(seq(
      field('name', commaSep1($.identifier)), alias(':', $.operator),
      choice(
        field('type', $._type),
        seq(
          optional(field('type', $._type)), 
          alias('=', $.operator), 
          field('value', commaSep1($._expression))),
      ),
    )),

    const_declaration: $ => prec.right(seq(
      field('name', commaSep1(alias($.identifier, $.const_identifier))), 
      alias(':', $.operator), optional(field('type', $._type)), alias(':', $.operator), 
      field('value', commaSep1($._expression)),
    )),

    _type: $ => seq(
      optional(alias($.type_directive, $.compiler_directive)), 
      choice(
        alias($._proc_type, $.proc_type),
        $._simple_type,
      ),
    ),

    _simple_type: $ => choice(
      $.namespaced_type,
      $._type_identifier,
      $.map_type,
      $.slice_type,
      $.array_type,
      $.dynamic_array_type,
      $.struct_type,
    ),

    slice_type: $ => seq(
      '[', ']', field('element', $._type),
    ),

    array_type: $ => seq(
      '[', field('length', choice($._expression, alias('?', $.operator))), ']', field('element', $._type),
    ),

    dynamic_array_type: $ => seq(
      '[', alias('dynamic', $.keyword), ']', field('element', $._type),
    ),

    struct_type: $ => seq(
      alias('struct', $.keyword),
      '{', commaSep(seq(
        commaSep1($.identifier), ':', $._type,
      )), optional(','), '}',
    ),

    namespaced_type: $ => seq(
      $._package_identifier, '.', $._type_identifier,
    ),

    map_type: $ => seq(
      alias('map', $.keyword),
      '[', field('key', $._type), ']', 
      field('value', $._type),
    ),

    _expression: $ => prec(1, choice(
      $._string_literal,
      $.nil,
      $._bool_literal,
      $.int_literal,
      $.float_literal,
      $.compound_literal,
      $.identifier,
      $.binary_expression,
      $._parenthesized_expression,
      $.namespaced_identifier,
      $.proc_literal,
      $.proc_call,
      prec(-1,  $._type),
    )),

    _parenthesized_expression: $ => seq(
      '(', $._expression, ')',
    ),

    do_block: $ => prec.right(seq(alias('do', $.keyword), $._statement, optional(terminator))),

    block: $ => prec(10, seq(
      repeat(alias($.block_directive, $.compiler_directive)),
      '{', repeat(seq($._statement, optional(terminator))), '}',
    )),

    proc_literal: $ => seq(
      $._proc_type, 
      field('body', choice(
        seq(repeat('\n'), $.block),
        $.do_block, 
        '---'
      )),
    ),

    _proc_type: $ => seq(
      'proc',
      optional($._calling_convention),
      field('parameters', $.parameter_list),
      field('result', optional(seq('->', choice($.parameter_list, $._type))))
    ),

    parameter_list: $ => seq(
      '(', 
      commaSep(seq(
        choice(
          prec.dynamic(1, $.parameter_declaration),
          prec.dynamic(-1, $._type),
        ),
      )),
      ')'
    ),

    parameter_declaration: $ => seq(
      field('name', seq(commaSep1($.identifier), ':')),
      field('type', $._type), 
      optional(seq('=', field('value', $._expression))),
    ),

    _calling_convention: $ => alias($.interpreted_string_literal,$.calling_convention),

    namespaced_identifier: $ => prec(1, seq(
      $._package_identifier, '.', $.identifier
    )),

    proc_call: $ => prec(10, seq(
      field('procedure', $._expression), 
      '(', optional(field('arguments', $.initializer_list)), ')',)),

    initializer_list: $ => seq(
      commaSep1(choice($._expression, $.single_assignment)), 
      optional(','),
    ),

    single_assignment: $ => seq(
      field('lhs', $._expression), '=', field('rhs', $._expression),
    ),

    assignment_statement: $ => prec.right(seq(
      field('lhs', commaSep1($._expression)), 
      alias(choice(...assignment_operators), $.operator), 
      field('rhs', commaSep1($._expression)),
    )),


    if_statement: $ => prec.right(seq(
      optional(field('label', seq($._label_identifier, ':'))),
      alias('if', $.keyword), optional(seq(
        field('initializer', $._statement),
        ';',
      )),
      field('condition', $._expression),
      field('if_true', choice(seq($.do_block, optional('\n')), $.block)),
      optional(seq(
        alias('else', $.keyword), 
        field('if_false', choice(
          $.if_statement, 
          $.do_block, 
          $.block,
        )),
      )),
    )),

    for_statement: $ => prec.right(seq(
      optional(field('label', seq($._label_identifier, ':'))),
      repeat(alias($.for_directive, $.compiler_directive)), 
      alias('for', $.keyword), optional(choice(
        $._expression,
        $._for_clause,
        $._range_clause,
      )),
      field('body', choice(seq($.do_block, optional('\n')), $.block)),
    )),

    _for_clause: $ => prec.right(seq(
      optional(field('initializer', $._statement)),
      ';',
      optional(field('condition', $._expression)),
      ';',
      optional(field('update', $._statement)),
    )),

    _range_clause: $ => prec(10, seq(
      field('name', $.identifier), 
      alias('in', $.keyword), 
      field('range', choice($._expression, $.range_expression)),
    )),

    binary_expression: $ => { 
      const table = [
        [6, choice(...multiplicative_operators)],
        [5, choice('in', 'not_in')],
        [4, choice(...additive_operators)],
        [3, choice(...comparison_operators)],
        [2, '&&',],
        [1, '||'],
      ];
      return choice(...table.map(
        ([p, o]) => prec.left(p, seq(
          field('left', $._expression), 
          field('operator', alias(o, $.operator)),
          field('right', $._expression),
        )),
      ));
    },

    range_expression: $ => seq(
      field('start', $._expression), 
      choice('..', '..<', '..='), 
      field('end', $._expression)
    ),

    compound_literal: $ => prec.dynamic(-1, seq(
      optional(field('type', $._simple_type)),
      '{', optional($.initializer_list), '}',
    )),

    identifier: $ => token(seq(
      letter,
      repeat(choice(letter, unicodeDigit))
    )),

    type_directive: $ => '#type',
    union_directive: $ => '#no_nil',
    for_directive: $ => '#unroll',
    block_directive: $ => choice('#no_bounds_check', '#bounds_check'),
    struct_directive: $ => choice('#raw_union', '#packed'),

  
    _label_identifier: $ => alias($.identifier, $.label_identifier),
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

    _bool_literal: $ => choice($.true, $.false),
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
