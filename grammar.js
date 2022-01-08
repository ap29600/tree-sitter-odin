const
  decimal_digit = /[0-9]/,
  decimals = token(seq(decimal_digit, repeat(choice(decimal_digit, '_')))),

  unicode_char = /./,
  unicode_letter = /[a-zA-Zα-ωΑ-Ωµ]/,
  unicode_digit = decimal_digit,
  letter = choice(unicode_letter, '_'),

  newline = /\n/,


  raw_string_literal = seq('`', repeat(choice(/[^\\`]|\\./, newline)), '`'),
  string_literal = seq('"', /([^\\"]|\\.)*/ , '"'),
  as_list = (elem) => (seq(elem, repeat(seq(',', elem))))

module.exports = grammar({
  name: 'odin',
  extras: $ => [
    /\s/,
    $.line_comment,
    $.multiline_comment,
  ],

  externals: $ => [
    //$.multiline_comment,
  ],

  rules: {
    source_file: $ => seq($.package_declaration, repeat($._top_level_statement)),

    package_declaration: $ => seq('package', field('name', alias($.identifier, $.package_name))),

    package_import: $ => seq ('import', optional(field('alias', $.identifier)), field('path', $.string_literal)),

    _top_level_statement: $ => choice($.value_declare, $.package_import),

    value_declare: $ => seq(
      field('name', $._identifier_list), ':', 
      choice(
        field('type', $._type), 
        seq(optional(field('type', $.identifier)), '=', field('value', $._expression_list)),
        seq(optional(field('type', $.identifier)), ':', field('const', $._expression_list))
      )
    ),

    single_value_declare: $ => seq(
      field('name', $.identifier), ':', 
      choice(
        field('type', $._type), 
        seq(optional(field('type', $.identifier)), '=', field('value', $._expression)),
        seq(optional(field('type', $.identifier)), ':', field('const', $._expression))
      )
    ),

    _expression_list: $ => seq($._expression, repeat(seq(',', $._expression))),
    _expression: $ => prec(2, choice($._literal, $.proc_call, $.identifier, $._type)),

    proc_type: $ => seq('#type', $._proc_signature),

    _proc_signature: $ => seq(
      'proc', '(', 
      repeat(field('arg', $._value_declare_list)),
      ')', 
      optional(seq(
        '->', 
        field('returns', choice(
           $._type, 
          seq('(', $._type_list ,')')
        ))
      ))
    ),

    _type_list: $ => as_list($._type),
    _value_declare_list: $ => as_list($.single_value_declare),

    type: $ => $._type,
    _type: $ => prec(1, choice($.identifier, $.type_of, $.proc_type)),
    type_of: $ => seq('type_of', '(', $._expression, ')'),

    _literal: $ => choice(
      $.string_literal, 
      $.raw_string_literal, 
      $.int_literal
    ),

    proc_call: $ => seq( field('proc', $._expression), '(', field('arg', $._expression_list), ')'),
    
    identifier: $ => token(seq(letter, repeat(choice(letter, unicode_digit)))),
    _identifier_list: $ => seq($.identifier, repeat(seq(',', $.identifier))),


    //
    // literals
    //
    string_literal: $ => string_literal,
    raw_string_literal: $ => raw_string_literal,
    int_literal: $ => token(decimals),



    //
    // comments
    //
    line_comment: $ => token(seq('//', /.*/)),
    multiline_comment: $ => seq('/*', $._mutlitline_comment_tail),
    _mutlitline_comment_tail: $ => seq( 
      repeat(choice(/[^/*]/, '\n')),  // scan up to the first *, / or \n
      choice(
        seq(/\/[^*]|\*[^/]/, $._mutlitline_comment_tail),  // false positive, continue
        seq($.multiline_comment, $._mutlitline_comment_tail), // found a nested comment
        '*/' // end the current comment
      )
    ),
  },
})
