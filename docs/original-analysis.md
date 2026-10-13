# Áudimus — shipped-artifact evidence

Analysis target: the user-selected `D:\OneDrive\Documentos\MeusCodigos\Audimus\Áudimus.exe`; native execution was not performed. The supplied PE is a Macromedia Flash projector, and the app is an embedded Flash/AVM1 movie rather than Unity. Flash file-format version6 plus AVM1 opcodes establish the legacy ActionScript execution family. Static evidence does not reliably distinguish the author's original AS1 versus AS2 language dialect, nor establish an exact authoring-tool build.

## Extraction identity and bounds

Carrier SHA256 `c9beddb7d75fcaa935e94e23620279975421bfa98922e192a62ae03bc2df6a79`, length852813. True app movie starts at819200, ends852805, length33605. The final8bytes are the Flash projector footer with magic0xfa123456 and SWF size33605. The entire movie exactly equals that carrier slice; its digest is `5b98a3d8972b7da28e6a25c9f443cc9408a980a2519d89cdcef23b5f540a36c2`.

Recovered unchanged movie: `audimus/assets/original/audimus.swf`. CWS/zlib, SWF version6, dimensions800×600,20FPS,7frames in the root timeline. Decompressed declared and actual lengths both56549. Zlib stream reaches EOF with no unused bytes inside the selected SWF carrier. Every tag range and End tag in root and two sprite timelines is validated by `validate.py`; `extraction-evidence.json` retains exact boundary and hash proof. Other nearby SWFs/streams in projector runtime are not selected as the application.

## Features and authored identity

Decoded embedded font maps and text tags identify “Áudimus”, “Versão1.0”, “Aplicativo para cálculos relativos a áudio e a acústica musical”, author Prof. Glauber Santiago, UFSCar, SãoCarlos2004. The author email appears in original content; no new email action is added.

Seven root screens cover introduction; frequency/period; sound speed/distance/time/wavelength; power/decibels and sound-level addition; source distance and attenuation; musical-note frequency reference with A440; chromatic-scale frequencies from an input base. Exact text/resource IDs and57editable field variables/defaults are retained in `content.json`. Font code maps recover313static text definitions, including the musical pitch frequency tables and explanatory labels.

Fourteen button action records are parsed. Navigation buttons call `_root.nextFrame()` and `_root.prevFrame()`. Frame actions stop the movie; introductory actions request `FSCommand:fullscreen`. No GetURL/GetURL2 network URL was observed in the parsed root/sprite DoAction and button action scope apart from that fullscreen command. This bounded absence does not claim a universal network sandbox audit of the entire projector runtime.

Two DefineSound resources use format2(MP3), with IDs9 and42. Their presence is an audio resource observation; whether each plays on particular control interactions is for runtime verification.

## Calculator rules recovered from AVM1 stack operations

`formulas.json` retains symbolic assignments reconstructed directly from Push/GetVariable/ToNumber/arithmetic/Math method calls/SetVariable operations. Twelve calculation buttons are covered. Their operands and rounding rules remain authored behavior:

- Frequency/period:1000/value, rounded2decimal places.
- Wavelength: speed/frequency in meters(2decimals) and centimeters(2decimals); inverse frequency=speed/wavelength.
- Sound travel time:distance/speed seconds(3decimals), milliseconds(2decimals). Distance=speed×seconds meters(2decimals), centimeters(3decimals).
- Power difference:10log10(P2/P1), rounded2decimals. Inverse P2=P1×10^(difference/10), rounded2decimals.
- Addition of two sound levels:10log10(10^(L1/10)+10^(L2/10)), rounded2decimals.
- Source-distance change:difference=d2-d1; attenuation=-20log10(d2/d1), rounded2decimals; linear ratio=10^(attenuation/10), rounded2decimals.
- Inverse distance:d2=d1×10^(-attenuation/20), rounded2decimals; additional distance=d2-d1.
- Chromatic frequencies:input×authored ratio, rounded4decimals. Ratios are1.059,1.122,1.189,1.26,1.335,1.414,1.498,1.587,1.682,1.782,1.888,2. These are approximations embedded in the original, not exact powers of two. The unchanged SWF intentionally preserves them.

No new validation guards or scientific corrections were injected. Potential authored typo or approximate reference values are historical content; web runtime compatibility and actual input/output interactions require browser QA by the parent task.
