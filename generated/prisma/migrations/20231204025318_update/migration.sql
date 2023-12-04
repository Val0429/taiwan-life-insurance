/*
  Warnings:

  - You are about to drop the column `price` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `reviewed` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `reviewed` on the `PropertyGroup` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertySlice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertySliceContract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestVal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestValProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[auditParentId]` on the table `PropertyGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auditee` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level` on table `Logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `timestamp` on table `Logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `log` on table `Logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `service` on table `Logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `module` on table `Logs` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `amount` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auditee` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auditee` to the `PropertyGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `PropertyGroup` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [Post_testValId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Property] DROP CONSTRAINT [Property_propertyGroupId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PropertySlice] DROP CONSTRAINT [PropertySlice_propertyId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PropertySliceContract] DROP CONSTRAINT [PropertySliceContract_propertySliceId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PropertySliceContract] DROP CONSTRAINT [PropertySliceContract_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TestValProfile] DROP CONSTRAINT [TestValProfile_testValId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Customer] ALTER COLUMN [email] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Customer] ADD [auditee] BIT NOT NULL,
[mobile] NVARCHAR(1000) NOT NULL,
[phone] NVARCHAR(1000) NOT NULL,
[recycled] BIT NOT NULL CONSTRAINT [Customer_recycled_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[Logs] ALTER COLUMN [level] NVARCHAR(max) NOT NULL;
ALTER TABLE [dbo].[Logs] ALTER COLUMN [timestamp] DATETIME NOT NULL;
ALTER TABLE [dbo].[Logs] ALTER COLUMN [log] NVARCHAR(max) NOT NULL;
ALTER TABLE [dbo].[Logs] ALTER COLUMN [service] VARCHAR(200) NOT NULL;
ALTER TABLE [dbo].[Logs] ALTER COLUMN [module] VARCHAR(200) NOT NULL;
ALTER TABLE [dbo].[Logs] ADD [userId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Property] DROP COLUMN [price],
[reviewed];
ALTER TABLE [dbo].[Property] ADD [amount] INT NOT NULL,
[auditee] BIT NOT NULL,
[depreciationLife] FLOAT(53),
[depreciationRate] FLOAT(53),
[recycled] BIT NOT NULL CONSTRAINT [Property_recycled_df] DEFAULT 0,
[status] NVARCHAR(1000) NOT NULL CONSTRAINT [Property_status_df] DEFAULT 'Holding';

-- AlterTable
ALTER TABLE [dbo].[PropertyGroup] DROP COLUMN [reviewed];
ALTER TABLE [dbo].[PropertyGroup] ADD [auditDescribe] NVARCHAR(1000),
[auditParentId] NVARCHAR(1000),
[auditType] NVARCHAR(1000),
[auditee] BIT NOT NULL,
[recycled] BIT NOT NULL CONSTRAINT [PropertyGroup_recycled_df] DEFAULT 0,
[status] NVARCHAR(1000) NOT NULL CONSTRAINT [PropertyGroup_status_df] DEFAULT 'Holding',
[type] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [recycled] BIT NOT NULL CONSTRAINT [User_recycled_df] DEFAULT 0;

-- DropTable
DROP TABLE [dbo].[Post];

-- DropTable
DROP TABLE [dbo].[PropertySlice];

-- DropTable
DROP TABLE [dbo].[PropertySliceContract];

-- DropTable
DROP TABLE [dbo].[TestVal];

-- DropTable
DROP TABLE [dbo].[TestValProfile];

-- CreateTable
CREATE TABLE [dbo].[Files] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Files_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [fileName] NVARCHAR(1000) NOT NULL,
    [fileSize] INT NOT NULL,
    [contentType] NVARCHAR(1000) NOT NULL,
    [filePath] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [isPublic] BIT,
    [incomeAndExpenseDetailId] NVARCHAR(1000),
    [propertyId] NVARCHAR(1000),
    [propertyEquipmentId] NVARCHAR(1000),
    [propertyRentalUnitId] NVARCHAR(1000),
    [propertyRentalContractId] NVARCHAR(1000),
    [propertyEquipmentMaintanceDetailId] NVARCHAR(1000),
    CONSTRAINT [Files_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IncomeAndExpenseCategory] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [IncomeAndExpenseCategory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [loopPeriod] NVARCHAR(1000),
    [isDefault] BIT NOT NULL CONSTRAINT [IncomeAndExpenseCategory_isDefault_df] DEFAULT 0,
    [recycled] BIT NOT NULL CONSTRAINT [IncomeAndExpenseCategory_recycled_df] DEFAULT 0,
    CONSTRAINT [IncomeAndExpenseCategory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IncomeAndExpenseSubject] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [IncomeAndExpenseSubject_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [categoryId] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [loopPeriod] NVARCHAR(1000),
    [loopLife] FLOAT(53),
    [propertyId] NVARCHAR(1000) NOT NULL,
    [propertyRentalContractId] NVARCHAR(1000) NOT NULL,
    [propertyEquipmentRepairRequestId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [IncomeAndExpenseSubject_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IncomeAndExpenseDetail] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [IncomeAndExpenseDetail_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [amount] INT NOT NULL,
    [description] NVARCHAR(1000),
    [executionDate] DATETIME2,
    [isPending] BIT NOT NULL,
    [incomeAndExpenseSubjectId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [IncomeAndExpenseDetail_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PropertyEquipmentMaintanceSubject] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertyEquipmentMaintanceSubject_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [loopPeriod] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [propertyEquipmentMaintanceVendorId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PropertyEquipmentMaintanceSubject_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PropertyEquipmentMaintanceDetail] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertyEquipmentMaintanceDetail_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [description] NVARCHAR(1000),
    [executionDate] DATETIME2,
    [isPending] BIT NOT NULL,
    [propertyEquipmentMaintanceSubjectId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PropertyEquipmentMaintanceDetail_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PropertyEquipment] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertyEquipment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [serial] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [acquireDate] DATETIME2 NOT NULL,
    [propertyEquipmentMaintanceSubjectId] NVARCHAR(1000) NOT NULL,
    [propertyId] NVARCHAR(1000) NOT NULL,
    [propertyRentalUnitId] NVARCHAR(1000),
    [recycled] BIT NOT NULL CONSTRAINT [PropertyEquipment_recycled_df] DEFAULT 0,
    [auditee] BIT NOT NULL,
    CONSTRAINT [PropertyEquipment_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PropertyEquipment_propertyEquipmentMaintanceSubjectId_key] UNIQUE NONCLUSTERED ([propertyEquipmentMaintanceSubjectId])
);

-- CreateTable
CREATE TABLE [dbo].[PropertyRentalUnit] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertyRentalUnit_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [PropertyRentalUnit_status_df] DEFAULT 'Pending',
    [address] NVARCHAR(1000),
    [area] FLOAT(53) NOT NULL,
    [contactName] NVARCHAR(1000) NOT NULL,
    [contactEmail] NVARCHAR(1000) NOT NULL,
    [contactPhone] NVARCHAR(1000) NOT NULL,
    [contactMobile] NVARCHAR(1000) NOT NULL,
    [amount] INT,
    [isDefault] BIT NOT NULL CONSTRAINT [PropertyRentalUnit_isDefault_df] DEFAULT 0,
    [propertyId] NVARCHAR(1000) NOT NULL,
    [recycled] BIT NOT NULL CONSTRAINT [PropertyRentalUnit_recycled_df] DEFAULT 0,
    [auditee] BIT NOT NULL,
    CONSTRAINT [PropertyRentalUnit_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PropertyRentalContract] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertyRentalContract_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [amount] INT NOT NULL,
    [rentalPeriod] INT NOT NULL,
    [rentalStartDate] DATETIME2 NOT NULL,
    [rentalEndDate] DATETIME2 NOT NULL,
    [rentFreePeriod] INT NOT NULL,
    [rentFreeEndDate] DATETIME2 NOT NULL,
    [specialTerms] NVARCHAR(1000),
    [propertyRentalUnitId] NVARCHAR(1000) NOT NULL,
    [customerId] NVARCHAR(1000) NOT NULL,
    [recycled] BIT NOT NULL CONSTRAINT [PropertyRentalContract_recycled_df] DEFAULT 0,
    [auditee] BIT NOT NULL,
    CONSTRAINT [PropertyRentalContract_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PropertyRentalContract_propertyRentalUnitId_key] UNIQUE NONCLUSTERED ([propertyRentalUnitId])
);

-- CreateTable
CREATE TABLE [dbo].[PropertyEquipmentRepairRequest] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertyEquipmentRepairRequest_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [propertyEquipmentId] NVARCHAR(1000) NOT NULL,
    [customerId] NVARCHAR(1000) NOT NULL,
    [recycled] BIT NOT NULL CONSTRAINT [PropertyEquipmentRepairRequest_recycled_df] DEFAULT 0,
    CONSTRAINT [PropertyEquipmentRepairRequest_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PropertyEquipmentMaintanceVendor] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertyEquipmentMaintanceVendor_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [serialNumber] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [contactName] NVARCHAR(1000) NOT NULL,
    [contactEmail] NVARCHAR(1000) NOT NULL,
    [contactPhone] NVARCHAR(1000) NOT NULL,
    [contactMobile] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [recycled] BIT NOT NULL CONSTRAINT [PropertyEquipmentMaintanceVendor_recycled_df] DEFAULT 0,
    [auditee] BIT NOT NULL,
    CONSTRAINT [PropertyEquipmentMaintanceVendor_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PropertyEquipmentPartsInventory] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertyEquipmentPartsInventory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [items] INT NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [propertyId] NVARCHAR(1000),
    [recycled] BIT NOT NULL CONSTRAINT [PropertyEquipmentPartsInventory_recycled_df] DEFAULT 0,
    [auditee] BIT NOT NULL,
    CONSTRAINT [PropertyEquipmentPartsInventory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
ALTER TABLE [dbo].[PropertyGroup] ADD CONSTRAINT [PropertyGroup_auditParentId_key] UNIQUE NONCLUSTERED ([auditParentId]);

-- AddForeignKey
ALTER TABLE [dbo].[Files] ADD CONSTRAINT [Files_incomeAndExpenseDetailId_fkey] FOREIGN KEY ([incomeAndExpenseDetailId]) REFERENCES [dbo].[IncomeAndExpenseDetail]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Files] ADD CONSTRAINT [Files_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[Property]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Files] ADD CONSTRAINT [Files_propertyEquipmentId_fkey] FOREIGN KEY ([propertyEquipmentId]) REFERENCES [dbo].[PropertyEquipment]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Files] ADD CONSTRAINT [Files_propertyRentalUnitId_fkey] FOREIGN KEY ([propertyRentalUnitId]) REFERENCES [dbo].[PropertyRentalUnit]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Files] ADD CONSTRAINT [Files_propertyRentalContractId_fkey] FOREIGN KEY ([propertyRentalContractId]) REFERENCES [dbo].[PropertyRentalContract]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Files] ADD CONSTRAINT [Files_propertyEquipmentMaintanceDetailId_fkey] FOREIGN KEY ([propertyEquipmentMaintanceDetailId]) REFERENCES [dbo].[PropertyEquipmentMaintanceDetail]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[IncomeAndExpenseSubject] ADD CONSTRAINT [IncomeAndExpenseSubject_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[IncomeAndExpenseCategory]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IncomeAndExpenseSubject] ADD CONSTRAINT [IncomeAndExpenseSubject_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[Property]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IncomeAndExpenseSubject] ADD CONSTRAINT [IncomeAndExpenseSubject_propertyRentalContractId_fkey] FOREIGN KEY ([propertyRentalContractId]) REFERENCES [dbo].[PropertyRentalContract]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IncomeAndExpenseSubject] ADD CONSTRAINT [IncomeAndExpenseSubject_propertyEquipmentRepairRequestId_fkey] FOREIGN KEY ([propertyEquipmentRepairRequestId]) REFERENCES [dbo].[PropertyEquipmentRepairRequest]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IncomeAndExpenseDetail] ADD CONSTRAINT [IncomeAndExpenseDetail_incomeAndExpenseSubjectId_fkey] FOREIGN KEY ([incomeAndExpenseSubjectId]) REFERENCES [dbo].[IncomeAndExpenseSubject]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyEquipmentMaintanceSubject] ADD CONSTRAINT [PropertyEquipmentMaintanceSubject_propertyEquipmentMaintanceVendorId_fkey] FOREIGN KEY ([propertyEquipmentMaintanceVendorId]) REFERENCES [dbo].[PropertyEquipmentMaintanceVendor]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyEquipmentMaintanceDetail] ADD CONSTRAINT [PropertyEquipmentMaintanceDetail_propertyEquipmentMaintanceSubjectId_fkey] FOREIGN KEY ([propertyEquipmentMaintanceSubjectId]) REFERENCES [dbo].[PropertyEquipmentMaintanceSubject]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyGroup] ADD CONSTRAINT [PropertyGroup_auditParentId_fkey] FOREIGN KEY ([auditParentId]) REFERENCES [dbo].[PropertyGroup]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Property] ADD CONSTRAINT [Property_propertyGroupId_fkey] FOREIGN KEY ([propertyGroupId]) REFERENCES [dbo].[PropertyGroup]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyEquipment] ADD CONSTRAINT [PropertyEquipment_propertyEquipmentMaintanceSubjectId_fkey] FOREIGN KEY ([propertyEquipmentMaintanceSubjectId]) REFERENCES [dbo].[PropertyEquipmentMaintanceSubject]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyEquipment] ADD CONSTRAINT [PropertyEquipment_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[Property]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyEquipment] ADD CONSTRAINT [PropertyEquipment_propertyRentalUnitId_fkey] FOREIGN KEY ([propertyRentalUnitId]) REFERENCES [dbo].[PropertyRentalUnit]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyRentalUnit] ADD CONSTRAINT [PropertyRentalUnit_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[Property]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyRentalContract] ADD CONSTRAINT [PropertyRentalContract_propertyRentalUnitId_fkey] FOREIGN KEY ([propertyRentalUnitId]) REFERENCES [dbo].[PropertyRentalUnit]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyRentalContract] ADD CONSTRAINT [PropertyRentalContract_customerId_fkey] FOREIGN KEY ([customerId]) REFERENCES [dbo].[Customer]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyEquipmentRepairRequest] ADD CONSTRAINT [PropertyEquipmentRepairRequest_propertyEquipmentId_fkey] FOREIGN KEY ([propertyEquipmentId]) REFERENCES [dbo].[PropertyEquipment]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyEquipmentRepairRequest] ADD CONSTRAINT [PropertyEquipmentRepairRequest_customerId_fkey] FOREIGN KEY ([customerId]) REFERENCES [dbo].[Customer]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PropertyEquipmentPartsInventory] ADD CONSTRAINT [PropertyEquipmentPartsInventory_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[Property]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
