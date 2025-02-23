# 📌 SQL Commands Explanation

This document provides an explanation of each SQL command used in our database operations for risk assessment.

## 1. Selecting Data from `TABLE3`
```sql
SELECT * FROM table3 LIMIT 10;
```
- Retrieves the first 10 rows from `TABLE3`.
- Used to check existing records before making modifications.

## 2. Creating a Temporary Table for Metabolic Risk Assessment
```sql
CREATE OR REPLACE TEMPORARY TABLE metabolic_risk AS
WITH risk_assessment AS (
  SELECT
    *,
    CASE
      WHEN MetabolicSyndrome = 1 THEN 'High'
      ELSE 'Low'
    END AS Risk
  FROM "CARDIO"."DATA"."TABLE3"
)
SELECT * FROM risk_assessment;
```
- **Creates a temporary table `metabolic_risk`** to store metabolic risk classifications.
- **`WITH risk_assessment AS (...)`**: Defines a Common Table Expression (CTE) to categorize risk.
- **CASE Statement**: Assigns `'High'` if `MetabolicSyndrome = 1`, otherwise assigns `'Low'`.
- **`SELECT * FROM risk_assessment;`**: Fetches the transformed data into the temporary table.

## 3. Altering `TABLE3` to Add a `Risk` Column
```sql
ALTER TABLE "CARDIO"."DATA"."TABLE3"
ADD COLUMN Risk STRING;
```
- Adds a new column `Risk` of type `STRING` to `TABLE3`.
- Stores metabolic risk classification for each record.

## 4. Checking Updated Table Data
```sql
SELECT * FROM table3 LIMIT 10;
```
- Verifies table structure and data after adding the new column.

## 5. Updating `Risk` Values Based on Metabolic Syndrome Condition
```sql
UPDATE "CARDIO"."DATA"."TABLE3"
SET Risk = CASE
             WHEN MetabolicSyndrome = 1 THEN 'High'
             ELSE 'Low'
           END;
```
- Updates the `Risk` column in `TABLE3`.
- Assigns `'High'` where `MetabolicSyndrome = 1`.
- Assigns `'Low'` otherwise.

---
These SQL commands enable metabolic risk classification and ensure that risk data is stored persistently in the database.

