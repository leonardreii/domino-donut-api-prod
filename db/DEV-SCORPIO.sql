USE [master]
GO
/****** Object:  Database [dev-scorpio]    Script Date: 09-Nov-17 2:49:54 PM ******/
CREATE DATABASE [dev-scorpio]
GO
ALTER DATABASE [dev-scorpio] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [dev-scorpio].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [dev-scorpio] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [dev-scorpio] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [dev-scorpio] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [dev-scorpio] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [dev-scorpio] SET ARITHABORT OFF 
GO
ALTER DATABASE [dev-scorpio] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [dev-scorpio] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [dev-scorpio] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [dev-scorpio] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [dev-scorpio] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [dev-scorpio] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [dev-scorpio] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [dev-scorpio] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [dev-scorpio] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [dev-scorpio] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [dev-scorpio] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [dev-scorpio] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [dev-scorpio] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [dev-scorpio] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [dev-scorpio] SET  MULTI_USER 
GO
ALTER DATABASE [dev-scorpio] SET DB_CHAINING OFF 
GO
ALTER DATABASE [dev-scorpio] SET QUERY_STORE = ON
GO
ALTER DATABASE [dev-scorpio] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 7), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 10, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO)
GO
USE [dev-scorpio]
GO
/****** Object:  Sequence [dbo].[MI_SDIP_SEQ]    Script Date: 09-Nov-17 2:49:55 PM ******/
CREATE SEQUENCE [dbo].[MI_SDIP_SEQ] 
 AS [bigint]
 START WITH 46656
 INCREMENT BY 1
 MINVALUE 46656
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Sequence [dbo].[TBL_CITY_SEQ]    Script Date: 09-Nov-17 2:49:55 PM ******/
CREATE SEQUENCE [dbo].[TBL_CITY_SEQ] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Sequence [dbo].[TBL_CORP_HIERARCHY_SEQ]    Script Date: 09-Nov-17 2:49:55 PM ******/
CREATE SEQUENCE [dbo].[TBL_CORP_HIERARCHY_SEQ] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Sequence [dbo].[TBL_CORPORATE_SEQ]    Script Date: 09-Nov-17 2:49:55 PM ******/
CREATE SEQUENCE [dbo].[TBL_CORPORATE_SEQ] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Sequence [dbo].[TBL_DISTRICT_SEQ]    Script Date: 09-Nov-17 2:49:55 PM ******/
CREATE SEQUENCE [dbo].[TBL_DISTRICT_SEQ] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Sequence [dbo].[TBL_DRIVER_SEQ]    Script Date: 09-Nov-17 2:49:55 PM ******/
CREATE SEQUENCE [dbo].[TBL_DRIVER_SEQ] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Sequence [dbo].[TBL_EMPLOYEE_SEQ]    Script Date: 09-Nov-17 2:49:55 PM ******/
CREATE SEQUENCE [dbo].[TBL_EMPLOYEE_SEQ] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Sequence [dbo].[TBL_ORDER_SEQ]    Script Date: 09-Nov-17 2:49:56 PM ******/
CREATE SEQUENCE [dbo].[TBL_ORDER_SEQ] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Sequence [dbo].[TBL_ROLE_SEQ]    Script Date: 09-Nov-17 2:49:56 PM ******/
CREATE SEQUENCE [dbo].[TBL_ROLE_SEQ] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  Sequence [dbo].[TBL_USER_SEQ]    Script Date: 09-Nov-17 2:49:56 PM ******/
CREATE SEQUENCE [dbo].[TBL_USER_SEQ] 
 AS [bigint]
 START WITH 1
 INCREMENT BY 1
 MINVALUE -9223372036854775808
 MAXVALUE 9223372036854775807
 CACHE 
