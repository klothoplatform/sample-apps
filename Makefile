.PHONY: npm-upgrade npm-audit npm-lock npm-install init npm-clean-deps \
		install-pipenv pipenv-install \
		init clean-outputs


# Installs any top-level dependencies required for maintaining sample apps
init:
	pip install pipenv; \
	npm install --save-dev npm-check

# Removes ./dist and ./compiled from all sample app directories
clean-outputs:
	find . -maxdepth 1 -type d \( ! -name . \) -not -path "./node_modules" -not -path "./.*" -exec bash -c "cd '{}' && pwd && rm -rf ./dist && rm -rf ./compiled" \;

# Uses npm-check to interactively upgrade dependencies on each sample app
npm-upgrade:
	find . -maxdepth 1 -type d \( ! -name . \) -not -path "./node_modules" -not -path "./.*" -exec bash -c "cd '{}' && pwd && npx npm-check -u" \;

# Runs npm audit on each sample app
npm-audit:
	find . -maxdepth 1 -type d \( ! -name . \) -not -path "./node_modules" -not -path "./.*" -exec bash -c "cd '{}' && pwd && npm audit" \;

# Updates existing package-lock.json files or creates them if they don't exist
npm-lock:
	find . -maxdepth 1 -type d \( ! -name . \) -not -path "./node_modules" -not -path "./.*" -exec bash -c "cd '{}' && pwd && npm install --package-lock-only" \;

# Installs dependencies for each sample app using "npm install"
npm-install:
	find . -maxdepth 1 -type d \( ! -name . \) -not -path "./node_modules" -not -path "./.*" -exec bash -c "cd '{}' && pwd && npm install" \;

# Removes node_modules directory from all sample-app directories (first-level children of the repo root)
npm-clean-deps:
	find . -maxdepth 1 -type d \( ! -name . \) -not -path "./node_modules" -not -path "./.*" -exec bash -c "cd '{}' && pwd && rm -rf ./node_modules" \;

# Installs requirements for each python sample app into a pipenv virtual environment from requirements.txt
pipenv-install:
	find . -maxdepth 1 -type d \( ! -name . \) -exec bash -c "cd '{}' && pipenv install -r requirements.txt" \;
