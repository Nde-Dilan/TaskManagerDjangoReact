# My Notes
#### django-cors-headers est une bibliothèque Django utilisée en combinaison avec Django REST framework pour gérer les problèmes de CORS (Cross-Origin Resource Sharing) lors du développement d'API. CORS est un mécanisme de sécurité du navigateur qui impose des restrictions sur les requêtes HTTP effectuées à partir d'un domaine (origine) différent de celui de l'API. Lorsque vous développez une API RESTful, vous devrez peut-être permettre à d'autres domaines d'accéder à vos ressources API, par exemple, lorsque vous construisez une application front-end distincte qui communique avec votre API.


ajouter ceci dans `settings.py` pour éviter les erreurs avec CROSS:

`Python

CORS_ORIGIN_WHITELIST  = (
    'http://localhost:3000'
)`


### Creation d'une API

# Les Serializers

Pour convertir les ORM models en JSON formats permettant ainsi au frontend de mieux manipuler les datas.

Lors de la création d'API avec Django REST framework, les "serializers" sont des composants clés qui permettent de convertir des données complexes, telles que des objets Django (modèles) ou des dictionnaires Python, en un format de données standardisé, généralement JSON, XML ou d'autres formats, et vice versa. Ils jouent un rôle essentiel dans le processus de sérialisation et de désérialisation des données entre les modèles Django et les réponses HTTP de votre API.

#Les Routers inside rest_framework

*router.register(r'tasks', views.TaskView, 'task')
Cette ligne enregistre une vue (ou classe de vue) appelée TaskView avec le routeur. Plus précisément, elle associe cette vue à l'URL tasks dans le routeur et utilise la chaîne 'task' comme nom pour cette route.

'tasks' est le préfixe de l'URL. Ainsi, les vues de votre TaskView seront disponibles sous des URLs comme /api/tasks/.
views.TaskView est la classe de vue que vous enregistrez avec le routeur. Cela signifie que le routeur générera automatiquement des URL pour les actions CRUD (par exemple, /api/tasks/ pour la liste de tâches, /api/tasks/<id>/ pour la récupération d'une tâche particulière, etc.).


'task' est le nom de cette route spécifique. Vous pouvez utiliser ce nom pour référencer cette route dans votre code, par exemple, pour générer des URL inverses.


###En résumé, ces trois lignes de code configurent un routeur dans Django REST framework, enregistrent une vue (TaskView) avec ce routeur, et définissent comment les URL pour cette vue seront construites et nommées. Cette approche simplifie considérablement la création de points de terminaison API en évitant d'avoir à définir manuellement les URL pour chaque action de vue.

Apres avoir crée l'API qui peut envoyer et faire les operations CRUD il est temps de passé au front end.


#Backend To Frontend Avec AXIOS
