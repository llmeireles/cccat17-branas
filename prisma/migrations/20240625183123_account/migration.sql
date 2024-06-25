-- CreateTable
CREATE TABLE "account" (
    "account_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "car_plate" TEXT NOT NULL,
    "is_passenger" BOOLEAN NOT NULL DEFAULT false,
    "is_driver" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "account_pkey" PRIMARY KEY ("account_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");
