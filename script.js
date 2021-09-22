function arrow() {
    var note1 = document.querySelector('.note1');
    if (note1.style.display === 'none') {
        note1.style.display = 'block';
    }
    else {
        note1.style.display = 'none';
    }
};

// function clean(){
//     document.querySelector('textarea').value = "";
// }

const addButton = document.querySelector('#add');

const updateLSdata = () => {
    const textareaData = document.querySelector('textarea');
    const rows = [];
    textareaData.forEach((row) => {
        return rows.push(row.value);
    })
    localStorage.setItem('rows',JSON.stringify(rows));
}

const addNewNote = (text = '') => {
    const row = document.createElement('div');
    row.classList.add('row');

    const htmlData = `
    <div class="operation">
    <div class="pen"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
    <div class="trash"><i class="fa fa-trash" aria-hidden="true"></i></div>
    <div class="clean" onclick="clean()"><i class="fa fa-eraser" aria-hidden="true"></i></div>
    </div>
    <div class="main ${text? "":"hidden"}"></div>
    <textarea class="${text? "hidden":""}"></textarea>
    `;
    row.insertAdjacentHTML('afterbegin',htmlData);

    // getting reference
    const editButton = row.querySelector('.pen');
    const delButton  = row.querySelector('.trash');
    const mainDiv    = row.querySelector('.main');
    const textButton = row.querySelector('textarea');
    const eraseButton = row.querySelector('.clean');

    // delete the node
    delButton.addEventListener('click',()=>{
        row.remove();
    })
    // erase
    eraseButton.addEventListener('click',()=>{
        textButton.value = '';
    })
    // toggle using edit button
    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textButton.classList.toggle('hidden');
    })

    textButton.addEventListener('change',(event)=> {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSdata();
    })

    document.body.appendChild(row);
}
// getting data back from localStorage
const rows = JSON.parse(localStorage.getItem('rows'));

if(rows){rows.forEach((row) => addNewNote(row))};


addButton.addEventListener('click', () => addNewNote());
