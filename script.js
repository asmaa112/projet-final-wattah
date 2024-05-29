document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('personForm');
    const firstnameInput = document.getElementById('firstname');
    const lastnameInput = document.getElementById('lastname');
    const ageInput = document.getElementById('age');
    const streetInput = document.getElementById('street');
    const cityInput = document.getElementById('city');
    const postalcodeInput = document.getElementById('postalcode');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const personTable = document.getElementById('personTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const person = {
            id: Date.now(),
            firstname: firstnameInput.value,
            lastname: lastnameInput.value,
            age: ageInput.value,
            street: streetInput.value,
            city: cityInput.value,
            postalcode: postalcodeInput.value,
            phone: phoneInput.value,
            email: emailInput.value
        };
        addPerson(person);
        form.reset();
    });

    function addPerson(person) {
        const persons = getPersons();
        persons.push(person);
        savePersons(persons);
        renderTable();
    }

    function createTableRow(person) {
        const row = document.createElement('tr');
        row.setAttribute('data-id', person.id);
        
        row.innerHTML = `
            <td>${person.firstname}</td>
            <td>${person.lastname}</td>
            <td>${person.age}</td>
            <td>${person.street}</td>
            <td>${person.city}</td>
            <td>${person.postalcode}</td>
            <td>${person.phone}</td>
            <td>${person.email}</td>
            <td>
                <button class="edit button-64">Modifier</button>
                <button class="delete button-64" >Supprimer</button>
            </td>
        `;

        row.querySelector('.edit').addEventListener('click', function() {
            editPerson(row);
        });

        row.querySelector('.delete').addEventListener('click', function() {
            deletePerson(row);
        });

        return row;
    }

    function editPerson(row) {
        const cells = row.getElementsByTagName('td');
        const firstname = cells[0].textContent;
        const lastname = cells[1].textContent;
        const age = cells[2].textContent;
        const street = cells[3].textContent;
        const city = cells[4].textContent;
        const postalcode = cells[5].textContent;
        const phone = cells[6].textContent;
        const email = cells[7].textContent;

        cells[0].innerHTML = `<input type="text" value="${firstname}">`;
        cells[1].innerHTML = `<input type="text" value="${lastname}">`;
        cells[2].innerHTML = `<input type="number" value="${age}">`;
        cells[3].innerHTML = `<input type="text" value="${street}">`;
        cells[4].innerHTML = `<input type="text" value="${city}">`;
        cells[5].innerHTML = `<input type="text" value="${postalcode}">`;
        cells[6].innerHTML = `<input type="text" value="${phone}">`;
        cells[7].innerHTML = `<input type="email" value="${email}">`;
        cells[8].innerHTML = `<button class="save button-64">Enregistrer</button>`;

        row.querySelector('.save').addEventListener('click', function() {
            savePerson(row);
        });
    }

    function savePerson(row) {
        const id = row.getAttribute('data-id');
        const inputs = row.getElementsByTagName('input');
        const updatedPerson = {
            id: parseInt(id),
            firstname: inputs[0].value,
            lastname: inputs[1].value,
            age: inputs[2].value,
            street: inputs[3].value,
            city: inputs[4].value,
            postalcode: inputs[5].value,
            phone: inputs[6].value,
            email: inputs[7].value
        };

        let persons = getPersons();
        persons = persons.map(person => person.id === updatedPerson.id ? updatedPerson : person);
        savePersons(persons);
        renderTable();
    }

    function deletePerson(row) {
        const id = row.getAttribute('data-id');
        let persons = getPersons();
        persons = persons.filter(person => person.id != id);
        savePersons(persons);
        renderTable();
    }

    function getPersons() {
        const persons = localStorage.getItem('persons');
        return persons ? JSON.parse(persons) : [];
    }

    function savePersons(persons) {
        localStorage.setItem('persons', JSON.stringify(persons));
    }

    function renderTable() {
        personTable.innerHTML = '';
        const persons = getPersons();
        persons.forEach(person => {
            const row = createTableRow(person);
            personTable.appendChild(row);
        });
    }

    renderTable();
});
