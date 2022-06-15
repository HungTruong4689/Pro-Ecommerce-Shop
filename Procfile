release: python --chdir ./backend manage.py migrate
web : gunicorn --chdir ./backend backend.wsgi --log-file-