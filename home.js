inputElement.onkeyup = async (event) => {
    try {
        if(event.keyCode == 13){
            if(inputElement.value == '') throw new Error('Please enter surah number !')
            if(!(inputElement.value > 0 && inputElement.value < 115)) throw new Error('Please enter a valid number !')

            let response = await fetch('https://api.quran.sutanlab.id/surah/' + inputElement.value)
            let tafsir = await fetch('https://quranenc.com/api/translation/sura/uzbek_mansour/' + inputElement.value)

            response = await response.json()
            tafsir = await tafsir.json()

            if(response.code != 200) throw new Error('Server Error !')

            let { data: { verses } } = response
            let { result: tafsirs } = tafsir
            console.log(tafsirs)
            surahName.textContent = response.data.name.transliteration.en
            list.innerHTML = null
            for(let i = 0; i < verses.length; i++){
                let li = document.createElement('li')
                let h2 = document.createElement('h2')
                let h4 = document.createElement('h4')

                h2.textContent = verses[i].text.arab
                h4.textContent = tafsirs[i].translation
                li.append(h2)
                li.append(h4)
                list.append(li)

                li.onclick = () => {
                    audioWrapper.innerHTML = null
                    let audio = document.createElement('audio')
                    let source = document.createElement('source')
                    source.src = verses[i].audio.primary
                    audio.append(source)
                    audioWrapper.append(audio)
                    audio.play()

                    let actives = document.querySelectorAll('.active')
                    actives.forEach(el => el.classList.remove('active'))
                    li.classList.and('active')
                }
            }

            let index = 0
            function readQuranAyahs (index){
                let actives = document.querySelectorAll('.active')
                actives.forEach(el => el.classList.remove('active'))

                let items = document.querySelectorAll('li')
                items[index].classList.add('active')
                let audio = document.createElement('audio')
                let source = document.createElement('source')
                source.src = verses[index].audio.primary
                audio.append(source)
                audioWrapper.append(audio)
                audio.play()
                audio.onended = () => {
                    if(index < verses.length){
                        return readQuranAyahs(index + 1)
                    }
                }
            }

            readAll.onclick = () => {
                readQuranAyahs(index)
            } 
        }
    } catch(error) {
        console.log(error);
    }
}