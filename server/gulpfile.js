'use strict';
const gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	eslint = require('gulp-eslint');

gulp.task('lint', () => {
	return gulp.src(['**/*.js', '!node_modules/**', '!app/**', '!examples/**'])
		.pipe(eslint({
			rules: {
				'no-alert': 0,
				'no-bitwise': 0,
				'camelcase': 1,
				'curly': 1,
				'eqeqeq': 0,
				'no-eq-null': 0,
				'guard-for-in': 1,
				'no-empty': 1,
				'no-use-before-define': 0,
				'no-obj-calls': 2,
				'no-unused-vars': 0,
				'new-cap': 1,
				'no-shadow': 0,
				'strict': 2,
				'no-invalid-regexp': 2,
				'comma-dangle': 2,
				'no-undef': 1,
				'no-new': 1,
				'no-extra-semi': 1,
				'no-debugger': 2,
				'no-caller': 1,
				'semi': 1,
				'quotes': 0,
				'no-unreachable': 2
			},
			envs: ['node', 'es6']
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('develop', ['lint'], () => {
	nodemon({
		script: 'bin/www',
		ext: 'js ejs coffee',
		stdout: true
	});
});

gulp.task('default', [
	'lint'
]);
