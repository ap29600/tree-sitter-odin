"proc"    @keyword
"for"     @keyword
"if"      @keyword
"return"  @keyword
"package" @keyword
"import"  @keyword

(int_literal)   @number
(float_literal) @number
(rune_literal)  @number

(operator) @operator

(type_identifier)    @type
(package_identifier) @constant

(interpreted_string_literal) @string

(comment) @comment
(identifier) @variable

(field_identifier) @variable

(compiler_directive) @attribute
(calling_convention) @attribute
