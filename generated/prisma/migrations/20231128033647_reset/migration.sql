BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role1] NVARCHAR(1000) NOT NULL,
    [role2] NVARCHAR(1000),
    [role1Permission] INT,
    [role2Permission] INT,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Logs] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Message] NVARCHAR(max),
    [Level] NVARCHAR(max),
    [TimeStamp] DATETIME2,
    [Exception] NVARCHAR(max),
    [LogEvent] NVARCHAR(max),
    [ServiceName] VARCHAR(200),
    [TenantId] INT,
    [CorrelationId] INT,
    CONSTRAINT [Logs_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Logs_TenantId_key] UNIQUE NONCLUSTERED ([TenantId]),
    CONSTRAINT [Logs_CorrelationId_key] UNIQUE NONCLUSTERED ([CorrelationId])
);

-- CreateTable
CREATE TABLE [dbo].[TestVal] (
    [id] NVARCHAR(1000) NOT NULL,
    [testvnum] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TestVal_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TestValProfile] (
    [id] NVARCHAR(1000) NOT NULL,
    [testValId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TestValProfile_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [TestValProfile_testValId_key] UNIQUE NONCLUSTERED ([testValId])
);

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] NVARCHAR(1000) NOT NULL,
    [testValId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PropertyGroup] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertyGroup_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [reviewed] BIT NOT NULL,
    CONSTRAINT [PropertyGroup_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Property] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Property_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000) NOT NULL,
    [area] FLOAT(53) NOT NULL,
    [acquireDate] DATETIME2 NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [propertyGroupId] NVARCHAR(1000) NOT NULL,
    [reviewed] BIT NOT NULL,
    CONSTRAINT [Property_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PropertySlice] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertySlice_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [propertyId] NVARCHAR(1000) NOT NULL,
    [reviewed] BIT NOT NULL,
    CONSTRAINT [PropertySlice_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Customer] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Customer_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    CONSTRAINT [Customer_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Customer_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[PropertySliceContract] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PropertySliceContract_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [propertySliceId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [reviewed] BIT NOT NULL,
    CONSTRAINT [PropertySliceContract_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PropertySliceContract_propertySliceId_key] UNIQUE NONCLUSTERED ([propertySliceId])
);

-- AddForeignKey
ALTER TABLE [dbo].[TestValProfile] ADD CONSTRAINT [TestValProfile_testValId_fkey] FOREIGN KEY ([testValId]) REFERENCES [dbo].[TestVal]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_testValId_fkey] FOREIGN KEY ([testValId]) REFERENCES [dbo].[TestVal]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Property] ADD CONSTRAINT [Property_propertyGroupId_fkey] FOREIGN KEY ([propertyGroupId]) REFERENCES [dbo].[PropertyGroup]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PropertySlice] ADD CONSTRAINT [PropertySlice_propertyId_fkey] FOREIGN KEY ([propertyId]) REFERENCES [dbo].[Property]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PropertySliceContract] ADD CONSTRAINT [PropertySliceContract_propertySliceId_fkey] FOREIGN KEY ([propertySliceId]) REFERENCES [dbo].[PropertySlice]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PropertySliceContract] ADD CONSTRAINT [PropertySliceContract_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Customer]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
