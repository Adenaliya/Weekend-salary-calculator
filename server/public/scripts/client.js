console.log('client.js is sourced!');

function setOperator(event) {
  event.preventDefault();
  let allButtons = document.querySelectorAll('.button-operator');
  allButtons.forEach(el => el.classList.remove('selected'));
  let chosenOperator = event.target.innerHTML;
  document.getElementById('operatorIn') ? document.getElementById('operatorIn').value = chosenOperator : null;
  event.target.classList.add('selected');
}

function getCalculations() {
    console.log('What are my previous calculations...');
    axios.get('/calculations')
      .then((response) => {
        let calculations = response.data;
        let calHistory = document.getElementById('resultHistoryOut');  
        calHistory.innerHTML = ''; 
        let contentHTML = '';
        for (let calculation of calculations) {
          contentHTML += `
            <div class="result">
              ${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}
            </div>
          `;
        }
        calHistory.innerHTML = contentHTML;
      })
      .catch(err => console.log(err));
  }

function getRecent() {
  console.log('in getRecent');
  axios.get('/calculations/recent')
    .then((response) => {
      console.log('Response from server:', response.data);
      if (response.data !== null) {
        document.getElementById('recentResult').innerHTML = `<h3>${response.data.result}</h3><p>(${response.data.numOne} ${response.data.operator} ${response.data.numTwo} = ${response.data.result})</p>`;
      } else {
        document.getElementById('recentResult').innerHTML = `No calculations yet. Why not try some math?`;
      }
    })
    .catch((error) => {
      console.error('Error fetching recent result:', error);
    });
}

function calculate(event) {
  event.preventDefault();

  let numOneIn = Number(document.getElementById('numOne').value);
  let numTwoIn = Number(document.getElementById('numTwo').value);
  let operatorIn = document.querySelector('.button-operator.selected') ? document.querySelector('.button-operator.selected').innerHTML : '';

  axios.post('/calculations', objectToSend)
    .then((response) => {
      console.log('Calculation posted:', response.data);
      getCalculations();  
      getRecent();        
    })
    .catch(err => console.log(err));

  let objectToSend = {
    numOne: numOneIn,
    numTwo: numTwoIn,
    operator: operatorIn
  };

  console.log('Sending calculation:', objectToSend);

  axios.post('/calculations', objectToSend)
    .then((response) => {
      console.log('Calculation posted:', response.data);
      getCalculations();
      getRecent();
    })
    .catch(err => console.log(err));

  clearCalc(event); 
}

function clearCalc(event) {
  event.preventDefault();
  document.getElementById('numOne').value = '';
  document.getElementById('numTwo').value = '';
  let allButtons = document.querySelectorAll('.button-operator');
  allButtons.forEach(el => el.classList.remove('selected'));
}

getCalculations();
getRecent();