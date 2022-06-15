release: python ./backend/manage.py migrate
web : gunicorn --chdir ./backend/backend wsgi.py --log-file-