build:
	./node_modules/.bin/gulp

test:
	./node_modules/.bin/gulp
	@NODE_ENV=test ./node_modules/.bin/mocha

test-w:
	./node_modules/.bin/gulp
	@NODE_ENV=test ./node_modules/.bin/mocha -w

.PHONY: test test-w
