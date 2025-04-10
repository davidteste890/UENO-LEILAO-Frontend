import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

function Produtos({ tipo }) {
  const [produtos, setProdutos] = useState([])
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [valorLance, setValorLance] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/produtos')
        let todosProdutos = response.data

        if (tipo === 'lotes') {
          todosProdutos = todosProdutos.filter(p => p.categoria === 'lote')
        } else if (tipo === 'liberados') {
          todosProdutos = todosProdutos.filter(p => p.status === 'liberado')
        } else if (tipo === 'embreve') {
          todosProdutos = todosProdutos.filter(p => p.status === 'embreve')
        }

        setProdutos(todosProdutos)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    fetchProdutos()
  }, [tipo])

  // Fecha o formulário se clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setProdutoSelecionado(null)
        setValorLance('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const enviarLance = async (produtoId) => {
    if (!valorLance || parseFloat(valorLance) <= 0) {
      alert('Digite um valor de lance válido.')
      return
    }

    try {
      const token = localStorage.getItem('token')
      await axios.post(`http://localhost:5000/api/lances`, {
        produto_id: produtoId,
        valor: valorLance
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('Lance enviado com sucesso!')
      setProdutoSelecionado(null)
      setValorLance('')
    } catch (error) {
      console.error('Erro ao enviar lance:', error)
      alert('Erro ao enviar lance.')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {tipo === 'lotes' && 'Lotes para lance'}
        {tipo === 'liberados' && 'Liberados para lance'}
        {tipo === 'embreve' && 'Lances em breve'}
        {!tipo && 'Todos os Produtos'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white p-4 rounded-2xl shadow-lg flex flex-col relative">
            <img
              src={produto.imagem || 'https://images.unsplash.com/photo-1587202372775-9897e1fd0b3b?auto=format&fit=crop&w=800&q=80'}
              alt={produto.nome}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-green-700">{produto.nome}</h2>
            <p className="text-gray-600 text-sm mt-1">{produto.descricao}</p>
            <p className="text-green-600 font-bold mt-2 text-lg">R$ {produto.preco}</p>

            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
              onClick={() => setProdutoSelecionado(produto.id)}
            >
              Dar Lance
            </button>

            {produtoSelecionado === produto.id && (
              <div ref={formRef} className="mt-4 bg-gray-100 p-4 rounded-lg">
                <input
                  type="number"
                  placeholder="Digite seu lance"
                  value={valorLance}
                  onChange={(e) => setValorLance(e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                />
                <button
                  onClick={() => enviarLance(produto.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Confirmar Lance
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Produtos
