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
  multiplicative_operators = ['*', '/', '%', '%%', '<<', '>>', '&', '&~'],
  additive_operators = ['+', '-', '~', '|'],
  comparison_operators = ['>', '<', '<=', '>=', '==', '!='],
  assignment_operators = multiplicative_operators
                          .concat(additive_operators)
                          .map(operator => operator + '=')
                          .concat('='),

  cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat()))).map(parts => parts.join('')),

  builtin_types = [
      'int',
      'uint',
      'uintptr',
      'typeid',
      'rawptr',
      'string',
      'cstring',
      'i8',
      'u8',
      'bool', 'b8', 'b16', 'b32', 'b64',
      ...cartesian(['i', 'u'], ['16', '32', '64', '128'], ['', 'le', 'be']),
      ...cartesian(['f'], ['16', '32', '64'], ['', 'le', 'be']),
      ...cartesian(['complex'], ['32', '64', '128']),
      ...cartesian(['quaternion'], ['64', '128', '256']),
  ],

  op_prec = {
    control_flow: 11,
    r_unary: 10,
    l_unary: 9,
    multiplicative: 8,
    membership: 7,
    additive: 6,
    comparison: 5,
    range: 4,
    and: 3,
    or: 2,
    ternary: 1,
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
    [$.var_declaration, $.const_declaration],
    [$.var_declaration, $.const_declaration, $._range_clause],
    [$.single_assignment, $._expression_pack],
    [$.initializer_list, $._expression_pack],
    [$._for_init_and_update_clause, $._for_init_clause],
    [$._expression],
  ],

  rules: {
    source_file: $ => seq(
      $.package_clause,
      list(
        terminator,
        optional(choice(
          $.foreign_block,
          $._declaration,
          $.import_declaration,
        )),
      )
    ),


    package_clause: $ => seq(
      alias('package', $.keyword),
      $._package_identifier
    ),

    import_declaration: $ => seq(
      alias('import', $.keyword),
      optional(field('name', choice(
        $.blank_identifier,
        $._package_identifier
      ))),
      field('path', $._string_literal)
    ),

    foreign_block: $ => seq(
      repeat($.pragma),
      alias('foreign', $.keyword),
      optional($._package_identifier),
      '{',
      list(terminator, optional($._declaration)),
      '}',
    ),

    blank_identifier: $ => '_',

    _simple_statement: $ => choice(
      $._declaration,
      $.assignment_statement,
      $.proc_call,
      $.return_statement,
      $.continue_statement,
      $.break_statement,
    ),

    _statement: $ => choice(
      $._simple_statement,
      $.if_statement,
      $.switch_statement,
      $.for_statement,
      $.block_statement,
      $.defer_statement,
      $.using_statement,
    ),

    defer_statement: $ => seq(
      alias('defer', $.keyword),
      choice(
        $._simple_statement,
        $.if_statement,
        $.block_statement,
      ),
    ),

    using_statement: $ => seq(
        alias('using', $.keyword),
        $.identifier,
    ),

    return_statement: $ => prec.right(seq(
        alias('return', $.keyword),
        field('value', $._expression_pack),
    )),

    block_statement: $ => prec(1, seq(
        optional(field('label', seq($._label_identifier, ':'))),
        $.block,
    )),

    block: $ => prec(1, seq(
        repeat(alias(
            $._block_directive,
            $.compiler_directive
        )),
        '{',
        list(terminator, optional($._statement)),
        '}',
    )),

    _block_directive: $ => choice(
        '#no_bounds_check',
        '#bounds_check',
    ),

    pragma: $ => seq(
        '@',
        choice(
            seq(
                '(',
                list1(',', choice(
                    $._pragma_identifier,
                    seq(
                        $._pragma_identifier,
                        '=',
                        $._expression,
                    ),
                )),
                ')'
            ),
            $._pragma_identifier,
        ),
    ),

    _declaration: $ => seq(
        repeat($.pragma),
        choice(
            $.var_declaration,
            $.const_declaration,
        )
    ),

    var_declaration: $ => prec.right(1, seq(
        field('name', list1(',', $.identifier)),
        alias(':', $.operator),
        choice(
            field('type', $._type),
            seq(
                optional(field('type', $._type)),
                alias('=', $.operator),
                field('value', $._expression_pack),
            ),
        ),
    )),

    const_declaration: $ => prec.right(1, seq(
        field('name', list1(',', alias($.identifier, $.const_identifier))),
        alias(':', $.operator),
        optional(field('type', $._type)),
        alias(':', $.operator),
        optional(alias('distinct', $.keyword)),
        field('value', $._expression_pack),
    )),

    _type: $ => choice(
        alias($._proc_type, $.proc_type),
        $._simple_type,
    ),

    _simple_type: $ => prec.right(choice(
      $.selector_expression,
      alias(choice(...builtin_types), $.type_identifier),
      $._type_identifier,
      $.generic_type,
      $.map_type,
      $.pointer_type,
      $.bit_set_type,
      $.matrix_type,
      $.array_type,
      $.struct_type,
      $.enum_type,
      $.union_type,
      prec(-1, $.proc_call),
    )),

    generic_type: $ => prec.right(choice(
        seq(
            alias('typeid', $.type_identifier),
            alias('/', $.operator),
            $._type,
        ),
        seq(
            alias('$', $.operator),
            $._type_identifier,
            optional(seq(
              alias('/', $.operator),
              $._type,
            )),
        ),
    )),

    pointer_type: $ => prec(op_prec.l_unary, seq(
      repeat(alias($._pointer_directive, $.compiler_directive)),
      alias('^', $.operator), field('type', $._type),
    )),

    _pointer_directive: $ => choice(
        seq('#relative', '(', $._type, ')'),
    ),

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
      repeat(alias($._array_directive, $.compiler_directive)),
      '[',
	  optional(field(
        'size',
        choice(
          $._expression,
          alias('^', $.operator),
          alias('?', $.operator),
          alias('dynamic', $.keyword),
        )
      )),
	  ']', field('type', $._type),
    )),

    _array_directive: $ => choice(
        '#soa',
        '#simd',
    ),

    union_type: $ => seq(
      alias('union', $.keyword),
      repeat(alias($._union_directive, $.compiler_directive)),
      '{', list(',', $._type), '}',
    ),

    _union_directive: $ => choice(
        '#no_nil',
        '#shared_nil',
        seq('#align', $._expression),
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
        repeat(alias($._struct_directive, $.compiler_directive)),
        '{',
        list(',', $.struct_field_declaration),
        optional(','),
        '}',
    ),

    struct_field_declaration: $ => seq(
        list1(',', seq(
            optional(alias('using', $.keyword)),
            field('name', $.identifier),
        )),
        alias(':', $.operator),
        field('type', $._type),
        optional(field('tag', $.raw_string_literal)),
    ), 

    _struct_directive: $ => choice(
        '#no_copy',
        '#packed',
        '#raw_union',
        seq('#align', $._expression),
    ),

    map_type: $ => prec(op_prec.l_unary, seq(
      alias('map', $.keyword),
      '[', field('key', $._type), ']',
      field('value', $._type),
    )),

    _expression: $ => prec.right(1, choice(
        $._string_literal,
        $.nil,
        $.bool_literal,
        $.int_literal,
        $.rune_literal,
        $.float_literal,
        $.compound_literal,
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
        $.proc_group,
        $.proc_call,
        seq(
            optional(alias($._type_directive, $.compiler_directive)),
            $._type,
        )
    )),

    _type_directive: $ => choice(
        '#type',
    ),

    selector_expression: $ => prec.left(op_prec.r_unary, seq(
      optional(field('parent', $._expression)), '.', field('field', $.identifier),
    )),

    type_conversion: $ => prec(op_prec.l_unary, seq(
      choice(
        seq(
          alias(choice('cast', 'transmute'), $.keyword),
          '(', $._type, ')',
        ),
        alias('auto_cast', $.operator),
      ),
      $._expression,
    )),

    ternary_expression: $ => prec.right(op_prec.ternary, choice(
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

    index_expression: $ => prec(op_prec.r_unary, seq(
      field('operand', $._expression),
      '[',
      choice(
        field('index', $._expression_pack),
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
        repeat(alias($._proc_directive, $.compiler_directive)),
        $._proc_type,
        optional($.where_clause),
        choice(
            seq(
                optional('\n'),
                $.block,
            ),
            '---',
        ),
    )),

    where_clause: $ => seq(
        optional('\n'),
        alias('where', $.keyword),
        $._expression_pack,
    ),

    _proc_directive: $ => choice(
        '#force_inline',
        '#force_no_inline',
    ),

    proc_group: $ => seq(
        alias('proc', $.keyword),
        '{',
        list1(',', $.identifier),
        '}',
    ),

    _proc_type: $ => prec.right(10, seq(
      alias('proc', $.keyword),
      optional($._calling_convention),
      field('parameters', $.parameter_list),
      optional(seq(
        alias('->', $.operator),
        field('result', choice(
          $.parameter_list,
          $._type,
          alias('!', $.keyword)
        ))
      )),
    )),

    parameter_list: $ => seq(
      '(',
      list(',', seq(
        choice(
          prec.dynamic(1, $.parameter_declaration),
          prec.dynamic(0, $._type),
        ),
      )),
      ')',
      optional(alias($._parameter_list_directive, $.compiler_directive)),
    ),

    _parameter_list_directive: $ => choice(
        '#optional_ok',
    ),

    parameter_declaration: $ => prec.right(1, seq(
        list1(',', seq(
            repeat(choice(
                alias('using', $.keyword),
                alias($._parameter_directive, $.compiler_directive),
            )),
            optional(alias('$', $.operator)),
            field('name', $.identifier),
        )),
        alias(':', $.operator),
        choice(
            field('type', seq(optional(alias('..', $.operator)), $._type)),
            seq(
                optional(field('type', $._type)),
                alias('=', $.operator),
                field('value', $._expression),
            ),
        ),
    )),

    _parameter_directive: $ => choice(
        '#no_alias',
        '#by_ptr',
        '#any_int',
        '#c_vararg',
    ),

    _calling_convention: $ => alias($.interpreted_string_literal,$.calling_convention),

    proc_call: $ => prec.dynamic(op_prec.r_unary, seq(
      choice(
        field('procedure', choice($._expression, alias($.builtin_procedure, $.compiler_directive))),
        seq(
          field('caller', $._expression),
          alias('->', $.operator),
          field('member_proc', $.identifier)
        ),
      ),
      '(', optional(field('arguments', $.initializer_list)), ')',
    )),

    initializer_list: $ => seq(
      list1(',', choice($._expression, $.single_assignment)),
      optional(','),
    ),

    single_assignment: $ => seq(
      field('lhs', $._expression), '=', field('rhs', $._expression),
    ),

    assignment_statement: $ => prec.right(seq(
      field('lhs', $._expression_pack),
      alias(choice(...assignment_operators), $.operator),
      field('rhs', $._expression_pack),
    )),

    _expression_pack: $ => prec.left(list1(',', $._expression)),

    case_statement: $ => seq(
      alias('case', $.keyword),
      list(',', $._expression),
      alias(':', $.operator),
    ),

    continue_statement: $ => seq(alias('continue', $.keyword), optional($._label_identifier)),

    break_statement: $ => seq(alias('break', $.keyword), optional($._label_identifier)),

    if_statement: $ => prec.right(seq(
      optional(field('label', seq($._label_identifier, ':'))),
      alias(choice('if', 'when'), $.keyword),
      optional(seq(
        field('initializer', $._statement),
        ';',
      )),
      field('condition', $._expression),
      field('if_true', choice(
          seq(alias('do', $.keyword), $._statement, optional(terminator)),
          $.block,
      )),
      optional(seq(
        alias('else', $.keyword),
        field('if_false', choice(
          $.if_statement,
          seq(alias('do', $.keyword), $._statement, ),
          $.block,
        )),
      )),
    )),

    switch_statement: $ => prec.right(1, seq(
        optional(field('label', seq($._label_identifier, ':'))),
        repeat(alias($._switch_directive, $.compiler_directive)),
        alias('switch', $.keyword),
        choice(
            seq(
                optional(seq(
                  field('initializer', $._simple_statement),
                  ';',
                )),
                optional(field('expression', $._expression)),
            ),
            seq(
                field('bind', $.identifier),
                alias('in', $.keyword),
                field('expression',$._expression),
            ),
        ),
        field('body', alias( $._switch_block, $.block, )),
    )),

    _switch_block: $ => seq(
        '{',
        list(
            terminator,
            optional(choice(
                $._statement,
                seq(
                    $.case_statement,
                    optional($._statement),
                ),
            )),
        ),
        '}',
    ),
    
    _switch_directive: $ => choice(
        '#partial',
    ),

    for_statement: $ => prec.right(1, seq(
      optional(field('label', seq($._label_identifier, ':'))),
      repeat(alias($._for_directive, $.compiler_directive)),
      alias('for', $.keyword),
      optional(choice(
        $._range_clause,
        $._for_empty_clause,
        $._for_full_clause,
        $._for_conditional_clause,
        $._for_conditional_and_update_clause,
        $._for_init_clause,
        $._for_init_and_update_clause,
      )),
      field('body', choice(
          seq(alias('do', $.keyword), $._statement),
          $.block,
      )),
    )),

    _for_directive: $ => choice(
        '#unroll',
    ),

    _for_full_clause: $ => seq(
      field('initializer', $._simple_statement),
      ';',
      field('condition', $._expression),
      ';',
      field('update', $._simple_statement),
    ),

    _for_empty_clause: $ => seq(';', ';'),

    _for_conditional_clause: $=> seq(field('condition', $._expression)),

    _for_conditional_and_update_clause: $ => seq(
      ';',
      field('condition', $._expression),
      ';',
      field('update', $._simple_statement),
    ),

    _for_init_and_update_clause: $ => seq(
      field('initializer', $._simple_statement),
      ';',
      ';',
      field('update', $._simple_statement),
    ),

    _for_init_clause: $ => seq(
      field('initializer', $._simple_statement),
      ';',
      ';',
    ),

    _range_clause: $ => prec.right(10, seq(
      list1(',', field('name', $.identifier)),
      alias('in', $.keyword),
      field('range',$._expression),
    )),

    right_unary_expression: $ => prec(op_prec.r_unary, seq(
      field('operand', $._expression),
      field('operator', alias(choice('^', 'or_return'), $.operator)),
    )),

    left_unary_expression: $ => prec(op_prec.l_unary, seq(
      field('operator', alias(choice('+', '-', '~', '&', '!', '..'), $.operator)),
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

    compound_literal: $ => prec.dynamic(1, seq(
      optional(field('type', $._simple_type)),
      '{', optional(field('contents', $.initializer_list)), '}',
    )),

    identifier: $ => token(seq(
      letter,
      repeat(choice(letter, unicodeDigit))
    )),

    builtin_procedure: $ => token(choice(
        '#assert',
        '#error',
        '#panic',
        '#config',
        '#location',
        '#load',
        '#load_or',
        '#load_hash',
    )),

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

    bool_literal: $ => choice($._true, $._false),
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
    _true: $ => 'true',
    _false: $ => 'false',

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

function list1(sep, rule) {
  return seq(rule, repeat(seq(sep, rule)))
}

function list(sep, rule) {
  return optional(list1(sep, rule))
}
