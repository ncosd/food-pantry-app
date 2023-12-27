.PHONY: build build-echo build-app build-admin serve
ENV?=dev



build: build-echo build-app build-admin

build-prod: ENV=prod
build-prod: build

build-echo:
	@echo building $(ENV)

build-app:
	cd app && npm run build:$(ENV)

build-admin:
	cd admin && npm run build:$(ENV)

serve:
	cd admin && npm run serve:firebase:emulator

release:
	gh release
