import jwt
from datetime import datetime, timedelta

SEGREDO = 'chave-secreta-ueno'  # depois você pode usar variável de ambiente

def gerar_token(usuario_id):
    payload = {
        'sub': usuario_id,
        'exp': datetime.utcnow() + timedelta(hours=3)
    }
    return jwt.encode(payload, SEGREDO, algorithm='HS256')

def verificar_token(token):
    try:
        payload = jwt.decode(token, SEGREDO, algorithms=['HS256'])
        return payload['sub']
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None
