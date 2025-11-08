import './styles/style.css'
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

const BOARD_WIDTH = 5
const DATA_RANDOM = ['Hello', 'House', 'SOTAY', 'Jikqa', 'Codin', 'LIQUA']

function generateProgrammingWords(larger) {
    const programmingWords = [
        "react", "hooks", "array", "class", "const", "await", "async",
        "while", "break", "catch", "throw", "debug", "input", "fetch",
        "parse", "print", "bytes", "token", "query", "props", "scope",
        "regex", "event", "field", "types", "stack", "union", "index",
        "cache", "model", "table", "build", "style", "route", "nodes",
        "proxy", "error", "shell", "linux", "patch", "state", "login",
        "admin", "delta", "shift", "theme", "flush", "tools", "merge",
        "tests", "coder", "logic", "value", "entry", "focus", "trace",
        "https", "proxy", "token", "local", "inner", "outer", "macro"
    ];

    // Filtrar por tamaño si lo deseas
    const filtered = programmingWords.filter(word => word.length <= larger);

    // Generar 10 palabras aleatorias
    const words = [];
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * filtered.length);
        words.push(filtered[randomIndex]);
    }

    return words;
}

const solution = generateProgrammingWords(5)[Math.floor(Math.random() * 10)];

export default function App() {
    console.warn(solution);
    const [widthBoard, setWithBoard] = useState(0)
    const [keysWords, setKeysWords] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [heightBoard, setHeightBoard] = useState(Array(widthBoard).fill(null))
    const [inputValue, setInputValue] = useState("");

    const handleEventKeyPress = (event) => {
        const key = event.key;
        if (key === 'Backspace') {
            setKeysWords((prev) => prev.slice(0, -1));
            return;
        }
        if (key === 'Enter' && keysWords.length === 5) {
            const newBoardHight = [...heightBoard];
            newBoardHight[heightBoard.findIndex(value => value === null)] = keysWords;
            //BOARD_HIGTH = newBoardHight
            setHeightBoard([...newBoardHight])
            setKeysWords([])
        }

        if (keysWords.length >= 5) return;

        if (/^[a-zñ]$/i.test(key)) {
            setKeysWords((prev) => [...prev, key]);
        }
        const isCorrect = solution === keysWords.join('')
        if (isCorrect) {
            setGameOver(true)
        }
    };

    const handleRestart = () => {
        setHeightBoard(Array(widthBoard).fill(null))
        setKeysWords([])

    }

    useEffect(() => {
        window.addEventListener('keydown', handleEventKeyPress)
        return () => window.removeEventListener('keydown', handleEventKeyPress)
    }, [keysWords])

    useEffect(() => {
        setHeightBoard(Array(widthBoard).fill(null))
    }, [widthBoard])

    return (
        <>
            <main>
                {
                    widthBoard === 0
                        ?
                        <div className='choose-level'>
                            <label>What level do you want to play?</label>
                            <input type='number'
                                min={1}
                                max={10}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <span style={{ fontSize: '12px' }}>The lower the number, the more difficult it will be.</span>
                            <button className='btn-start' onClick={() => setWithBoard(parseInt(inputValue, 10))} > Start</button>
                        </div>
                        :
                        <>
                            <div>
                                <h1 className='title'>Guess the Word 🎩</h1>
                                <section className='game'>
                                    {
                                        heightBoard.map((chars, index) => {
                                            const isCurrentRow = index === heightBoard.findIndex(val => val === null)
                                            return <Line
                                                key={index}
                                                letters={isCurrentRow ? keysWords : chars ?? ''}
                                                isFinal={!isCurrentRow && chars != null}
                                                solution={solution}
                                                index={index}
                                                widthBoard={widthBoard}
                                            />
                                        })
                                    }
                                </section>
                            </div>
                            <div className='container-result'>
                                <button onClick={handleRestart} className='btn-restart'>Reiniciar</button>
                                <div className='container-result-solution'>
                                    {

                                        solution.split('').map((letter, index) => {
                                            const exitsLetter = heightBoard.filter(item => item != null).flat().includes(letter)
                                            const isVissible = keysWords.includes(letter) || exitsLetter
                                            return (
                                                <div key={index} className={`tile-solution`}>
                                                    <span style={{ opacity: isVissible ? 1 : 0 }}> {letter}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                }
            </main>
            <Footer />
        </>
    )
}

function Line({ letters = [], isFinal, solution, widthBoard }) {
    const tiles = []
    for (let i = 0; i < BOARD_WIDTH; i++) {
        const char = letters[i]
        const className = char === solution[i] ?
            'correct'
            : solution.includes(char) ?
                'close'
                : char === null ? ''
                    : char != undefined ?
                        'incorrect' : ''

        tiles.push(<div key={i} className={`tile ${className}`}>{char}</div>)
    }
    return (
        <div className='line'>{tiles}</div>
    )
}