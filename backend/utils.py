import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

# Inicializa o banco de dados e cria a tabela se não existir
def init_db():
    conn = sqlite3.connect("banco.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            telefone TEXT
        )
    """)
    conn.commit()
    conn.close()

# Busca usuário pelo e-mail
def encontrar_usuario_por_email(email):
    conn = sqlite3.connect("banco.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE email = ?", (email,))
    usuario = cursor.fetchone()
    conn.close()
    return usuario

# Busca usuário pelo ID (usado após autenticação via token)
def encontrar_usuario_por_id(usuario_id):
    conn = sqlite3.connect("banco.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE id = ?", (usuario_id,))
    usuario = cursor.fetchone()
    conn.close()
    return usuario

# Cria novo usuário se o e-mail ainda não existir
def criar_usuario(nome, email, senha, telefone=""):
    if encontrar_usuario_por_email(email):
        return False  # Usuário já existe
    senha_hash = generate_password_hash(senha)
    conn = sqlite3.connect("banco.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)",
        (nome, email, senha_hash, telefone)
    )
    conn.commit()
    conn.close()
    return True
