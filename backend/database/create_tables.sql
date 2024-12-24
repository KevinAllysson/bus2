USE bus2;

CREATE TABLE linhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NULL
);

CREATE TABLE viagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    linha_id INT NOT NULL,
    caminho TEXT NULL,
    FOREIGN KEY (linha_id) REFERENCES linhas(id) ON DELETE CASCADE
);

CREATE TABLE paradas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL
);

CREATE TABLE viagens_paradas (
    viagem_id INT NOT NULL,
    parada_id INT NOT NULL,
    PRIMARY KEY (viagem_id, parada_id),
    FOREIGN KEY (viagem_id) REFERENCES viagens(id) ON DELETE CASCADE,
    FOREIGN KEY (parada_id) REFERENCES paradas(id) ON DELETE CASCADE
);
