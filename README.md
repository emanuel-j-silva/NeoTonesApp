# 🎵 NeoTones

> Aplicação mobile para organização, estudo e execução de arranjos musicais.

O **NeoTones** é uma aplicação desenvolvida para facilitar a consulta e execução de arranjos musicais durante estudos, ensaios e apresentações.

A proposta é transformar letras, frases e melodias em uma experiência digital simples, organizada e adequada para uso em dispositivos móveis.

---

## ✨ Sobre o projeto

Durante a execução de uma música, músicos frequentemente precisam consultar simultaneamente a letra e as notas correspondentes à melodia.

O NeoTones busca solucionar esse problema através de uma representação estruturada da música, permitindo associar **frases, letras e notas musicais** dentro de diferentes arranjos.

A aplicação foi projetada com foco em:

* 🎼 Organização de músicas e arranjos
* 🎹 Visualização de melodias
* 📱 Experiência otimizada para dispositivos móveis
* 🔄 Suporte a diferentes tonalidades
* 🧩 Modelagem de domínio bem definida
* 🚀 Arquitetura preparada para evolução

---

## 🎯 Objetivos

O principal objetivo do NeoTones é fornecer uma ferramenta prática para músicos consultarem seus arranjos sem depender de partituras físicas ou documentos desorganizados.

Entre os objetivos do projeto estão:

* Centralizar músicas e seus respectivos arranjos.
* Facilitar a consulta durante ensaios e apresentações.
* Representar melodias de maneira simples e intuitiva.
* Permitir diferentes versões de uma mesma música.
* Facilitar a transposição dos arranjos.
* Criar uma base para futuras funcionalidades colaborativas.

---

## 🧠 Conceito

Uma música pode possuir diversos arranjos.

Por exemplo:

```
Música
│
├── Arranjo - Trompete
│   ├── Frase 1
│   ├── Frase 2
│   └── Frase 3
│
├── Arranjo - Sax Alto
│   ├── Frase 1
│   ├── Frase 2
│   └── Frase 3
│
└── Arranjo - Voz
    ├── Frase 1
    ├── Frase 2
    └── Frase 3
```

Cada frase pode possuir uma sequência de notas associada à sua letra.

Exemplo:

```
Um grande sinal apareceu no céu

Dó  Ré  Mi  Fá  Sol
```

Essa estrutura permite que o NeoTones represente a relação entre **texto e melodia** sem depender necessariamente de uma partitura tradicional.

---

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura baseada na separação entre **domínio, aplicação e apresentação**, buscando manter as regras de negócio independentes da interface.

A organização segue princípios inspirados em:

* Domain-Driven Design
* Clean Architecture
* Separation of Concerns
* SOLID
* Object-Oriented Design

A intenção é permitir que as regras do domínio musical possam evoluir independentemente da tecnologia utilizada na interface.

### Domínio

O domínio representa os conceitos fundamentais da aplicação:

```
Music
 └── Arrangement
      └── Musical Content
           ├── Phrase
           └── Notes
```

A interface é responsável apenas por apresentar e interagir com essas informações.

---

## 🛠️ Tecnologias

### Mobile

* React Native
* Expo
* TypeScript

### Arquitetura e desenvolvimento

* Domain-Driven Design
* Clean Architecture
* Componentização
* Hooks
* TypeScript
* Git

---

## 🎼 Modelo de domínio

O domínio musical é um dos principais pontos do projeto.

Uma `Music` representa uma música cadastrada na aplicação.

Um `Arrangement` representa uma interpretação específica dessa música, podendo possuir características próprias como tonalidade ou instrumento.

O conteúdo musical é organizado em unidades menores, permitindo representar frases e suas respectivas notas.

Exemplo conceitual:

```
Music
│
├── title
├── artist
│
└── arrangements
     │
     ├── Arrangement
     │    ├── key
     │    ├── instrument
     │    └── phrases
     │
     └── Arrangement
          ├── key
          ├── instrument
          └── phrases
```

---

## 📱 Interface

A interface do NeoTones está sendo construída com foco em uma experiência simples e rápida.

A aplicação deverá permitir que o usuário:

1. Visualize sua biblioteca de músicas.
2. Selecione uma música.
3. Escolha um arranjo.
4. Visualize o conteúdo musical.
5. Navegue pelas frases durante a execução.

Um dos princípios da interface é evitar excesso de informação.

O músico deve conseguir olhar rapidamente para a tela e identificar:

```
LETRA

    ↓

NOTAS

    ↓

PRÓXIMA FRASE
```

---

## 🚧 Status

**Em desenvolvimento.**

O projeto atualmente está concentrado na construção do MVP, incluindo:

* [x] Modelagem inicial do domínio
* [x] Entidade de música
* [x] Estrutura inicial da aplicação React Native
* [x] Componentização da interface
* [ ] Navegação entre telas
* [ ] Biblioteca de músicas
* [ ] Visualização completa de arranjos
* [ ] Persistência dos dados
* [ ] Transposição de tonalidade
* [ ] Backend

---

## 🗺️ Roadmap

### MVP

* [ ] Biblioteca de músicas
* [ ] Cadastro de músicas
* [ ] Cadastro de arranjos
* [ ] Visualização de letras
* [ ] Visualização de notas
* [ ] Navegação entre músicas
* [ ] Persistência local

### V1

* [ ] Busca de músicas
* [ ] Favoritos
* [ ] Modo escuro
* [ ] Ajuste do tamanho da fonte
* [ ] Rolagem automática
* [ ] Seleção de tonalidade
* [ ] Transposição automática

### Futuro

* [ ] Backend
* [ ] Autenticação
* [ ] Sincronização em nuvem
* [ ] Backup dos arranjos
* [ ] Compartilhamento de músicas
* [ ] Biblioteca pública de arranjos
* [ ] Colaboração entre músicos
* [ ] Importação e exportação
* [ ] Reprodução MIDI
* [ ] Recursos avançados de edição musical

---

## 🔮 Visão de futuro

O NeoTones não pretende ser apenas um visualizador de partituras.

A visão de longo prazo é transformar a aplicação em uma **plataforma para criação, organização e execução de arranjos musicais**.

Entre as possibilidades futuras estão:

```
┌─────────────────┐
│     NeoTones    │
└────────┬────────┘
         │
 ┌───────┼───────┐
 │       │       │
 ▼       ▼       ▼
Biblioteca  Arranjos  Execução
 │       │       │
 │       │       ├── Performance
 │       │       ├── Auto-scroll
 │       │       └── MIDI
 │       │
 │       ├── Edição
 │       ├── Transposição
 │       └── Compartilhamento
 │
 ├── Músicas
 ├── Favoritos
 └── Busca
         │
         ▼
    Comunidade
         │
         └── Compartilhamento
             de conhecimento
```

---

## 🧪 Qualidade

O projeto busca manter uma base de código sustentável através de:

* Separação de responsabilidades
* Tipagem estática com TypeScript
* Componentização
* Regras de domínio isoladas
* Testes automatizados
* Código orientado a interfaces
* Baixo acoplamento
* Alta coesão

Conforme o projeto evoluir, a estratégia de testes deverá abranger principalmente as regras relacionadas ao domínio musical.

---

## 🚀 Executando o projeto

### Pré-requisitos

* Node.js
* npm ou yarn
* Expo CLI
* Android Studio ou dispositivo físico

### Instalação

Clone o repositório:

```
git clone <repository-url>
```

Entre no diretório:

```
cd NeoTonesApp
```

Instale as dependências:

```
npm install
```

Execute o projeto:

```
npx expo start
```

A partir daí, o projeto pode ser executado através do:

* Android Emulator
* Expo Go
* Dispositivo físico compatível

---

## 👨‍💻 Autor

Desenvolvido por **Emanuel**.

Projeto criado como iniciativa pessoal para explorar desenvolvimento mobile, modelagem de domínio, arquitetura de software e a aplicação de tecnologia ao universo musical.
