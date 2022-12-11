const form: HTMLFormElement | null = document.querySelector('#defineform');

if(form != null) {
  form.onsubmit = () => {
    const formData = new FormData(form);

    console.log(formData);
    const text = formData.get('defineword') as string;
    const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text;
    fetch(apiUrl)
    .then((response) => { 
      return response.json()
    })
    .then((data) => {
      const oldList = document.querySelector('.list-group');

      const listParent: HTMLUListElement = document.createElement('ul');
      listParent.classList.add('list-group');

      const firstList: HTMLLIElement = document.createElement('li');
      firstList.classList.add('list-group-item');
      firstList.textContent = data[0].word;
      listParent.append(firstList);

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].meanings.length; j++) {
            const partOfSpeechItem: HTMLLIElement = document.createElement('li');
            partOfSpeechItem.textContent = 'Parts of Speech: ' + data[i].meanings[j].partOfSpeech;

            const definitionTitle: HTMLLIElement = document.createElement('li');
            definitionTitle.textContent = 'Definition:';

            const definitionItemList: HTMLUListElement = document.createElement('ul');
            definitionTitle.append(definitionItemList);

            for (let k = 0; k < data[i].meanings[j].definitions.length; k++) {
                const definitionItem: HTMLLIElement = document.createElement('li');
                definitionItem.textContent = data[i].meanings[j].definitions[k].definition;
                definitionItemList.append(definitionItem);
            }
            listParent.append(partOfSpeechItem, definitionTitle);
        }
    }
      // const loopList: HTMLLIElement = document.createElement('li');
      // loopList.classList.add('list-group-item');
      
      // for(let i = 0; i < data.length; i++) {
      //   if(data[i] != null) {
      //     loopList.textContent = 'Word:' + data[i].word;
      //     listParent.append(loopList);
      //   }
      //     for(let j = 0; j < data[i].meanings.length; j++) {
      //       if(data[i].meanings[j] != null) {
      //         loopList.textContent = 'Meanings:' + data[i].meanings[j].meanings;
      //         listParent.append(loopList);
      //       }
      //         for(let k = 0; k < data[i].meanings[j].definitions.length; k++) {
      //           if(data[i].meanings[j].definitions[k] != null) {
      //             loopList.textContent = 'Definitions:' + data[i].meanings[j].definitions[k].definition;
      //             listParent.append(loopList);
      //       }
      //     }
      //   }
      // }


      // listParent.append(firstList, secondList);

      oldList?.replaceWith(listParent);
      console.log(data);
    })
    .catch((error) => console.log(error));

    console.log(text);
    return false; // prevent reload
  };
};
// 
  
  // fetch(apiUrl, {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application.json',
  //     'Content-Type': 'application/json'
  //   },
  // })
  // .then((response) => console.log(response.text()));
  