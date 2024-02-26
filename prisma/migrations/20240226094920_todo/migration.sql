-- CreateEnum
CREATE TYPE "TodoEnum" AS ENUM ('SIMPLE', 'SEQUENTIAL', 'SECTION');

-- CreateEnum
CREATE TYPE "PriorityEnum" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "User" (
    "_id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "_id" SERIAL NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "_id" SERIAL NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "created" DATE NOT NULL,
    "goalDate" DATE NOT NULL,
    "title" TEXT NOT NULL,
    "type" "TodoEnum" NOT NULL,
    "priority" "PriorityEnum" NOT NULL,
    "expectation" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "parentTodoId" INTEGER,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_parentTodoId_fkey" FOREIGN KEY ("parentTodoId") REFERENCES "Todo"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
