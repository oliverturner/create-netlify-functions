#!/usr/bin/env node
'use strict';

const argv = require('yargs').argv;
const fse = require('fs-extra');

const logRed = (...args) => console.log('\x1b[31m', ...args, '\x1b[0m');

const targetDirectory = argv._[0];

if (!targetDirectory) {
	logRed('No target directory was specified.');
	process.exit(1);
}

fse.pathExists(targetDirectory)
	.then(exists => {
		if (exists) {
			logRed(
				`${targetDirectory} already exists, please choose another destination`,
			);
			process.exit(1);
		} else {
			return fse.mkdirp(targetDirectory);
		}
	})
	.then(() => {
		console.log(`created ${targetDirectory}`);
process.exit(0);
	})
	.catch(error => {
		logRed(`Error creating ${targetDirectory}`, error);
		process.exit(1);
	});
