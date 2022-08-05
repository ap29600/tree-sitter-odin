# tree-sitter-odin

## a `tree-sitter` grammar for [the Odin programming language](https://odin-lang.org)

## What is this?

[`tree-sitter`](https://tree-sitter.github.io/tree-sitter/) is a parser generator
tool. This grammar can be used to generate a parser for the Odin programming language
for the purpose of syntax highlighting and editor integration.

## Why use this over regex-based syntax highlighting?

`tree-sitter`-generated parsers are context-aware, which means that the highlighting
is more faithful to the actual meaning of the code, helping you catch syntax errors
at a glance.

Moreover, a capable editor can query `tree-sitter`'s output to give you better indentation
and incremental selection.

## How do I use this?

### Linux

#### Neovim

install the [`nvim-treesitter`](https://github.com/nvim-treesitter/nvim-treesitter) plugin
and add the following snippet to your neovim config:

```vim
lua << EOF

local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.odin = {
  install_info = {
    url = "path/to/tree-sitter-odin",
    files = {"src/parser.c"}
  },
  filetype = "odin",
}

EOF
```

as well as copying or symlinking the `queries/` directory of this repository to
`<your nvim config location>/queries/odin/`, and making sure that the `odin` filetype
is correctly detected by neovim.

#### Helix

Helix requires that you specify your syntaxes at compile-time, so you will need to clone
the helix repository.

Helix already ships with a different tree-sitter grammar for Odin; to use this one, modify
the `languages.scm` file in the helix repository and replace the lines:

``` toml
[[grammar]]
name = "odin"
source = { git = "https://github.com/MineBill/tree-sitter-odin", rev = "da885f4a387f169b9b69fe0968259ee257a8f69a" }
```

with

```toml
[[grammar]]
name = "odin"
source = { path = "path/to/tree-sitter-odin" }
```

as well as copying or symlinking the `queries/` directory of this repository to
`<your helix config location>/runtime/queries/odin/`; lastly rebuild helix from source.
