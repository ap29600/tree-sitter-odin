#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 13
#define STATE_COUNT 64
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 40
#define ALIAS_COUNT 1
#define TOKEN_COUNT 21
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 8
#define MAX_ALIAS_SEQUENCE_LENGTH 5
#define PRODUCTION_ID_COUNT 10

enum {
  anon_sym_package = 1,
  anon_sym_import = 2,
  anon_sym_COLON = 3,
  anon_sym_EQ = 4,
  anon_sym_COMMA = 5,
  anon_sym_LPAREN = 6,
  anon_sym_RPAREN = 7,
  sym_identifier = 8,
  anon_sym_DQUOTE = 9,
  aux_sym_string_literal_token1 = 10,
  anon_sym_BQUOTE = 11,
  aux_sym_raw_string_literal_token1 = 12,
  aux_sym_raw_string_literal_token2 = 13,
  sym_int_literal = 14,
  sym_line_comment = 15,
  anon_sym_SLASH_STAR = 16,
  aux_sym__mutlitline_comment_tail_token1 = 17,
  anon_sym_LF = 18,
  aux_sym__mutlitline_comment_tail_token2 = 19,
  anon_sym_STAR_SLASH = 20,
  sym_source_file = 21,
  sym_package_declaration = 22,
  sym_package_import = 23,
  sym__top_level_statement = 24,
  sym_value_declare = 25,
  sym__expression_list = 26,
  sym__expression = 27,
  sym__literal = 28,
  sym_proc_call = 29,
  sym__identifier_list = 30,
  sym_string_literal = 31,
  sym_raw_string_literal = 32,
  sym_multiline_comment = 33,
  sym__mutlitline_comment_tail = 34,
  aux_sym_source_file_repeat1 = 35,
  aux_sym__expression_list_repeat1 = 36,
  aux_sym__identifier_list_repeat1 = 37,
  aux_sym_raw_string_literal_repeat1 = 38,
  aux_sym__mutlitline_comment_tail_repeat1 = 39,
  alias_sym_package_name = 40,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_package] = "package",
  [anon_sym_import] = "import",
  [anon_sym_COLON] = ":",
  [anon_sym_EQ] = "=",
  [anon_sym_COMMA] = ",",
  [anon_sym_LPAREN] = "(",
  [anon_sym_RPAREN] = ")",
  [sym_identifier] = "identifier",
  [anon_sym_DQUOTE] = "\"",
  [aux_sym_string_literal_token1] = "string_literal_token1",
  [anon_sym_BQUOTE] = "`",
  [aux_sym_raw_string_literal_token1] = "raw_string_literal_token1",
  [aux_sym_raw_string_literal_token2] = "raw_string_literal_token2",
  [sym_int_literal] = "int_literal",
  [sym_line_comment] = "line_comment",
  [anon_sym_SLASH_STAR] = "/*",
  [aux_sym__mutlitline_comment_tail_token1] = "_mutlitline_comment_tail_token1",
  [anon_sym_LF] = "\n",
  [aux_sym__mutlitline_comment_tail_token2] = "_mutlitline_comment_tail_token2",
  [anon_sym_STAR_SLASH] = "*/",
  [sym_source_file] = "source_file",
  [sym_package_declaration] = "package_declaration",
  [sym_package_import] = "package_import",
  [sym__top_level_statement] = "_top_level_statement",
  [sym_value_declare] = "value_declare",
  [sym__expression_list] = "_expression_list",
  [sym__expression] = "_expression",
  [sym__literal] = "_literal",
  [sym_proc_call] = "proc_call",
  [sym__identifier_list] = "_identifier_list",
  [sym_string_literal] = "string_literal",
  [sym_raw_string_literal] = "raw_string_literal",
  [sym_multiline_comment] = "multiline_comment",
  [sym__mutlitline_comment_tail] = "_mutlitline_comment_tail",
  [aux_sym_source_file_repeat1] = "source_file_repeat1",
  [aux_sym__expression_list_repeat1] = "_expression_list_repeat1",
  [aux_sym__identifier_list_repeat1] = "_identifier_list_repeat1",
  [aux_sym_raw_string_literal_repeat1] = "raw_string_literal_repeat1",
  [aux_sym__mutlitline_comment_tail_repeat1] = "_mutlitline_comment_tail_repeat1",
  [alias_sym_package_name] = "package_name",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [anon_sym_package] = anon_sym_package,
  [anon_sym_import] = anon_sym_import,
  [anon_sym_COLON] = anon_sym_COLON,
  [anon_sym_EQ] = anon_sym_EQ,
  [anon_sym_COMMA] = anon_sym_COMMA,
  [anon_sym_LPAREN] = anon_sym_LPAREN,
  [anon_sym_RPAREN] = anon_sym_RPAREN,
  [sym_identifier] = sym_identifier,
  [anon_sym_DQUOTE] = anon_sym_DQUOTE,
  [aux_sym_string_literal_token1] = aux_sym_string_literal_token1,
  [anon_sym_BQUOTE] = anon_sym_BQUOTE,
  [aux_sym_raw_string_literal_token1] = aux_sym_raw_string_literal_token1,
  [aux_sym_raw_string_literal_token2] = aux_sym_raw_string_literal_token2,
  [sym_int_literal] = sym_int_literal,
  [sym_line_comment] = sym_line_comment,
  [anon_sym_SLASH_STAR] = anon_sym_SLASH_STAR,
  [aux_sym__mutlitline_comment_tail_token1] = aux_sym__mutlitline_comment_tail_token1,
  [anon_sym_LF] = anon_sym_LF,
  [aux_sym__mutlitline_comment_tail_token2] = aux_sym__mutlitline_comment_tail_token2,
  [anon_sym_STAR_SLASH] = anon_sym_STAR_SLASH,
  [sym_source_file] = sym_source_file,
  [sym_package_declaration] = sym_package_declaration,
  [sym_package_import] = sym_package_import,
  [sym__top_level_statement] = sym__top_level_statement,
  [sym_value_declare] = sym_value_declare,
  [sym__expression_list] = sym__expression_list,
  [sym__expression] = sym__expression,
  [sym__literal] = sym__literal,
  [sym_proc_call] = sym_proc_call,
  [sym__identifier_list] = sym__identifier_list,
  [sym_string_literal] = sym_string_literal,
  [sym_raw_string_literal] = sym_raw_string_literal,
  [sym_multiline_comment] = sym_multiline_comment,
  [sym__mutlitline_comment_tail] = sym__mutlitline_comment_tail,
  [aux_sym_source_file_repeat1] = aux_sym_source_file_repeat1,
  [aux_sym__expression_list_repeat1] = aux_sym__expression_list_repeat1,
  [aux_sym__identifier_list_repeat1] = aux_sym__identifier_list_repeat1,
  [aux_sym_raw_string_literal_repeat1] = aux_sym_raw_string_literal_repeat1,
  [aux_sym__mutlitline_comment_tail_repeat1] = aux_sym__mutlitline_comment_tail_repeat1,
  [alias_sym_package_name] = alias_sym_package_name,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_package] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_import] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_COLON] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_EQ] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_COMMA] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RPAREN] = {
    .visible = true,
    .named = false,
  },
  [sym_identifier] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_DQUOTE] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_string_literal_token1] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_BQUOTE] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_raw_string_literal_token1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_raw_string_literal_token2] = {
    .visible = false,
    .named = false,
  },
  [sym_int_literal] = {
    .visible = true,
    .named = true,
  },
  [sym_line_comment] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_SLASH_STAR] = {
    .visible = true,
    .named = false,
  },
  [aux_sym__mutlitline_comment_tail_token1] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_LF] = {
    .visible = true,
    .named = false,
  },
  [aux_sym__mutlitline_comment_tail_token2] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_STAR_SLASH] = {
    .visible = true,
    .named = false,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [sym_package_declaration] = {
    .visible = true,
    .named = true,
  },
  [sym_package_import] = {
    .visible = true,
    .named = true,
  },
  [sym__top_level_statement] = {
    .visible = false,
    .named = true,
  },
  [sym_value_declare] = {
    .visible = true,
    .named = true,
  },
  [sym__expression_list] = {
    .visible = false,
    .named = true,
  },
  [sym__expression] = {
    .visible = false,
    .named = true,
  },
  [sym__literal] = {
    .visible = false,
    .named = true,
  },
  [sym_proc_call] = {
    .visible = true,
    .named = true,
  },
  [sym__identifier_list] = {
    .visible = false,
    .named = true,
  },
  [sym_string_literal] = {
    .visible = true,
    .named = true,
  },
  [sym_raw_string_literal] = {
    .visible = true,
    .named = true,
  },
  [sym_multiline_comment] = {
    .visible = true,
    .named = true,
  },
  [sym__mutlitline_comment_tail] = {
    .visible = false,
    .named = true,
  },
  [aux_sym_source_file_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__expression_list_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__identifier_list_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_raw_string_literal_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__mutlitline_comment_tail_repeat1] = {
    .visible = false,
    .named = false,
  },
  [alias_sym_package_name] = {
    .visible = true,
    .named = true,
  },
};

enum {
  field_alias = 1,
  field_arg = 2,
  field_const = 3,
  field_name = 4,
  field_path = 5,
  field_proc = 6,
  field_type = 7,
  field_value = 8,
};

static const char * const ts_field_names[] = {
  [0] = NULL,
  [field_alias] = "alias",
  [field_arg] = "arg",
  [field_const] = "const",
  [field_name] = "name",
  [field_path] = "path",
  [field_proc] = "proc",
  [field_type] = "type",
  [field_value] = "value",
};

static const TSFieldMapSlice ts_field_map_slices[PRODUCTION_ID_COUNT] = {
  [1] = {.index = 0, .length = 1},
  [2] = {.index = 1, .length = 1},
  [3] = {.index = 2, .length = 2},
  [4] = {.index = 4, .length = 2},
  [5] = {.index = 6, .length = 2},
  [6] = {.index = 8, .length = 2},
  [7] = {.index = 10, .length = 3},
  [8] = {.index = 13, .length = 3},
  [9] = {.index = 16, .length = 2},
};

static const TSFieldMapEntry ts_field_map_entries[] = {
  [0] =
    {field_name, 1},
  [1] =
    {field_path, 1},
  [2] =
    {field_alias, 1},
    {field_path, 2},
  [4] =
    {field_name, 0},
    {field_type, 2},
  [6] =
    {field_const, 3},
    {field_name, 0},
  [8] =
    {field_name, 0},
    {field_value, 3},
  [10] =
    {field_const, 4},
    {field_name, 0},
    {field_type, 2},
  [13] =
    {field_name, 0},
    {field_type, 2},
    {field_value, 4},
  [16] =
    {field_arg, 2},
    {field_proc, 0},
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
  [1] = {
    [1] = alias_sym_package_name,
  },
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(21);
      if (lookahead == '"') ADVANCE(36);
      if (lookahead == '(') ADVANCE(28);
      if (lookahead == ')') ADVANCE(29);
      if (lookahead == '*') ADVANCE(6);
      if (lookahead == ',') ADVANCE(27);
      if (lookahead == '/') ADVANCE(5);
      if (lookahead == ':') ADVANCE(25);
      if (lookahead == '=') ADVANCE(26);
      if (lookahead == '`') ADVANCE(41);
      if (lookahead == 'i') ADVANCE(13);
      if (lookahead == 'p') ADVANCE(7);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(45);
      END_STATE();
    case 1:
      if (lookahead == '\n') ADVANCE(52);
      if (lookahead == '*') ADVANCE(6);
      if (lookahead == '/') ADVANCE(5);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(51);
      if (lookahead != 0) ADVANCE(50);
      END_STATE();
    case 2:
      if (lookahead == '\n') ADVANCE(43);
      if (lookahead == '/') ADVANCE(44);
      if (lookahead == '\\') ADVANCE(18);
      if (lookahead == '`') ADVANCE(41);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(43);
      if (lookahead != 0) ADVANCE(42);
      END_STATE();
    case 3:
      if (lookahead == '"') ADVANCE(36);
      if (lookahead == '/') ADVANCE(4);
      if (lookahead == ':') ADVANCE(25);
      if (lookahead == '=') ADVANCE(26);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z') ||
          lookahead == 181 ||
          (913 <= lookahead && lookahead <= 937) ||
          (945 <= lookahead && lookahead <= 969)) ADVANCE(35);
      if (lookahead == '`') ADVANCE(41);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(3)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(45);
      END_STATE();
    case 4:
      if (lookahead == '*') ADVANCE(48);
      if (lookahead == '/') ADVANCE(46);
      END_STATE();
    case 5:
      if (lookahead == '*') ADVANCE(48);
      if (lookahead == '/') ADVANCE(46);
      if (lookahead != 0) ADVANCE(53);
      END_STATE();
    case 6:
      if (lookahead == '/') ADVANCE(54);
      if (lookahead != 0) ADVANCE(53);
      END_STATE();
    case 7:
      if (lookahead == 'a') ADVANCE(9);
      END_STATE();
    case 8:
      if (lookahead == 'a') ADVANCE(11);
      END_STATE();
    case 9:
      if (lookahead == 'c') ADVANCE(12);
      END_STATE();
    case 10:
      if (lookahead == 'e') ADVANCE(22);
      END_STATE();
    case 11:
      if (lookahead == 'g') ADVANCE(10);
      END_STATE();
    case 12:
      if (lookahead == 'k') ADVANCE(8);
      END_STATE();
    case 13:
      if (lookahead == 'm') ADVANCE(15);
      END_STATE();
    case 14:
      if (lookahead == 'o') ADVANCE(16);
      END_STATE();
    case 15:
      if (lookahead == 'p') ADVANCE(14);
      END_STATE();
    case 16:
      if (lookahead == 'r') ADVANCE(17);
      END_STATE();
    case 17:
      if (lookahead == 't') ADVANCE(23);
      END_STATE();
    case 18:
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(42);
      END_STATE();
    case 19:
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(40);
      END_STATE();
    case 20:
      if (eof) ADVANCE(21);
      if (lookahead == '(') ADVANCE(28);
      if (lookahead == ')') ADVANCE(29);
      if (lookahead == ',') ADVANCE(27);
      if (lookahead == '/') ADVANCE(4);
      if (lookahead == ':') ADVANCE(25);
      if (lookahead == '=') ADVANCE(26);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'h') ||
          ('j' <= lookahead && lookahead <= 'z') ||
          lookahead == 181 ||
          (913 <= lookahead && lookahead <= 937) ||
          (945 <= lookahead && lookahead <= 969)) ADVANCE(35);
      if (lookahead == 'i') ADVANCE(30);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(20)
      END_STATE();
    case 21:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_package);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_import);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(anon_sym_import);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z') ||
          lookahead == 181 ||
          (913 <= lookahead && lookahead <= 937) ||
          (945 <= lookahead && lookahead <= 969)) ADVANCE(35);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(anon_sym_COLON);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_EQ);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(anon_sym_LPAREN);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(anon_sym_RPAREN);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'l') ||
          ('n' <= lookahead && lookahead <= 'z') ||
          lookahead == 181 ||
          (913 <= lookahead && lookahead <= 937) ||
          (945 <= lookahead && lookahead <= 969)) ADVANCE(35);
      if (lookahead == 'm') ADVANCE(32);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'n') ||
          ('p' <= lookahead && lookahead <= 'z') ||
          lookahead == 181 ||
          (913 <= lookahead && lookahead <= 937) ||
          (945 <= lookahead && lookahead <= 969)) ADVANCE(35);
      if (lookahead == 'o') ADVANCE(33);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'o') ||
          ('q' <= lookahead && lookahead <= 'z') ||
          lookahead == 181 ||
          (913 <= lookahead && lookahead <= 937) ||
          (945 <= lookahead && lookahead <= 969)) ADVANCE(35);
      if (lookahead == 'p') ADVANCE(31);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'q') ||
          ('s' <= lookahead && lookahead <= 'z') ||
          lookahead == 181 ||
          (913 <= lookahead && lookahead <= 937) ||
          (945 <= lookahead && lookahead <= 969)) ADVANCE(35);
      if (lookahead == 'r') ADVANCE(34);
      END_STATE();
    case 34:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 's') ||
          ('u' <= lookahead && lookahead <= 'z') ||
          lookahead == 181 ||
          (913 <= lookahead && lookahead <= 937) ||
          (945 <= lookahead && lookahead <= 969)) ADVANCE(35);
      if (lookahead == 't') ADVANCE(24);
      END_STATE();
    case 35:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z') ||
          lookahead == 181 ||
          (913 <= lookahead && lookahead <= 937) ||
          (945 <= lookahead && lookahead <= 969)) ADVANCE(35);
      END_STATE();
    case 36:
      ACCEPT_TOKEN(anon_sym_DQUOTE);
      END_STATE();
    case 37:
      ACCEPT_TOKEN(aux_sym_string_literal_token1);
      if (lookahead == '\n') ADVANCE(40);
      if (lookahead == '"') ADVANCE(46);
      if (lookahead == '\\') ADVANCE(47);
      if (lookahead != 0) ADVANCE(37);
      END_STATE();
    case 38:
      ACCEPT_TOKEN(aux_sym_string_literal_token1);
      if (lookahead == '*') ADVANCE(49);
      if (lookahead == '/') ADVANCE(37);
      if (lookahead == '\\') ADVANCE(19);
      if (lookahead != 0 &&
          lookahead != '"') ADVANCE(40);
      END_STATE();
    case 39:
      ACCEPT_TOKEN(aux_sym_string_literal_token1);
      if (lookahead == '/') ADVANCE(38);
      if (lookahead == '\\') ADVANCE(19);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(39);
      if (lookahead != 0 &&
          lookahead != '"') ADVANCE(40);
      END_STATE();
    case 40:
      ACCEPT_TOKEN(aux_sym_string_literal_token1);
      if (lookahead == '\\') ADVANCE(19);
      if (lookahead != 0 &&
          lookahead != '"') ADVANCE(40);
      END_STATE();
    case 41:
      ACCEPT_TOKEN(anon_sym_BQUOTE);
      END_STATE();
    case 42:
      ACCEPT_TOKEN(aux_sym_raw_string_literal_token1);
      END_STATE();
    case 43:
      ACCEPT_TOKEN(aux_sym_raw_string_literal_token1);
      if (lookahead == '\n') ADVANCE(43);
      if (lookahead == '/') ADVANCE(44);
      if (lookahead == '\\') ADVANCE(18);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(43);
      if (lookahead != 0 &&
          lookahead != '`') ADVANCE(42);
      END_STATE();
    case 44:
      ACCEPT_TOKEN(aux_sym_raw_string_literal_token1);
      if (lookahead == '*') ADVANCE(48);
      if (lookahead == '/') ADVANCE(46);
      END_STATE();
    case 45:
      ACCEPT_TOKEN(sym_int_literal);
      if (('0' <= lookahead && lookahead <= '9') ||
          lookahead == '_') ADVANCE(45);
      END_STATE();
    case 46:
      ACCEPT_TOKEN(sym_line_comment);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(46);
      END_STATE();
    case 47:
      ACCEPT_TOKEN(sym_line_comment);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(37);
      END_STATE();
    case 48:
      ACCEPT_TOKEN(anon_sym_SLASH_STAR);
      END_STATE();
    case 49:
      ACCEPT_TOKEN(anon_sym_SLASH_STAR);
      if (lookahead == '\\') ADVANCE(19);
      if (lookahead != 0 &&
          lookahead != '"') ADVANCE(40);
      END_STATE();
    case 50:
      ACCEPT_TOKEN(aux_sym__mutlitline_comment_tail_token1);
      END_STATE();
    case 51:
      ACCEPT_TOKEN(aux_sym__mutlitline_comment_tail_token1);
      if (lookahead == '\n') ADVANCE(52);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(51);
      if (lookahead != 0 &&
          lookahead != '*' &&
          lookahead != '/') ADVANCE(50);
      END_STATE();
    case 52:
      ACCEPT_TOKEN(anon_sym_LF);
      if (lookahead == '\n') ADVANCE(52);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(51);
      END_STATE();
    case 53:
      ACCEPT_TOKEN(aux_sym__mutlitline_comment_tail_token2);
      END_STATE();
    case 54:
      ACCEPT_TOKEN(anon_sym_STAR_SLASH);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 3},
  [3] = {.lex_state = 3},
  [4] = {.lex_state = 3},
  [5] = {.lex_state = 3},
  [6] = {.lex_state = 3},
  [7] = {.lex_state = 3},
  [8] = {.lex_state = 20},
  [9] = {.lex_state = 20},
  [10] = {.lex_state = 20},
  [11] = {.lex_state = 20},
  [12] = {.lex_state = 1},
  [13] = {.lex_state = 1},
  [14] = {.lex_state = 20},
  [15] = {.lex_state = 1},
  [16] = {.lex_state = 1},
  [17] = {.lex_state = 20},
  [18] = {.lex_state = 1},
  [19] = {.lex_state = 1},
  [20] = {.lex_state = 20},
  [21] = {.lex_state = 20},
  [22] = {.lex_state = 20},
  [23] = {.lex_state = 20},
  [24] = {.lex_state = 20},
  [25] = {.lex_state = 20},
  [26] = {.lex_state = 20},
  [27] = {.lex_state = 1},
  [28] = {.lex_state = 1},
  [29] = {.lex_state = 20},
  [30] = {.lex_state = 1},
  [31] = {.lex_state = 2},
  [32] = {.lex_state = 1},
  [33] = {.lex_state = 2},
  [34] = {.lex_state = 1},
  [35] = {.lex_state = 1},
  [36] = {.lex_state = 2},
  [37] = {.lex_state = 3},
  [38] = {.lex_state = 20},
  [39] = {.lex_state = 20},
  [40] = {.lex_state = 20},
  [41] = {.lex_state = 20},
  [42] = {.lex_state = 20},
  [43] = {.lex_state = 3},
  [44] = {.lex_state = 2},
  [45] = {.lex_state = 0},
  [46] = {.lex_state = 20},
  [47] = {.lex_state = 0},
  [48] = {.lex_state = 0},
  [49] = {.lex_state = 20},
  [50] = {.lex_state = 20},
  [51] = {.lex_state = 20},
  [52] = {.lex_state = 0},
  [53] = {.lex_state = 0},
  [54] = {.lex_state = 0},
  [55] = {.lex_state = 0},
  [56] = {.lex_state = 3},
  [57] = {.lex_state = 3},
  [58] = {.lex_state = 0},
  [59] = {.lex_state = 39},
  [60] = {.lex_state = 0},
  [61] = {(TSStateId)(-1)},
  [62] = {(TSStateId)(-1)},
  [63] = {(TSStateId)(-1)},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [sym_multiline_comment] = STATE(0),
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_package] = ACTIONS(1),
    [anon_sym_import] = ACTIONS(1),
    [anon_sym_COLON] = ACTIONS(1),
    [anon_sym_EQ] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [anon_sym_LPAREN] = ACTIONS(1),
    [anon_sym_RPAREN] = ACTIONS(1),
    [anon_sym_DQUOTE] = ACTIONS(1),
    [anon_sym_BQUOTE] = ACTIONS(1),
    [sym_int_literal] = ACTIONS(1),
    [sym_line_comment] = ACTIONS(3),
    [anon_sym_SLASH_STAR] = ACTIONS(5),
    [aux_sym__mutlitline_comment_tail_token2] = ACTIONS(1),
    [anon_sym_STAR_SLASH] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(58),
    [sym_package_declaration] = STATE(8),
    [sym_multiline_comment] = STATE(1),
    [anon_sym_package] = ACTIONS(7),
    [sym_line_comment] = ACTIONS(3),
    [anon_sym_SLASH_STAR] = ACTIONS(5),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 11,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(9), 1,
      sym_identifier,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(13), 1,
      anon_sym_BQUOTE,
    ACTIONS(15), 1,
      sym_int_literal,
    STATE(2), 1,
      sym_multiline_comment,
    STATE(11), 1,
      sym__expression,
    STATE(55), 1,
      sym__expression_list,
    STATE(14), 2,
      sym__literal,
      sym_proc_call,
    STATE(25), 2,
      sym_string_literal,
      sym_raw_string_literal,
  [36] = 11,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(9), 1,
      sym_identifier,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(13), 1,
      anon_sym_BQUOTE,
    ACTIONS(15), 1,
      sym_int_literal,
    STATE(3), 1,
      sym_multiline_comment,
    STATE(11), 1,
      sym__expression,
    STATE(38), 1,
      sym__expression_list,
    STATE(14), 2,
      sym__literal,
      sym_proc_call,
    STATE(25), 2,
      sym_string_literal,
      sym_raw_string_literal,
  [72] = 11,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(9), 1,
      sym_identifier,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(13), 1,
      anon_sym_BQUOTE,
    ACTIONS(15), 1,
      sym_int_literal,
    STATE(4), 1,
      sym_multiline_comment,
    STATE(11), 1,
      sym__expression,
    STATE(49), 1,
      sym__expression_list,
    STATE(14), 2,
      sym__literal,
      sym_proc_call,
    STATE(25), 2,
      sym_string_literal,
      sym_raw_string_literal,
  [108] = 11,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(9), 1,
      sym_identifier,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(13), 1,
      anon_sym_BQUOTE,
    ACTIONS(15), 1,
      sym_int_literal,
    STATE(5), 1,
      sym_multiline_comment,
    STATE(11), 1,
      sym__expression,
    STATE(40), 1,
      sym__expression_list,
    STATE(14), 2,
      sym__literal,
      sym_proc_call,
    STATE(25), 2,
      sym_string_literal,
      sym_raw_string_literal,
  [144] = 11,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(9), 1,
      sym_identifier,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(13), 1,
      anon_sym_BQUOTE,
    ACTIONS(15), 1,
      sym_int_literal,
    STATE(6), 1,
      sym_multiline_comment,
    STATE(11), 1,
      sym__expression,
    STATE(50), 1,
      sym__expression_list,
    STATE(14), 2,
      sym__literal,
      sym_proc_call,
    STATE(25), 2,
      sym_string_literal,
      sym_raw_string_literal,
  [180] = 10,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(9), 1,
      sym_identifier,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(13), 1,
      anon_sym_BQUOTE,
    ACTIONS(15), 1,
      sym_int_literal,
    STATE(7), 1,
      sym_multiline_comment,
    STATE(24), 1,
      sym__expression,
    STATE(14), 2,
      sym__literal,
      sym_proc_call,
    STATE(25), 2,
      sym_string_literal,
      sym_raw_string_literal,
  [213] = 10,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(17), 1,
      ts_builtin_sym_end,
    ACTIONS(19), 1,
      anon_sym_import,
    ACTIONS(21), 1,
      sym_identifier,
    STATE(8), 1,
      sym_multiline_comment,
    STATE(10), 1,
      aux_sym_source_file_repeat1,
    STATE(41), 1,
      sym__top_level_statement,
    STATE(60), 1,
      sym__identifier_list,
    STATE(39), 2,
      sym_package_import,
      sym_value_declare,
  [245] = 9,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(23), 1,
      ts_builtin_sym_end,
    ACTIONS(25), 1,
      anon_sym_import,
    ACTIONS(28), 1,
      sym_identifier,
    STATE(41), 1,
      sym__top_level_statement,
    STATE(60), 1,
      sym__identifier_list,
    STATE(9), 2,
      sym_multiline_comment,
      aux_sym_source_file_repeat1,
    STATE(39), 2,
      sym_package_import,
      sym_value_declare,
  [275] = 10,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(19), 1,
      anon_sym_import,
    ACTIONS(21), 1,
      sym_identifier,
    ACTIONS(31), 1,
      ts_builtin_sym_end,
    STATE(9), 1,
      aux_sym_source_file_repeat1,
    STATE(10), 1,
      sym_multiline_comment,
    STATE(41), 1,
      sym__top_level_statement,
    STATE(60), 1,
      sym__identifier_list,
    STATE(39), 2,
      sym_package_import,
      sym_value_declare,
  [307] = 8,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(37), 1,
      anon_sym_COMMA,
    ACTIONS(39), 1,
      anon_sym_LPAREN,
    STATE(11), 1,
      sym_multiline_comment,
    STATE(21), 1,
      aux_sym__expression_list_repeat1,
    ACTIONS(33), 2,
      ts_builtin_sym_end,
      anon_sym_RPAREN,
    ACTIONS(35), 2,
      anon_sym_import,
      sym_identifier,
  [334] = 8,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(43), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(47), 1,
      aux_sym__mutlitline_comment_tail_token2,
    ACTIONS(49), 1,
      anon_sym_STAR_SLASH,
    STATE(12), 1,
      sym_multiline_comment,
    STATE(28), 1,
      aux_sym__mutlitline_comment_tail_repeat1,
    STATE(61), 1,
      sym__mutlitline_comment_tail,
    ACTIONS(45), 2,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
  [360] = 8,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(43), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(47), 1,
      aux_sym__mutlitline_comment_tail_token2,
    ACTIONS(51), 1,
      anon_sym_STAR_SLASH,
    STATE(13), 1,
      sym_multiline_comment,
    STATE(28), 1,
      aux_sym__mutlitline_comment_tail_repeat1,
    STATE(63), 1,
      sym__mutlitline_comment_tail,
    ACTIONS(45), 2,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
  [386] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    STATE(14), 1,
      sym_multiline_comment,
    ACTIONS(55), 2,
      anon_sym_import,
      sym_identifier,
    ACTIONS(53), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
  [406] = 8,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(43), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(59), 1,
      aux_sym__mutlitline_comment_tail_token2,
    ACTIONS(61), 1,
      anon_sym_STAR_SLASH,
    STATE(15), 1,
      sym_multiline_comment,
    STATE(30), 1,
      aux_sym__mutlitline_comment_tail_repeat1,
    STATE(34), 1,
      sym__mutlitline_comment_tail,
    ACTIONS(57), 2,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
  [432] = 8,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(43), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(59), 1,
      aux_sym__mutlitline_comment_tail_token2,
    ACTIONS(63), 1,
      anon_sym_STAR_SLASH,
    STATE(16), 1,
      sym_multiline_comment,
    STATE(30), 1,
      aux_sym__mutlitline_comment_tail_repeat1,
    STATE(32), 1,
      sym__mutlitline_comment_tail,
    ACTIONS(57), 2,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
  [458] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    STATE(17), 1,
      sym_multiline_comment,
    ACTIONS(67), 2,
      anon_sym_import,
      sym_identifier,
    ACTIONS(65), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
  [478] = 8,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(43), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(47), 1,
      aux_sym__mutlitline_comment_tail_token2,
    ACTIONS(69), 1,
      anon_sym_STAR_SLASH,
    STATE(18), 1,
      sym_multiline_comment,
    STATE(28), 1,
      aux_sym__mutlitline_comment_tail_repeat1,
    STATE(62), 1,
      sym__mutlitline_comment_tail,
    ACTIONS(45), 2,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
  [504] = 8,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(43), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(59), 1,
      aux_sym__mutlitline_comment_tail_token2,
    ACTIONS(71), 1,
      anon_sym_STAR_SLASH,
    STATE(19), 1,
      sym_multiline_comment,
    STATE(30), 1,
      aux_sym__mutlitline_comment_tail_repeat1,
    STATE(35), 1,
      sym__mutlitline_comment_tail,
    ACTIONS(57), 2,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
  [530] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    STATE(20), 1,
      sym_multiline_comment,
    ACTIONS(75), 2,
      anon_sym_import,
      sym_identifier,
    ACTIONS(73), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
  [550] = 7,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(37), 1,
      anon_sym_COMMA,
    STATE(21), 1,
      sym_multiline_comment,
    STATE(23), 1,
      aux_sym__expression_list_repeat1,
    ACTIONS(77), 2,
      ts_builtin_sym_end,
      anon_sym_RPAREN,
    ACTIONS(79), 2,
      anon_sym_import,
      sym_identifier,
  [574] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    STATE(22), 1,
      sym_multiline_comment,
    ACTIONS(83), 2,
      anon_sym_import,
      sym_identifier,
    ACTIONS(81), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
  [594] = 6,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(89), 1,
      anon_sym_COMMA,
    ACTIONS(85), 2,
      ts_builtin_sym_end,
      anon_sym_RPAREN,
    ACTIONS(87), 2,
      anon_sym_import,
      sym_identifier,
    STATE(23), 2,
      sym_multiline_comment,
      aux_sym__expression_list_repeat1,
  [616] = 6,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(39), 1,
      anon_sym_LPAREN,
    STATE(24), 1,
      sym_multiline_comment,
    ACTIONS(87), 2,
      anon_sym_import,
      sym_identifier,
    ACTIONS(85), 3,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      anon_sym_RPAREN,
  [638] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    STATE(25), 1,
      sym_multiline_comment,
    ACTIONS(94), 2,
      anon_sym_import,
      sym_identifier,
    ACTIONS(92), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
  [658] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    STATE(26), 1,
      sym_multiline_comment,
    ACTIONS(98), 2,
      anon_sym_import,
      sym_identifier,
    ACTIONS(96), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
  [678] = 4,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(102), 2,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
    STATE(27), 2,
      sym_multiline_comment,
      aux_sym__mutlitline_comment_tail_repeat1,
    ACTIONS(100), 3,
      anon_sym_SLASH_STAR,
      aux_sym__mutlitline_comment_tail_token2,
      anon_sym_STAR_SLASH,
  [695] = 7,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(43), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(69), 1,
      anon_sym_STAR_SLASH,
    ACTIONS(107), 1,
      aux_sym__mutlitline_comment_tail_token2,
    STATE(27), 1,
      aux_sym__mutlitline_comment_tail_repeat1,
    STATE(28), 1,
      sym_multiline_comment,
    ACTIONS(105), 2,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
  [718] = 7,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(109), 1,
      ts_builtin_sym_end,
    ACTIONS(113), 1,
      anon_sym_COLON,
    ACTIONS(115), 1,
      anon_sym_EQ,
    STATE(29), 1,
      sym_multiline_comment,
    ACTIONS(111), 2,
      anon_sym_import,
      sym_identifier,
  [741] = 7,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(43), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(61), 1,
      anon_sym_STAR_SLASH,
    ACTIONS(117), 1,
      aux_sym__mutlitline_comment_tail_token2,
    STATE(27), 1,
      aux_sym__mutlitline_comment_tail_repeat1,
    STATE(30), 1,
      sym_multiline_comment,
    ACTIONS(105), 2,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
  [764] = 5,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(119), 1,
      anon_sym_BQUOTE,
    ACTIONS(124), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(121), 2,
      aux_sym_raw_string_literal_token1,
      aux_sym_raw_string_literal_token2,
    STATE(31), 2,
      sym_multiline_comment,
      aux_sym_raw_string_literal_repeat1,
  [782] = 3,
    ACTIONS(41), 1,
      sym_line_comment,
    STATE(32), 1,
      sym_multiline_comment,
    ACTIONS(126), 5,
      anon_sym_SLASH_STAR,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
      aux_sym__mutlitline_comment_tail_token2,
      anon_sym_STAR_SLASH,
  [796] = 6,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(124), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(128), 1,
      anon_sym_BQUOTE,
    STATE(31), 1,
      aux_sym_raw_string_literal_repeat1,
    STATE(33), 1,
      sym_multiline_comment,
    ACTIONS(130), 2,
      aux_sym_raw_string_literal_token1,
      aux_sym_raw_string_literal_token2,
  [816] = 3,
    ACTIONS(41), 1,
      sym_line_comment,
    STATE(34), 1,
      sym_multiline_comment,
    ACTIONS(132), 5,
      anon_sym_SLASH_STAR,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
      aux_sym__mutlitline_comment_tail_token2,
      anon_sym_STAR_SLASH,
  [830] = 3,
    ACTIONS(41), 1,
      sym_line_comment,
    STATE(35), 1,
      sym_multiline_comment,
    ACTIONS(134), 5,
      anon_sym_SLASH_STAR,
      aux_sym__mutlitline_comment_tail_token1,
      anon_sym_LF,
      aux_sym__mutlitline_comment_tail_token2,
      anon_sym_STAR_SLASH,
  [844] = 6,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(124), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(136), 1,
      anon_sym_BQUOTE,
    STATE(33), 1,
      aux_sym_raw_string_literal_repeat1,
    STATE(36), 1,
      sym_multiline_comment,
    ACTIONS(130), 2,
      aux_sym_raw_string_literal_token1,
      aux_sym_raw_string_literal_token2,
  [864] = 6,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(138), 1,
      anon_sym_COLON,
    ACTIONS(140), 1,
      anon_sym_EQ,
    ACTIONS(142), 1,
      sym_identifier,
    STATE(37), 1,
      sym_multiline_comment,
  [883] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(144), 1,
      ts_builtin_sym_end,
    STATE(38), 1,
      sym_multiline_comment,
    ACTIONS(146), 2,
      anon_sym_import,
      sym_identifier,
  [900] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(148), 1,
      ts_builtin_sym_end,
    STATE(39), 1,
      sym_multiline_comment,
    ACTIONS(150), 2,
      anon_sym_import,
      sym_identifier,
  [917] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(152), 1,
      ts_builtin_sym_end,
    STATE(40), 1,
      sym_multiline_comment,
    ACTIONS(154), 2,
      anon_sym_import,
      sym_identifier,
  [934] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(156), 1,
      ts_builtin_sym_end,
    STATE(41), 1,
      sym_multiline_comment,
    ACTIONS(158), 2,
      anon_sym_import,
      sym_identifier,
  [951] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(160), 1,
      ts_builtin_sym_end,
    STATE(42), 1,
      sym_multiline_comment,
    ACTIONS(162), 2,
      anon_sym_import,
      sym_identifier,
  [968] = 6,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(164), 1,
      sym_identifier,
    STATE(43), 1,
      sym_multiline_comment,
    STATE(46), 1,
      sym_string_literal,
  [987] = 4,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(124), 1,
      anon_sym_SLASH_STAR,
    STATE(44), 1,
      sym_multiline_comment,
    ACTIONS(166), 3,
      anon_sym_BQUOTE,
      aux_sym_raw_string_literal_token1,
      aux_sym_raw_string_literal_token2,
  [1002] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(168), 1,
      anon_sym_COLON,
    ACTIONS(170), 1,
      anon_sym_COMMA,
    STATE(45), 2,
      sym_multiline_comment,
      aux_sym__identifier_list_repeat1,
  [1019] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(173), 1,
      ts_builtin_sym_end,
    STATE(46), 1,
      sym_multiline_comment,
    ACTIONS(175), 2,
      anon_sym_import,
      sym_identifier,
  [1036] = 6,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(177), 1,
      anon_sym_COLON,
    ACTIONS(179), 1,
      anon_sym_COMMA,
    STATE(45), 1,
      aux_sym__identifier_list_repeat1,
    STATE(47), 1,
      sym_multiline_comment,
  [1055] = 6,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(179), 1,
      anon_sym_COMMA,
    ACTIONS(181), 1,
      anon_sym_COLON,
    STATE(47), 1,
      aux_sym__identifier_list_repeat1,
    STATE(48), 1,
      sym_multiline_comment,
  [1074] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(183), 1,
      ts_builtin_sym_end,
    STATE(49), 1,
      sym_multiline_comment,
    ACTIONS(185), 2,
      anon_sym_import,
      sym_identifier,
  [1091] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(187), 1,
      ts_builtin_sym_end,
    STATE(50), 1,
      sym_multiline_comment,
    ACTIONS(189), 2,
      anon_sym_import,
      sym_identifier,
  [1108] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(191), 1,
      ts_builtin_sym_end,
    STATE(51), 1,
      sym_multiline_comment,
    ACTIONS(193), 2,
      anon_sym_import,
      sym_identifier,
  [1125] = 4,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    STATE(52), 1,
      sym_multiline_comment,
    ACTIONS(168), 2,
      anon_sym_COLON,
      anon_sym_COMMA,
  [1139] = 5,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    STATE(51), 1,
      sym_string_literal,
    STATE(53), 1,
      sym_multiline_comment,
  [1155] = 4,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(195), 1,
      anon_sym_DQUOTE,
    STATE(54), 1,
      sym_multiline_comment,
  [1168] = 4,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(197), 1,
      anon_sym_RPAREN,
    STATE(55), 1,
      sym_multiline_comment,
  [1181] = 4,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(199), 1,
      sym_identifier,
    STATE(56), 1,
      sym_multiline_comment,
  [1194] = 4,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(201), 1,
      sym_identifier,
    STATE(57), 1,
      sym_multiline_comment,
  [1207] = 4,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(203), 1,
      ts_builtin_sym_end,
    STATE(58), 1,
      sym_multiline_comment,
  [1220] = 4,
    ACTIONS(41), 1,
      sym_line_comment,
    ACTIONS(124), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(205), 1,
      aux_sym_string_literal_token1,
    STATE(59), 1,
      sym_multiline_comment,
  [1233] = 4,
    ACTIONS(3), 1,
      sym_line_comment,
    ACTIONS(5), 1,
      anon_sym_SLASH_STAR,
    ACTIONS(207), 1,
      anon_sym_COLON,
    STATE(60), 1,
      sym_multiline_comment,
  [1246] = 1,
    ACTIONS(209), 1,
      ts_builtin_sym_end,
  [1250] = 1,
    ACTIONS(211), 1,
      ts_builtin_sym_end,
  [1254] = 1,
    ACTIONS(213), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 36,
  [SMALL_STATE(4)] = 72,
  [SMALL_STATE(5)] = 108,
  [SMALL_STATE(6)] = 144,
  [SMALL_STATE(7)] = 180,
  [SMALL_STATE(8)] = 213,
  [SMALL_STATE(9)] = 245,
  [SMALL_STATE(10)] = 275,
  [SMALL_STATE(11)] = 307,
  [SMALL_STATE(12)] = 334,
  [SMALL_STATE(13)] = 360,
  [SMALL_STATE(14)] = 386,
  [SMALL_STATE(15)] = 406,
  [SMALL_STATE(16)] = 432,
  [SMALL_STATE(17)] = 458,
  [SMALL_STATE(18)] = 478,
  [SMALL_STATE(19)] = 504,
  [SMALL_STATE(20)] = 530,
  [SMALL_STATE(21)] = 550,
  [SMALL_STATE(22)] = 574,
  [SMALL_STATE(23)] = 594,
  [SMALL_STATE(24)] = 616,
  [SMALL_STATE(25)] = 638,
  [SMALL_STATE(26)] = 658,
  [SMALL_STATE(27)] = 678,
  [SMALL_STATE(28)] = 695,
  [SMALL_STATE(29)] = 718,
  [SMALL_STATE(30)] = 741,
  [SMALL_STATE(31)] = 764,
  [SMALL_STATE(32)] = 782,
  [SMALL_STATE(33)] = 796,
  [SMALL_STATE(34)] = 816,
  [SMALL_STATE(35)] = 830,
  [SMALL_STATE(36)] = 844,
  [SMALL_STATE(37)] = 864,
  [SMALL_STATE(38)] = 883,
  [SMALL_STATE(39)] = 900,
  [SMALL_STATE(40)] = 917,
  [SMALL_STATE(41)] = 934,
  [SMALL_STATE(42)] = 951,
  [SMALL_STATE(43)] = 968,
  [SMALL_STATE(44)] = 987,
  [SMALL_STATE(45)] = 1002,
  [SMALL_STATE(46)] = 1019,
  [SMALL_STATE(47)] = 1036,
  [SMALL_STATE(48)] = 1055,
  [SMALL_STATE(49)] = 1074,
  [SMALL_STATE(50)] = 1091,
  [SMALL_STATE(51)] = 1108,
  [SMALL_STATE(52)] = 1125,
  [SMALL_STATE(53)] = 1139,
  [SMALL_STATE(54)] = 1155,
  [SMALL_STATE(55)] = 1168,
  [SMALL_STATE(56)] = 1181,
  [SMALL_STATE(57)] = 1194,
  [SMALL_STATE(58)] = 1207,
  [SMALL_STATE(59)] = 1220,
  [SMALL_STATE(60)] = 1233,
  [SMALL_STATE(61)] = 1246,
  [SMALL_STATE(62)] = 1250,
  [SMALL_STATE(63)] = 1254,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, SHIFT_EXTRA(),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(56),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(59),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(36),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [17] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [19] = {.entry = {.count = 1, .reusable = false}}, SHIFT(43),
  [21] = {.entry = {.count = 1, .reusable = false}}, SHIFT(48),
  [23] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [25] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(43),
  [28] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(48),
  [31] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 2),
  [33] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__expression_list, 1),
  [35] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__expression_list, 1),
  [37] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [39] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [41] = {.entry = {.count = 1, .reusable = false}}, SHIFT_EXTRA(),
  [43] = {.entry = {.count = 1, .reusable = false}}, SHIFT(16),
  [45] = {.entry = {.count = 1, .reusable = false}}, SHIFT(28),
  [47] = {.entry = {.count = 1, .reusable = false}}, SHIFT(18),
  [49] = {.entry = {.count = 1, .reusable = false}}, SHIFT(61),
  [51] = {.entry = {.count = 1, .reusable = false}}, SHIFT(63),
  [53] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__expression, 1),
  [55] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__expression, 1),
  [57] = {.entry = {.count = 1, .reusable = false}}, SHIFT(30),
  [59] = {.entry = {.count = 1, .reusable = false}}, SHIFT(15),
  [61] = {.entry = {.count = 1, .reusable = false}}, SHIFT(34),
  [63] = {.entry = {.count = 1, .reusable = false}}, SHIFT(32),
  [65] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_string_literal, 3),
  [67] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_string_literal, 3),
  [69] = {.entry = {.count = 1, .reusable = false}}, SHIFT(62),
  [71] = {.entry = {.count = 1, .reusable = false}}, SHIFT(35),
  [73] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_raw_string_literal, 2),
  [75] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_raw_string_literal, 2),
  [77] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__expression_list, 2),
  [79] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__expression_list, 2),
  [81] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_proc_call, 4, .production_id = 9),
  [83] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_proc_call, 4, .production_id = 9),
  [85] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__expression_list_repeat1, 2),
  [87] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym__expression_list_repeat1, 2),
  [89] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__expression_list_repeat1, 2), SHIFT_REPEAT(7),
  [92] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__literal, 1),
  [94] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__literal, 1),
  [96] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_raw_string_literal, 3),
  [98] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_raw_string_literal, 3),
  [100] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym__mutlitline_comment_tail_repeat1, 2),
  [102] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym__mutlitline_comment_tail_repeat1, 2), SHIFT_REPEAT(27),
  [105] = {.entry = {.count = 1, .reusable = false}}, SHIFT(27),
  [107] = {.entry = {.count = 1, .reusable = false}}, SHIFT(12),
  [109] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value_declare, 3, .production_id = 4),
  [111] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_value_declare, 3, .production_id = 4),
  [113] = {.entry = {.count = 1, .reusable = true}}, SHIFT(4),
  [115] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [117] = {.entry = {.count = 1, .reusable = false}}, SHIFT(19),
  [119] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_raw_string_literal_repeat1, 2),
  [121] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_raw_string_literal_repeat1, 2), SHIFT_REPEAT(44),
  [124] = {.entry = {.count = 1, .reusable = false}}, SHIFT(13),
  [126] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_multiline_comment, 2),
  [128] = {.entry = {.count = 1, .reusable = false}}, SHIFT(26),
  [130] = {.entry = {.count = 1, .reusable = false}}, SHIFT(44),
  [132] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__mutlitline_comment_tail, 2),
  [134] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__mutlitline_comment_tail, 3),
  [136] = {.entry = {.count = 1, .reusable = false}}, SHIFT(20),
  [138] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [140] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [142] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [144] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value_declare, 5, .production_id = 8),
  [146] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_value_declare, 5, .production_id = 8),
  [148] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__top_level_statement, 1),
  [150] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__top_level_statement, 1),
  [152] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value_declare, 4, .production_id = 6),
  [154] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_value_declare, 4, .production_id = 6),
  [156] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 1),
  [158] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 1),
  [160] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_package_declaration, 2, .production_id = 1),
  [162] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_package_declaration, 2, .production_id = 1),
  [164] = {.entry = {.count = 1, .reusable = true}}, SHIFT(53),
  [166] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_raw_string_literal_repeat1, 1),
  [168] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__identifier_list_repeat1, 2),
  [170] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__identifier_list_repeat1, 2), SHIFT_REPEAT(57),
  [173] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_package_import, 2, .production_id = 2),
  [175] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_package_import, 2, .production_id = 2),
  [177] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__identifier_list, 2),
  [179] = {.entry = {.count = 1, .reusable = true}}, SHIFT(57),
  [181] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__identifier_list, 1),
  [183] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value_declare, 5, .production_id = 7),
  [185] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_value_declare, 5, .production_id = 7),
  [187] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value_declare, 4, .production_id = 5),
  [189] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_value_declare, 4, .production_id = 5),
  [191] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_package_import, 3, .production_id = 3),
  [193] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_package_import, 3, .production_id = 3),
  [195] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [197] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [199] = {.entry = {.count = 1, .reusable = true}}, SHIFT(42),
  [201] = {.entry = {.count = 1, .reusable = true}}, SHIFT(52),
  [203] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [205] = {.entry = {.count = 1, .reusable = false}}, SHIFT(54),
  [207] = {.entry = {.count = 1, .reusable = true}}, SHIFT(37),
  [209] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__mutlitline_comment_tail, 3),
  [211] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__mutlitline_comment_tail, 2),
  [213] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_multiline_comment, 2),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_odin(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .field_names = ts_field_names,
    .field_map_slices = ts_field_map_slices,
    .field_map_entries = ts_field_map_entries,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
