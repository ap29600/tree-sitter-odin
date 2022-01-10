"map"       @keyword
"union"     @keyword
"cast"      @keyword
"transmute" @keyword
"enum"      @keyword
"proc"      @keyword
"for"       @keyword
"switch"       @keyword
"if"        @keyword
"return"    @keyword
"package"   @keyword
"import"    @keyword

(int_literal)   @number
(float_literal) @number
(rune_literal)  @number

(operator) @operator

(true) @boolean
(false) @boolean
(nil) @constant.builtin

(ERROR) @error

(type_identifier)    @type
(package_identifier) @constant

(interpreted_string_literal) @string
(raw_string_literal) @string
(escape_sequence) @string.escape

(comment) @comment
(const_identifier) @constant

(field_identifier) @field

(compiler_directive) @attribute
(calling_convention) @attribute

(identifier) @variable
