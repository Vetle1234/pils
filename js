<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guttaformelen</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f0f0ff;
      padding: 2rem;
    }
    .container {
      max-width: 500px;
      margin: auto;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      position: relative;
      z-index: 1;
    }
    h1 {
      text-align: center;
      margin-bottom: 1rem;
    }
    .formel {
      text-align: center;
      font-style: italic;
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-top: 1rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.3rem;
    }
    button {
      margin-top: 1.5rem;
      width: 100%;
      padding: 0.7rem;
      background: #4a4aff;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
    }
    #resultat {
      margin-top: 1.5rem;
      font-size: 1.2rem;
      text-align: center;
    }
    #advarsel {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: red;
      color: white;
      font-size: 2rem;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  </style>
</head>
<body>
  <div id="advarsel">DU SKAL FAEN IKKE UT MED PUSENE</div>
  <div class="container">
    <h1>Guttaformelen</h1>
    <div class="formel">
      A = ε × b × (1 + 0.1 × c) × (1 + (5 - P) / 10)
    </div>

    <label for="epsilon">Spenn på konto (ε)</label>
    <input type="number" id="epsilon" placeholder="F.eks. 200">

    <label for="b">Hva gutta skal i kveld (b)</label>
    <input type="number" id="b" placeholder="Drikkekveld = 1, Vors og fest = 2, stor dag(17. mai, nyttår osv)=3">

    <label for="c">Videre eller inver? (c)</label>
    <input type="number" id="c" placeholder="1 = inver, 2 = videre">

    <label for="P">Hvem vi inver (P)</label>
    <input type="number" id="P" placeholder="1 = OHG, 2 = BLV, 3 = Vika, 4 = Digge damer, 5 = pusene">

    <button onclick="regnUt()">Regn ut antall pils</button>

    <div id="resultat"></div>
  </div>

  <script>
    function regnUt() {
      const epsilon = parseFloat(document.getElementById('epsilon').value);
      const b = parseFloat(document.getElementById('b').value);
      const c = parseFloat(document.getElementById('c').value);
      const P = parseFloat(document.getElementById('P').value);

      const advarselDiv = document.getElementById('advarsel');

      // Pusevarsel
      if (P === 5) {
        advarselDiv.style.display = 'flex';
        return;
      } else {
        advarselDiv.style.display = 'none';
      }

      if (isNaN(epsilon) || isNaN(b) || isNaN(c) || isNaN(P) || epsilon < 0 || b <= 0 || c <= 0 || P <= 0 || P > 5) {
        document.getElementById('resultat').textContent = '';
        return;
      }

      // Formel: ε × b × (1 + 0.1 × c) × (1 + (5 - P) / 10)
      let A = epsilon * b * (1 + 1.1 * c) * (1 + (5 - P) / 10);
      let pils = A / 100; // Skalere ned for å holde seg i realistisk skala
      pils = Math.min(pils, 25);

      const prisPerPils = 33;
      const totalKostnad = pils * prisPerPils;

      let melding = `Antall pils: ${pils.toFixed(2)}<br>Total kostnad: ${totalKostnad.toFixed(2)} kr`;

      if (totalKostnad > epsilon) {
        const lån = totalKostnad - epsilon;
        const lånegiver = lån >= 200 ? "Jostein" : "Oliver";
        melding += `<br><br>Du må ta opp lån på ${lån.toFixed(2)} kr hos ${lånegiver}`;
      }

      document.getElementById('resultat').innerHTML = melding;
    }
  </script>
</body>
</html>
