.PHONY: install run integ-test

default: run

install:
	pip install -r requirements.txt

run:
	cd app && uvicorn main:app --port=3000
	
integ-test:
	pytest test/integration_tests.py -s