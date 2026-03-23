let botao = document.querySelector(".botao");
let chave = "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";
let url = "https://api.groq.com/openai/v1/chat/completions";

async function gerarCodigo() {
    let texto = document.querySelector(".caixa-texto").value;
    let blocoCodigo = document.querySelector(".bloco-codigo");
    let resultadoCodigo = document.querySelector(".resultado-codigo");

    let resposta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + chave
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{
                role: "system",
                content: "ocê é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
            },
            {
                role: "user",
                content: texto
            }
        
        
        ]
            
        })
    })

    let dados =  await resposta.json();
    let codigoGerado = dados.choices[0].message.content;
    blocoCodigo.textContent = codigoGerado;
    resultadoCodigo.srcdoc = codigoGerado;

    console.log(dados);

}

botao.addEventListener("click", gerarCodigo);