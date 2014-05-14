.PHONY: all defsoftware-utils.js main.js

TSC = node_modules/.bin/tsc

all: defsoftware-utils.js main.js

defsoftware-utils.js: defsoftware-utils.ts
	$(TSC) --declaration -sourcemap defsoftware-utils.ts

main.js: main.ts
	$(TSC) -sourcemap main.ts
