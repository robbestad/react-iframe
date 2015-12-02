BIN = ./node_modules/.bin
uglify = ./node_modules/.bin/uglifyjs

install link:
	@npm $@

lint:
	./node_modules/.bin/eslint index.jsx

patch: 
	lint
	@$(call release,patch)

minor: 
	@$(call lint) 
	@$(call release,minor)

major: 
	lint 
	@$(call release,major)

jsx: 
	@$(call lint)
	gulp	
	@$(uglify) index.js > dist/react-iframe.min.js

prepublish:
	@$(call jsx)
	@(sh bin/authors)
	@$(uglify) index.js > dist/react-iframe.min.js

commit:
	git commit -am "`npm view . version`" --allow-empty

publish:
	@$(call release,patch)
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
