from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Usuario, Lance, Produto  # certifique-se que esses imports estão corretos

@app.route("/api/perfil", methods=["GET"])
@jwt_required()
def perfil_usuario():
    user_id = get_jwt_identity()
    usuario = Usuario.query.get(user_id)

    if not usuario:
        return jsonify({"erro": "Usuário não encontrado"}), 404

    lances = Lance.query.filter_by(usuario_id=user_id).all()

    lista_lances = []
    for lance in lances:
        produto = Produto.query.get(lance.produto_id)
        lista_lances.append({
            "id": lance.id,
            "valor": lance.valor,
            "produto": produto.nome if produto else "Desconhecido",
            "encerrado": produto.encerrado if produto else True
        })

    return jsonify({
        "usuario": {
            "nome": usuario.nome,
            "email": usuario.email,
            "telefone": usuario.telefone
        },
        "lances": lista_lances
    })
