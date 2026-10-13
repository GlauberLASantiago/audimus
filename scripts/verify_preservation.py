"""Verify the published movie against the byte-exact extracted original."""
import hashlib, json, pathlib, struct, zlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
def decompress(path):
    raw = path.read_bytes()
    assert raw[:3] == b'CWS' and raw[3] == 6
    body = raw[:8] + zlib.decompress(raw[8:])
    assert len(body) == struct.unpack_from('<I', raw, 4)[0]
    return raw, body

def tags(body):
    pos = 8 + (5 + 4 * (body[8] >> 3) + 7) // 8 + 4
    header, result = body[8:pos], []
    while pos < len(body):
        tag = struct.unpack_from('<H', body, pos)[0]; pos += 2
        kind, size = tag >> 6, tag & 63
        if size == 63:
            size = struct.unpack_from('<I', body, pos)[0]; pos += 4
        result.append((kind, body[pos:pos + size])); pos += size
        if kind == 0: break
    assert pos == len(body)
    return header, result

original_raw, original = decompress(ROOT / 'assets/original/audimus.swf')
web_raw, web = decompress(ROOT / 'assets/web/audimus-web.swf')
assert hashlib.sha256(original_raw).hexdigest() == '5b98a3d8972b7da28e6a25c9f443cc9408a980a2519d89cdcef23b5f540a36c2'
assert hashlib.sha256(web_raw).hexdigest() == '31dbc6c304bb7b6c4c7e8168a94597ab120960fccfbc0bab815f9696863e90a6'
manifest = json.loads((ROOT / 'docs/alignment-patch.json').read_text())
expected = bytearray(original)
assert len(manifest['fields']) == 57
for field in manifest['fields']:
    offset = field['uncompressed_byte_offset']
    assert expected[offset] == 1 and field['before'] == 1 and field['after'] == 0
    expected[offset] = 0
assert tags(expected) == tags(web), 'Unexpected change in movie content'
header, movie = tags(web)
assert struct.unpack_from('<H', header, len(header)-2)[0] == 7
print(f'PASS: original digest, seven frames, {len(movie)} root tag payloads; only 57 numeric alignment bytes changed. All ActionScript and resources preserved.')
