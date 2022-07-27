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
  comparison_operators = ['>', '<', '<=', '>=', '==', '!='],
  assignment_operators = multiplicative_operators
                          .concat(additive_operators)
                          .map(operator => operator + '=')
                          .concat('='),

  op_prec = {
    control_flow: 9,
    r_unary: 8,
    l_unary: 7,
    multiplicative: 6,
    membership: 5,
    additive: 4,
    comparison: 3,
    range: 3,
    and: 2,
    or: 1,
  },

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
  decimalFloatLiteral = choice(
    seq(decimalDigits, '.', optional(decimalDigits), optional(decimalExponent)),
    seq(decimalDigits, decimalExponent),
    seq('.', decimalDigits, optional(decimalExponent)),
  ),

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
    [$._simple_type, $._expression],
    [$._simple_type, $._expression, $._generic_type],
    [$.var_declaration, $.const_declaration, $._range_clause],
    [$.parameter_declaration, $._simple_type],
    [$.var_declaration, $.const_declaration],
    [$.single_assignment, $.assignment_statement],
    [$.initializer_list, $.assignment_statement],
    [$._expression, $.compound_literal],
    [$._simple_type],
  ],

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


    _toplevel_statement: $ => seq(
      repeat(seq($.pragma, optional('\n'))),
      choice( $._declaration,)
    ),

    _simple_statement: $ => prec(1, choice(
        $._declaration,
        $.assignment_statement,
        $.proc_call,
        $.return_statement,
        $.continue_statement,
        $.break_statement,
    )),

    _statement: $ => seq(
      repeat(seq($.pragma, optional('\n'))),
      choice(
        $._simple_statement,
        $.empty_statement,
        $.if_statement,
        $.switch_statement,
        $.case_statement,
        $.for_statement,
        $.block_statement,
        seq(alias('defer', $.keyword), $._statement),
        seq(alias('using', $.keyword), $.identifier),
      )
    ),

    return_statement: $ => prec.right(seq(
      alias('return', $.keyword),
      field('value', prec.right(commaSep($._expression))),
    )),

    block_statement: $ => prec(1, seq(
      optional(field('label', seq($._label_identifier, ':'))),
      '{',
      repeat(seq($._statement, optional(terminator))),
      '}',
    )),

    pragma: $ => seq(
      '@',
      choice(
        seq('(', choice($._pragma_identifier, seq($._pragma_identifier, '=', $._expression)),')'),
        $._pragma_identifier,
      ),
    ),

    empty_statement: $ => ';',

    _declaration: $ => choice(
      $.var_declaration, 
      $.const_declaration,
    ),

    var_declaration: $ => prec.right(1, seq(
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
      optional(alias('distinct', $.keyword)),
      field('value', commaSep1($._expression)),
    )),

    _type: $ => seq(
      choice(
        alias($._proc_type, $.proc_type),
        $._simple_type,
        $._generic_type,
      ),
    ),

    _simple_type: $ => seq(
      // optional(alias('distinct', $.keyword)),
      choice(
        $.selector_expression,
        seq(optional(alias('$', $.operator)), $._type_identifier),
        $.map_type,
        $.pointer_type,
        $.bit_set_type,
        $.matrix_type,
        $.array_type,
        $.struct_type,
        $.enum_type,
        $.union_type,
      )
    ),

    _generic_type: $ => seq(
      $._type_identifier,
      '(', optional(field('arguments', $.initializer_list)), ')',
    ),

    pointer_type: $ => prec(op_prec.l_unary, seq(
      alias('^', $.operator), field('type', $._type),
    )),
	
    bit_set_type: $ => prec(op_prec.l_unary, seq(
      alias('bit_set', $.keyword),
	  '[',
        choice(
          field('type', $._simple_type),
          field('range', $._expression),
	    ),
        optional(seq(';', field('backing', $._type))),
      ']'
    )),

    matrix_type: $ => prec(op_prec.l_unary, seq(
      alias('matrix', $.keyword), '[',$._expression, ',', $._expression, ']', field('type', $._type),
    )),

    array_type: $ => prec(op_prec.l_unary, seq(
      '[',
	  optional(field(
        'size',
        choice(
          $._expression,
          alias('?', $.operator),
          alias('dynamic', $.keyword),
        )
      )),
	  ']', field('type', $._type),
    )),

    union_type: $ => seq(
      alias('union', $.keyword),
      '{', commaSep($._type), '}',
    ),

    enum_type: $ => prec(1, seq(
      alias('enum', $.keyword), optional(field('backing', $._simple_type)),
      '{',
      optional(field('variants', $.initializer_list)),
      '}',
    )),

    struct_type: $ => seq(
      alias('struct', $.keyword),
      optional(field('parameters', $.parameter_list)),
      '{',
      commaSep(seq( commaSep1($.identifier), ':', $._type )), 
      optional(','),
      '}',
    ),

    namespaced_type: $ => seq(
      $._package_identifier, '.', $._type_identifier,
    ),

    map_type: $ => prec(op_prec.l_unary, seq(
      alias('map', $.keyword),
      '[', field('key', $._type), ']',
      field('value', $._type),
    )),

    _expression: $ => choice(
      $._string_literal,
      $.nil,
      $._bool_literal,
      $.int_literal,
      $.rune_literal,
      $.float_literal,
      prec.dynamic(1, $.compound_literal),
      $.identifier,
      $.left_unary_expression,
      $.right_unary_expression,
      $.binary_expression,
      $.ternary_expression,
      $.type_conversion,
      $._parenthesized_expression,
      $.index_expression,
      $.selector_expression,
      $.proc_literal,
      $.proc_call,
      prec.dynamic(-10,  $._type),
    ),

    selector_expression: $ => prec.left(op_prec.r_unary, seq(
      field('parent', $._expression), '.', field('field', $.identifier),
    )),

    type_conversion: $ => prec(7, seq(
      alias(choice('cast', 'transmute'), $.keyword),
      '(', $._type, ')',
      $._expression,
    )),

    ternary_expression: $ => prec.right(op_prec.r_unary, choice(
      seq(
        field('condition', $._expression),
        alias('?', $.operator),
        field('if_true', $._expression),
        alias(':', $.operator),
        field('if_false', $._expression),
      ),
      seq(
        field('if_true', $._expression),
        alias('if', $.keyword),
        field('condition', $._expression),
        alias('else', $.keyword),
        field('if_false', $._expression),
      ),
    )),

    enum_variant: $ => prec.dynamic(-1, seq(
      optional(field('enum', alias($.identifier, $.type_identifier))),
      '.',
      field('variant', alias($.identifier, $.const_identifier)),
    )),

    index_expression: $ => prec(op_prec.r_unary, seq(
      field('operand', $._expression),
      '[',
      choice(
        field('index', commaSep1($._expression)),
        seq(
          optional(field('start', $._expression)),
          alias(':', $.operator),
          optional(field('end', $._expression))
        ),
      ),
      ']',
    )),


    _parenthesized_expression: $ => seq(
      '(', $._expression, ')',
    ),

    proc_literal: $ => prec.right(1, seq(
      $._proc_type,
      optional(seq(
        alias('where', $.keyword),
        $._expression,
      )),

      field('body', choice(
          seq(alias('do', $.keyword), $._statement, optional(terminator)),
          seq(repeat('\n'), '{', repeat(seq($._statement, optional(terminator))), '}'),
          '---'
      )),
    )),

    _proc_type: $ => prec.right(1, seq(
      'proc',
      optional($._calling_convention),
      field('parameters', $.parameter_list),
      field('result', optional(seq(alias('->', $.operator), choice($.parameter_list, $._type))))
    )),

    parameter_list: $ => prec(1, seq(
      '(',
      commaSep(seq(
        choice(
          prec.dynamic(1, $.parameter_declaration),
          prec.dynamic(-1, $._type),
        ),
      )),
      ')'
    )),

    parameter_declaration: $ => prec(1, seq(
      field('name', seq(
        commaSep1(seq(
          optional(alias('using', $.keyword)),
          optional(alias('$', $.operator)),
          $.identifier,
        )),
        ':',
      )),
      field('type', seq(
        $._type,
        optional(seq(alias('/', $.operator), $._type))
      )),
      optional(seq('=', field('value', $._expression))),
    )),

    _calling_convention: $ => alias($.interpreted_string_literal,$.calling_convention),

    proc_call: $ => prec(op_prec.r_unary, seq(
      field('procedure', $._expression),
      '(', optional(field('arguments', $.initializer_list)), ')',
    )),

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

    case_statement: $ => seq(
      alias('case', $.keyword),
      optional($._expression),
      alias(':', $.operator),
    ),

    continue_statement: $ => alias('continue', $.keyword),
    break_statement: $ => alias('break', $.keyword),

    if_statement: $ => prec.right(seq(
      optional(field('label', seq($._label_identifier, ':'))),
      alias(choice('if', 'when'), $.keyword), optional(seq(
        field('initializer', $._statement),
        ';',
      )),
      field('condition', $._expression),
      field('if_true', choice(
          seq(alias('do', $.keyword), $._statement, optional(terminator)),
          seq('{', repeat(seq($._statement, optional(terminator))), '}'),
      )),
      optional(seq(
        alias('else', $.keyword),
        field('if_false', choice(
          $.if_statement,
          seq(alias('do', $.keyword), $._statement, optional(terminator)),
          seq('{', repeat(seq($._statement, optional(terminator))), '}'),
        )),
      )),
    )),

    switch_statement: $ => prec.right(1, seq(
      optional(field('label', seq($._label_identifier, ':'))),
      alias('switch', $.keyword), optional(seq(
        field('initializer', $._simple_statement),
        ';',
      )),
      optional(field('expression', $._expression)),
      field('body', choice(
          seq(alias('do', $.keyword), $._statement, optional(terminator)),
          seq('{', repeat(seq($._statement, optional(terminator))), '}'),
      )),


    )),


    for_statement: $ => prec.right(1, seq(
      optional(field('label', seq($._label_identifier, ':'))),
      alias('for', $.keyword), optional(choice(
        $._expression,
        $._for_clause,
        $._range_clause,
      )),
      field('body', choice(
          seq(alias('do', $.keyword), $._statement, optional(terminator)),
          seq('{', repeat(seq($._statement, optional(terminator))), '}'),
      )),
    )),

    _for_clause: $ => prec.right(seq(
      optional(field('initializer', $._simple_statement)),
      ';',
      optional(field('condition', $._expression)),
      ';',
      optional(field('update', $._simple_statement)),
    )),

    _range_clause: $ => prec(10, seq(
      commaSep1(field('name', $.identifier)),
      alias('in', $.keyword),
      field('range',$._expression),
    )),

    right_unary_expression: $ => prec(op_prec.r_unary, seq(
      field('operand', $._expression),
      field('operator', alias(choice('^', 'or_return'), $.operator)),
    )),

    left_unary_expression: $ => prec(op_prec.l_unary, seq(
      field('operator', alias(choice('+', '-', '~', '&', '!'), $.operator)), 
      field('operand', $._expression),
    )),

    binary_expression: $ => {
      const table = [
        [op_prec.control_flow, 'or_else'],
        [op_prec.multiplicative, choice(...multiplicative_operators)],
        [op_prec.membership, choice('in', 'not_in')],
        [op_prec.additive, choice(...additive_operators)],
        [op_prec.comparison, choice(...comparison_operators)],
        [op_prec.range, choice('..', '..<', '..=')],
        [op_prec.and, '&&',],
        [op_prec.or, '||'],
      ];
      return choice(...table.map(
        ([p, o]) => prec.left(p, seq(
          field('left', $._expression),
          field('operator', alias(o, $.operator)),
          field('right', $._expression),
        )),
      ));
    },

    compound_literal: $ => seq(
      optional(field('type', choice($._simple_type, $._generic_type))),
      '{', optional(field('contents', $.initializer_list)), '}',
    ),

    identifier: $ => token(seq(
      letter,
      repeat(choice(letter, unicodeDigit))
    )),

    // compiler_directive: $ => choice(
    //     ...['relative'].map(directive => seq('#' + directive, '(', $._expression, ')')),
    //     ...[
    //         'force_inline',
    //         'soa',
    //         'no_nil',
    //         'bounds_check',
    //         'no_bounds_check',
    //         'raw_union',
    //         'packed',
    //         'unroll',
    //         'type'
    //     ].map(directive => '#' + directive)
    // ),

    _label_identifier: $ => alias($.identifier, $.label_identifier),
    _type_identifier: $ => alias($.identifier, $.type_identifier),
    _pragma_identifier: $ => alias($.identifier, $.pragma_identifier),
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

    // TODO: replace this with a custom parser that handles nested comments
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
