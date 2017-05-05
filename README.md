# convert-file-encoding
Converts a text file from an input-encoding (for example latin-1) to an output-encoding (for example utf-8)

This is a simple command-line tool running on nodejs, and it uses [iconv-lite](https://github.com/ashtuchkin/iconv-lite/) to do the actual processing.

It is fast and can work with very large files (gigabytes), without consuming a lot of memory.

The script also uses [command-line-args](https://github.com/75lb/command-line-args) for the parsing of the command options, and [command-line-usage](https://github.com/75lb/command-line-usage) for the display of usage help.
