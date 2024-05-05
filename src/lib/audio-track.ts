import WaveSurfer from 'wavesurfer.js'

const IS_PLAYING_ATTR_NAME = 'data-is-playing'

function createAudioTrack(trackId: string) {
    const barEl = document.querySelector(`#${trackId}-bar`)
    const buttonEl = document.querySelector(`#${trackId}-button`)

    console.log('barEl', barEl)
    console.log('buttonEl', buttonEl)

    if (!barEl || !buttonEl) return

    const ctx = document.createElement('canvas').getContext('2d')

    if (!ctx) return

    const gradient = ctx.createLinearGradient(0, 0, 0, 60)
    gradient.addColorStop(0, '#0EF0A8')
    gradient.addColorStop(1, '#0958FA')

    const audio = WaveSurfer.create({
        container: `#${trackId}-bar`,
        barWidth: 2,
        height: 'auto',
        progressColor: gradient,
        waveColor: '#888888',
        barGap: 2,
        barRadius: 2,
        url: `/public/assets/audio/${trackId}.wav`,
        cursorWidth: 0,
        normalize: true,
    })

    document.querySelector(`#${trackId}-button`)?.addEventListener('click', () => {
        audio.playPause()
    })

    audio.on('play', () => {
        buttonEl.setAttribute(IS_PLAYING_ATTR_NAME, 'true')
    })
    audio.on('pause', () => {
        buttonEl.setAttribute(IS_PLAYING_ATTR_NAME, 'false')
    })
    audio.on('finish', () => {
        buttonEl.setAttribute(IS_PLAYING_ATTR_NAME, 'false')
    })
}

document.addEventListener('DOMContentLoaded', () => {

    createAudioTrack('male-sound-1')
    createAudioTrack('male-sound-2')
    createAudioTrack('female-sound-1')
    createAudioTrack('female-sound-2')
    createAudioTrack('anime-sound-1')
    createAudioTrack('kid-sound-1')
})
