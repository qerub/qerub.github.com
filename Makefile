.PHONY: all defsoftware-utils.js main.js

all: defsoftware-utils.js main.js

defsoftware-utils.js: defsoftware-utils.ts
	tsc --declarations -sourcemap defsoftware-utils.ts

main.js: main.ts
	tsc -sourcemap main.ts
