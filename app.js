const audio = document.querySelector(".audio-player")

const audioControl = document.querySelector(".audio-control")
const audioInput = document.querySelector("#audio_input")
const audioList = document.querySelector(".songs-name")
const nextButton = document.querySelector("#next")
const previousButton = document.querySelector("#previous")

const pausePlayButton = document.querySelector(".playbtn")
const currentTime = document.querySelector("#current-time")
const audioLength = document.querySelector("#audio-length")
const progressBar = document.querySelector("#progress-bar")
const volumeControl = document.querySelector("#volume-control")
const volumeButton = document.querySelector(".volume-icon")


const LOCAL_STORAGE_SELECTEDLISTID_KEY = "task.listId"
const LOCAL_STORAGE_SAVED_AUDIO_KEY = "task.savedAudio"


let audiolist = [
    {
        name: "Dusk Till Dawn - Zayn",
        src: "music/dusk-till-dawn.mp3"
    },
    {
        name: "Ek Tarfa - Darshan Raval",
        src: "music/ek-tarfa.mp3"
    },
    {
        name: "Blinding Lights - The Weeknd",
        src: "music/Blinding-lights.mp3"
    },
    {
        name: "Judaiyaan - Darshan Raval",
        src: "music/judaiyaan.mp3"
    },
    {
        name: "Legends never Die - Chrizzy Costanza",
        src: "music/legends-never-die.mp3"
    },
    {
        name: "Lose Yourself - Eminem",
        src: "music/lose-yourself.mp3"
    },
    {
        name: "Paper Rings - Taylor Swift",
        src: "music/paper-rings.mp3"
    },
    {
        name: "Saari ki Saari - Darshan Raval",
        src: "music/saari-ki-saari.mp3"
    },
    {
        name: "Sick Boy - The Chainsmokers",
        src: "music/sick-boy.mp3"
    },
    {
        name: "StarBoy - The Weeknd",
        src: "music/starboy.mp3"
    }

]


let selectedListId = (localStorage.getItem(LOCAL_STORAGE_SELECTEDLISTID_KEY))


audio.addEventListener('loadedmetadata',()=>{
    var min_duration = Math.floor(audio.duration/60)
    var sec_duration = Math.floor(audio.duration%60)
    audioLength.innerText=`${min_duration}:${sec_duration}`
    
    
})

audio.addEventListener('timeupdate',e=>{
    progressBar.value = audio.currentTime*100/audio.duration
    var min_current = Math.floor(audio.currentTime/60)
    var sec_current = Math.floor(audio.currentTime%60)
    audio.volume = volumeControl.value/100
    if(audio.volume === 0){
        volumeButton.src="https://img.icons8.com/ios-filled/20/ffffff/no-audio.png"
    }
    else{
     volumeButton.src="https://img.icons8.com/ios-filled/20/ffffff/high-volume.png"
    }

    if(sec_current<10){
        sec_current="0"+ sec_current
    }
    
    currentTime.innerText=`${min_current}:${sec_current}`
    
})

volumeButton.addEventListener('click',()=>{
  if(volumeControl.value > 0){
        volumeControl.value = 0
        volumeButton.src="https://img.icons8.com/ios-filled/20/ffffff/no-audio.png"
    }
    else {
        volumeControl.value = 90
        volumeButton.src="https://img.icons8.com/ios-filled/20/ffffff/high-volume.png"
    }
})

progressBar.addEventListener('input',()=>{
    audio.currentTime = (progressBar.value/100)*audio.duration
})



pausePlayButton.addEventListener('click',()=>{
   

        if(audio.paused){
            audio.play()
            pausePlayButton.src="https://img.icons8.com/material-outlined/30/ffffff/circled-pause.png"
    
        }
        else{
            audio.pause()
            pausePlayButton.src="https://img.icons8.com/material-outlined/30/ffffff/play-button-circled--v1.png"
        }
       
    
   
  
})


function saveAndRender(){
    save()
    render()
}

function save(){

    
    localStorage.setItem(LOCAL_STORAGE_SELECTEDLISTID_KEY, selectedListId)
}

function renderSongs(){

    audiolist.forEach(list =>{

      const nameList = document.createElement('li')
      nameList.innerText= list.name
      nameList.classList="lists"
      nameList.dataset.id = audiolist.indexOf(list)
      nameList.dataset.src = list.src
      if(nameList.dataset.id===selectedListId){

          nameList.classList.add("active-list")

      }

      audioList.appendChild(nameList)


    })
   
}

nextButton.addEventListener('click',()=>{
    if(parseInt(selectedListId)+1===audiolist.length){
        selectedListId = -1
    }
    var src = audiolist[parseInt(selectedListId)+1].src
    audio.src=src
    audio.play()
    selectedListId =(parseInt(selectedListId)+1).toString()
    saveAndRender()
})
  
previousButton.addEventListener('click',()=>{
    if(parseInt(selectedListId)===0){
        selectedListId = audiolist.length.toString()
    }
    var src = audiolist[parseInt(selectedListId)-1].src
    audio.src=src
    audio.play()
    selectedListId =(parseInt(selectedListId)-1).toString()
    saveAndRender()
})



audioList.addEventListener('click' , e=>{

    pausePlayButton.src="https://img.icons8.com/material-outlined/30/ffffff/circled-pause.png"

    if(e.target.tagName.toLowerCase()==='li')
    {
       selectedListId = e.target.dataset.id
       audioFile = e.target.dataset.src
       audio.src=audioFile
       audio.play()
       
       saveAndRender()
    }
  
})


function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}


function render()
{
    clearElement(audioList)
    renderSongs()
    
}


render()