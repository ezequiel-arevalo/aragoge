// Restablecer el proyecto a como está en el ultimo commit
git checkout -- .

// Para moverme entre ramas
git checkout <nombre-de-la-rama> o git switch <nombre-de-la-rama>
asdasd

// para borrar una rama
git branch -d <nombre-de-la-rama>

// para hacer un merge, me voy a la rama main y ejecuto esto, ese nombre de la rama es el que quiero incluir en mi main, en mi caso será dev-dev las cosas de dev-dev se incluiran en main
git merge <nombre-de-la-rama>

// para saber en que rama estoy
git branch
