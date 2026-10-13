# Áudimus — edição web

Aplicativo para cálculos relativos a áudio e acústica musical, criado pelo Prof. Glauber Santiago na UFSCar, São Carlos, em 2004. Esta edição recupera o conteúdo de Áudimus versão 1.0 do executável fornecido e o executa no navegador com Ruffle 0.7.1, distribuído localmente.

As sete telas incluem apresentação, frequência e período, comprimento de onda e propagação, potência e decibéis, atenuação com a distância, frequências das notas e escala cromática. As setas verdes navegam; os pequenos botões verdes calculam. Use ponto como separador decimal. No celular, prefira a orientação horizontal.

## Extração e preservação

O original era um projetor Macromedia Flash Player 6 para Windows (PE32 x86). O SWF comprimido versão 6, com bytecode AVM1, foi extraído no deslocamento 819200, com 33605 bytes. O rodapé do projetor confirma o tamanho. O palco tem 800 × 600 pixels, 20 quadros por segundo e sete quadros principais. O executável não foi executado durante a extração.

- `assets/original/audimus.swf`: extração intacta, SHA-256 `5b98a3d8972b7da28e6a25c9f443cc9408a980a2519d89cdcef23b5f540a36c2`.
- `assets/web/audimus-web.swf`: edição utilizada, SHA-256 `31dbc6c304bb7b6c4c7e8168a94597ab120960fccfbc0bab815f9696863e90a6`.

A edição web muda somente o alinhamento de 57 campos numéricos de direita para esquerda, para evitar cortes observados no navegador. Também serializa 355 cabeçalhos de tags no formato válido mais curto. Os conteúdos das demais tags permanecem idênticos, incluindo todas as ações, fontes, imagens, sons, textos, valores iniciais e fórmulas. A causa exata da incompatibilidade de renderização não foi estabelecida. O original intacto permanece disponível para comparação.

As aproximações históricas dos intervalos (por exemplo, 1,059 para a segunda menor) foram preservadas. Nenhuma correção matemática ou nova validação de entrada foi inserida nas calculadoras.

## Executar e verificar

Requer Node.js para o servidor e Python 3 para a verificação dos arquivos.

```sh
npm start
python scripts/verify_preservation.py
```

Abra `http://127.0.0.1:4191/`. A publicação pelo GitHub Pages usa os arquivos estáticos da raiz, sem etapa de compilação.

Verificações no navegador: navegação pelas sete telas; 1000 Hz → 1 ms; velocidade 334 m/s e 1000 Hz → 0,33 m / 33,4 cm; potência 1 W → 10 W = 10 dB; distância 2 m → 8 m = −12,04 dB; escala com base 220 Hz → 232,98 Hz e oitava 440 Hz. Reiniciar, silenciar e informações são controles da edição web.

As evidências de extração e as fórmulas recuperadas estão em `docs/`. O conteúdo original mantém sua autoria. As licenças do Ruffle estão em `vendor/ruffle/`.
