/*
  Warnings:

  - You are about to drop the column `module` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `Logs` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Logs] DROP COLUMN [module],
[tenantId];
ALTER TABLE [dbo].[Logs] ADD [action] VARCHAR(200),
[auditerId] NVARCHAR(1000),
[context] VARCHAR(200);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
