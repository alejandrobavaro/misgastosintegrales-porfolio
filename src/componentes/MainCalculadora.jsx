import React, { useState, useEffect, useRef } from 'react';
import '../assets/scss/_03-Componentes/_MainCalculadora.scss';

const MainCalculadora = () => {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState([]);
  const [soundOn, setSoundOn] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const equalButtonRef = useRef(null); // Ref para el botón "="
  const ceButtonRef = useRef(null); // Ref para el botón "CE"

  const playSound = () => {
    if (soundOn) {
      const audio = new Audio('/audio/calculadora/sonidocalculadora.mp3');
      audio.play();
    }
  };

  const handleClick = (value) => {
    playSound();
    setDisplay(prev => prev + value);
    setActiveKey(value);
    setTimeout(() => setActiveKey(null), 200);
  };

  const handleClear = () => {
    playSound();
    setDisplay('');
  };

  const handleCalculate = () => {
    try {
      const formattedDisplay = display.replace(/[^0-9+\-*/().]/g, '');
      const result = Function('"use strict"; return (' + formattedDisplay + ')')();
      if (result !== undefined && !isNaN(result)) {
        setHistory(prev => [...prev, `${display} = ${result}`]);
        setDisplay(result.toString());
      } else {
        setDisplay('Error');
      }
    } catch (e) {
      setDisplay('Error');
    }
    playSound();
  };

  const handlePercentage = () => {
    try {
      const formattedDisplay = display.replace(/[^0-9+\-*/().]/g, '');
      const result = eval(formattedDisplay) / 100;
      setDisplay(result.toString());
    } catch (e) {
      setDisplay('Error');
    }
    playSound();
  };

  const handleSquareRoot = () => {
    try {
      const formattedDisplay = display.replace(/[^0-9+\-*/().]/g, '');
      const result = Math.sqrt(eval(formattedDisplay));
      setDisplay(result.toString());
    } catch (e) {
      setDisplay('Error');
    }
    playSound();
  };

  const handleMemoryAdd = () => {
    localStorage.setItem('memory', display);
    playSound();
  };

  const handleMemoryRecall = () => {
    setDisplay(localStorage.getItem('memory') || '');
    playSound();
  };

  const handleMemoryClear = () => {
    localStorage.removeItem('memory');
    playSound();
  };

  const handleSoundToggle = () => {
    setSoundOn(prev => !prev);
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    if (key === 'Enter') {
      event.preventDefault();
      if (equalButtonRef.current) {
        equalButtonRef.current.click(); // Simula un clic en el botón "="
      }
    } else if (key === 'Backspace') {
      setDisplay(prev => prev.slice(0, -1));
    } else if (key === 'Escape') {
      handleClear();
    } else if (key === '%') {
      handlePercentage();
    } else if (key === 'ArrowUp') {
      handleMemoryRecall();
    } else if (key === 'ArrowDown') {
      handleMemoryClear();
    } else if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
      handleClick(key);
    }

    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 200);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="calculator-container">
      <div className="calculator-body">
        <div className="calculator-display">
          <div className="outer-display-container">
            <div className="inner-display-container">
              <input 
                type="text" 
                className="display" 
                value={display} 
                onChange={(e) => setDisplay(e.target.value)} 
                readOnly 
              />
            </div>
          </div>
        </div>
        <div> 
        <div className="calculator-buttons">
          <button className={`buttonlogo ${activeKey === 'logo' ? 'active' : ''}`}><img src="/img/01-favicon/logo1.ico" alt="logochancho1" /></button>
          <button className={`button operator ${activeKey === '√' ? 'active' : ''}`} onClick={handleSquareRoot}>√</button>
          <button className={`button operator ${activeKey === '/' ? 'active' : ''}`} onClick={() => handleClick('/')}>÷</button>
          <button className={`button operator ${activeKey === '*' ? 'active' : ''}`} onClick={() => handleClick('*')}>x</button>
          <button className={`button operator ${activeKey === '-' ? 'active' : ''}`} onClick={() => handleClick('-')}>-</button>
          <button className={`button operator ${activeKey === '%' ? 'active' : ''}`} onClick={handlePercentage}>%</button>

          <button className={`button special simbolocombinado turnoffsound ${soundOn ? 'sound-on' : 'sound-off'}`} onClick={handleSoundToggle}>
            {soundOn ? '🔊' : '🔈'}
          </button>
          <button className={`button number ${activeKey === '7' ? 'active' : ''}`} onClick={() => handleClick('7')}>7</button>
          <button className={`button number ${activeKey === '8' ? 'active' : ''}`} onClick={() => handleClick('8')}>8</button>
          <button className={`button number ${activeKey === '9' ? 'active' : ''}`} onClick={() => handleClick('9')}>9</button>
          <button className={`button simbolocombinado ${activeKey === '+' ? 'active' : ''}`} onClick={() => handleClick('+')}>+</button>
          <button className={`button operator ${activeKey === 'MC' ? 'active' : ''}`} onClick={handleMemoryClear}>MC</button>

          <button className={`button number ${activeKey === '4' ? 'active' : ''}`} onClick={() => handleClick('4')}>4</button>
          <button className={`button number ${activeKey === '5' ? 'active' : ''}`} onClick={() => handleClick('5')}>5</button>
          <button className={`button number ${activeKey === '6' ? 'active' : ''}`} onClick={() => handleClick('6')}>6</button>
    
          <button className={`button operator ${activeKey === 'MR' ? 'active' : ''}`} onClick={handleMemoryRecall}>MR</button>

          <button 
            className={`button clear simbolocombinado ${activeKey === 'CE' ? 'active' : ''}`} 
            onClick={handleClear}
            ref={ceButtonRef} // Añade el ref aquí
          >
            CE
          </button>




          <button className={`button number ${activeKey === '1' ? 'active' : ''}`} onClick={() => handleClick('1')}>1</button>
          <button className={`button number ${activeKey === '2' ? 'active' : ''}`} onClick={() => handleClick('2')}>2</button>
          <button className={`button number ${activeKey === '3' ? 'active' : ''}`} onClick={() => handleClick('3')}>3</button>

          <button 
            className={`button operator equal simbolocombinado ${activeKey === 'Enter' ? 'active' : ''}`} 
            onClick={handleCalculate}
            ref={equalButtonRef} // Añade el ref aquí
          >
            =
          </button>
          
          <button className={`button operator ${activeKey === 'M-' ? 'active' : ''}`} onClick={() => handleClick('M-')}>M-</button>

          <button className={`button number simbolocombinado2 ${activeKey === '0' ? 'active' : ''}`} onClick={() => handleClick('0')}>0</button>
          <button className={`button specialComa ${activeKey === ',' ? 'active' : ''}`} onClick={() => handleClick(',')}>,</button>
         
          <button className={`button operator ${activeKey === 'M+' ? 'active' : ''}`} onClick={() => handleClick('M+')}>M+</button>
        </div>

        <hr />
        <p className='textoAtajosTeclado'>Accesos Rapidos del teclado: Puedes usar todos los numeros y operadores del teclado numerico del teclado. Tambien puede usar la tecla Escape para que se limpie el display de los calculos, como si estuvieras dandole clic al boton CE. Tembien el boton Enter, te imprimira el resultado en la Ticketera Historial. </p></div>
      </div>

      <div className="calculator-history">
  <p className='tituloCalculadora'>Historial Calculadora</p>
  <ul className="history-list">
    {history.map((item, index) => (
      <li key={index} className="history-item">{item}</li>
    ))}
  </ul>
</div>


    </div>
  );
};

export default MainCalculadora;
