-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "usedId" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_usedId_fkey" FOREIGN KEY ("usedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
