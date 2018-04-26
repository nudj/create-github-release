APP:=create-github-release
IMAGE:=nudj/$(APP):latest
IMAGEDEV:=nudj/$(APP):development
CWD=$(shell pwd)

.PHONY: build buildLocal run

buildDev:
	@docker build \
		-t $(IMAGEDEV) \
		.

run:
	@docker run --rm \
		-v $(CWD)/src/index.js:/usr/src/index.js \
		--env-file $(CWD)/.env \
		$(IMAGEDEV) \
		node /usr/src/index.js nudj/web

build:
	@docker build \
		-t $(IMAGE) \
		.

push:
	@docker push $(IMAGE)
