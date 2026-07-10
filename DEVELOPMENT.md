npm install

docker compose up --build

docker compose exec backend npx prisma migrate dev

docker compose exec backend npx prisma generate

docker compose exec backend node prisma/seed.js

docker compose down

docker compose logs -f backend

docker compose logs -f frontend


Common debugging.

Permission issues

sudo chown -R $USER:$USER .

Delete node_modules

Delete .next

docker compose build --no-cache

docker compose up --build