GO
/****** Object:  UserDefinedFunction [dbo].[FN_BASE36]    Script Date: 09-Nov-17 2:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[FN_BASE36]
(
    @Val BIGINT
)
RETURNS VARCHAR(13)
AS
BEGIN
    DECLARE
		@Result VARCHAR(9) = ''

    IF (@Val <= 0)
    BEGIN
        RETURN '0'
    END

    WHILE (@Val > 0)
    BEGIN
        SELECT @Result = CHAR(@Val % 36 + CASE WHEN @Val % 36 < 10 THEN 48 ELSE 55 END) + @Result,
               @Val = FLOOR(@Val/36)
    END

    RETURN @Result
END


GO
/****** Object:  UserDefinedFunction [dbo].[fn_Split]    Script Date: 09-Nov-17 2:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[fn_Split](@sText varchar(max), @sDelim varchar(20) = ' ')
RETURNS @retArray TABLE (idx smallint Primary Key, value varchar(max))
AS
BEGIN
DECLARE @idx smallint,
	@value varchar(max),
	@bcontinue bit,
	@iStrike smallint,
	@iDelimlength tinyint

IF @sDelim = 'Space'
	BEGIN
	SET @sDelim = ' '
	END

SET @idx = 0
SET @sText = LTrim(RTrim(@sText))
SET @iDelimlength = DATALENGTH(@sDelim)
SET @bcontinue = 1

IF NOT ((@iDelimlength = 0) or (@sDelim = 'Empty'))
	BEGIN
	WHILE @bcontinue = 1
		BEGIN

--If you can find the delimiter in the text, retrieve the first element and
--insert it with its index into the return table.
 
		IF CHARINDEX(@sDelim, @sText)>0
			BEGIN
			SET @value = SUBSTRING(@sText,1, CHARINDEX(@sDelim,@sText)-1)
				BEGIN
				INSERT @retArray (idx, value)
				VALUES (@idx, @value)
				END
			
--Trim the element and its delimiter from the front of the string.
			--Increment the index and loop.
SET @iStrike = DATALENGTH(@value) + @iDelimlength
			SET @idx = @idx + 1
			SET @sText = LTrim(Right(@sText,DATALENGTH(@sText) - @iStrike))
		
			END
		ELSE
			BEGIN
--If you can�t find the delimiter in the text, @sText is the last value in
--@retArray.
 SET @value = @sText
				BEGIN
				INSERT @retArray (idx, value)
				VALUES (@idx, @value)
				END
			--Exit the WHILE loop.
SET @bcontinue = 0
			END
		END
	END
ELSE
	BEGIN
	WHILE @bcontinue=1
		BEGIN
		--If the delimiter is an empty string, check for remaining text
		--instead of a delimiter. Insert the first character into the
		--retArray table. Trim the character from the front of the string.
--Increment the index and loop.
		IF DATALENGTH(@sText)>1
			BEGIN
			SET @value = SUBSTRING(@sText,1,1)
				BEGIN
				INSERT @retArray (idx, value)
				VALUES (@idx, @value)
				END
			SET @idx = @idx+1
			SET @sText = SUBSTRING(@sText,2,DATALENGTH(@sText)-1)
			
			END
		ELSE
			BEGIN
			--One character remains.
			--Insert the character, and exit the WHILE loop.
			INSERT @retArray (idx, value)
			VALUES (@idx, @sText)
			SET @bcontinue = 0	
			END
	END

END

RETURN
END

GO
/****** Object:  Table [dbo].[MI_INVENTORY]    Script Date: 09-Nov-17 2:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MI_INVENTORY](
	[ID] [varchar](15) NOT NULL,
	[ISDELETED] [int] NULL,
	[CREATED_DATE] [datetime] NULL,
	[CREATED_BY] [varchar](15) NULL,
	[LAST_MODIFIED_DATE] [datetime] NULL,
	[LAST_MODIFIED_BY] [varchar](15) NULL,
	[REGION_ID] [varchar](15) NULL,
	[TYPE] [varchar](15) NULL,
	[NAME] [varchar](100) NULL,
	[ADDRESS] [varchar](150) NULL,
	[ZIP_CODE] [varchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[table1]    Script Date: 09-Nov-17 2:50:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[table1](
	[nama] [char](100) NULL,
	[age] [int] NULL
)

GO
/****** Object:  Table [dbo].[TBL_CAR]    Script Date: 09-Nov-17 2:50:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CAR](
	[PLATE_NO] [varchar](10) NOT NULL,
	[CAR_DETAILS] [varchar](100) NULL,
	[CAPACITY] [int] NULL,
	[RATING] [float] NULL,
	[CREATED_DATE] [datetime] NULL,
	[CREATED_BY] [varchar](15) NULL,
	[LAST_MODIFIED_DATE] [datetime] NULL,
	[LAST_MODIFIED_BY] [varchar](15) NULL,
	[ISDELETED] [int] NULL,
	[PAIR_STATUS] [varchar](20) NULL,
	[ORDER_QTY] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[PLATE_NO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[TBL_CAR_USAGE]    Script Date: 09-Nov-17 2:50:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CAR_USAGE](
	[PLATE_NO] [varchar](10) NOT NULL,
	[DRIVER_ID] [varchar](15) NOT NULL,
	[START_DATE] [datetime] NOT NULL,
	[END_DATE] [datetime] NULL,
	[ISDELETED] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[PLATE_NO] ASC,
	[DRIVER_ID] ASC,
	[START_DATE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[TBL_CITY]    Script Date: 09-Nov-17 2:50:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CITY](
	[CITY_ID] [varchar](15) NOT NULL,
	[CITY_NAME] [varchar](100) NULL,
	[ISDELETED] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[CITY_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[TBL_CORP_HIERARCHY]    Script Date: 09-Nov-17 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CORP_HIERARCHY](
	[HIERARCHY_ID] [varchar](15) NOT NULL,
	[HIERARCHY_NAME] [varchar](100) NULL,
	[ISDELETED] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[HIERARCHY_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[TBL_CORPORATE]    Script Date: 09-Nov-17 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CORPORATE](
	[CORPORATE_ID] [varchar](15) NOT NULL,
	[HIERARCHY_ID] [varchar](15) NULL,
	[PARENT_ID] [varchar](15) NULL,
	[CORPORATE_NAME] [varchar](500) NULL,
	[ADDRESS] [varchar](500) NULL,
	[POSTAL_CODE] [char](5) NULL,
	[CREATED_DATE] [datetime] NULL,
	[CREATED_BY] [varchar](15) NULL,
	[LAST_MODIFIED_DATE] [datetime] NULL,
	[LAST_MODIFIED_BY] [varchar](15) NULL,
	[ISDELETED] [int] NULL,
	[CITY_ID] [varchar](15) NULL,
	[PHONE] [varchar](20) NULL,
	[EMAIL] [varchar](100) NULL,
	[EMPLOYEE_QTY] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[CORPORATE_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[TBL_DISTRICT]    Script Date: 09-Nov-17 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_DISTRICT](
	[DISTRICT_ID] [varchar](15) NOT NULL,
	[DISTRICT_NAME] [varchar](100) NULL,
	[CITY_ID] [varchar](15) NULL,
	[ISDELETED] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[DISTRICT_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[TBL_DRIVER]    Script Date: 09-Nov-17 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_DRIVER](
	[DRIVER_ID] [varchar](15) NOT NULL,
	[FIRST_NAME] [varchar](25) NULL,
	[LAST_NAME] [varchar](25) NULL,
	[NIK] [char](16) NULL,
	[EMAIL] [varchar](345) NULL,
	[PHONE_NUMBER] [varchar](13) NULL,
	[PASSWORD] [varchar](100) NULL,
	[RATING] [float] NULL,
	[STATUS] [varchar](15) NULL,
	[CREATED_DATE] [datetime] NULL,
	[CREATED_BY] [varchar](15) NULL,
	[LAST_MODIFIED_DATE] [datetime] NULL,
	[LAST_MODIFIED_BY] [varchar](15) NULL,
	[ISDELETED] [int] NULL,
	[ORDER_QTY] [int] NULL,
	[socket_id] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[DRIVER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[TBL_EMPLOYEE]    Script Date: 09-Nov-17 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_EMPLOYEE](
	[EMPLOYEE_ID] [varchar](15) NOT NULL,
	[SUPERVISOR_ID] [varchar](15) NULL,
	[CORPORATE_ID] [varchar](15) NULL,
	[NIK] [char](16) NULL,
	[FIRST_NAME] [varchar](25) NULL,
	[LAST_NAME] [varchar](25) NULL,
	[PHONE_NUMBER] [varchar](13) NULL,
	[EMAIL] [varchar](345) NULL,
	[PASSWORD] [varchar](100) NULL,
	[CREATED_DATE] [datetime] NULL,
	[CREATED_BY] [varchar](15) NULL,
	[LAST_MODIFIED_DATE] [datetime] NULL,
	[LAST_MODIFIED_BY] [varchar](15) NULL,
	[ISDELETED] [int] NULL,
	[socket_id] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[EMPLOYEE_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[TBL_ORDER]    Script Date: 09-Nov-17 2:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_ORDER](
	[ORDER_ID] [varchar](15) NOT NULL,
	[ORDER_DATE] [datetime] NULL,
	[EMPLOYEE_ID] [varchar](15) NULL,
	[DRIVER_ID] [varchar](15) NULL,
	[PLATE_NO] [varchar](10) NULL,
	[PICKUP_DATE] [datetime] NULL,
	[ARRIVAL_DATE] [datetime] NULL,
	[PICKUP_LOCATION] [varchar](500) NULL,
	[PICKUP_LAT] [float] NULL,
	[PICKUP_LNG] [float] NULL,
	[DESTINATION_NAME] [varchar](500) NULL,
	[DESTINATION_LAT] [float] NULL,
	[DESTINATION_LNG] [float] NULL,
	[TRAVEL_DISTANCE] [float] NULL,
	[DRIVER_RATING] [float] NULL,
	[CAR_RATING] [float] NULL,
	[SERVICE_RATING] [float] NULL,
	[ORDER_STATUS] [varchar](15) NULL,
	[ISDELETED] [int] NULL,
	[CREATED_DATE] [datetime] NULL,
	[CREATED_BY] [varchar](15) NULL,
	[LAST_MODIFIED_DATE] [datetime] NULL,
	[LAST_MODIFIED_BY] [varchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[ORDER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[TBL_ROLE]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_ROLE](
	[ROLE_ID] [varchar](15) NOT NULL,
	[ROLE_NAME] [varchar](100) NULL,
	[CREATED_DATE] [datetime] NULL,
	[CREATED_BY] [varchar](15) NULL,
	[LAST_MODIFIED_DATE] [datetime] NULL,
	[LAST_MODIFIED_BY] [varchar](15) NULL,
	[ISDELETED] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ROLE_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[TBL_USER]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_USER](
	[USER_ID] [varchar](15) NOT NULL,
	[PASSWORD] [varchar](100) NULL,
	[ROLE_ID] [varchar](15) NULL,
	[LAST_LOGIN_DATE] [datetime] NULL,
	[CREATED_DATE] [datetime] NULL,
	[CREATED_BY] [varchar](15) NULL,
	[LAST_MODIFIED_DATE] [datetime] NULL,
	[LAST_MODIFIED_BY] [varchar](15) NULL,
	[ISDELETED] [int] NULL,
	[EMAIL] [varchar](345) NULL,
	[FIRST_NAME] [varchar](100) NULL,
	[LAST_NAME] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[USER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
ALTER TABLE [dbo].[MI_INVENTORY] ADD  CONSTRAINT [MI_INVENTORY_PK]  DEFAULT (CONVERT([varchar],[dbo].[FN_BASE36](NEXT VALUE FOR [MI_SDIP_SEQ]))) FOR [ID]
GO
ALTER TABLE [dbo].[MI_INVENTORY] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[MI_INVENTORY] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
ALTER TABLE [dbo].[MI_INVENTORY] ADD  DEFAULT (getdate()) FOR [LAST_MODIFIED_DATE]
GO
ALTER TABLE [dbo].[TBL_CAR] ADD  CONSTRAINT [TBL_CAR_RATING_DEFAULT]  DEFAULT ((0)) FOR [RATING]
GO
ALTER TABLE [dbo].[TBL_CAR] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
ALTER TABLE [dbo].[TBL_CAR] ADD  DEFAULT (getdate()) FOR [LAST_MODIFIED_DATE]
GO
ALTER TABLE [dbo].[TBL_CAR] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_CAR] ADD  DEFAULT ((0)) FOR [ORDER_QTY]
GO
ALTER TABLE [dbo].[TBL_CAR_USAGE] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_CITY] ADD  CONSTRAINT [TBL_CITY_PK]  DEFAULT ('CITY'+CONVERT([varchar],NEXT VALUE FOR [TBL_CITY_SEQ])) FOR [CITY_ID]
GO
ALTER TABLE [dbo].[TBL_CITY] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_CORP_HIERARCHY] ADD  CONSTRAINT [TBL_CORP_HIERARCHY_PK]  DEFAULT ('H'+CONVERT([varchar],NEXT VALUE FOR [TBL_CORP_HIERARCHY_SEQ])) FOR [HIERARCHY_ID]
GO
ALTER TABLE [dbo].[TBL_CORP_HIERARCHY] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_CORPORATE] ADD  CONSTRAINT [TBL_CORPORATE_PK]  DEFAULT ('CORP'+CONVERT([varchar],NEXT VALUE FOR [TBL_CORPORATE_SEQ])) FOR [CORPORATE_ID]
GO
ALTER TABLE [dbo].[TBL_CORPORATE] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
ALTER TABLE [dbo].[TBL_CORPORATE] ADD  DEFAULT (getdate()) FOR [LAST_MODIFIED_DATE]
GO
ALTER TABLE [dbo].[TBL_CORPORATE] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_DISTRICT] ADD  CONSTRAINT [TBL_DISTRICT_PK]  DEFAULT ('DIST'+CONVERT([varchar],NEXT VALUE FOR [TBL_DISTRICT_SEQ])) FOR [DISTRICT_ID]
GO
ALTER TABLE [dbo].[TBL_DISTRICT] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_DRIVER] ADD  CONSTRAINT [TBL_DRIVER_PK]  DEFAULT ('DRV'+CONVERT([varchar],NEXT VALUE FOR [TBL_DRIVER_SEQ])) FOR [DRIVER_ID]
GO
ALTER TABLE [dbo].[TBL_DRIVER] ADD  CONSTRAINT [TBL_DRIVER_RATING_DEFAULT]  DEFAULT ((0)) FOR [RATING]
GO
ALTER TABLE [dbo].[TBL_DRIVER] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
ALTER TABLE [dbo].[TBL_DRIVER] ADD  DEFAULT (getdate()) FOR [LAST_MODIFIED_DATE]
GO
ALTER TABLE [dbo].[TBL_DRIVER] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_DRIVER] ADD  CONSTRAINT [TBL_DRIVER_ORDER_QTY_DEFAULT]  DEFAULT ((0)) FOR [ORDER_QTY]
GO
ALTER TABLE [dbo].[TBL_EMPLOYEE] ADD  CONSTRAINT [TBL_EMPLOYEE_PK]  DEFAULT ('EMP'+CONVERT([varchar],NEXT VALUE FOR [TBL_EMPLOYEE_SEQ])) FOR [EMPLOYEE_ID]
GO
ALTER TABLE [dbo].[TBL_EMPLOYEE] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
ALTER TABLE [dbo].[TBL_EMPLOYEE] ADD  DEFAULT (getdate()) FOR [LAST_MODIFIED_DATE]
GO
ALTER TABLE [dbo].[TBL_EMPLOYEE] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_ORDER] ADD  CONSTRAINT [TBL_ORDER_PK]  DEFAULT ('ORD'+CONVERT([varchar],NEXT VALUE FOR [TBL_ORDER_SEQ])) FOR [ORDER_ID]
GO
ALTER TABLE [dbo].[TBL_ORDER] ADD  DEFAULT (getdate()) FOR [ORDER_DATE]
GO
ALTER TABLE [dbo].[TBL_ORDER] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_ROLE] ADD  CONSTRAINT [TBL_ROLE_PK]  DEFAULT ('ROLE'+CONVERT([varchar],NEXT VALUE FOR [TBL_ROLE_SEQ])) FOR [ROLE_ID]
GO
ALTER TABLE [dbo].[TBL_ROLE] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
ALTER TABLE [dbo].[TBL_ROLE] ADD  DEFAULT (getdate()) FOR [LAST_MODIFIED_DATE]
GO
ALTER TABLE [dbo].[TBL_ROLE] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_USER] ADD  CONSTRAINT [TBL_USER_PK]  DEFAULT ('USR'+CONVERT([varchar],NEXT VALUE FOR [TBL_USER_SEQ])) FOR [USER_ID]
GO
ALTER TABLE [dbo].[TBL_USER] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
ALTER TABLE [dbo].[TBL_USER] ADD  DEFAULT (getdate()) FOR [LAST_MODIFIED_DATE]
GO
ALTER TABLE [dbo].[TBL_USER] ADD  DEFAULT ((0)) FOR [ISDELETED]
GO
ALTER TABLE [dbo].[TBL_CAR_USAGE]  WITH CHECK ADD FOREIGN KEY([DRIVER_ID])
REFERENCES [dbo].[TBL_DRIVER] ([DRIVER_ID])
GO
ALTER TABLE [dbo].[TBL_CAR_USAGE]  WITH CHECK ADD FOREIGN KEY([PLATE_NO])
REFERENCES [dbo].[TBL_CAR] ([PLATE_NO])
GO
ALTER TABLE [dbo].[TBL_CORPORATE]  WITH CHECK ADD FOREIGN KEY([HIERARCHY_ID])
REFERENCES [dbo].[TBL_CORP_HIERARCHY] ([HIERARCHY_ID])
GO
ALTER TABLE [dbo].[TBL_CORPORATE]  WITH CHECK ADD FOREIGN KEY([PARENT_ID])
REFERENCES [dbo].[TBL_CORPORATE] ([CORPORATE_ID])
GO
ALTER TABLE [dbo].[TBL_DISTRICT]  WITH CHECK ADD FOREIGN KEY([CITY_ID])
REFERENCES [dbo].[TBL_CITY] ([CITY_ID])
GO
ALTER TABLE [dbo].[TBL_EMPLOYEE]  WITH CHECK ADD FOREIGN KEY([CORPORATE_ID])
REFERENCES [dbo].[TBL_CORPORATE] ([CORPORATE_ID])
GO
ALTER TABLE [dbo].[TBL_EMPLOYEE]  WITH CHECK ADD FOREIGN KEY([SUPERVISOR_ID])
REFERENCES [dbo].[TBL_EMPLOYEE] ([EMPLOYEE_ID])
GO
ALTER TABLE [dbo].[TBL_ORDER]  WITH CHECK ADD FOREIGN KEY([DRIVER_ID])
REFERENCES [dbo].[TBL_DRIVER] ([DRIVER_ID])
GO
ALTER TABLE [dbo].[TBL_ORDER]  WITH CHECK ADD FOREIGN KEY([EMPLOYEE_ID])
REFERENCES [dbo].[TBL_EMPLOYEE] ([EMPLOYEE_ID])
GO
ALTER TABLE [dbo].[TBL_ORDER]  WITH CHECK ADD FOREIGN KEY([PLATE_NO])
REFERENCES [dbo].[TBL_CAR] ([PLATE_NO])
GO
ALTER TABLE [dbo].[TBL_USER]  WITH CHECK ADD FOREIGN KEY([ROLE_ID])
REFERENCES [dbo].[TBL_ROLE] ([ROLE_ID])
GO
ALTER TABLE [dbo].[TBL_CITY]  WITH CHECK ADD CHECK  (([CITY_ID] like 'CITY%'))
GO
ALTER TABLE [dbo].[TBL_CORP_HIERARCHY]  WITH CHECK ADD CHECK  (([HIERARCHY_ID] like 'H%'))
GO
ALTER TABLE [dbo].[TBL_CORPORATE]  WITH CHECK ADD CHECK  (([CORPORATE_ID] like 'CORP%'))
GO
ALTER TABLE [dbo].[TBL_DISTRICT]  WITH CHECK ADD CHECK  (([DISTRICT_ID] like 'DIST%'))
GO
ALTER TABLE [dbo].[TBL_DRIVER]  WITH CHECK ADD CHECK  (([DRIVER_ID] like 'DRV%'))
GO
ALTER TABLE [dbo].[TBL_EMPLOYEE]  WITH CHECK ADD CHECK  (([EMPLOYEE_ID] like 'EMP%'))
GO
ALTER TABLE [dbo].[TBL_ORDER]  WITH CHECK ADD CHECK  (([ORDER_ID] like 'ORD%'))
GO
ALTER TABLE [dbo].[TBL_ROLE]  WITH CHECK ADD CHECK  (([ROLE_ID] like 'ROLE%'))
GO
ALTER TABLE [dbo].[TBL_USER]  WITH CHECK ADD CHECK  (([USER_ID] like 'USR%'))
GO
/****** Object:  StoredProcedure [dbo].[car_add]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[car_add] @plate_no varchar(max), @car_details varchar(max), @capacity int, @created_by varchar(max)
AS
BEGIN TRY
	IF EXISTS (SELECT plate_no FROM tbl_car WHERE plate_no = @plate_no)
		THROW 56002, 'Plate number already exist', 1;
	INSERT INTO tbl_car(plate_no, car_details,
						capacity, created_by, last_modified_by)
				values(@plate_no, @car_details,
						@capacity, @created_by, @created_by)
	SELECT 0 as status, 'OK' as result;
END TRY 

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[car_driver_pairing]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[car_driver_pairing]
	@pcarid varchar(15),
	@pdriverid varchar(15)
AS
BEGIN
	SET NOCOUNT ON;

    BEGIN TRY
		IF (@pcarid IS NULL OR @pcarid = '' OR @pdriverid IS NULL OR @pdriverid = '')
			THROW 53003, 'Invalid parameters - Unit Management',1;

		IF NOT EXISTS (SELECT * FROM DBO.TBL_CAR WHERE PLATE_NO = @pcarid)
			THROW 53004, 'Car is not exists',1;

		IF NOT EXISTS (SELECT * FROM DBO.TBL_DRIVER WHERE DRIVER_ID = @pdriverid)
			THROW 53002, 'Driver is not exists',1;

		IF EXISTS (SELECT * FROM DBO.TBL_CAR_USAGE WHERE PLATE_NO = @pcarid AND END_DATE IS NULL)
			THROW 53006, 'Car is still paired with another driver',1;

		IF EXISTS (SELECT * FROM DBO.TBL_CAR WHERE PLATE_NO = @pcarid AND UPPER(PAIR_STATUS) = 'PAIRED')
			THROW 53006, 'Car is still paired with another driver',1;

		IF EXISTS (SELECT * FROM DBO.TBL_CAR_USAGE WHERE DRIVER_ID = @pdriverid AND END_DATE IS NULL)
			THROW 53005, 'Driver is still paired with another car',1;

		INSERT DBO.TBL_CAR_USAGE (PLATE_NO, DRIVER_ID, START_DATE)
		VALUES (@pcarid, @pdriverid, CURRENT_TIMESTAMP);

		UPDATE DBO.TBL_CAR
		SET PAIR_STATUS = 'PAIRED'
		WHERE PLATE_NO = @pcarid;

		SELECT 'OK' AS result;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber,@message AS ErrorMessage;
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[car_edit]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[car_edit] @plate_no varchar(max), @car_details varchar(max), @capacity int, @last_modified_by varchar(max)
AS
BEGIN TRY
	IF NOT EXISTS (SELECT plate_no FROM tbl_car WHERE plate_no = @plate_no AND isdeleted = 0)
		THROW 56003, 'Car is not exist', 1;
	UPDATE tbl_car
	SET car_details = @car_details,
		capacity = @capacity,
		last_modified_by = @last_modified_by,
		last_modified_date = getDate()
	WHERE plate_no = @plate_no
	SELECT 0 as status, 'OK' as result;
END TRY 
BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber, @message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[car_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[car_get]
	@pcarname varchar(100),
	@pplateno varchar(10),
	@pcapacity int, 
	@ppairstatus varchar(20)
AS
BEGIN TRY
	IF(@pcarname IS NULL) SET @pcarname = '';
	IF(@pplateno IS NULL) SET @pplateno = '';
	IF(@pcapacity IS NULL) SET @pcapacity = -1;
	IF(@ppairstatus IS NULL) SET @ppairstatus = '';

	SET @pcarname = UPPER(@pcarname);
	SET @pplateno = UPPER(@pplateno);
	SET @ppairstatus = UPPER(@ppairstatus);

	SELECT CAR_DETAILS, PLATE_NO, CAPACITY, RATING, PAIR_STATUS
	FROM DBO.TBL_CAR
	WHERE	UPPER(CAR_DETAILS) LIKE '%'+@pcarname+'%'
		AND UPPER(PLATE_NO) LIKE '%'+@pplateno+'%'
		AND CAPACITY LIKE CASE @pcapacity WHEN -1 THEN '%%' ELSE CAST(@pcapacity as varchar(20)) END
		AND UPPER(PAIR_STATUS) LIKE '%'+@ppairstatus+'%'
		AND ISDELETED = 0;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH



GO
/****** Object:  StoredProcedure [dbo].[city_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[city_get]
AS
BEGIN TRY
	SELECT CITY_ID, CITY_NAME
	FROM DBO.TBL_CITY
	WHERE ISDELETED = 0;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH



GO
/****** Object:  StoredProcedure [dbo].[corporate_add]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[corporate_add]
	@pcorporatename varchar(500),
	@paddress varchar(500),
	@ppostalcode varchar(5),
	@pcityid varchar(100),
	@pemail varchar(100), 
	@pphonenumber varchar(20)
AS
BEGIN TRY
	IF (@pcorporatename IS NULL OR @pcorporatename = '' OR @paddress IS NULL OR @paddress = '' OR
		@pcityid IS NULL OR @pcityid = '' OR @pemail IS NULL OR @pemail = '' OR
		@pphonenumber IS NULL OR @pphonenumber = '' OR @ppostalcode IS NULL OR @ppostalcode = '')
		THROW 54001, 'Invalid parameters - Corporate',1;

	IF EXISTS (SELECT * FROM DBO.TBL_CORPORATE WHERE UPPER(CORPORATE_NAME) = UPPER(@pcorporatename) AND ISDELETED = 0)
		THROW 54002, 'Corporate name is already exists',1;

	INSERT INTO DBO.TBL_CORPORATE (CORPORATE_NAME, ADDRESS, CITY_ID, POSTAL_CODE, PHONE, EMAIL, CREATED_DATE, CREATED_BY, LAST_MODIFIED_DATE, LAST_MODIFIED_BY, ISDELETED)
	VALUES (@pcorporatename, @paddress, @pcityid, @ppostalcode, @pphonenumber, @pemail, CURRENT_TIMESTAMP, '0-1', CURRENT_TIMESTAMP, '0-1', 0);

	SELECT 'OK' AS result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH


GO
/****** Object:  StoredProcedure [dbo].[corporate_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[corporate_get]
	@pcorporatename varchar(500),
	@plocation varchar(100),
	@pemail varchar(100), 
	@pphonenumber varchar(20)
AS
BEGIN TRY
	IF (@pcorporatename IS NULL) SET @pcorporatename = '';
	IF (@plocation IS NULL) SET @plocation = '';
	IF (@pemail IS NULL) SET @pemail = '';
	IF (@pphonenumber IS NULL) SET @pphonenumber = '';

	SET @pcorporatename = UPPER(@pcorporatename);
	SET @plocation = UPPER(@plocation);
	SET @pemail = UPPER(@pemail);
	SET @pphonenumber = UPPER(@pphonenumber);

	SELECT A.CORPORATE_ID, A.CORPORATE_NAME, A.ADDRESS, C.CITY_NAME, A.PHONE, A.EMAIL, A.EMPLOYEE_QTY
	FROM DBO.TBL_CORPORATE A
		LEFT JOIN DBO.TBL_CITY C ON A.CITY_ID = C.CITY_ID
	WHERE	UPPER(A.CORPORATE_NAME) LIKE '%'+@pcorporatename+'%'
		AND UPPER(C.CITY_NAME) LIKE '%'+@plocation+'%'
		AND UPPER(A.PHONE) LIKE '%'+@pphonenumber+'%'
		AND UPPER(A.EMAIL) LIKE '%'+@pemail+'%'
		AND A.ISDELETED = 0;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[corporate_getdetail]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[corporate_getdetail]
	@pcorporateid varchar(15)
AS
BEGIN
	SET NOCOUNT ON;

	IF (@pcorporateid IS NULL OR @pcorporateid = '')
		THROW 54001, 'Invalid parameters - Corporate',1;

    BEGIN TRY
		IF EXISTS (SELECT * FROM DBO.TBL_CORPORATE WHERE CORPORATE_ID = @pcorporateid AND ISDELETED = 0)
			BEGIN
				SELECT A.CORPORATE_ID, A.CORPORATE_NAME, A.ADDRESS, A.CITY_ID, A.PHONE, A.EMAIL, A.EMPLOYEE_QTY
				FROM DBO.TBL_CORPORATE A
				WHERE	A.CORPORATE_ID = @pcorporateid
					AND A.ISDELETED = 0;
			END
		ELSE
			BEGIN
				THROW 54003, 'Corporate is not exists',1;
			END
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END



GO
/****** Object:  StoredProcedure [dbo].[corporate_update]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[corporate_update]
	@pcorporateid varchar(15),
	@pcorporatename varchar(500),
	@paddress varchar(500),
	@ppostalcode varchar(5),
	@pcityid varchar(100),
	@pemail varchar(100), 
	@pphonenumber varchar(20),
	@pmodifiedby varchar(15)
AS
BEGIN TRY
	IF (@pcorporatename IS NULL OR @pcorporatename = '' OR @paddress IS NULL OR @paddress = '' OR
		@pcityid IS NULL OR @pcityid = '' OR @pemail IS NULL OR @pemail = '' OR
		@pphonenumber IS NULL OR @pphonenumber = '' OR @ppostalcode IS NULL OR @ppostalcode = '' OR
		@pcorporateid IS NULL OR @pcorporateid = '' OR @pmodifiedby IS NULL OR @pmodifiedby = '')
		THROW 54001, 'Invalid parameters - Corporate',1;

	IF NOT EXISTS (SELECT * FROM DBO.TBL_CORPORATE WHERE CORPORATE_ID = @pcorporateid AND ISDELETED = 0)
		THROW 54003, 'Corporate is not exists',1;

	UPDATE DBO.TBL_CORPORATE
	SET	CORPORATE_NAME = @pcorporatename,
		ADDRESS = @paddress,
		CITY_ID = @pcityid,
		POSTAL_CODE = @ppostalcode,
		PHONE = @pphonenumber,
		EMAIL = @pemail,
		LAST_MODIFIED_DATE = CURRENT_TIMESTAMP,
		LAST_MODIFIED_BY = @pmodifiedby
	WHERE CORPORATE_ID = @pcorporateid;

	SELECT 'OK' AS result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH



GO
/****** Object:  StoredProcedure [dbo].[customer_history]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[customer_history] @employee_id varchar(max)
AS
BEGIN TRY
	SELECT * FROM tbl_order
	WHERE employee_id = @employee_id;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[driver_add]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[driver_add] @first_name varchar(max), @last_name varchar(max), @nik varchar(max), 
			@email varchar(max), @phone_number varchar(max), @password varchar(max),
			@created_by varchar(max)
AS
BEGIN TRY
	INSERT INTO tbl_driver(first_name, last_name, nik,
							email, phone_number, password,
							status, created_by, last_modified_by)
	values(@first_name, @last_name, @nik,
			@email, @phone_number, @password,
			'inactive', @created_by, @created_by)
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[driver_delete]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[driver_delete] @driver_id varchar(max)
AS
BEGIN TRY
	IF NOT EXISTS (SELECT driver_id FROM tbl_driver WHERE driver_id = @driver_id AND isdeleted = 0)
		THROW 53003, 'Driver is not exist', 1;
	UPDATE tbl_driver
	SET ISDELETED = 1
	WHERE driver_id = @driver_id;
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[driver_edit]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[driver_edit] @driver_id varchar(max), @first_name varchar(max), @last_name varchar(max), @nik varchar(max), 
			@email varchar(max), @phone_number varchar(max), @password varchar(max),
			@last_modified_by varchar(max)
AS
BEGIN TRY
	IF NOT EXISTS (SELECT driver_id FROM tbl_driver WHERE driver_id = @driver_id AND isdeleted = 0)
		THROW 53003, 'Driver is not exist', 1;
	UPDATE tbl_driver
	SET first_name = @first_name,
		last_name = @last_name,
		nik = @nik,
		email = @email,
		phone_number = @phone_number,
		password = @password,
		last_modified_by = @last_modified_by,
		last_modified_date = getDate()
	WHERE driver_id = @driver_id
	AND isdeleted = 0;
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[driver_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[driver_get] @first_name varchar(max), @last_name varchar(max), @nik varchar(max), 
			@email varchar(max), @phone_number varchar(max), @status varchar(max)
AS
BEGIN TRY
	SET @first_name = LOWER(@first_name);
	SET @last_name = LOWER(@last_name);
	SET @nik = LOWER(@nik);
	SET @email = LOWER(@email);
	SET @phone_number = LOWER(@phone_number);
	SET @status = LOWER(@status);

	IF (LOWER(@status) = 'all')
		SELECT driver_id, first_name, last_name, nik, email, phone_number, rating,
				FORMAT(created_date,'dd/MM/yyyy hh:mm:ss','en-US') AS 'created_date', created_by, 
				FORMAT(last_modified_date,'dd/MM/yyyy hh:mm:ss','en-US') AS 'last_modified_date',last_modified_by
		FROM tbl_driver
		WHERE LOWER(first_name) LIKE '%'+@first_name+'%'
		AND LOWER(last_name) LIKE '%'+@last_name+'%'
		AND LOWER(nik) LIKE '%'+@nik+'%'
		AND LOWER(email) LIKE '%'+@email+'%'
		AND LOWER(phone_number )LIKE '%'+@phone_number+'%'
		AND isdeleted = 0;
	ELSE
		SELECT driver_id, first_name, last_name, nik, email, phone_number, rating,
				FORMAT(created_date,'dd/MM/yyyy hh:mm:ss','en-US') AS 'created_date', created_by, 
				FORMAT(last_modified_date,'dd/MM/yyyy hh:mm:ss','en-US') AS 'last_modified_date',last_modified_by
		FROM tbl_driver
		WHERE LOWER(first_name) LIKE '%'+@first_name+'%'
		AND LOWER(last_name) LIKE '%'+@last_name+'%'
		AND LOWER(nik) LIKE '%'+@nik+'%'
		AND LOWER(email) LIKE '%'+@email+'%'
		AND LOWER(phone_number )LIKE '%'+@phone_number+'%'
		AND LOWER(status) =  @status
		AND isdeleted = 0;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[driver_getdetail]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[driver_getdetail]
	@pdriverid varchar(15)
AS
BEGIN
	SET NOCOUNT ON;

    BEGIN TRY
		IF EXISTS (SELECT * FROM DBO.TBL_DRIVER WHERE DRIVER_ID = @pdriverid AND ISDELETED = 0)
			BEGIN
				SELECT DRIVER_ID, FIRST_NAME, LAST_NAME, NIK, EMAIL, PHONE_NUMBER, RATING, STATUS
				FROM DBO.TBL_DRIVER
				WHERE	DRIVER_ID = @pdriverid
					AND ISDELETED = 0;
			END
		ELSE
			BEGIN
				THROW 53002, 'Driver is not exists',1;
			END
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[driver_getdetails]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[driver_getdetails] @driver_id varchar(max)
AS
BEGIN TRY
	IF NOT EXISTS (SELECT driver_id FROM tbl_driver WHERE driver_id = @driver_id AND isdeleted = 0)
		THROW 53003, 'Driver not assigned to any car yet', 1;
	SELECT d.driver_id, d.first_name, d.last_name, d.phone_number, d.rating, cu.plate_no, d.socket_id
	FROM tbl_driver d JOIN tbl_car_usage cu
	ON d.driver_id = cu.driver_id
	WHERE d.driver_id = @driver_id
	AND cu.end_date IS NULL
	AND d.isdeleted = 0
	AND cu.isdeleted = 0

	IF @@ROWCOUNT = 0
		THROW 53007, 'Driver not assigned yet to any car', 1;
END TRY 
BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[employee_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[employee_get]
	@pname varchar(25),
	@pnik varchar(16),
	@pemail varchar(345), 
	@pphonenumber varchar(13),
	@pcorporatename varchar(500)
AS
BEGIN TRY
	IF (@pname IS NULL) SET @pname = '';
	IF (@pnik IS NULL) SET @pnik = '';
	IF (@pemail IS NULL) SET @pemail = '';
	IF (@pphonenumber IS NULL) SET @pphonenumber = '';
	IF (@pcorporatename IS NULL) SET @pcorporatename = '';

	SET @pname = UPPER(@pname);
	SET @pnik = UPPER(@pnik);
	SET @pemail = UPPER(@pemail);
	SET @pphonenumber = UPPER(@pphonenumber);
	SET @pcorporatename = UPPER(@pcorporatename);

	SELECT E.EMPLOYEE_ID, E.FIRST_NAME, E.LAST_NAME, E.FIRST_NAME + ' ' + E.LAST_NAME AS FULL_NAME, E.NIK, E.PHONE_NUMBER, E.EMAIL, C.CORPORATE_NAME
	FROM DBO.TBL_EMPLOYEE E
		LEFT JOIN DBO.TBL_CORPORATE C ON E.CORPORATE_ID = C.CORPORATE_ID
	WHERE	(UPPER(E.FIRST_NAME) LIKE '%'+@pname+'%' OR UPPER(E.LAST_NAME) LIKE '%'+@pname+'%')
		AND UPPER(E.NIK) LIKE '%'+@pnik+'%'
		AND UPPER(E.PHONE_NUMBER) LIKE '%'+@pphonenumber+'%'
		AND UPPER(E.EMAIL) LIKE '%'+@pemail+'%'
		AND UPPER(C.CORPORATE_NAME) LIKE '%'+@pcorporatename+'%'
		AND E.ISDELETED = 0;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH



GO
/****** Object:  StoredProcedure [dbo].[employee_getdetails]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[employee_getdetails] @employee_id varchar(max)
AS
BEGIN TRY
	SELECT e.first_name, e.last_name, e.phone_number, e.email, c.corporate_name
	FROM tbl_employee e JOIN tbl_corporate c
	ON e.corporate_id = c.corporate_id
	WHERE employee_id = @employee_id
	AND e.isdeleted=0;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[employee_makeorder]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[employee_makeorder] @employee_id varchar(max), 
					@pickup_location varchar(max), @pickup_lat double precision, @pickup_lng double precision,
					@destination_name varchar(max), @destination_lat double precision, @destination_lng double precision
AS

BEGIN TRY
	DECLARE @order_date datetime;
	DECLARE @order_id varchar(max);
	SET @order_date = getDate();

	INSERT INTO tbl_order(employee_id,order_date,
							pickup_location, pickup_lat, pickup_lng,
							destination_name, destination_lat, destination_lng)
				values(@employee_id,@order_date,
						@pickup_location, @pickup_lat, @pickup_lng,
						@destination_name, @destination_lat, @destination_lng);

	SELECT @order_id = order_id
	FROM tbl_order
	WHERE order_date = @order_date;

	SELECT @order_id AS order_id;
END TRY 

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[login]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[login] @email varchar(max), @password varchar(max)
AS
BEGIN TRY
	IF @email = '' OR @password = ''
		THROW 51002, '[DB] Invalid Parameter',1;

	IF EXISTS(SELECT * FROM [dbo].[MI_USER]
				WHERE email = @email 
				AND password = @password
				AND isdeleted = 0)
		SELECT 0 as status, 'OK' as result;
	ELSE
		THROW 51003, '[DB] Invalid Email or Password',1;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[login_driver]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[login_driver]
@Email varchar(345),
@Password varchar(100)
AS   
    SET NOCOUNT ON;
	begin try
	if(@Email is null or @Email = '' or @Password is null or @Password = '')
		THROW 50000, 'Invalid Parameter',1;
    select * from dbo.tbl_driver where Email = @Email and [password] = @Password;
	end try
	begin catch
		declare @error int, @message varchar(4000), @state int;
        set @error = ERROR_NUMBER();
		set @message = ERROR_MESSAGE()
		set @state = ERROR_STATE();
		PRINT @state;
		select @error as ErrorNumber,@message as ErrorMessage;
	end catch

GO
/****** Object:  StoredProcedure [dbo].[login_employee]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[login_employee]
@Email varchar(345),
@Password varchar(100)
AS   
    SET NOCOUNT ON;
	begin try
	if(@Email is null or @Email = '' or @Password is null or @Password = '')
		THROW 50000, 'Invalid Parameter',1;
    select * from dbo.tbl_employee where Email = @Email and [password] = @Password;
	end try
	begin catch
		declare @error int, @message varchar(4000), @state int;
        set @error = ERROR_NUMBER();
		set @message = ERROR_MESSAGE()
		set @state = ERROR_STATE();
		PRINT @state;
		select @error as ErrorNumber,@message as ErrorMessage;
	end catch

GO
/****** Object:  StoredProcedure [dbo].[login_web]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[login_web]
@Email varchar(345),
@Password varchar(100)
AS   
    SET NOCOUNT ON;
	begin try
	if(@Email is null or @Email = '' or @Password is null or @Password = '')
		THROW 50000, 'Invalid Parameter',1;
    if EXISTS (select * from dbo.tbl_user where email = @Email and [password] = @Password)
		update dbo.tbl_user set last_login_date = CURRENT_TIMESTAMP,last_modified_by = user_id where email = @Email and [password] = @Password;
	select * from dbo.tbl_user where email = @Email and [password] = @Password;
	end try
	begin catch
		declare @error int, @message varchar(4000), @state int;
        set @error = ERROR_NUMBER();
		set @message = ERROR_MESSAGE()
		set @state = ERROR_STATE();
		PRINT @state;
		select @error as ErrorNumber,@message as ErrorMessage;
	end catch

GO
/****** Object:  StoredProcedure [dbo].[mi_branch_create]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_branch_create]
	@name varchar(max),
	@address varchar(max), @zip_code varchar(max), 
	@phone_number varchar(max),
	@region_id varchar(max),
	@created_by varchar(max)
AS

BEGIN TRY
	INSERT INTO mi_branch(name,
							address, zip_code,
							phone_number,
							region_id,
							created_by,last_modified_by)
					VALUES(@name, 
							@address, @zip_code,
							@phone_number,
							@region_id,
							@created_by, @created_by);
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_branch_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_branch_get]
AS
exec mi_branch_get;
BEGIN TRY
	SELECT id,
			name, 
			address, zip_code,
			phone_number, region_id
	FROM mi_branch
	WHERE isdeleted = 0;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_branch_list_by_region_id_list_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[mi_branch_list_by_region_id_list_get]
	@pRegionIdList varchar(max)
AS
BEGIN
	SET NOCOUNT ON;

    BEGIN TRY
		SELECT B.ID id, B.NAME branch, B.REGION_ID region_id
		FROM DBO.MI_BRANCH B
		WHERE	B.ISDELETED = 0
			AND B.REGION_ID IN (SELECT value FROM DBO.FN_SPLIT(@pRegionIdList,','))
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END




GO
/****** Object:  StoredProcedure [dbo].[mi_branch_update]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_branch_update]
	@id varchar(max),
	@name varchar(max),
	@address varchar(max), @zip_code varchar(max), 
	@phone_number varchar(max),
	@region_id varchar(max),
	@last_modified_by varchar(max)
AS

BEGIN TRY
	UPDATE mi_branch
	SET	name = @name,
		address = @address,
		zip_code = @zip_code,
		phone_number = @phone_number,
		region_id = @region_id,
		last_modified_by = @last_modified_by,
		last_modified_date = getDate()
	WHERE id = @id;
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_car_create]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_car_create] 
		@plate_no varchar(max), @machine_no varchar(max),
		@branch_id varchar(max), @inventory_id varchar(max),
		@inbound_date varchar(max), @name varchar(max), 
		@brand varchar(max), @model varchar(max), @type varchar(max),
		@manufacture_year int, @cc int, @fuel varchar(max),
		@transition varchar(max), @km int, @price_estimation bigint,
		@status varchar(max),
		@created_by varchar(max)
AS
	
BEGIN TRY
	IF @plate_no = '' OR @machine_no = '' OR @branch_id = '' OR @inventory_id = '' 
			OR @inbound_date = '' OR @name = '' 
			OR @brand = '' OR @model = '' OR @type = '' 
			OR @manufacture_year = '' OR @cc = '' OR @fuel = ''
			OR @transition = '' OR @km = '' OR @price_estimation = ''
			OR @status = ''
			OR @created_by = ''
		THROW 52002, '[DB] Invalid Parameter',1;

	ELSE
		INSERT INTO mi_car(plate_no, machine_no, 
							branch_id, inventory_id,
							inbound_date, name,
							brand, model, type,
							manufacture_year, cc, fuel,
							transition, km, price_estimation,
							status,
							created_by, last_modified_by)
					VALUES(@plate_no, @machine_no, 
							@branch_id, @inventory_id,
							CONVERT(DateTime,@inbound_date,105), @name, 
							@brand, @model, @type,
							@manufacture_year, @cc, @fuel,
							@transition, @km, @price_estimation,
							@status,
							@created_by, @created_by)
		SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_car_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_car_get]
		@region_id varchar(max), @branch_id varchar(max),
		@status varchar(max),
		@type varchar(max), @brand varchar(max),
		@yearfrom int, @yearto int,
		@transition varchar(max)
AS

BEGIN TRY
	DECLARE @sql nvarchar(max);
	SET @sql = N'
	SELECT c.id, plate_no, machine_no,
			r.name AS region_name, b.name AS branch_name, i.name AS inventory_name,
			inbound_date, c.name,
			brand, model, c.type,
			manufacture_year, cc, fuel,
			transition, km, price_estimation,
			status, status_mark 
	FROM mi_car c
	JOIN mi_branch b
		ON c.branch_id = b.id
	JOIN mi_inventory i
		ON c.inventory_id = i.id
	JOIN mi_region r
		ON b.region_id = r.id
	
	WHERE c.isdeleted = 0 
	AND b.region_id '
			+
				CASE 
					WHEN @region_id = '' THEN 'IS NOT NULL '
					ELSE '= @region_id '
				END
			+
	'AND branch_id '	
			+
				CASE 
					WHEN @branch_id = '' THEN 'IS NOT NULL '
					ELSE '= @branch_id '
				END
			+
	'AND c.status '	
			+
				CASE 
					WHEN @status = '' THEN 'IS NOT NULL '
					ELSE '= @status '
				END
			+
	'AND c.type '	
			+
				CASE 
					WHEN @type = '' THEN 'IS NOT NULL '
					ELSE '= @type '
				END
			+
	'AND brand '	
			+
				CASE 
					WHEN @brand = '' THEN 'IS NOT NULL '
					ELSE '= @brand '
				END
			+
	'AND manufacture_year BETWEEN @yearfrom AND @yearto '
	+
	'AND transition '
			+
				CASE 
					WHEN @transition = '' THEN 'IS NOT NULL '
					ELSE '= @transition'
				END
			+
	';';

	print @sql;

	exec sp_executesql @sql, N'@region_id varchar(max), @branch_id varchar(max),
		@status varchar(max),
		@type varchar(max), @brand varchar(max),
		@yearfrom int, @yearto int,
		@transition varchar(max)',
		@region_id, @branch_id,
		@status,
		@type, @brand,
		@yearfrom, @yearto,
		@transition;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_car_min_max_year_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[mi_car_min_max_year_get]
AS
BEGIN
	SET NOCOUNT ON;
    BEGIN TRY
		SELECT	MIN(MANUFACTURE_YEAR) year_min,
				MAX(MANUFACTURE_YEAR) year_max
		FROM DBO.MI_CAR;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END






GO
/****** Object:  StoredProcedure [dbo].[mi_car_status_summary_branch_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[mi_car_status_summary_branch_get]
	@pSearchId varchar(15)
AS
BEGIN
	SET NOCOUNT ON;
    BEGIN TRY
		SELECT	NEW.QTY AS new,
				REPAIR.QTY AS onrepair,
				MOV.QTY AS onmove,
				READY.QTY AS ready,
				BOOKED.QTY AS booked,
				SOLD.QTY AS sold
		FROM
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C
				WHERE C.ISDELETED = 0 AND C.BRANCH_ID = @pSearchId AND C.STATUS = 'Baru Dibeli') NEW,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND C.BRANCH_ID = @pSearchId AND C.STATUS = 'Dalam Perbaikan') REPAIR,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND C.BRANCH_ID = @pSearchId AND C.STATUS = 'Dalam Perpindahan') MOV,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND C.BRANCH_ID = @pSearchId AND C.STATUS = 'Siap Dijual') READY,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND C.BRANCH_ID = @pSearchId AND C.STATUS = 'Sudah Dipesan') BOOKED,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND C.BRANCH_ID = @pSearchId AND C.STATUS = 'Terjual') SOLD;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END





GO
/****** Object:  StoredProcedure [dbo].[mi_car_status_summary_by_request_status]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[mi_car_status_summary_by_request_status]
	@pBranchId VARCHAR(15)
AS

BEGIN TRY
	SELECT 
		(SELECT COUNT(*)
		FROM DBO.MI_REQUEST
		WHERE	SOURCE_BRANCH_ID IN (@pBranchId)
			AND STATUS = 'Menunggu Disetujui')  AS 'new request',

		(SELECT COUNT(*)
		FROM DBO.MI_REQUEST
		WHERE	SOURCE_BRANCH_ID IN (@pBranchId)
			AND STATUS = 'Disetujui') AS 'approved'
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH


GO
/****** Object:  StoredProcedure [dbo].[mi_car_status_summary_inventory_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[mi_car_status_summary_inventory_get]
	@pSearchId varchar(15)
AS
BEGIN
	SET NOCOUNT ON;
    BEGIN TRY
		SELECT	NEW.QTY AS new,
				REPAIR.QTY AS onrepair,
				MOV.QTY AS onmove,
				READY.QTY AS ready,
				BOOKED.QTY AS booked,
				SOLD.QTY AS sold
		FROM
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C
				WHERE C.ISDELETED = 0 AND C.INVENTORY_ID = @pSearchId AND C.STATUS = 'Baru Dibeli') NEW,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND C.INVENTORY_ID = @pSearchId AND C.STATUS = 'Dalam Perbaikan') REPAIR,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND C.INVENTORY_ID = @pSearchId AND C.STATUS = 'Dalam Perpindahan') MOV,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND C.INVENTORY_ID = @pSearchId AND C.STATUS = 'Siap Dijual') READY,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND C.INVENTORY_ID = @pSearchId AND C.STATUS = 'Sudah Dipesan') BOOKED,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND C.INVENTORY_ID = @pSearchId AND C.STATUS = 'Terjual') SOLD;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END





GO
/****** Object:  StoredProcedure [dbo].[mi_car_status_summary_region_branch_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[mi_car_status_summary_region_branch_get]
	@pSearchId varchar(15)
AS
BEGIN
	SET NOCOUNT ON;
    BEGIN TRY
		SELECT	NEW.QTY AS new,
				REPAIR.QTY AS onrepair,
				MOV.QTY AS onmove,
				READY.QTY AS ready,
				BOOKED.QTY AS booked,
				SOLD.QTY AS sold
		FROM
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_BRANCH B ON C.BRANCH_ID = B.ID
				WHERE C.ISDELETED = 0 AND B.REGION_ID = @pSearchId AND C.STATUS = 'Baru Dibeli') NEW,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_BRANCH B ON C.BRANCH_ID = B.ID
				WHERE C.ISDELETED = 0 AND B.REGION_ID = @pSearchId AND C.STATUS = 'Dalam Perbaikan') REPAIR,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_BRANCH B ON C.BRANCH_ID = B.ID
				WHERE C.ISDELETED = 0 AND B.REGION_ID = @pSearchId AND C.STATUS = 'Dalam Perpindahan') MOV,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_BRANCH B ON C.BRANCH_ID = B.ID
				WHERE C.ISDELETED = 0 AND B.REGION_ID = @pSearchId AND C.STATUS = 'Siap Dijual') READY,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_BRANCH B ON C.BRANCH_ID = B.ID
				WHERE C.ISDELETED = 0 AND B.REGION_ID = @pSearchId AND C.STATUS = 'Sudah Dipesan') BOOKED,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_BRANCH B ON C.BRANCH_ID = B.ID
				WHERE C.ISDELETED = 0 AND B.REGION_ID = @pSearchId AND C.STATUS = 'Terjual') SOLD;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END





GO
/****** Object:  StoredProcedure [dbo].[mi_car_status_summary_region_inventory_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[mi_car_status_summary_region_inventory_get]
	@pSearchId varchar(15)
AS
BEGIN
	SET NOCOUNT ON;
    BEGIN TRY
		SELECT	NEW.QTY AS new,
				REPAIR.QTY AS onrepair,
				MOV.QTY AS onmove,
				READY.QTY AS ready,
				BOOKED.QTY AS booked,
				SOLD.QTY AS sold
		FROM (SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND I.REGION_ID = @pSearchId AND C.STATUS = 'Baru Dibeli') NEW,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND I.REGION_ID = @pSearchId AND C.STATUS = 'Dalam Perbaikan') REPAIR,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND I.REGION_ID = @pSearchId AND C.STATUS = 'Dalam Perpindahan') MOV,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND I.REGION_ID = @pSearchId AND C.STATUS = 'Siap Dijual') READY,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND I.REGION_ID = @pSearchId AND C.STATUS = 'Sudah Dipesan') BOOKED,
			(SELECT COALESCE(COUNT(*),0) AS QTY FROM DBO.MI_CAR C JOIN DBO.MI_INVENTORY I ON C.INVENTORY_ID = I.ID
				WHERE C.ISDELETED = 0 AND I.REGION_ID = @pSearchId AND C.STATUS = 'Terjual') SOLD;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END





GO
/****** Object:  StoredProcedure [dbo].[mi_car_update]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_car_update] 
		@id varchar(max), 
		@plate_no varchar(max), @machine_no varchar(max),
		@branch_id varchar(max), @inventory_id varchar(max),
		@inbound_date varchar(max), @name varchar(max), 
		@brand varchar(max), @model varchar(max), @type varchar(max),
		@manufacture_year int, @cc int, @fuel varchar(max),
		@transition varchar(max), @km int, @price_estimation bigint,
		@status varchar(max),
		@last_modified_by varchar(max)
AS

BEGIN TRY
	IF @id = '' OR @plate_no = '' OR @machine_no = '' OR @branch_id = '' OR @inventory_id = '' 
			OR @inbound_date = '' OR @name = '' 
			OR @brand = '' OR @model = '' OR @type = '' 
			OR @manufacture_year = '' OR @cc = '' OR @fuel = ''
			OR @transition = '' OR @km = '' OR @price_estimation = ''
			OR @status = ''
			OR @last_modified_by = ''
		THROW 52002, '[DB] Invalid Parameter', 1;
	ELSE
		UPDATE mi_car 
		SET	plate_no = @plate_no,
			machine_no = @machine_no,
			branch_id = @branch_id, 
			inventory_id = @inventory_id,
			inbound_date = CONVERT(DateTime,@inbound_date,105),
			name = @name,
			brand = @brand,
			model = @model,
			type = @type,
			manufacture_year = @manufacture_year,
			cc = @cc,
			fuel = @fuel,
			transition = @transition,
			km = @km,
			price_estimation = @price_estimation,
			status = @status,
			last_modified_date = getDate(),
			last_modified_by = @last_modified_by
		WHERE id = @id;
		SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_csv_test]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_csv_test]
	@nama varchar(max), @age int
AS
	
BEGIN TRY
	INSERT INTO table1(nama, age)
	values(@nama, @age);
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_demand_create]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_demand_create] 
		@supervisor_id varchar(max), 
		@region_id varchar(max),
		@car_name varchar(max), 
		@target_units int, @target_remains int
AS

BEGIN TRY
	IF @supervisor_id = '' 
			OR @region_id = ''
			OR @car_name = '' 
			OR @target_units = '' OR @target_remains = '' 
			OR @supervisor_id = ''
		THROW 56002, '[DB] Invalid Parameter',1;
	ELSE
		INSERT INTO mi_demand (supervisor_id, 
								region_id,
								car_name,
								target_units, unit_accomplished, target_remains,
								created_by, last_modified_by)
		VALUES (@supervisor_id,
				@region_id,
				@car_name,
				@target_units, @target_units-@target_remains, @target_remains,
				@supervisor_id, @supervisor_id)
		SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_demand_fulfill]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_demand_fulfill]
	@demand_id varchar(max),
	@appraiser_id varchar(max),
	@quantity int
AS
select * from mi_demand;
BEGIN TRY
	UPDATE mi_demand
	SET unit_accomplished = unit_accomplished+@quantity,
		target_remains = target_remains-@quantity
	WHERE id = @demand_id;

	INSERT INTO mi_demand_detail (demand_id, appraiser_id, quantity,
									fulfillment_date,
									created_by,
									last_modified_by)
						VALUES(@demand_id, @appraiser_id, @quantity,
									getDate(),
									@appraiser_id,
									@appraiser_id);
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_demand_get_data]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_demand_get_data]
	@supervisor_id varchar(max)
AS

BEGIN TRY
	SELECT d.id, car_name, 
			target_units, unit_accomplished, target_remains, r.name AS region_name
	FROM mi_demand d JOIN mi_region r
	ON d.region_id = r.id
	WHERE d.isdeleted = 0
	AND supervisor_id = @supervisor_id;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_demand_get_details]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_demand_get_details]
	@demand_id varchar(max)
AS

BEGIN TRY
	SELECT dt.id,
			u.first_name + u.last_name AS appraiser_name,
			fulfillment_date,
			quantity
	FROM mi_demand_detail dt JOIN mi_demand d
	ON dt.demand_id = d.id
	JOIN mi_user u
	ON dt.appraiser_id = u.id
	WHERE d.isdeleted = 0
	AND dt.demand_id = @demand_id;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_inventory_list_by_region_id_list_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[mi_inventory_list_by_region_id_list_get]
	@pRegionIdList varchar(max)
AS
BEGIN
	SET NOCOUNT ON;

    BEGIN TRY
		SELECT I.ID id, I.NAME inventory, I.TYPE inventory_type, I.REGION_ID region_id
		FROM DBO.MI_INVENTORY I
		WHERE	I.ISDELETED = 0
			AND I.REGION_ID IN (SELECT value FROM DBO.FN_SPLIT(@pRegionIdList,','))
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END


GO
/****** Object:  StoredProcedure [dbo].[mi_login]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[mi_login]
	@email varchar(max), @password varchar(max)
AS
BEGIN TRY
	IF @email = '' OR @password = ''
		THROW 51002, '[DB] Invalid Parameter',1;

	IF EXISTS(SELECT * FROM DBO.MI_USER
				WHERE	email = @email 
					AND password = @password
					AND isdeleted = 0)
		SELECT id, email, first_name, last_name, phone_number
		FROM DBO.MI_USER
		WHERE	email = @email 
			AND password = @password
			AND isdeleted = 0;
	ELSE
		THROW 51003, '[DB] Invalid Email or Password',1;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH


GO
/****** Object:  StoredProcedure [dbo].[mi_lov_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[mi_lov_get]
	@pLOVType varchar(50)
AS
BEGIN
	SET NOCOUNT ON;
    BEGIN TRY
		SELECT L.VALUE
		FROM DBO.MI_LOV L, DBO.MI_LOV_TYPE T
		WHERE	L.LOV_TYPE_ID = T.ID
			AND T.NAME = @pLOVType;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END







GO
/****** Object:  StoredProcedure [dbo].[mi_region_list_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[mi_region_list_get]
AS
BEGIN
	SET NOCOUNT ON;

    BEGIN TRY
		SELECT R.ID id, R.NAME region
		FROM DBO.MI_REGION R
		WHERE R.ISDELETED = 0;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END


GO
/****** Object:  StoredProcedure [dbo].[mi_request_create]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[mi_request_create]
	@pLoginUserId varchar(15),
	@pRequestType varchar(100), 
	@pCarId varchar(15),
	@pSourceBranchId varchar(15), 
	@pTargetBranchId varchar(15), 
	@pSourceInventoryId varchar(15), 
	@pTargetInventoryId varchar(15)
AS

BEGIN TRY
	IF @pRequestType = '' OR @pCarId = ''
		THROW 58002, '[DB] Invalid Parameter',1;

	IF NOT EXISTS (SELECT ID FROM DBO.MI_CAR WHERE ID = @pCarId AND ISDELETED = 0)
		THROW 58003, '[DB] Car is not exists', 1;
	
	IF NOT EXISTS (SELECT L.ID FROM DBO.MI_LOV L, DBO.MI_LOV_TYPE T
						WHERE	L.LOV_TYPE_ID = T.ID
							AND L.ISDELETED = 0 
							AND T.NAME = 'REQUEST_TYPE'
							AND L.VALUE = @pRequestType)
		THROW 58004, '[DB] Request Type is not valid', 1;
	
	IF @pRequestType = 'Change Ownership'
		BEGIN
			INSERT INTO DBO.MI_REQUEST (CREATED_BY, LAST_MODIFIED_BY, CAR_ID, REQUEST_TYPE, SOURCE_BRANCH_ID, DESTINATION_BRANCH_ID, STATUS)
			VALUES (@pLoginUserId, @pLoginUserId, @pCarId, @pRequestType, @pSourceBranchId, @pTargetBranchId, 'Baru');

			SELECT 0 AS status, 'OK' as result;
		END
	ELSE IF @pRequestType = 'Relocation'
		BEGIN
			INSERT INTO DBO.MI_REQUEST (CREATED_BY, LAST_MODIFIED_BY, CAR_ID, REQUEST_TYPE, SOURCE_INVENTORY_ID, DESTINATION_INVENTORY_ID, STATUS)
			VALUES (@pLoginUserId, @pLoginUserId, @pCarId, @pRequestType, @pSourceInventoryId, @pTargetInventoryId, 'Baru');

			SELECT 0 AS status, 'OK' as result;
		END
	ELSE
		THROW 58004, '[DB] Request Type is not valid', 1;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH



GO
/****** Object:  StoredProcedure [dbo].[mi_request_update]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[mi_request_update]
	@pUserId varchar(15),
	@pRequestId varchar(15),
	@pStatus varchar(100)
AS

BEGIN TRY
	IF @pRequestId = '' OR @pStatus = ''
		THROW 58002, '[DB] Invalid Parameter',1;

	IF NOT EXISTS (SELECT ID FROM DBO.MI_REQUEST WHERE ID = @pRequestId AND ISDELETED = 0)
		THROW 58003, '[DB] Request is not exists', 1;
	
	IF @pStatus = 'Disetujui'
		BEGIN
			UPDATE DBO.MI_CAR
			SET	
				STATUS = 'Dalam Perpindahan',
				LAST_MODIFIED_DATE = getdate(),
				LAST_MODIFIED_BY = @pUserId
			WHERE	
				ID = (
						SELECT CAR_ID 
						FROM DBO.MI_REQUEST R
						WHERE R.ID = @pRequestId
					 )
		END
	ELSE IF @pStatus = 'Diterima'
		BEGIN
			set @pStatus = 'Selesai'
			UPDATE DBO.MI_CAR
			SET
				STATUS = 'Siap Dijual',
				LAST_MODIFIED_DATE = getdate(),
				LAST_MODIFIED_BY = @pUserId
			WHERE	
				ID = (
						SELECT CAR_ID 
						FROM DBO.MI_REQUEST R
						WHERE R.ID = @pRequestId
					 )
		END

	UPDATE DBO.MI_REQUEST
	SET	
		STATUS = @pStatus,
		LAST_MODIFIED_DATE = getdate(),
		LAST_MODIFIED_BY = @pUserId
	WHERE	
		ID = @pRequestId

	SELECT 0 AS status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH



GO
/****** Object:  StoredProcedure [dbo].[mi_role_lov_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[mi_role_lov_get]
AS
BEGIN
	SET NOCOUNT ON;
    BEGIN TRY
		SELECT role.id, role.name
		FROM DBO.MI_ROLE role
		WHERE role.ISDELETED = 0;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[mi_user_create]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[mi_user_create]
	@email varchar(max), @password varchar(max),
	@first_name varchar(max), @last_name varchar(max), @phone_number varchar(max),
	@created_by varchar(max)
AS

BEGIN TRY
	IF @email = '' OR @password = '' OR
		@first_name = '' OR @last_name = '' OR @phone_number  = '' OR
		@created_by = '' 
		THROW 51002, '[DB] Invalid Parameter',1;
	ELSE IF EXISTS (SELECT email 
					FROM mi_user 
					WHERE isdeleted = 0
					AND email = @email)
		THROW 51004, '[DB] Email Already Exist',1;
	ELSE
		INSERT INTO mi_user (email, password,
							 first_name, last_name, phone_number,
							 created_by, last_modified_by)
					values(@email, @password,
							@first_name, @last_name, @phone_number,
							@created_by, @created_by);
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_user_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   PROCEDURE [dbo].[mi_user_get]
AS

BEGIN TRY
	SELECT u.id,
			first_name + last_name AS user_name,
			email, password,
			r.name AS role_name
	FROM mi_user u JOIN mi_user_position up ON u.id = up.user_id
	JOIN mi_position p ON up.position_id = p.id
	JOIN mi_role r ON p.role_id = r.id
	WHERE u.isdeleted = 0;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[mi_user_position_list_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[mi_user_position_list_get]
	@userId VARCHAR(15)
AS

BEGIN TRY
	SELECT	P.ID position_id, P.NAME position, P.BRANCH_ID branch_id, P.REGION_ID region_id, R.NAME role, R.BASE base
	FROM DBO.MI_USER U
		INNER JOIN DBO.MI_USER_POSITION UP ON U.ID = UP.USER_ID
		INNER JOIN DBO.MI_POSITION P ON UP.POSITION_ID = P.ID
		INNER JOIN DBO.MI_ROLE R ON P.ROLE_ID = R.ID
	WHERE	U.ID = @userId
		AND U.ISDELETED = 0;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH


GO
/****** Object:  StoredProcedure [dbo].[order_assign_driver]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[order_assign_driver] @order_id varchar(max), @driver_id varchar(max), @plate_no varchar(max)
AS

BEGIN TRY
	UPDATE tbl_order
	SET driver_id = @driver_id,
		plate_no = @plate_no
	WHERE order_id = @order_id;

	SELECT 0 as status, 'successful' as result;
END TRY 

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[order_cancel]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[order_cancel]
	@porderid varchar(15), @pmodifiedby varchar(15)
AS
BEGIN
	SET NOCOUNT ON;

    BEGIN TRY
		IF EXISTS (SELECT * FROM DBO.TBL_ORDER where ORDER_ID = @porderid)
			BEGIN
				UPDATE TBL_ORDER
				SET 
					ORDER_STATUS = 'CANCELLED',
					LAST_MODIFIED_DATE = CURRENT_TIMESTAMP,
					LAST_MODIFIED_BY = @pmodifiedby
				WHERE ORDER_ID = @porderid;

				SELECT 'OK' as result;
			END
		ELSE
			BEGIN
				THROW 52002, 'Order is not exists',1;
			END
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber, @message AS ErrorMessage;
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[order_getstatus]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[order_getstatus] @order_id varchar(max)
AS
BEGIN TRY
	SELECT order_status FROM tbl_order
	WHERE order_id = @order_id;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[order_set_driverrating]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[order_set_driverrating]
	@porderid varchar(15),
	@pdriverrating float
AS
BEGIN
	SET NOCOUNT ON;

    BEGIN TRY
		DECLARE @vDriverId VARCHAR(15), @vDriverOrderQty INT, @vDriverRating FLOAT, @vDriverNewRating FLOAT;

		IF (@porderid IS NULL OR @porderid = '' OR @pdriverrating IS NULL)
			THROW 52001, 'Invalid parameters - Order',1;

		IF NOT EXISTS (SELECT * FROM DBO.TBL_ORDER WHERE ORDER_ID = @porderid)
			THROW 52002, 'Order is not exists',1;
		
		SELECT @vDriverId = DRIVER_ID
		FROM DBO.TBL_ORDER
		WHERE ORDER_ID = @porderid;

		SELECT @vDriverOrderQty = ORDER_QTY, @vDriverRating = RATING
		FROM DBO.TBL_DRIVER
		WHERE DRIVER_ID = @vDriverId;

		UPDATE DBO.TBL_ORDER
		SET DRIVER_RATING = @pdriverrating
		WHERE ORDER_ID = @porderid;

		SET @vDriverNewRating = ROUND(((@vDriverOrderQty*@vDriverRating) + @pdriverrating) / (@vDriverOrderQty + 1),2);

		UPDATE DBO.TBL_DRIVER
		SET RATING = @vDriverNewRating, ORDER_QTY = @vDriverOrderQty + 1
		WHERE DRIVER_ID = @vDriverId

		SELECT 'OK' as result;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber,@message AS ErrorMessage;
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[order_updatestatus]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[order_updatestatus] @order_id varchar(max), @order_status varchar(max)
AS
BEGIN TRY
	IF NOT EXISTS (SELECT order_id FROM tbl_order WHERE order_id = @order_id AND isdeleted = 0)
		THROW 52002, 'Order is not exists', 1;
	UPDATE tbl_order
	SET order_status = @order_status
	WHERE order_id = @order_id;
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[servicerating_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[servicerating_get]
AS
BEGIN
	SET NOCOUNT ON;

    BEGIN TRY
		SELECT ROUND(AVG(SERVICE_RATING),2) AS service_rating
		FROM DBO.TBL_ORDER;
	END TRY

	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @state INT;
		SET @error = ERROR_NUMBER();
		SET @message = ERROR_MESSAGE()
		SET @state = ERROR_STATE();
		PRINT @state;
		SELECT @error AS ErrorNumber,@message AS ErrorMessage;
	END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[user_add]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[user_add] @first_name varchar(max), @last_name varchar(max),
		 @email varchar(max), @password varchar(max), 
		 @role_id varchar(max), @created_by varchar(max)
AS
BEGIN TRY
	IF EXISTS (SELECT email FROM tbl_user WHERE email = @email)
		THROW 55002, 'User email already exist',1;
	INSERT INTO tbl_user(first_name, last_name, email, password, 
							role_id, created_by,last_modified_by)
	values(@first_name, @last_name, @email, @password, 
			@role_id, @created_by,@created_by)
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[user_delete]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[user_delete] @user_id varchar(max)
AS
BEGIN TRY
	IF NOT EXISTS (SELECT username FROM tbl_user WHERE user_id = @user_id AND isdeleted = 0)
		THROW 55003, 'User is not exist', 1;
	UPDATE tbl_user
	SET isdeleted=1
	WHERE user_id = @user_id
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[user_edit]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE 
[dbo].[user_edit] @user_id varchar(max), @first_name varchar(max), @last_name varchar(max),
			@email varchar(max), @password varchar(max), 
			@role_id varchar(max), @last_modified_by varchar(max)
AS
BEGIN TRY
	IF NOT EXISTS (SELECT user_id FROM tbl_user WHERE user_id = @user_id AND isdeleted = 0)
		THROW 55003, 'User is not exist', 1;
	UPDATE TBL_USER
	SET first_name = @first_name,
		last_name = @last_name,
		email = @email,
		password = @password,
		role_id = @role_id,
		last_modified_by = @last_modified_by,
		last_modified_date = getDate()
	WHERE user_id = @user_id AND isdeleted=0
	SELECT 0 as status, 'OK' as result;
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
/****** Object:  StoredProcedure [dbo].[user_get]    Script Date: 09-Nov-17 2:50:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE 
[dbo].[user_get] @first_name varchar(max), @last_name varchar(max),
			@email varchar(max), @role_id varchar(max)
AS
BEGIN TRY
	IF @role_id = '' BEGIN
		SELECT user_id, first_name, last_name, email, role_id,
			FORMAT(last_login_date,'dd/MM/yyyy hh:mm:ss','en-US') AS 'last_login_date', 
			FORMAT(created_date,'dd/MM/yyyy hh:mm:ss','en-US') AS 'created_date', created_by,
			FORMAT(last_modified_date,'dd/MM/yyyy hh:mm:ss','en-US') AS 'last_modified_date', last_modified_by
		FROM tbl_user
		WHERE LOWER(first_name) LIKE '%'+LOWER(@first_name)+'%'
			  AND LOWER(last_name) LIKE '%'+LOWER(@last_name)+'%'
			  AND LOWER(email) LIKE '%'+LOWER(@email)+'%'
		AND isdeleted = 0
	END
	ELSE BEGIN
		SELECT user_id, first_name, last_name, email, role_id,
			FORMAT(last_login_date,'dd/MM/yyyy hh:mm:ss','en-US') AS 'last_login_date', 
			FORMAT(created_date,'dd/MM/yyyy hh:mm:ss','en-US') AS 'created_date', created_by,
			FORMAT(last_modified_date,'dd/MM/yyyy hh:mm:ss','en-US') AS 'last_modified_date', last_modified_by
		FROM tbl_user
		WHERE LOWER(first_name) LIKE '%'+LOWER(@first_name)+'%'
			  AND LOWER(last_name) LIKE '%'+LOWER(@last_name)+'%'
			  AND LOWER(email) LIKE '%'+LOWER(@email)+'%'
			  AND role_id = @role_id
		AND isdeleted = 0
	END
END TRY

BEGIN CATCH
	declare @error int, @message varchar(4000), @state int;
    set @error = ERROR_NUMBER();
	set @message = ERROR_MESSAGE()
	set @state = ERROR_STATE();
	PRINT @state;
	select @error as ErrorNumber,@message as ErrorMessage;
END CATCH

GO
USE [master]
GO
ALTER DATABASE [dev-scorpio] SET  READ_WRITE 
GO
