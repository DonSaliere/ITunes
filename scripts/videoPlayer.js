import { addZero } from './supScrip.js'

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoFullscreen = document.querySelector('.fa-external-link');

    const videoVolueUp = document.querySelector('.fa-volume-up');
    const videoVolueDown = document.querySelector('.volumeDown');

    let prevVolume = 1;
    


    const toggleICon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }
    }
    const togglePlayer = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    videoPlayer.addEventListener('click', togglePlayer);
    videoButtonPlay.addEventListener('click', togglePlayer);

    videoPlayer.addEventListener('play', toggleICon);
    videoPlayer.addEventListener('pause', toggleICon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;

    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoPlayerInit.stop = () => {
       if(!videoPlayer.paused){
        stopPlay();
       }
    };

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.webkitEnterFullScreen();
    })

    videoVolume.addEventListener('input' , () => {
        videoPlayer.volume = videoVolume.value / 100;
        prevVolume =  videoVolume.value; 
    })

    videoVolume.value =  videoPlayer.volume * 100;

    videoVolueDown.addEventListener('click', () => {
       
        if( videoVolume.value != 0) {
            prevVolume =  videoVolume.value; 
            videoPlayer.volume = 0;
            videoVolume.value =  0;
            videoVolueDown.classList.remove('fa-volume-down');
            videoVolueDown.classList.add('fa-volume-off');
        } else {
            videoVolume.value = prevVolume
            videoPlayer.volume = videoVolume.value / 100;
            videoVolueDown.classList.remove('fa-volume-off');
            videoVolueDown.classList.add('fa-volume-down');
        }
       
    });

    videoVolueUp.addEventListener('click', () => {
        videoPlayer.volume = 1;
        videoVolume.value =  100;
    });
};