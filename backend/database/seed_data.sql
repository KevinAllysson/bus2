LOAD DATA INFILE 'database/csv/linhas.csv'
INTO TABLE linhas
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, nome, tarifa, nro_pontos, km, img);

LOAD DATA INFILE 'database/csv/viagens.csv'
INTO TABLE viagens
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, linha_id, caminho);

LOAD DATA INFILE 'database/csv/paradas.csv'
INTO TABLE paradas
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, viagem_id, nome, lat, lng);
