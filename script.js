displayNotes();
var addBtn = document.getElementById('addBtn');

// ce sont des stockages locaux
addBtn.addEventListener('click',function(){
	
	let notesObj;
	let addNote = document.getElementById('addNote');
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	//temps d'affichage
	let now = new Date();
	let dateTime = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}`;
	
	
	//temps d'affichage
	let tempObj = { text: addNote.value, time: dateTime };
	
	notesObj.push(tempObj);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	
	addNote.value = '';
	
	displayNotes();
});


// la fonction affiche les données stockées dans le stockage local
function displayNotes(){
	let notesObj;
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	let html = '';
	
	notesObj.forEach(function(element,index){
		html += `
				<div class="card mx-4 my-2 bg-dark text-white thatsMyNote" style="width: 18rem;">
					<div class="card-body">
						<h6>${element.time}</h6>
						<p class="card-text">${element.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
						<button id="${index}" onclick=deleteNote(this.id) class="btn btn-danger">Supprimer</button>
					</div>
				</div>
			`;
	});
	
	let noteEle = document.getElementById('notes');
	
	if(notesObj.length != 0){
		noteEle.innerHTML = html;
	}
	else{
		noteEle.innerHTML = '<h3 style="text-align: center; color: grey;">Aucun enregistrement pour le moment</h3>';
	}
	
}


//Fonction pour effacer le note
function deleteNote(index){
	let notesObj;
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	notesObj.splice(index,1);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	
	displayNotes();
}



let search = document.getElementById('search');
search.addEventListener('input',function(e){
	
	let inputText = search.value;
	
	//l'instruction ci-dessous sera exécutée lorsque la barre de recherche sera vidée à l'aide d'un retour arrière
	if(inputText == ''){
		document.getElementById('noMatches').innerHTML = '';
	}
	
	var countNone = 0;
	
	let cards = document.getElementsByClassName('thatsMyNote');
	
	
	Array.from(cards).forEach(function(ele){
		let cardText = ele.getElementsByTagName('p')[0].innerText;
		if(cardText.includes(inputText)){
			ele.style.display = 'block';
		}
		else{
			ele.style.display = 'none';
			
			countNone++;
			
			if(countNone === cards.length){
				document.getElementById('noMatches').innerHTML = '<h3 style="text-align: center; color: grey;">Aucun résultat</h3>';
			}
			else{
				document.getElementById('noMatches').innerHTML = '';
			}
		}
	});
	
	//Le code ci-dessous sera exécuté lorsque le texte saisi correspondra à tous les éléments.
	if(countNone === 0){
		document.getElementById('noMatches').innerHTML = '';
	}
	
});
