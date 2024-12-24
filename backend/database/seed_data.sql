-- Inserir linhas de exemplo
INSERT INTO linhas (nome, descricao) VALUES ('Linha 1', 'Descrição da Linha 1');

-- Inserir viagens
INSERT INTO viagens (linha_id, caminho) VALUES (1, 'encoded-polyline-string');

-- Inserir paradas
INSERT INTO paradas (nome, latitude, longitude) VALUES ('Parada A', -26.91012, -49.08234);

-- Associar paradas a viagens
INSERT INTO viagens_paradas (viagem_id, parada_id) VALUES (1, 1);
