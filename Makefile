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
