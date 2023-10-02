.PHONY: build build-echo build-app build-admin serve


build: build-echo build-app build-admin

build-echo:
	@echo building dev

build-app:
	cd app && npm run build:dev

build-admin:
	cd admin && npm run build:dev

serve:
	cd admin && npm run serve:firebase:emulator
