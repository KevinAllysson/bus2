USE bus2;

-- Tabela de Linhas
CREATE TABLE linhas (
    id INT PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cor VARCHAR(7) NOT NULL
);

-- Tabela de Viagens (sem referência para linhas)
CREATE TABLE viagens (
    id INT PRIMARY KEY,
    linha_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    caminho TEXT NOT NULL
);

-- Tabela de Paradas (sem referência para viagens)
CREATE TABLE paradas (
    viagem_id INT NOT NULL,
    sequencia INT NOT NULL,
    parada_id BIGINT NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    nome_parada VARCHAR(255) NOT NULL,
    PRIMARY KEY (viagem_id, sequencia)
);