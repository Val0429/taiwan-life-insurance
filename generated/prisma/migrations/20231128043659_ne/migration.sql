/*
  Warnings:

  - You are about to alter the column `TimeStamp` on the `Logs` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `DateTime`.
  - The `TenantId` column on the `Logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `CorrelationId` column on the `Logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Logs] DROP CONSTRAINT [Logs_CorrelationId_key];

-- DropIndex
ALTER TABLE [dbo].[Logs] DROP CONSTRAINT [Logs_TenantId_key];

-- AlterTable
ALTER TABLE [dbo].[Logs] ALTER COLUMN [TimeStamp] DATETIME NULL;
ALTER TABLE [dbo].[Logs] DROP COLUMN [TenantId],
[CorrelationId];
ALTER TABLE [dbo].[Logs] ADD [TenantId] UNIQUEIDENTIFIER,
[CorrelationId] UNIQUEIDENTIFIER;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
