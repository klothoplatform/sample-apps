.PHONY: upgrade audit npm-lock npm-install init npm-clean-deps npm-clean-outputs

# Installs any top-level dependencies required for maintaining sample apps
init:
	npm install --save-dev npm-check

# Uses npm-check to interactively upgrade dependencies on each sample app
upgrade:
	find . -maxdepth 1 -type d \( ! -name . \) -not -path "./node_modules" -not -path "./.*" -exec bash -c "cd '{}' && pwd && npx npm-check -u" \;

# Runs npm audit on each sample app
audit:
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

# Removes ./dist and ./compiled from all sample app directories
clean-outputs:
	find . -maxdepth 1 -type d \( ! -name . \) -not -path "./node_modules" -not -path "./.*" -exec bash -c "cd '{}' && pwd && rm -rf ./dist && rm -rf ./compiled" \;
