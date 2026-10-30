'use client';
import { useEffect, useState } from "react";

const commands = [
    "whoami",
    "ls",
    "cat about.txt",
    "curl ipinfo.io/json"
]

const outputs = [
    ["Not a hacker. Yet"],
    ["about.txt"],
    [
        "Name: Celia XU",
        "Role: Cybersecurity Student at Oteria",
        "Interests: Cybersecurity, Programming, Gaming, Music, Drawing",
        "Practice: TryHackMe, Root-Me"
    ],
    [
        "{",
        '  "city": "Paris",',
        '  "region": "Île-de-France",',
        '  "country": "FR",',
        '  "loc": "48.8566,2.3522",',
        '  "timezone": "Europe/Paris"',
        "}"
    ]
]

export default function Terminal(){
    const [history, setHistory] = useState<{ command?: string; lines: string[] }[]>([])
    const [currentCommand, setCurrentCommand] = useState('')
    const [showPrompt, setShowPrompt] = useState(false)
    const [showTyping, setShowTyping] = useState(false)

    useEffect(() => {
        let commandIndex = 0
        let timeout: ReturnType<typeof setTimeout>
        let interval: ReturnType<typeof setInterval>

        function runCommand() {
            if (commandIndex >= commands.length) {
                setShowPrompt(true)
                return
            }

            const command = commands[commandIndex]
            const output = outputs[commandIndex]

            let charIndex = 0
            setShowTyping(true)
            setCurrentCommand('')

            timeout = setTimeout(() => {
                interval = setInterval(() => {
                    charIndex++
                    setCurrentCommand(command.slice(0, charIndex))

                    if (charIndex >= command.length) {
                        clearInterval(interval)

                        setTimeout(() => {
                            setHistory(prev => [
                                ...prev,
                                { command, lines: output }
                            ])
                            setCurrentCommand('')
                            commandIndex++
                            timeout = setTimeout(runCommand, 10)
                            setShowTyping(false)
                        }, 450)
                    }
                }, 80)
            }, 700)
        }
        timeout = setTimeout(runCommand, 1000)

        return () => {
            clearTimeout(timeout)
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="whitespace-pre-wrap">
            {history.map((entry, index) => (
                <div key={index}>
                    <div className="font-bold">
                        <span className="text-red-800 drop-shadow-[0_0_1px_rgba(153,27,27,0.5)] pr-2">
                            root@xhy22x:~$
                        </span>
                        {entry.command}
                    </div>

                    {entry.lines.map((line, i) => (
                        <div key={i} className="text-gray-300">
                            {line}
                        </div>
                    ))}
                </div>
            ))}
            {showTyping && (
                <div className="font-bold">
                    <span className="text-red-800 drop-shadow-[0_0_1px_rgba(153,27,27,0.5)] pr-2">
                        root@xhy22x:~$
                    </span>
                    {currentCommand}
                    <span className="cursor" />
                </div>    
            )}
            {showPrompt && (
                <div className="flex items-center">
                    <span className="font-bold text-red-800 drop-shadow-[0_0_1px_rgba(153,27,27,0.5)] pr-2">
                        root@xhy22x:~$
                    </span>
                    <span className="cursor" />
                </div>
            )}
        </div>
    )
}