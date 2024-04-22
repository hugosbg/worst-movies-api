export const queryMax = `
SELECT
    producers AS producer,
    MAX(year - lag_year) AS \`interval\`,
    GROUP_CONCAT(year ORDER BY year) AS years
FROM (
    SELECT *, LAG(year) OVER (PARTITION BY producers ORDER BY year) AS lag_year
    FROM movie 
    WHERE winner = 'yes'
) AS ranked
GROUP BY producers
HAVING COUNT(1) = 2
ORDER BY \`interval\` DESC
LIMIT 2`;

export const queryMin = `
SELECT
    producers AS producer,
    MIN(ABS(year - lag_year)) AS \`interval\`,
    GROUP_CONCAT(year ORDER BY year) AS years
FROM (
    SELECT *, LAG(year) OVER (PARTITION BY producers ORDER BY year) AS lag_year
    FROM movie
    WHERE winner = 'yes'
) AS ranked
GROUP BY producers
HAVING COUNT(1) = 2
ORDER BY \`interval\` ASC
LIMIT 2`;
