#!/usr/bin/env node

'use strict'
const fs = require('fs')
const iconvlite = require('iconv-lite')
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
 
/**
 * Converts a text file from an input-encoding (for example latin-1) to an output-encoding (for example utf-8).
 */
function convertFileEncoding(inputFilename, inputEncoding, outputFilename, outputEncoding) {
	fs.createReadStream(inputFilename)
		.pipe(iconvlite.decodeStream(inputEncoding))
		.pipe(iconvlite.encodeStream(outputEncoding))
		.pipe(fs.createWriteStream(outputFilename))
}

const optionsDefinitions = [
	{ name: 'inputFilename', alias: 'i', type: String, typeLabel: '[underline]{file}', description: 'The input file to read' },
	{ name: 'fromEncoding', alias: 'f', type: String, defaultValue: 'UTF-8', description: 'The input ([italic]{from}) encoding. Optional (defaults to UTF-8)' },
	{ name: 'toEncoding', alias: 't', type: String, defaultValue: 'UTF-8', description: 'The output ([italic]{to}) encoding. Optional (defaults to UTF-8)' },
	{ name: 'outputFilename', alias: 'o', type: String, typeLabel: '[underline]{file}', description: 'The output file to write' },
	{ name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide.' }
]

const options = commandLineArgs(optionsDefinitions)
//console.log(options)

if (!options.inputFilename || !options.outputFilename) {
	showUsage()
} else if (options.inputFilename === options.outputFilename) {
	console.error("The output file cannot be the same as the input file!")
} else {
	convertFileEncoding(options.inputFilename, options.inputEncoding,
						options.outputFilename, options.outputEncoding)
}

function showUsage() {
	const sections = [
	{
		header: 'Convert File Encoding',
		content: [
			'Converts the file "[italic]{inputFilename}" from an [italic]{inputEncoding} to an [italic]{outputEncoding}, writing the result to the file "[italic]{outputFilename}".',
			'It is fast and can work with very large files (gigabytes), without consuming a lot of memory.'
		]
	},
	{
		header: 'Synopsis',
		content: [
			'convertFileEncoding [[bold]{-f} [underline]{latin-1}] [[bold]{--t} [underline]{utf-8}] [bold]{-i} [underline]{file1} [bold]{-o} [underline]{file2}',
			'convertFileEncoding [[bold]{--fromEncoding} [underline]{latin-1}] [[bold]{--toEncoding} [underline]{utf-8}] [bold]{--inputFilename} [underline]{file1} [bold]{--outputFilename} [underline]{file2}'
		]
	},
	{
		header: 'Options',
		optionList: optionsDefinitions
	},
	{
		content: 'Project home: [underline]{https://github.com/sorin-postelnicu/convert-file-encoding/}'
	}
	]
	const usage = commandLineUsage(sections)
	console.log(usage)
}
