USE bus2;

-- Tabela de Linhas
CREATE TABLE linhas (
    id INT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cor VARCHAR(7) NOT NULL
);

-- Tabela de Viagens
CREATE TABLE viagens (
    id INT PRIMARY KEY,
    linha_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    caminho TEXT NOT NULL,
    CONSTRAINT FK_linha_viagem FOREIGN KEY (linha_id) REFERENCES linhas(id) ON DELETE CASCADE
);

-- Tabela de Paradas
CREATE TABLE paradas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    viagem_id INT NOT NULL,
    sequencia INT NOT NULL,
    parada_id INT NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    nome_parada VARCHAR(255) NOT NULL,
    CONSTRAINT FK_viagem_parada FOREIGN KEY (viagem_id) REFERENCES viagens(id) ON DELETE CASCADE
);