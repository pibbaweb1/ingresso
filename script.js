let ingressosDisponiveis = 100;

document.getElementById('formCompra').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const nome = document.getElementById('nome').value;

    if (quantidade > ingressosDisponiveis) {
        alert("Quantidade indisponível! Restam apenas " + ingressosDisponiveis + " ingressos.");
        return;
    }

    ingressosDisponiveis -= quantidade;
    document.getElementById('ingressosDisponiveis').innerText = ingressosDisponiveis;

    const pagamento = document.getElementById('pagamento').value;

    if (pagamento === 'pix') {
        document.getElementById('qrCodeArea').style.display = 'block';

        // Gera QR Code
        document.getElementById('qrcode').innerHTML = "";
        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: "Pagamento PIX para Evento: Valor R$" + (quantidade * 50) + ",00",
            width: 200,
            height: 200
        });
    } else {
        alert("Redirecionando para o pagamento com cartão...");
    }

    // Confirmação automática no WhatsApp
    const mensagem = encodeURIComponent(`Olá! Acabei de comprar ${quantidade} ingresso(s) para o evento. Meu nome é ${nome}.`);
    const linkWhatsapp = `https://wa.me/seunumerowhatsapp?text=${mensagem}`;
    window.open(linkWhatsapp, '_blank');
});
