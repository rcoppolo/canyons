css:
	./styles/sassc ./styles/main.scss > ./styles/main.css

watch:
	watchman watch $(shell pwd)
	watchman -- trigger $(shell pwd) remake '*.css' '*.scss' -- make css
