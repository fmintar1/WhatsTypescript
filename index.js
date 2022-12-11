var form = document.querySelector('#defineform');
if (form != null) {
    form.onsubmit = function () {
        var formData = new FormData(form);
        console.log(formData);
        var text = formData.get('defineword');
        var apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text;
        fetch(apiUrl)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            var oldList = document.querySelector('.list-group');
            var listParent = document.createElement('ul');
            listParent.classList.add('list-group');
            var firstList = document.createElement('li');
            firstList.classList.add('list-group-item');
            firstList.textContent = data[0].word;
            listParent.append(firstList);
            // const secondList: HTMLLIElement = document.createElement('li');
            // secondList.classList.add('list-group-item');
            // secondList.textContent = 'Definition:' + data[0].meanings[0].definitions[0].definition;
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].meanings.length; j++) {
                    var partOfSpeechItem = document.createElement('li');
                    partOfSpeechItem.textContent = 'Parts of Speech: ' + data[i].meanings[j].partOfSpeech;
                    var definitionTitle = document.createElement('li');
                    definitionTitle.textContent = 'Definition:';
                    var definitionItemList = document.createElement('ul');
                    definitionTitle.append(definitionItemList);
                    for (var k = 0; k < data[i].meanings[j].definitions.length; k++) {
                        var definitionItem = document.createElement('li');
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
            oldList === null || oldList === void 0 ? void 0 : oldList.replaceWith(listParent);
            console.log(data);
        })["catch"](function (error) { return console.log(error); });
        console.log(text);
        return false; // prevent reload
    };
}
;
// 
// fetch(apiUrl, {
//   method: 'GET',
//   headers: {
//     Accept: 'application.json',
//     'Content-Type': 'application/json'
//   },
// })
// .then((response) => console.log(response.text()));
