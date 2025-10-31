ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE varchar(50);
ALTER TABLE "users" ADD COLUMN "password" varchar(255) NOT NULL;
ALTER TABLE "users" ADD CONSTRAINT "users_password_unique" UNIQUE("password");