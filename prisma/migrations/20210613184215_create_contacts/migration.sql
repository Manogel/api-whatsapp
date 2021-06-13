-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "number" VARCHAR(100) NOT NULL,
    "alternativeName" VARCHAR(100),
    "lastMessageId" TEXT,
    "note" VARCHAR(200),
    "isMyContact" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);
