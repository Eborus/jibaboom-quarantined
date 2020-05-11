# SQL Statements

For this worksheet you will need to provide an example of your own SQL statement. The two given are examples.

## INSERT EXAMPLE

Example:
```sql
INSERT INTO table_name (attr1, attr2,...) VALUES (value1, value2, ...);
```

## SELECT with Filtering and Pagination EXAMPLE

Example:
```sql
SELECT * FROM table_name WHERE attr1 == value1 AND attr2 >= value2 LIMIT 10 OFFSET 20;
```

## INSERT STATEMENT

```js
const queryStructure = musicFestival.map(music => `($${i++}, $${i++}, $${i++}, $${i++}, $${i++}, $${i++})`).join(',');
const values = musicFestival.reduce((reduced, music) => [...reduced, music.performance_id, music.festival_id, music.performance, music.startTime, music.endTime, music.popularity], []);
```

```sql
INSERT INTO musicFestival (performance_id, festival_id, performance, startTime, endTime, popularity) VALUES ${queryStructure};
```

## SELECT with Filtering (Still being worked on)