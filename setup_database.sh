python load_data.py
cd backend
./manage.py makemigrations blog
./manage.py migrate
./manage.py loaddata --exclude sessions --exclude contenttypes --exclude admin ../data.json
gunicorn backend.wsgi