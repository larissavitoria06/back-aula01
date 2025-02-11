const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    let mensagem = 'api respondendo';
    res.json({ mensagem });
});

// Preço com desconto
app.post('/desconto', (req, res) => {
    const { preco } = req.body;
    let desconto = 0;
    if (preco >= 1000) {
        desconto = preco * 0.08;
    }
    let precoFinal = preco - desconto;
    res.json({ desconto, precoFinal, originalPrice: preco });
});

// Salario familia equivalente a 45 reais por filho
app.post('/salarioFamilia', (req, res) => {
    const { salario, filhos } = req.body;
    let salarioFamilia = 0;
    if (salario < 2000) 
        salarioFamilia = filhos * 45;
    let salarioFinal = salario + salarioFamilia;
    res.json({ salario, salarioFamilia, salarioFinal });
});

// INSS de um funcionário
app.post('/inss', (req, res) => {
    const { salario } = req.body; // Initialize salario from req.body
    let salarioFinal = 0;

    if (salario <= 1212.00) {
        salarioFinal = salario - salario * 0.075;
    } else if (salario <= 2427.35) {
        salarioFinal = salario - salario * 0.09;
    } else if (salario <= 3641.03) {
        salarioFinal = salario - salario * 0.12;
    } else if (salario <= 7087.22) {
        salarioFinal = salario - salario * 0.14;
    } else {
        salarioFinal = salario - salario * 0.14;
    }

    res.json({ salario, salarioFinal });
});

// Lados de um triângulo
app.post('/triangulos', (req, res) => {
    const { lado1, lado2, lado3 } = req.body; 
    let result;

    if (lado1 + lado2 <= lado3 || lado1 + lado3 <= lado2 || lado2 + lado3 <= lado1) {
        result = 'Não é um triângulo';
    } else {
        if (lado1 === lado2 && lado2 === lado3) {
            result = 'Equilátero';
        } else if (lado1 !== lado2 && lado2 !== lado3 && lado1 !== lado3) {
            result = 'Escaleno';
        } else {
            result = 'Isósceles';
        }
    }

    res.json({ lado1, lado2, lado3, result });
});

// Preço de uma mercadoria
app.post('/mercadoria', (req, res) => {
    const { nome, preco } = req.body; 
    let precoFinal;

    if (preco < 1000) {
        precoFinal = preco + preco * 0.05;
    } else {
        precoFinal = preco + preco * 0.07;
    }
    res.json({ nome, preco, precoFinal });
});

// 6 números inteiros e exiba na tela o maior número digitado.
app.post('/num', (req, res) => {
    const { n1, n2, n3, n4, n5, n6 } = req.body;
    const num = [n1, n2, n3, n4, n5, n6];
    const maiorNumero = Math.max(...num);

    res.json({ n1, n2, n3, n4, n5, n6, num, maiorNumero });
});

// 5 números inteiros em qualquer ordem, ao final, os cinco números em ordem crescente.
app.post('/ordem', (req, res) => {
    const { n1, n2, n3, n4, n5 } = req.body;
    const numeros = [n1, n2, n3, n4, n5];
    numeros.sort((a, b) => a - b);

    res.json({ n1, n2, n3, n4, n5, numeros });
});

// Dois números inteiros e determine qual é o maior e o menor.
app.post('/comparacao', (req, res) => {
    const { num1, num2 } = req.body;
    let maior, menor;

    if (num1 > num2) {
        maior = num1;
        menor = num2;
    } else if (num2 > num1) {
        maior = num2;
        menor = num1;
    } else {
        maior = num1; 
        menor = num1; 
    }

    res.json({ num1, num2, maior, menor });
});

// Reajuste salarial do funcionário
app.post('/reajuste', (req, res) => {
    const { salario } = req.body;
    let reajuste, salarioAtualizado;

    if (salario >= 1500.00 && salario < 1750.00) {
        reajuste = 0.15;
    } else if (salario >= 1750.00 && salario < 2000.00) {
        reajuste = 0.12;
    } else if (salario >= 2000.00 && salario < 3000.00) {
        reajuste = 0.09;
    } else if (salario >= 3000.00) {
        reajuste = 0.06;
    } else {
        reajuste = 0;
    }

    salarioAtualizado = salario + (salario * reajuste);

    res.json({ salario, reajuste, salarioAtualizado });
});

// Calcule a média de 3 notas do aluno
app.post('/nota', (req, res) => {
    const { nota1, nota2, nota3 } = req.body;
    let notaFinal;

    let soma = (nota1 + nota2 + nota3) / 3;

    if (soma >= 6) {
        notaFinal = 'Aprovado';
    } else if (soma >= 4 && soma < 6) {
        notaFinal = 'Recuperação';
    } else {
        notaFinal = 'Reprovado'; 
    }

    res.json({ nota1, nota2, nota3, notaFinal });
});

// Calcule o desconto e exiba o valor final da venda.
app.post('/preco', (req, res) => {
    const { preco, produto } = req.body; // Rename peca to produto
    let desconto, precoFinal;

    switch (produto) {
        case 'camisa':
            desconto = 0.20;
            break;
        case 'bermuda':
            desconto = 0.10;
            break;
        case 'calca':
            desconto = 0.15;
            break;
        default:
            desconto = 0;
    }

    precoFinal = preco - (preco * desconto);

    res.json({ preco, produto, desconto, precoFinal });
});

app.listen(4001, () => {
    console.log('API rodando em http://localhost:4001');
});
