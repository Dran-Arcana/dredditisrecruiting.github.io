.PHONY: build

clean:
	rm -rf _site dredditisrecruiting.com

build: clean
	jekyll build -d dredditisrecruiting.com

serve: 
	jekyll serve -P 8080
