# Adaptação e verificação no navegador

O arquivo publicado é `assets/web/audimus-web.swf`. O original extraído permanece em `assets/original/audimus.swf`.

Foram alterados 57 bytes de alinhamento dos campos numéricos (direita → esquerda), conforme `alignment-patch.json`. Na serialização, 355 cabeçalhos de tags foram encurtados de seis para dois bytes quando o comprimento da tag permitia. Todos os conteúdos das tags são preservados, exceto esses bytes de alinhamento. Nenhuma instrução de diagnóstico foi incluída no arquivo publicado.

`scripts/verify_preservation.py` verifica os hashes, os sete quadros e a identidade dos conteúdos de todas as tags, aplicando somente as 57 alterações autorizadas pelo manifesto. Isso inclui a identidade do bytecode AVM1 e dos recursos incorporados.

Verificações visuais e interações em Ruffle 0.7.1:

| Tela | Entrada / operação | Resultado observado |
|---|---|---|
| Frequência e período | 1000 Hz | 1 ms |
| Comprimento de onda | 334 m/s; 1000 Hz | 0,33 m; 33,4 cm |
| Potência | 1 W; 10 W | 10 dB |
| Distância | 2 m; 8 m | −12,04 dB; diferença de 6 m |
| Referência de notas | Navegação | Tabela de Lá de 27,5 a 7040 Hz |
| Escala cromática | Base de 220 Hz | Segunda menor 232,98 Hz; oitava 440 Hz |

Também foram verificados a navegação pelas sete telas, a janela de informações, a troca do estado de silenciamento, a entrada e saída da tela cheia e o reinício. O layout externo foi observado em 390 × 844 pixels; o palco original é reduzido proporcionalmente, por isso a orientação horizontal facilita a leitura.

Os testes não constituem uma comparação visual exaustiva com o projetor Windows em execução. A hipótese de recorte de fontes no Ruffle motivou o ajuste de alinhamento, mas a causa interna exata não foi demonstrada. As aproximações e o tratamento de entradas continuam sendo os do aplicativo de 2004.
