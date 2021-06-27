-- CreateTable
CREATE TABLE "bot_messages" (
    "id" VARCHAR(200) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "message" TEXT NOT NULL,
    "isEntryFlow" BOOLEAN NOT NULL DEFAULT false,
    "isFinalFlow" BOOLEAN NOT NULL DEFAULT false,
    "extendsData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bot_message_flow" (
    "id" TEXT NOT NULL,
    "sourceMessageId" VARCHAR(200) NOT NULL,
    "targetMessageId" VARCHAR(200) NOT NULL,
    "mustBeEqualTo" VARCHAR(200) NOT NULL,
    "messageIfAnswerIsInvalidId" VARCHAR(200),
    "customMessageIfAnswerIsInvalid" TEXT,
    "extendsData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bot_message_flow" ADD FOREIGN KEY ("sourceMessageId") REFERENCES "bot_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot_message_flow" ADD FOREIGN KEY ("targetMessageId") REFERENCES "bot_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot_message_flow" ADD FOREIGN KEY ("messageIfAnswerIsInvalidId") REFERENCES "bot_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
