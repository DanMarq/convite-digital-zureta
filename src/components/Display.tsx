import { useState, useRef, useEffect } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function Display () {
    const [crianca, setCrianca] = useState<string>('1')
    const [nome, setNome] = useState('')
    const [nome2, setNome2] = useState('')
    const [idade, setIdade] = useState('')
    const [data, setData] = useState('')
    const [horaComeca, setHoraComeca] = useState('')
    const [horaAcaba, setHoraAcaba] = useState('')
    const [endereco, setEndereco] = useState('')

    const converterData = (dateString:any) => {
        if(!dateString) return '10/10/10'
        const [year, month, day] = dateString.split('-')
        const formatar = `${day}/${month}/${year.slice(-2)}`
        return formatar
    }

    const virarPdf = useRef<any>(null)

    const salvarPdf = () => {
        const elemento = virarPdf.current

        html2canvas(elemento, { scale: 2 })
            .then((canvas) => {
                const pdf = new jsPDF()
                const imgData = canvas.toDataURL('image/png')

                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save('convite_digital_zureta.pdf');
            })
    }

    return (
        <div className="container">
          <div className="editor">
            <h3>Utilize o espaço abaixo para editar os itens</h3>
            <div className="input-group">
                <label>Uma ou mais crianças?</label>
                <select value={crianca} name="" onChange={e => setCrianca(e.target.value)}>
                    <option value={'1'}>Uma criança só</option>
                    <option value={'2'}>Gemeos ou fazem a festa juntos</option>
                </select>
            </div>
            {crianca === '1' ? (
                <div className="input-group">
                    <label>Nome da Criança</label>
                    <input type="text" value={nome} placeholder="Coloque o nome da criança...." onChange={e => setNome(e.target.value)} />
                </div>
            ): crianca === '2' ? (
                <>
                <div className="input-group">
                    <label>Nome da Criança 1</label>
                    <input type="text" value={nome} placeholder="Coloque o nome da criança 1...." onChange={e => setNome(e.target.value)} />
                </div>

                <div className="input-group">
                    <label>Nome da Criança 2</label>
                    <input type="text" value={nome2} placeholder="Coloque o nome da criança 2...." onChange={e => setNome2(e.target.value)} />
                </div>
                </>
            ) : null}
            <div className="input-group">
                <label>Quantos anos?</label>
                <input type="number" value={idade} placeholder="Idade que vai completar..." onChange={e => setIdade(e.target.value)} />
            </div>
            <div className="input-group">
                <label>Qual o dia?</label>
                <input value={data} type="date" onChange={e => setData(e.target.value)} />
            </div>
            <div className="input-group">
                <label>Horarios</label>
                <small>Começa</small>
                <input type="time" value={horaComeca} onChange={e => setHoraComeca(e.target.value)} />
                <small>Acaba</small>
                <input type="time" value={horaAcaba} onChange={e => setHoraAcaba(e.target.value)} />
            </div>
            <div className="input-group">
                <label>Endereço</label>
                <textarea cols={1} value={endereco} onChange={e => setEndereco(e.target.value)}></textarea>
            </div>
          </div>
          <div className="visualizador">
            <div className="convite" id="convite" ref={virarPdf}>
                <div className="imagem-padrao"></div>
                <div className="campo-editavel">
                    {crianca === '1' ? (
                        <p>Eu <span className="destaque">{!nome ? 'Maria Isabela' : nome }</span></p>
                    ): crianca === '2' ? (
                        <p>Nós <span className="destaque">{!nome ? 'Maria Isabela' : nome }</span> e <span className="destaque">{!nome2 ? 'Pedro Henrique' : nome2 }</span></p>
                    ) : null}
                    <p>convido vocês para a {crianca === '1' ? ('minha') : crianca === '2' ? ('nossa') : null}</p>
                    <p>festa de {!idade ? '10' : idade } anos,</p>
                    <p>dia {converterData(data)}, das {!horaComeca ? '10:10' : horaComeca} às {!horaAcaba ? '22:22' : horaAcaba}h.</p>
                    <hr />
                    <p className="endereco">Local: {!endereco ? 'Rua das Avenidas - Jardim Bairro, 105' : endereco }</p>
                </div>
            </div>
            <div className="botoes">
                <button onClick={salvarPdf} className="salvar" id="save" type="button">salvar em PDF</button>
                <button className="imprimir" id="print" type="button">Imprimir</button>
            </div>
          </div>
      </div>
    )
}