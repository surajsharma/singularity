
# 用户问题
dbeaver filter sql for email being duplicate
# 回答
To filter for **duplicate emails** in DBeaver (or any SQL client), you can use a `GROUP BY` and `HAVING` clause to identify rows with the same email appearing more than once.


### 🔍 Find duplicate emails:


```sql
SELECT email, COUNT(*) AS count
FROM your_table
GROUP BY email
HAVING COUNT(*) &gt; 1;

```

### 👀 See full rows with duplicate emails:


```sql
SELECT *
FROM your_table
WHERE email IN (
  SELECT email
  FROM your_table
  GROUP BY email
  HAVING COUNT(*) &gt; 1
);

```

Replace `your_table` with the actual table name.


If you're debugging ent-generated data or race conditions, this will surface user records with non-unique email values that should otherwise be unique.