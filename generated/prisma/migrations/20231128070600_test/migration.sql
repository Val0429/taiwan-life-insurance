/*
  Warnings:

  - The primary key for the `Logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CorrelationId` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `Exception` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `Level` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `LogEvent` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `Message` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `ServiceName` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `TenantId` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `TimeStamp` on the `Logs` table. All the data in the column will be lost.
  - Added the required column `id` to the `Logs` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Logs'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Logs] (
    [id] INT NOT NULL IDENTITY(1,1),
    [message] NVARCHAR(max),
    [level] NVARCHAR(max),
    [timestamp] DATETIME,
    [exception] NVARCHAR(max),
    [log] NVARCHAR(max),
    [service] VARCHAR(200),
    [module] VARCHAR(200),
    [tenantId] NVARCHAR(1000),
    [relatedId] NVARCHAR(1000),
    CONSTRAINT [Logs_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[Logs])
    EXEC('INSERT INTO [dbo].[_prisma_new_Logs] () SELECT  FROM [dbo].[Logs] WITH (holdlock tablockx)');
DROP TABLE [dbo].[Logs];
EXEC SP_RENAME N'dbo._prisma_new_Logs', N'Logs';
COMMIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
