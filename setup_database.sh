python load_data.py
cd backend
./manage.py makemigrations blog
./manage.py migrate
./manage.py loaddata ../data.json
gunicorn backend.wsgi