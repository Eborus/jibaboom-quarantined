# Schema

This document will gives user a good idea of how your database's structure looks like.

You may refer to the following link to learn more about postgresql schema:

1. [CREATE statements](https://www.postgresqltutorial.com/postgresql-create-table/)
2. [Foreign Keys](https://www.postgresqltutorial.com/postgresql-foreign-key/)

The following are examples of how you can create a table, replace the examples with your own create statements of all your table.
```sql
        CREATE TABLE musicFestival (
            id SERIAL PRIMARY KEY,
            data_type VARCHAR(20) NOT NULL,
            performance_id BIGINT NOT NULL,
            festival_id BIGINT NOT NULL,
            performance VARCHAR(40),
            startTime CHAR(4) NOT NULL,
            endTime CHAR(4) NOT NULL,
            popularity INTEGER,
            UNIQUE (data_type, performance_id)
        );
```
