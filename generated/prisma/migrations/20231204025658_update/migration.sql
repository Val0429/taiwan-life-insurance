BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Logs] ALTER COLUMN [module] VARCHAR(200) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH