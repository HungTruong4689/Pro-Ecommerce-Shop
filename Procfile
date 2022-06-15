release: python ./backend/manage.py migrate
web : gunicorn --chdir ./backend/backend backend.wsgi --log-file-