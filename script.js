// Função para gerar QR Code com dados do usuário na primeira tela
function addPerson() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const notebook = document.getElementById("notebook").value;
    const celular = document.getElementById("celular").value;

    const person = {
        name: name,
        email: email,
        cpf: cpf,
        equipments: [notebook, celular]
    };

    const jsonString = JSON.stringify(person);
    generateQRCode(jsonString);
    document.getElementById("qrStringOutput").value = jsonString;
}

// Função para gerar o QR Code
function generateQRCode(data) {
    const qrcodeDisplay = document.getElementById("qrcodeDisplay");
    qrcodeDisplay.innerHTML = ""; // Limpar QR Code anterior
    new QRCode(qrcodeDisplay, {
        text: data,
        width: 128,
        height: 128
    });
}

// Função para copiar o QR Code (string JSON) para a área de transferência e limpar o formulário
function copyQRCode() {
    const qrStringOutput = document.getElementById("qrStringOutput");
    qrStringOutput.select(); 
    document.execCommand("copy"); 
    alert("QR Code copiado!");

    // Limpar o formulário e QR Code exibido
    clearForm();
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("notebook").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("qrcodeDisplay").innerHTML = ""; // Limpar exibição de QR Code
    document.getElementById("qrStringOutput").value = ""; // Limpar saída de string JSON
}

// Função para abrir a segunda tela em uma nova aba
function openSecondScreen() {
    window.open("ler_qr.html", "_blank");
}

// Função para exibir os dados do QR Code na segunda tela
function displayQRCodeData() {
    const input = document.getElementById("qrStringInput").value;

    try {
        const data = JSON.parse(input);
        const displayOutput = document.getElementById("displayOutput");

        displayOutput.textContent = 
            `Nome: ${data.name}\n` +
            `CPF: ${data.cpf}\n` +
            `E-mail: ${data.email}\n` +
            `Equipamentos: ${data.equipments.join(", ")}`;
    } catch (error) {
        alert("Erro ao processar QR Code: Formato de QR Code inválido.");
    }
}
