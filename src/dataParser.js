async function getPopulationData() {
  const popResponse = await fetch(
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff"
  );
  const populationData = await popResponse.json();
  const munincipalities = Object.values(
    populationData.dataset.dimension.Alue.category.label
  );
  //console.log(munincipalities);
  const population = Object.values(populationData.dataset.value);
  //console.log(population);

  const employmentResponse = await fetch(
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
  );
  const employmentData = await employmentResponse.json();
  const employedAmount = Object.values(employmentData.dataset.value);
  //console.log(employedAmount);

  const popTable = document.getElementById("table-body");
  for (var i = 0; i < munincipalities.length; i++) {
    let newEntry = document.createElement("tr");
    let cell0 = newEntry.insertCell(0);
    cell0.innerText = munincipalities[i];
    let cell1 = newEntry.insertCell(1);
    cell1.innerText = population[i];
    let cell2 = newEntry.insertCell(2);
    cell2.innerText = employedAmount[i];
    let cell3 = newEntry.insertCell(3);
    cell3.innerText =
      ((employedAmount[i] / population[i]) * 100).toFixed(2) + "%";
    if (employedAmount[i] / population[i] > 0.45) {
      newEntry.style.backgroundColor = "#abffbd";
    }
    if (employedAmount[i] / population[i] < 0.25) {
      newEntry.style.backgroundColor = "#ff9e9e";
    }
    popTable.appendChild(newEntry);
  }
}

getPopulationData();
