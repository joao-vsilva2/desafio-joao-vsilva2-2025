class AbrigoAnimais {
  constructor() {
    // Definindo os brinquedos favoritos de cada animal
    this.brinquedosAnimais = {
      Rex: ['RATO', 'BOLA'],
      Mimi: ['BOLA', 'LASER'],
      Fofo: ['BOLA', 'RATO', 'LASER'],
      Zero: ['RATO', 'BOLA'],
      Bola: ['CAIXA', 'NOVELO'],
      Bebe: ['LASER', 'RATO', 'BOLA'],
      Loco: ['SKATE', 'RATO']
    };

    // Lista de todos os brinquedos válidos
    this.brinquedosValidos = [
      'RATO', 'BOLA', 'LASER', 'NOVELO', 'CAIXA', 'SKATE'
    ];

    // Acompanha quantos animais cada pessoa já levou
    this.contadorPessoas = { pessoa1: 0, pessoa2: 0 };
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Resetar contador de adoções para cada chamada
    this.contadorPessoas = { pessoa1: 0, pessoa2: 0 };

    // Dividir as entradas em arrays
    const brinquedos1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const brinquedos2 = brinquedosPessoa2.split(',').map(b => b.trim());
    const animais = ordemAnimais.split(',').map(a => a.trim());

    // Verificar duplicatas
    if (this.temDuplicata(animais)) {
      return { erro: 'Animal inválido' };
    }

    // Verificar animais inválidos
    for (const animal of animais) {
      if (!this.brinquedosAnimais[animal]) {
        return { erro: 'Animal inválido' };
      }
    }

    // Verificar brinquedos inválidos ou duplicados
    if (this.temDuplicata(brinquedos1) || this.temDuplicata(brinquedos2)) {
      return { erro: 'Brinquedo inválido' };
    }

    for (const brinquedo of [...brinquedos1, ...brinquedos2]) {
      if (!this.brinquedosValidos.includes(brinquedo)) {
        return { erro: 'Brinquedo inválido' };
      }
    }

    // Resultado final
    const resultado = [];

    // Para cada animal na ordem fornecida
    for (const animal of animais) {
      const brinquedosFavoritos = this.brinquedosAnimais[animal];

      // Verificar se Loco pode ser adotado
      if (animal === 'Loco') {
        // Loco precisa de outro animal já adotado como companhia
        const temCompanheiro = resultado.some(item => item.includes('- pessoa'));
        if (!temCompanheiro) {
          resultado.push('Loco - abrigo');
          continue;
        }
      }

      // Verifica se cada pessoa pode adotar (sequência dos brinquedos favoritos)
      const podePessoa1 = this.contemSequencia(brinquedos1, brinquedosFavoritos);
      const podePessoa2 = this.contemSequencia(brinquedos2, brinquedosFavoritos);

      // Gatos não dividem: se ambos puderem adotar, ninguém leva
      if (
        (animal === 'Mimi' || animal === 'Fofo' || animal === 'Zero') &&
        podePessoa1 &&
        podePessoa2
      ) {
        resultado.push(`${animal} - abrigo`);
        continue;
      }

      // Verifica quem pode adotar
      let adotado = false;

      if (podePessoa1 && this.contadorPessoas.pessoa1 < 3) {
        resultado.push(`${animal} - pessoa 1`);
        this.contadorPessoas.pessoa1++;
        adotado = true;
      }

      if (!adotado && podePessoa2 && this.contadorPessoas.pessoa2 < 3) {
        resultado.push(`${animal} - pessoa 2`);
        this.contadorPessoas.pessoa2++;
        adotado = true;
      }

      if (!adotado) {
        resultado.push(`${animal} - abrigo`);
      }
    }

    // Ordenar alfabeticamente pelo nome do animal
    resultado.sort();

    return { lista: resultado };
  }

  // Verifica se há duplicatas em um array
  temDuplicata(array) {
    return new Set(array).size !== array.length;
  }

  // Verifica se um array contém a sequência exata de brinquedos favoritos
  contemSequencia(brinquedos, favoritos) {
    if (favoritos.length === 0) return true;

    let idx = 0;
    for (const brinquedo of brinquedos) {
      if (brinquedo === favoritos[idx]) {
        idx++;
        if (idx === favoritos.length) return true;
      }
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };