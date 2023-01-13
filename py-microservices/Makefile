.PHONY: install run integ-test

default: run

install:
	pip install -r requirements.txt

run:
	uvicorn app.main:app --port=3000

integ-test:
	pytest test/integration_tests.py
