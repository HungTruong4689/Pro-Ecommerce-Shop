release: python ./backend/manage.py migrate
web : gunicorn --log-file=- --chdir ./backend  backend.wsgi:application