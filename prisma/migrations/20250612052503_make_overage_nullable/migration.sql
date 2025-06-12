-- AlterTable
ALTER TABLE `Plan` MODIFY `overage_description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `age` INTEGER NULL,
    MODIFY `badge` INTEGER NULL,
    MODIFY `my_plan` INTEGER NULL,
    MODIFY `recommended_plan` INTEGER NULL;
