LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 9.1/Uploads/linhas.csv'
INTO TABLE linhas
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, nome, tarifa, nro_pontos, km);


LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 9.1/Uploads/viagens.csv'
INTO TABLE viagens
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, linha_id, caminho);


LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 9.1/Uploads/paradas.csv'
INTO TABLE paradas
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, viagem_id, nome, lat, lng);
