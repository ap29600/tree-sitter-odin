; "map"       @keyword
; "union"     @keyword
; "cast"      @keyword
; "transmute" @keyword
; "enum"      @keyword
"proc"        @keyword
; "for"         @keyword
; "switch"    @keyword
; "if"          @keyword
; "do"          @keyword
; "else"        @keyword
; "return"    @keyword
"package"     @keyword
"import"      @keyword
(keyword)     @keyword

(int_literal)   @number
(float_literal) @number
(rune_literal)  @number

(operator) @operator

(true) @boolean
(false) @boolean
(nil) @constant.builtin

(ERROR) @error

(type_identifier)    @type
(package_identifier) @namespace
(label_identifier)   @label

(interpreted_string_literal) @string
(raw_string_literal) @string
(escape_sequence) @string.escape

(comment) @comment
(const_identifier) @constant

; (field_identifier) @field

(compiler_directive) @attribute
(calling_convention) @attribute

(identifier) @variable
(pragma_identifier) @attribute


(parameter_declaration type:(selector_expression field:(identifier) @type))
(var_declaration type:(selector_expression field:(identifier) @type))
(const_declaration type:(selector_expression field:(identifier) @type))

(proc_call procedure:(identifier) @function)
(proc_call procedure:(selector_expression field:(identifier) @function))
