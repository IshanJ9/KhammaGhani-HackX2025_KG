# Cardio Database Setup and Risk Assessment

## 1. Creating the Database and Schema

The following SQL command creates a new database named `Cardio` and a schema named `DATA` under it:

```sql
CREATE DATABASE Cardio;
CREATE SCHEMA DATA;
```

## 2. Checking Data in the Table

To preview the first 10 rows of `TABLE2` from the `DATA` schema, use the following query:

```sql
SELECT *
FROM "CARDIO"."DATA"."TABLE2"
LIMIT 10;
```

## 3. Creating a Temporary Table for Heart Risk Assessment

A temporary table `heart_risk` is created to classify patients based on their `HeartDisease` status:

```sql
CREATE OR REPLACE TEMPORARY TABLE heart_risk AS
WITH risk_assessment AS (
  SELECT
    *,
    CASE
      WHEN HeartDisease = 1 THEN 'High'
      ELSE 'Low'
    END AS Risk
  FROM table2  -- Table containing the dataset
)
SELECT * FROM risk_assessment;
```

### Viewing the Temporary Table

```sql
SELECT * FROM heart_risk;
```

## 4. Adding a Risk Column to the Main Table

If the `Risk` column does not exist in `table2`, it needs to be added before updating values.

```sql
ALTER TABLE table2 ADD COLUMN Risk STRING;
```

## 5. Updating Risk Assessment in the Main Table

Updating the `Risk` column based on `HeartDisease` values:

```sql
UPDATE table2
SET Risk = CASE
             WHEN HeartDisease = 1 THEN 'High'
             ELSE 'Low'
           END;
```

### Verifying the Update

```sql
SELECT * FROM table2 LIMIT 10;
```

## 6. Creating a Cortex Search Service

A Cortex Search Service named `HEART_SEARCH_SERVICE_CS` is created to enable efficient searching and filtering of risk-related data.

```sql
CREATE OR REPLACE CORTEX SEARCH SERVICE HEART_SEARCH_SERVICE_CS
ON Risk  -- Primary searchable column
ATTRIBUTES Age, Sex, RestingBP, Cholesterol -- Attributes for filtering/searching
WAREHOUSE = COMPUTE_WH
TARGET_LAG = '1 minute'
AS (
    SELECT Age, Sex, ChestPainType, RestingBP, Cholesterol,
           FastingBS, RestingECG, MaxHR, ExerciseAngina,
           Oldpeak, ST_Slope, HeartDisease, Risk
    FROM table2
);
```

## 7. Describing the Cortex Search Service

To check the details of the created search service, use the following command:

```sql
desc cortex search service HEART_SEARCH_SERVICE_CS;
```

