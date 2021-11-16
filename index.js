search.onkeyup =async (event) => {

    if(event.keyCode == 13) {
    let response = await fetch(`https://api.quran.sutanlab.id/surah/${search.value}`)
    let surah = await response.json()
    let ayah = surah.data.verses
    res.innerHTML = null
    for(let i in ayah) {
      let li=document.createElement('li')
      let audio=document.createElement('audio')
      audio.controls = false
      let source = document.createElement('source')
      source.src = `${ayah[i].audio.primary}`
      li.textContent = `${ayah[i].text.arab} (${+i + 1})`
      audio.append(source)
      li.append(audio)
      res.append(li)
      li.onclick = () => {
        audio.play()
     } 
    }
  }
} 




