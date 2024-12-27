USE bus2;

-- Tabela de Linhas
CREATE TABLE IF NOT EXISTS linhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tarifa DECIMAL(5,2) DEFAULT 0.00,
    nro_pontos INT DEFAULT 0,
    km DECIMAL(6,2) DEFAULT 0.00
);

-- Tabela de Viagens
CREATE TABLE IF NOT EXISTS viagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    linha_id INT NOT NULL,
    caminho TEXT NOT NULL,
    FOREIGN KEY (linha_id) REFERENCES linhas(id) ON DELETE CASCADE
);

-- Tabela de Paradas
CREATE TABLE IF NOT EXISTS paradas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    viagem_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    lat DECIMAL(9,6) NOT NULL,
    lng DECIMAL(9,6) NOT NULL,
    FOREIGN KEY (viagem_id) REFERENCES viagens(id) ON DELETE CASCADE
);