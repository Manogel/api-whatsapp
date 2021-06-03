start: 
	@echo "#######################"
	@echo "# Hot Reload application #"
	@echo "#######################"
	npx ts-node-dev -r tsconfig-paths/register --respawn --exit-child --ignore-watch node_modules src/main.ts

remove:
	@echo "#######################"
	@echo "# Running application #"
	@echo "#######################"
	docker-compose down -v

run:
	@echo "#######################"
	@echo "# Running application #"
	@echo "#######################"
	docker-compose up --remove-orphans

build:
	@echo "#######################"
	@echo "# Rebuilding application #"
	@echo "#######################"
	docker-compose up --b

