LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 9.1/Uploads/linhas.csv'
INTO TABLE linhas
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, codigo, nome, cor);


LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 9.1/Uploads/viagens.csv'
INTO TABLE viagens
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, linha_id, nome, caminho);


LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 9.1/Uploads/paradas.csv'
INTO TABLE paradas
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(viagem_id, sequencia, parada_id, latitude, longitude, nome_parada);