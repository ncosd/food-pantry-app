.PHONY: build build-echo build-app build-admin serve release pr
ENV?=dev
VERSION?=$(shell grep version admin/src/config.js | tr -d " " | tr -d "version:" | tr -d \" | tr -d \,)

build: build-echo build-app build-admin

build-prod: ENV=production
build-prod: build

build-echo:
	@echo building $(ENV)

build-app:
	cd app && npm run build -- -m $(ENV)

build-admin:
	cd admin && npm run build -- -m $(ENV)

serve:
	cd admin && npm run serve:firebase:emulator

release:
	gh release create v${VERSION}

pr:
	gh pr create --base dev-$(VERSION) --fill
