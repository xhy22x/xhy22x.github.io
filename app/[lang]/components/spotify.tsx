'use client';
import { useEffect, useRef, useState } from 'react';

type SpotifyController = {
    restart: () => void
    resume: () => void
    pause: () => void
    destroy: () => void
}

type SpotifyApi = {
    createController: (
        element: HTMLElement,
        options: {
            uri: string
            width: string
            height: string
            theme: string
        },
        callback: (controller: SpotifyController) => void
    ) => void
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyApi) => void
  }
}

let spotifyApiPromise: Promise<SpotifyApi> | null = null

function loadSpotifyApi(): Promise<SpotifyApi> {
    if (!spotifyApiPromise) {
        spotifyApiPromise = new Promise((resolve, reject) => {

            window.onSpotifyIframeApiReady = resolve

            const script = document.createElement("script")
            script.src = "https://open.spotify.com/embed/iframe-api/v1"
            script.async = true

            script.onerror = () => {
                spotifyApiPromise = null
                reject(new Error("Unable to load Spotify API"))
            }

            document.body.appendChild(script)
        })
    }

    return spotifyApiPromise
}

export default function Spotify() {
    const [open, setOpen] = useState(false)
    const popupRef = useRef<HTMLDivElement>(null)
    const container = useRef<HTMLDivElement>(null)
    const player = useRef<any>(null)

    useEffect(() => {
      let cancelled = false
      let controller: SpotifyController | null = null
      
      loadSpotifyApi().then((api) => {
        if (cancelled || !container.current) return

        api.createController(
          container.current,
          { uri: 'spotify:playlist:6DxuTf7rpJdnni4hGnlNLq', width: '100%', height: '352', theme: 'dark' },
          (createdController) => {
            if (cancelled) {createdController.destroy(); return}
            controller = createdController
            player.current = createdController
          }
        )
      }).catch(console.error)
    
      return () => {
        cancelled = true
        controller?.destroy()
        if (player.current === controller) player.current = null
      }
    }, [])

    useEffect(() => {
      if (!open) return
      
      const timer = setTimeout(() => {
        setOpen(false)
      }, 15000);

      function handleClick(event: MouseEvent) {
        const target = event.target as Node
        const clickedInside = popupRef.current?.contains(target)
        if (!clickedInside) setOpen(false)
      }

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') setOpen(false)
      }

      document.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleKeyDown);
      }
    }, [open])

    return (
      <>
        {/* custom music controls */}
        <div className='flex flex-wrap justify-center items-center gap-3 xl:gap-8 mb-7'>
          <button className='font-bold text-sm border-2 border-white hover:bg-white hover:text-black duration-800 px-4 py-2' onClick={() => player.current?.restart()}>↻ RESTART</button>
          <button className='font-bold text-sm border-2 border-white hover:bg-white hover:text-black duration-800 px-4 py-2' onClick={() => player.current?.resume()}>▶ PLAY</button>
          <button className='font-bold text-sm border-2 border-white hover:bg-white hover:text-black duration-800 px-4 py-2' onClick={() => player.current?.pause()}>Ⅱ PAUSE</button>
        </div>

        {/* spotify popup */}
        <div ref={popupRef} className={`fixed bottom-15 right-6 z-50 w-[min(350px,calc(100vw-2.5rem))] border border-white/75 bg-[#111] px-4 pt-4 pb-2 transition-all duration-700 ease-in-out ${open ? 'visible pointer-events-auto opacity-100 translate-y-0' : 'invisible pointer-events-none opacity-0 translate-y-2'}`}>
          {/* header */}
          <div className='flex items-center justify-between border-b border-dashed border-[#777] pb-2 mb-3'>
            <p className='font-pixel text-[9px] text-white/70 uppercase'>/ now playing</p>
            <button type="button" className='font-bold text-xs text-white/70 hover:text-white duration-300 pb-1' onClick={() => setOpen(false)}>[ X ]</button>
          </div>
          {/* spotify iframe */}
          <div className='relative border border-white/45'>
            <div className='absolute inset-x-0 top-0 h-[180px] bg-white/6' />
            <div className='relative h-90'>
              <div ref={container} className='h-full' />
              {/*<iframe data-testid="embed-iframe" src="https://open.spotify.com/embed/playlist/6DxuTf7rpJdnni4hGnlNLq?utm_source=generator&theme=0&si=4fae94761e69491c" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>*/}
            </div>
          </div>
          {/* spotify link */}
          <a href="https://open.spotify.com/playlist/6DxuTf7rpJdnni4hGnlNLq" target="_blank" rel="noopener noreferrer" className='font-bold underline underline-offset-4 uppercase text-[9px] text-white/80 hover:text-white duration-300'>
            ↗ open in spotify
          </a>
        </div>
        
        <button className='fixed bottom-6 right-6 z-50 cursor-pointer shadow-[0_0_5px_2px_rgba(255,255,255,0.15)] bg-black border border-white text-xl w-12 h-12' onClick={() => {const willOpen = !open; setOpen(willOpen); if (willOpen) player.current?.resume();}}>♫</button>
      </>
    )
}