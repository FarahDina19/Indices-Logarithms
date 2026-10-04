import React, { useState, useEffect } from 'react';
import { Calculator, AlertTriangle, BookOpen, Brain, Target, Zap, Check, X, Eye, EyeOff, RefreshCw, ChevronRight, Lightbulb } from 'lucide-react';

const LogarithmsLearningApp = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('definition');
  const [base, setBase] = useState(2);
  const [value, setValue] = useState(8);
  const [result, setResult] = useState(3);
  const [showWorkings, setShowWorkings] = useState({});
  const [currentExercise, setCurrentExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  // Calculate logarithm when base and value change
  useEffect(() => {
    if (base > 0 && base !== 1 && value > 0) {
      const logResult = Math.log(value) / Math.log(base);
      setResult(Number(logResult.toFixed(4)));
    }
  }, [base, value]);

  // Helper functions
  const subscript = (num) => {
    const map = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
    return String(num).split('').map(d => map[d] || d).join('');
  };

  const superscript = (num) => {
    const map = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '.': '·' };
    return String(num).split('').map(d => map[d] || d).join('');
  };

  const toggleWorking = (id) => {
    setShowWorkings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Generate exercise
  const generateExercise = (type) => {
    let exercise;
    switch(type) {
      case 'simplify':
        const bases = [2, 3, 5, 10];
        const b = bases[Math.floor(Math.random() * bases.length)];
        const x = Math.floor(Math.random() * 20) + 10;
        const y = Math.floor(Math.random() * 10) + 5;
        exercise = {
          type: 'simplify',
          question: `log${subscript(b)}(${x}) + log${subscript(b)}(${y})`,
          answer: `log${subscript(b)}(${x * y})`,
          solution: `Guna Product Law: log${subscript(b)}(${x}) + log${subscript(b)}(${y}) = log${subscript(b)}(${x}×${y}) = log${subscript(b)}(${x * y})`
        };
        break;
      case 'evaluate':
        const evalBases = [2, 3, 10];
        const eb = evalBases[Math.floor(Math.random() * evalBases.length)];
        const exp = Math.floor(Math.random() * 4) + 2;
        const val = Math.pow(eb, exp);
        exercise = {
          type: 'evaluate',
          question: `log${subscript(eb)}(${val})`,
          answer: String(exp),
          solution: `Sebab ${eb}${superscript(exp)} = ${val}, maka log${subscript(eb)}(${val}) = ${exp}`
        };
        break;
    }
    setCurrentExercise(exercise);
    setUserAnswer('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!currentExercise) return;
    const correct = userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase().replace(/\s/g, '');
    setFeedback({
      correct,
      message: correct ? '✓ Betul!' : '✗ Cuba lagi!',
      solution: currentExercise.solution
    });
    if (correct) setCorrectCount(correctCount + 1);
  };

  // Tab 1: Definition (Simplified Concrete-Visualize-Symbol)
  const DefinitionTab = () => (
    <div className="space-y-6">
      {/* Quick Definition */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-4">📖 Definisi Logarithm</h2>
        <div className="bg-white/20 p-4 rounded-lg mb-4">
          <p className="text-2xl font-bold text-center">
            log<sub>b</sub>(x) = y ⟺ b<sup>y</sup> = x
          </p>
        </div>
        <p className="text-lg">
          Logarithm menjawab: <span className="font-black">"Base kepada kuasa BERAPA = Value?"</span>
        </p>
      </div>

      {/* Concrete Example */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-300">
        <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          🧱 Contoh Konkrit
        </h3>
        <div className="bg-orange-50 p-4 rounded-lg mb-3">
          <p className="text-gray-700 mb-2">📱 Phone storage: 1GB → 2GB → 4GB → 8GB</p>
          <p className="text-gray-700">Setiap upgrade multiply dengan <span className="font-bold text-orange-600">2</span></p>
          <p className="text-gray-700 mt-2">🤔 Soalan: Berapa kali upgrade dari 1GB ke 8GB?</p>
        </div>
        <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-4 rounded-lg">
          <p className="text-xl font-bold">Jawapan: log₂(8) = 3 kali upgrade</p>
        </div>
      </div>

      {/* Interactive Box Notation */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-300">
        <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-2">
          <Calculator className="w-7 h-7" />
          Interactive Box Notation
        </h3>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-4 border-2 border-blue-200">
          <p className="text-sm font-bold text-blue-800 mb-2">📝 Cara Guna:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Isi mana-mana 2 boxes (BASE, EXPONENT/RESULT, atau VALUE)</li>
            <li>• Box ketiga akan dikira secara automatik</li>
            <li>• <span className="font-bold text-purple-600">Bentuk ATAS:</span> Exponent box lebih tinggi (superscript)</li>
            <li>• <span className="font-bold text-blue-600">Bentuk BAWAH:</span> Base box lebih rendah (subscript)</li>
            <li>• Cuba contoh di bawah untuk mula!</li>
          </ul>
        </div>

        {/* Exponential Form - Top Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6 border-2 border-blue-200">
          <div className="flex items-end justify-center gap-8 mb-4 flex-wrap">
            {/* Base Box - Large, slightly lower position */}
            <div className="text-center" style={{ marginBottom: '10px' }}>
              <p className="text-sm font-bold text-blue-600 mb-2">BASE (a)</p>
              <input
                type="number"
                value={base || ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setBase(val || 0);
                }}
                className="w-28 h-28 text-4xl font-bold text-center border-4 border-blue-500 rounded-xl bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
                placeholder="a"
                min="0.1"
                step="0.5"
              />
            </div>

            {/* Exponent - Higher position (superscript style) */}
            <div className="flex flex-col items-center relative" style={{ marginBottom: '70px' }}>
              <div className="absolute -left-10 top-6 text-purple-400 text-xs">↗</div>
              <p className="text-sm font-bold text-purple-600 mb-2">EXPONENT (x)</p>
              <input
                type="number"
                value={result || ''}
                onChange={(e) => {
                  const newResult = parseFloat(e.target.value);
                  setResult(newResult || 0);
                  if (base > 0 && base !== 1 && newResult) {
                    setValue(Math.pow(base, newResult));
                  }
                }}
                className="w-16 h-16 text-2xl font-bold text-center border-3 border-purple-400 rounded-lg bg-purple-50 focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                placeholder="x"
                step="0.5"
              />
              <p className="text-xs text-purple-500 mt-1">kuasa</p>
            </div>

            {/* Equals */}
            <div className="text-5xl font-bold text-gray-600" style={{ marginBottom: '10px' }}>=</div>

            {/* Result Box - Large */}
            <div className="text-center" style={{ marginBottom: '10px' }}>
              <p className="text-sm font-bold text-green-600 mb-2">RESULT (y)</p>
              <input
                type="number"
                value={value || ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setValue(val || 0);
                }}
                className="w-28 h-28 text-4xl font-bold text-center border-4 border-green-500 rounded-xl bg-white focus:border-green-600 focus:ring-2 focus:ring-green-300"
                placeholder="y"
                min="0.1"
                step="0.5"
              />
            </div>
          </div>

          {/* Explanation */}
          <div className="text-center text-gray-700 text-sm bg-white p-3 rounded-lg border border-gray-200">
            <p className="mb-1">
              💡 <span className="font-semibold">Perhatikan:</span> <span className="text-blue-600 font-bold text-lg">{base}</span><sup className="text-purple-600 font-bold text-base">{result}</sup> <span className="font-bold">=</span> <span className="text-green-600 font-bold text-lg">{value}</span>
            </p>
            <p className="text-xs text-gray-500">(Exponent box lebih tinggi - posisi superscript)</p>
          </div>
        </div>

        {/* Double Arrow Section */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl px-12 py-6 text-center">
            <div className="text-5xl text-blue-600 mb-2">⇅</div>
            <div className="text-base font-bold text-blue-700">SAMA MAKSUD</div>
            <div className="text-xs text-gray-600 mt-1">Dua bentuk yang setara</div>
          </div>
        </div>

        {/* Logarithmic Form - Bottom Section */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border-2 border-orange-200">
          <div className="text-center mb-2">
            <p className="text-sm font-bold text-gray-700">🔽 <span className="font-bold">Bentuk Logarithm (Logarithmic Form)</span></p>
            <p className="text-xs text-blue-600 italic">Base ditulis kecil di BAWAH sebelah kanan 'log'</p>
          </div>
          
          <div className="flex items-start justify-center gap-4 mb-4 flex-wrap">
            {/* Log text + Base subscript */}
            <div className="flex items-start gap-1 relative">
              <div className="text-6xl font-bold text-orange-600" style={{ fontFamily: 'serif', marginTop: '8px' }}>log</div>
              <div className="flex flex-col items-center" style={{ marginTop: '45px' }}>
                <div className="text-center">
                  <div className="absolute -left-8 top-16 text-blue-400 text-xs">↘</div>
                  <p className="text-xs font-bold text-gray-600 mb-1">BASE</p>
                  <div className="w-14 h-14 text-lg font-bold flex items-center justify-center border-3 border-gray-400 rounded-lg bg-gray-100">
                    {base || '□'}
                  </div>
                  <p className="text-xs text-blue-500 mt-1">asas</p>
                </div>
              </div>
            </div>

            {/* Value in parentheses */}
            <div className="flex items-center gap-1" style={{ marginTop: '8px' }}>
              <span className="text-5xl text-gray-700">(</span>
              <div className="text-center">
                <p className="text-sm font-bold text-green-600 mb-2">VALUE</p>
                <div className="w-28 h-28 text-4xl font-bold flex items-center justify-center border-4 border-green-500 rounded-xl bg-green-100">
                  {value || '□'}
                </div>
              </div>
              <span className="text-5xl text-gray-700">)</span>
            </div>

            {/* Equals */}
            <div className="text-5xl font-bold text-gray-600" style={{ marginTop: '50px' }}>=</div>

            {/* Result Box */}
            <div className="text-center" style={{ marginTop: '8px' }}>
              <p className="text-sm font-bold text-purple-600 mb-2">RESULT</p>
              <div className="w-28 h-28 text-4xl font-bold flex items-center justify-center border-4 border-purple-500 rounded-xl bg-purple-100">
                {result !== null && result !== 0 ? result : '□'}
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="text-center text-gray-700 text-sm bg-white p-3 rounded-lg border border-gray-200">
            <p className="mb-1">
              💭 <span className="font-semibold">Soalan:</span> <span className="text-orange-600 font-bold">log<sub className="text-blue-600">{base}</sub></span><span className="text-green-600 font-bold text-lg">({value})</span> = ?
            </p>
            <p className="mb-1">
              ✅ <span className="font-semibold">Jawapan:</span> <span className="text-purple-600 font-bold text-lg">{result}</span>
            </p>
            <p className="text-xs text-gray-500">(Base box lebih rendah - posisi subscript)</p>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="mt-6">
          <p className="text-sm font-bold text-gray-700 mb-3 text-center">🚀 Contoh Pantas:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => { setBase(2); setValue(8); setResult(3); }}
              className="bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 p-4 rounded-xl text-base font-bold text-blue-800 transition-all hover:scale-105 shadow-md"
            >
              <span>2<sup>3</sup> = 8</span>
            </button>
            <button
              onClick={() => { setBase(3); setValue(27); setResult(3); }}
              className="bg-gradient-to-br from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 p-4 rounded-xl text-base font-bold text-green-800 transition-all hover:scale-105 shadow-md"
            >
              <span>3<sup>3</sup> = 27</span>
            </button>
            <button
              onClick={() => { setBase(10); setValue(1000); setResult(3); }}
              className="bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 p-4 rounded-xl text-base font-bold text-purple-800 transition-all hover:scale-105 shadow-md"
            >
              <span>10<sup>3</sup> = 1000</span>
            </button>
            <button
              onClick={() => { setBase(5); setValue(125); setResult(3); }}
              className="bg-gradient-to-br from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300 p-4 rounded-xl text-base font-bold text-pink-800 transition-all hover:scale-105 shadow-md"
            >
              <span>5<sup>3</sup> = 125</span>
            </button>
          </div>
        </div>

        {/* Try Yourself Section */}
        <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border-2 border-indigo-200">
          <p className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
            🎯 Cuba Sendiri:
          </p>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• Isi BASE dengan <strong>4</strong> dan EXPONENT dengan <strong>2</strong>, tengok RESULT</p>
            <p>• Atau isi BASE dengan <strong>2</strong> dan RESULT dengan <strong>16</strong>, tengok EXPONENT</p>
            <p>• Atau cuba nilai sendiri dan lihat hubungan antara kedua-dua bentuk!</p>
            <p className="text-xs text-purple-600 font-bold mt-2 pt-2 border-t border-indigo-200">
              💡 Perhatikan: EXPONENT lebih tinggi ↗ (superscript) | BASE lebih rendah ↘ (subscript)
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Tab 2: Laws of Logarithms (Detailed)
  const LawsTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-2">📜 Undang-undang Logarithms</h2>
        <p className="text-lg opacity-90">Laws untuk simplify dan evaluate logarithmic expressions</p>
      </div>

      {/* Law 1: Product Law */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Product Law (Undang-undang Darab)</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-3">
              <p className="text-2xl font-mono text-center text-blue-700 mb-2">
                log<sub>b</sub>(M × N) = log<sub>b</sub>(M) + log<sub>b</sub>(N)
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800 mb-2">Contoh 1:</p>
                <p className="text-gray-700">log₂(8) = log₂(4 × 2) = log₂(4) + log₂(2) = 2 + 1 = 3</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800 mb-2">Contoh 2:</p>
                <p className="text-gray-700">log₁₀(100) = log₁₀(10 × 10) = log₁₀(10) + log₁₀(10) = 1 + 1 = 2</p>
              </div>

              <button
                onClick={() => toggleWorking('law1')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
              >
                {showWorkings['law1'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showWorkings['law1'] ? 'Sembunyi' : 'Tunjuk'} Working Detail
              </button>

              {showWorkings['law1'] && (
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 space-y-2">
                  <p className="font-bold text-blue-800">Langkah demi langkah:</p>
                  <p className="text-gray-700">Step 1: log₂(8) = log₂(4 × 2)</p>
                  <p className="text-gray-700">Step 2: Guna Product Law: log₂(4 × 2) = log₂(4) + log₂(2)</p>
                  <p className="text-gray-700">Step 3: log₂(4) = 2 sebab 2² = 4</p>
                  <p className="text-gray-700">Step 4: log₂(2) = 1 sebab 2¹ = 2</p>
                  <p className="text-green-700 font-bold">Step 5: Jawapan = 2 + 1 = 3 ✓</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Law 2: Quotient Law */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quotient Law (Undang-undang Bahagi)</h3>
            <div className="bg-purple-50 p-4 rounded-lg mb-3">
              <p className="text-2xl font-mono text-center text-purple-700 mb-2">
                log<sub>b</sub>(M ÷ N) = log<sub>b</sub>(M) - log<sub>b</sub>(N)
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800 mb-2">Contoh 1:</p>
                <p className="text-gray-700">log₂(8) = log₂(16 ÷ 2) = log₂(16) - log₂(2) = 4 - 1 = 3</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800 mb-2">Contoh 2:</p>
                <p className="text-gray-700">log₁₀(10) = log₁₀(100 ÷ 10) = log₁₀(100) - log₁₀(10) = 2 - 1 = 1</p>
              </div>

              <button
                onClick={() => toggleWorking('law2')}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold"
              >
                {showWorkings['law2'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showWorkings['law2'] ? 'Sembunyi' : 'Tunjuk'} Working Detail
              </button>

              {showWorkings['law2'] && (
                <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200 space-y-2">
                  <p className="font-bold text-purple-800">Langkah demi langkah:</p>
                  <p className="text-gray-700">Step 1: log₂(8) = log₂(16 ÷ 2)</p>
                  <p className="text-gray-700">Step 2: Guna Quotient Law: log₂(16 ÷ 2) = log₂(16) - log₂(2)</p>
                  <p className="text-gray-700">Step 3: log₂(16) = 4 sebab 2⁴ = 16</p>
                  <p className="text-gray-700">Step 4: log₂(2) = 1 sebab 2¹ = 2</p>
                  <p className="text-green-700 font-bold">Step 5: Jawapan = 4 - 1 = 3 ✓</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Law 3: Power Law */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-pink-500">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Power Law (Undang-undang Kuasa)</h3>
            <div className="bg-pink-50 p-4 rounded-lg mb-3">
              <p className="text-2xl font-mono text-center text-pink-700 mb-2">
                log<sub>b</sub>(M<sup>n</sup>) = n × log<sub>b</sub>(M)
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800 mb-2">Contoh 1:</p>
                <p className="text-gray-700">log₂(8) = log₂(2³) = 3 × log₂(2) = 3 × 1 = 3</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800 mb-2">Contoh 2:</p>
                <p className="text-gray-700">log₁₀(1000) = log₁₀(10³) = 3 × log₁₀(10) = 3 × 1 = 3</p>
              </div>

              <button
                onClick={() => toggleWorking('law3')}
                className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-semibold"
              >
                {showWorkings['law3'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showWorkings['law3'] ? 'Sembunyi' : 'Tunjuk'} Working Detail
              </button>

              {showWorkings['law3'] && (
                <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200 space-y-2">
                  <p className="font-bold text-pink-800">Langkah demi langkah:</p>
                  <p className="text-gray-700">Step 1: log₂(8) = log₂(2³)</p>
                  <p className="text-gray-700">Step 2: Guna Power Law: log₂(2³) = 3 × log₂(2)</p>
                  <p className="text-gray-700">Step 3: log₂(2) = 1 sebab 2¹ = 2</p>
                  <p className="text-green-700 font-bold">Step 4: Jawapan = 3 × 1 = 3 ✓</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Law 4: Special Cases */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">4</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Special Cases (Kes Khas)</h3>
            <div className="bg-green-50 p-4 rounded-lg space-y-2">
              <p className="text-xl font-mono text-green-700">log<sub>b</sub>(b) = 1</p>
              <p className="text-xl font-mono text-green-700">log<sub>b</sub>(1) = 0</p>
              <p className="text-xl font-mono text-green-700">log<sub>b</sub>(b<sup>n</sup>) = n</p>
            </div>
            
            <div className="space-y-3 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800 mb-2">Contoh:</p>
                <p className="text-gray-700">log₂(2) = 1 sebab 2¹ = 2</p>
                <p className="text-gray-700">log₂(1) = 0 sebab 2⁰ = 1</p>
                <p className="text-gray-700">log₂(2⁵) = 5 sebab 2⁵ = 2⁵</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">📝 Ringkasan Laws</h3>
        <div className="space-y-2 text-sm">
          <p>✓ Darab → Tambah: log(M×N) = log(M) + log(N)</p>
          <p>✓ Bahagi → Tolak: log(M÷N) = log(M) - log(N)</p>
          <p>✓ Kuasa → Multiply: log(M^n) = n × log(M)</p>
          <p>✓ Special: log(b) = 1, log(1) = 0</p>
        </div>
      </div>
    </div>
  );

  // Tab 3: Calculator & Evaluation
  const CalculatorTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Calculator className="w-8 h-8" />
          Evaluate Logarithms Using Calculator
        </h2>
        <p className="text-lg opacity-90">Belajar guna calculator untuk kira logarithms</p>
      </div>

      {/* Calculator Guide */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-300">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🔢 Cara Guna Calculator</h3>
        
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-bold text-green-700 mb-2">Untuk log₁₀ (Common Log):</p>
            <div className="bg-white p-3 rounded border-2 border-green-300">
              <p className="font-mono text-lg">Tekan: LOG → (nombor) → =</p>
              <p className="text-sm text-gray-600 mt-2">Contoh: log₁₀(100) → LOG 100 = 2</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-bold text-blue-700 mb-2">Untuk ln (Natural Log):</p>
            <div className="bg-white p-3 rounded border-2 border-blue-300">
              <p className="font-mono text-lg">Tekan: LN → (nombor) → =</p>
              <p className="text-sm text-gray-600 mt-2">Contoh: ln(e) → LN e = 1</p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-bold text-purple-700 mb-2">Untuk log base lain (contoh log₂):</p>
            <div className="bg-white p-3 rounded border-2 border-purple-300">
              <p className="font-mono text-lg">log₂(8) = log(8) ÷ log(2)</p>
              <p className="text-sm text-gray-600 mt-2">Guna Change of Base Formula</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change of Base Formula */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-300">
        <h3 className="text-xl font-bold text-orange-700 mb-4">🔄 Change of Base Formula</h3>
        
        <div className="bg-orange-50 p-6 rounded-lg mb-4">
          <p className="text-3xl font-mono text-center text-orange-700 mb-3">
            log<sub>b</sub>(M) = <span className="text-xl">log<sub>a</sub>(M) / log<sub>a</sub>(b)</span>
          </p>
          <p className="text-center text-gray-600">Biasanya guna a = 10 atau a = e</p>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-gray-800 mb-2">Contoh 1: Cari log₂(8)</p>
            <div className="space-y-1 text-gray-700">
              <p>Step 1: log₂(8) = log₁₀(8) / log₁₀(2)</p>
              <p>Step 2: = 0.9031 / 0.3010</p>
              <p className="font-bold text-green-600">Step 3: = 3 ✓</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-gray-800 mb-2">Contoh 2: Cari log₅(125)</p>
            <div className="space-y-1 text-gray-700">
              <p>Step 1: log₅(125) = log₁₀(125) / log₁₀(5)</p>
              <p>Step 2: = 2.0969 / 0.6990</p>
              <p className="font-bold text-green-600">Step 3: = 3 ✓</p>
            </div>
          </div>
        </div>
      </div>

      {/* Practice with Calculator */}
      <div className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-xl border-2 border-teal-300">
        <h3 className="text-xl font-bold text-teal-700 mb-4">🎯 Cuba Sendiri</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-bold text-gray-800 mb-2">Soalan: Cari log₃(27) guna calculator</p>
            <div className="bg-teal-50 p-3 rounded mt-2">
              <button
                onClick={() => toggleWorking('calc1')}
                className="text-teal-600 hover:text-teal-800 font-semibold flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Tunjuk Penyelesaian
              </button>
              {showWorkings['calc1'] && (
                <div className="mt-3 space-y-1 text-gray-700">
                  <p>Step 1: log₃(27) = log(27) / log(3)</p>
                  <p>Step 2: = 1.4314 / 0.4771</p>
                  <p className="font-bold text-green-600">Jawapan: = 3</p>
                  <p className="text-sm text-gray-600 mt-2">Verification: 3³ = 27 ✓</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Tab 4: Common & Natural Logarithms
  const CommonNaturalTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-2">🌟 Common & Natural Logarithms</h2>
        <p className="text-lg opacity-90">Logarithms yang paling kerap digunakan</p>
      </div>

      {/* Common Logarithm */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-300">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">📊 Common Logarithm (log₁₀)</h3>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-4">
          <p className="text-xl text-gray-700 mb-3">
            Common log guna <span className="font-bold text-blue-600">base 10</span>
          </p>
          <div className="bg-white p-4 rounded border-2 border-blue-300">
            <p className="text-2xl font-mono text-center text-blue-700">
              log(x) = log₁₀(x)
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">Kalau tak tulis base, maksudnya base 10</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-gray-800 mb-2">Contoh Common Log:</p>
            <p className="text-gray-700">log(10) = 1 sebab 10¹ = 10</p>
            <p className="text-gray-700">log(100) = 2 sebab 10² = 100</p>
            <p className="text-gray-700">log(1000) = 3 sebab 10³ = 1000</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-bold text-blue-800 mb-2">💡 Aplikasi:</p>
            <p className="text-gray-700">• pH level dalam chemistry</p>
            <p className="text-gray-700">• Decibel untuk sound intensity</p>
            <p className="text-gray-700">• Richter scale untuk earthquakes</p>
          </div>
        </div>
      </div>

      {/* Natural Logarithm */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-300">
        <h3 className="text-2xl font-bold text-green-700 mb-4">🌿 Natural Logarithm (ln)</h3>
        
        <div className="bg-green-50 p-6 rounded-lg mb-4">
          <p className="text-xl text-gray-700 mb-3">
            Natural log guna <span className="font-bold text-green-600">base e ≈ 2.718</span>
          </p>
          <div className="bg-white p-4 rounded border-2 border-green-300">
            <p className="text-2xl font-mono text-center text-green-700">
              ln(x) = log<sub>e</sub>(x)
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">e adalah Euler's number</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-gray-800 mb-2">Contoh Natural Log:</p>
            <p className="text-gray-700">ln(e) = 1 sebab e¹ = e</p>
            <p className="text-gray-700">ln(e²) = 2 sebab e² = e²</p>
            <p className="text-gray-700">ln(1) = 0 sebab e⁰ = 1</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-500">
            <p className="font-bold text-green-800 mb-2">💡 Aplikasi:</p>
            <p className="text-gray-700">• Compound interest calculations</p>
            <p className="text-gray-700">• Population growth models</p>
            <p className="text-gray-700">• Radioactive decay</p>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-300">
        <h3 className="text-xl font-bold text-purple-700 mb-4">🔄 Perbandingan</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-100">
                <th className="border-2 border-purple-300 p-3 text-left">Feature</th>
                <th className="border-2 border-purple-300 p-3 text-left">Common Log (log)</th>
                <th className="border-2 border-purple-300 p-3 text-left">Natural Log (ln)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-gray-300 p-3 font-semibold">Base</td>
                <td className="border-2 border-gray-300 p-3">10</td>
                <td className="border-2 border-gray-300 p-3">e ≈ 2.718</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border-2 border-gray-300 p-3 font-semibold">Notation</td>
                <td className="border-2 border-gray-300 p-3">log(x) or log₁₀(x)</td>
                <td className="border-2 border-gray-300 p-3">ln(x) or log<sub>e</sub>(x)</td>
              </tr>
              <tr>
                <td className="border-2 border-gray-300 p-3 font-semibold">Calculator</td>
                <td className="border-2 border-gray-300 p-3">LOG button</td>
                <td className="border-2 border-gray-300 p-3">LN button</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border-2 border-gray-300 p-3 font-semibold">Contoh</td>
                <td className="border-2 border-gray-300 p-3">log(100) = 2</td>
                <td className="border-2 border-gray-300 p-3">ln(e²) = 2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conversion */}
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-xl border-2 border-orange-300">
        <h3 className="text-xl font-bold text-orange-700 mb-4">🔄 Convert Between Common & Natural Log</h3>
        <div className="bg-white p-4 rounded-lg">
          <p className="text-xl font-mono text-center mb-2">ln(x) = log(x) / log(e)</p>
          <p className="text-xl font-mono text-center">log(x) = ln(x) / ln(10)</p>
        </div>
      </div>
    </div>
  );

  // Tab 5: Common Errors (Simplified)
  const ErrorsTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <AlertTriangle className="w-8 h-8" />
          Common Errors to AVOID
        </h2>
        <p className="text-lg opacity-90">Kesalahan yang kerap dibuat dan cara elakkannya</p>
      </div>

      {/* Common Errors */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-red-300">
        <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
          <X className="w-6 h-6" />
          Kesalahan Yang KERAP Dibuat
        </h3>

        <div className="space-y-4">
          {/* Error 1 */}
          <div className="bg-red-50 p-5 rounded-lg border-2 border-red-300">
            <div className="flex items-start gap-3 mb-3">
              <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="font-bold text-red-700 text-lg mb-2">ERROR #1: Salah Guna Quotient Law</p>
                <div className="bg-white p-4 rounded border-2 border-red-400">
                  <p className="text-xl font-mono text-red-600 line-through mb-2">
                    log<sub>b</sub>(M/N) = log<sub>b</sub>(M) ÷ log<sub>b</sub>(N)
                  </p>
                  <p className="text-xl font-mono text-green-600">
                    log<sub>b</sub>(M/N) = log<sub>b</sub>(M) - log<sub>b</sub>(N)
                  </p>
                </div>
                <p className="text-gray-700 mt-3">
                  <span className="font-bold">INGAT:</span> Bahagi dalam log = TOLAK, bukan bahagi!
                </p>
              </div>
            </div>
          </div>

          {/* Error 2 */}
          <div className="bg-orange-50 p-5 rounded-lg border-2 border-orange-300">
            <div className="flex items-start gap-3 mb-3">
              <X className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="font-bold text-orange-700 text-lg mb-2">ERROR #2: Salah Guna Product Law</p>
                <div className="bg-white p-4 rounded border-2 border-orange-400">
                  <p className="text-xl font-mono text-red-600 line-through mb-2">
                    log<sub>b</sub>(M + N) = log<sub>b</sub>(M) + log<sub>b</sub>(N)
                  </p>
                  <p className="text-xl font-mono text-green-600">
                    log<sub>b</sub>(M × N) = log<sub>b</sub>(M) + log<sub>b</sub>(N)
                  </p>
                </div>
                <p className="text-gray-700 mt-3">
                  <span className="font-bold">INGAT:</span> DARAB dalam log = tambah, bukan TAMBAH!
                </p>
              </div>
            </div>
          </div>

          {/* Error 3 */}
          <div className="bg-yellow-50 p-5 rounded-lg border-2 border-yellow-300">
            <div className="flex items-start gap-3 mb-3">
              <X className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="font-bold text-yellow-700 text-lg mb-2">ERROR #3: Salah Power Law</p>
                <div className="bg-white p-4 rounded border-2 border-yellow-400">
                  <p className="text-xl font-mono text-red-600 line-through mb-2">
                    log<sub>b</sub>(M<sup>n</sup>) = [log<sub>b</sub>(M)]<sup>n</sup>
                  </p>
                  <p className="text-xl font-mono text-green-600">
                    log<sub>b</sub>(M<sup>n</sup>) = n × log<sub>b</sub>(M)
                  </p>
                </div>
                <p className="text-gray-700 mt-3">
                  <span className="font-bold">INGAT:</span> Power keluar depan sebagai multiply, bukan kuasa!
                </p>
              </div>
            </div>
          </div>

          {/* Error 4 */}
          <div className="bg-purple-50 p-5 rounded-lg border-2 border-purple-300">
            <div className="flex items-start gap-3 mb-3">
              <X className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="font-bold text-purple-700 text-lg mb-2">ERROR #4: Lupa Base Dalam Calculator</p>
                <div className="bg-white p-4 rounded border-2 border-purple-400">
                  <p className="text-lg text-red-600 mb-2">
                    ✗ Untuk log₂(8), tekan: 8 ÷ 2 = 4
                  </p>
                  <p className="text-lg text-green-600">
                    ✓ Untuk log₂(8), tekan: log(8) ÷ log(2) = 3
                  </p>
                </div>
                <p className="text-gray-700 mt-3">
                  <span className="font-bold">INGAT:</span> Guna Change of Base Formula!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6" />
          Tips Elak Kesilapan
        </h3>
        <div className="space-y-2">
          <p>✓ Darab → Tambah | Bahagi → Tolak</p>
          <p>✓ Power masuk dalam → Keluar depan jadi multiply</p>
          <p>✓ log(M/N) ≠ log(M) ÷ log(N)</p>
          <p>✓ Sentiasa check dengan substitute balik</p>
          <p>✓ Guna calculator dengan betul (Change of Base)</p>
        </div>
      </div>

      {/* Visual Comparison */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-300">
        <h3 className="text-xl font-bold text-blue-700 mb-4">✓ Correct vs ✗ Wrong</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border-2 border-blue-300 p-3 text-left">Operation</th>
                <th className="border-2 border-red-300 p-3 text-left bg-red-50">❌ WRONG</th>
                <th className="border-2 border-green-300 p-3 text-left bg-green-50">✅ CORRECT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-gray-300 p-3 font-semibold">Multiply</td>
                <td className="border-2 border-gray-300 p-3 bg-red-50">log(M+N) = log(M) + log(N)</td>
                <td className="border-2 border-gray-300 p-3 bg-green-50">log(M×N) = log(M) + log(N)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border-2 border-gray-300 p-3 font-semibold">Divide</td>
                <td className="border-2 border-gray-300 p-3 bg-red-50">log(M/N) = log(M) ÷ log(N)</td>
                <td className="border-2 border-gray-300 p-3 bg-green-50">log(M/N) = log(M) - log(N)</td>
              </tr>
              <tr>
                <td className="border-2 border-gray-300 p-3 font-semibold">Power</td>
                <td className="border-2 border-gray-300 p-3 bg-red-50">log(M^n) = [log(M)]^n</td>
                <td className="border-2 border-gray-300 p-3 bg-green-50">log(M^n) = n × log(M)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Practice Reminder */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border-2 border-purple-300">
        <h3 className="text-lg font-bold text-purple-700 mb-3">🎯 Want to Practice?</h3>
        <p className="text-gray-700 mb-4">
          Pergi ke <strong>Practice Tab</strong> untuk cuba exercises dengan 3 tahap kesukaran!
        </p>
        <button
          onClick={() => setActiveTab('exercises')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all"
        >
          Go to Practice Exercises →
        </button>
      </div>
    </div>
  );

  // Interactive Exercises Tab - WITH IMPROVED MIX
  const ExercisesTab = () => {
    const [exerciseType, setExerciseType] = useState('simplify');
    const [difficulty, setDifficulty] = useState('easy');
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState({ correct: 0, total: 0 });

    // IMPROVED Exercise generators with NUMBERS, ALGEBRA, and MIX
    const generateSimplifyExercise = (level) => {
      const questionTypes = ['numeric', 'algebraic', 'mixed'];
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      switch(level) {
        case 'easy':
          if (type === 'numeric') {
            // Pure numeric questions
            const numericProblems = [
              {
                q: 'log₂(4) + log₂(2)',
                a: 'log₂(8)',
                steps: [
                  'Guna Product Law: log₂(M) + log₂(N) = log₂(M×N)',
                  'log₂(4) + log₂(2) = log₂(4×2)',
                  'log₂(8)'
                ],
                hint: 'Ingat: Tambah = Darab dalam log'
              },
              {
                q: 'log₅(25) - log₅(5)',
                a: 'log₅(5)',
                steps: [
                  'Guna Quotient Law: log₅(M) - log₅(N) = log₅(M÷N)',
                  'log₅(25) - log₅(5) = log₅(25÷5)',
                  'log₅(5) atau 1'
                ],
                hint: 'Tolak log → Bahagi dalam bracket'
              },
              {
                q: 'log(10) + log(100)',
                a: 'log(1000)',
                steps: [
                  'Product Law: log(10) + log(100) = log(10×100)',
                  'log(1000)',
                  'Atau boleh evaluate: 1 + 2 = 3'
                ],
                hint: 'Product Law dengan common log'
              }
            ];
            return numericProblems[Math.floor(Math.random() * numericProblems.length)];
          } else if (type === 'algebraic') {
            // Pure algebraic questions
            const algebraicProblems = [
              {
                q: 'log₃(x) + log₃(3)',
                a: 'log₃(3x)',
                steps: [
                  'Guna Product Law: log₃(x) + log₃(3) = log₃(x×3)',
                  'log₃(3x)'
                ],
                hint: 'Tambah log → Darab dalam bracket'
              },
              {
                q: 'log(x) + log(y)',
                a: 'log(xy)',
                steps: [
                  'Product Law: log(x) + log(y) = log(xy)',
                  'Jawapan: log(xy)'
                ],
                hint: 'Product Law: Tambah → Darab'
              },
              {
                q: 'log₂(a) - log₂(b)',
                a: 'log₂(a/b)',
                steps: [
                  'Quotient Law: log₂(a) - log₂(b) = log₂(a/b)',
                  'Jawapan: log₂(a/b)'
                ],
                hint: 'Tolak → Bahagi'
              }
            ];
            return algebraicProblems[Math.floor(Math.random() * algebraicProblems.length)];
          } else {
            // Mixed numeric and algebraic
            const mixedProblems = [
              {
                q: 'log₂(4x) + log₂(2)',
                a: 'log₂(8x)',
                steps: [
                  'Product Law: log₂(4x) + log₂(2) = log₂(4x×2)',
                  'log₂(8x)'
                ],
                hint: 'Multiply 4x dan 2'
              },
              {
                q: 'log(10x) - log(10)',
                a: 'log(x)',
                steps: [
                  'Quotient Law: log(10x) - log(10) = log(10x/10)',
                  'log(x)'
                ],
                hint: '10x ÷ 10 = x'
              },
              {
                q: 'log₃(9) + log₃(x)',
                a: 'log₃(9x)',
                steps: [
                  'Product Law: log₃(9) + log₃(x) = log₃(9×x)',
                  'log₃(9x)',
                  'Boleh evaluate: log₃(9) = 2, so 2 + log₃(x)'
                ],
                hint: 'Combine 9 dengan x'
              }
            ];
            return mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
          }
          
        case 'medium':
          if (type === 'numeric') {
            const numericProblems = [
              {
                q: '2log₂(4) + log₂(2)',
                a: 'log₂(32)',
                steps: [
                  'Guna Power Law: 2log₂(4) = log₂(4²)',
                  'log₂(4²) = log₂(16)',
                  'log₂(16) + log₂(2) = log₂(16×2)',
                  'log₂(32) atau 5'
                ],
                hint: 'Power keluar depan, kemudian guna Product Law'
              },
              {
                q: 'log(100) + 2log(10)',
                a: 'log(10000)',
                steps: [
                  'Power Law: 2log(10) = log(10²) = log(100)',
                  'log(100) + log(100) = log(10000)',
                  'Atau evaluate: 2 + 2 = 4'
                ],
                hint: 'Convert power dulu'
              },
              {
                q: 'log₅(125) - log₅(25)',
                a: 'log₅(5)',
                steps: [
                  'Quotient Law: log₅(125÷25) = log₅(5)',
                  'Atau evaluate: 3 - 2 = 1'
                ],
                hint: '125 ÷ 25 = 5'
              }
            ];
            return numericProblems[Math.floor(Math.random() * numericProblems.length)];
          } else if (type === 'algebraic') {
            const algebraicProblems = [
              {
                q: 'log(x) + 2log(y)',
                a: 'log(xy²)',
                steps: [
                  'Guna Power Law: 2log(y) = log(y²)',
                  'log(x) + log(y²)',
                  'Guna Product Law: log(x) + log(y²) = log(xy²)',
                  'Jawapan: log(xy²)'
                ],
                hint: 'Convert power dulu, kemudian combine'
              },
              {
                q: '3log₅(x) - log₅(y)',
                a: 'log₅(x³/y)',
                steps: [
                  'Guna Power Law: 3log₅(x) = log₅(x³)',
                  'log₅(x³) - log₅(y)',
                  'Guna Quotient Law: log₅(x³/y)',
                  'Jawapan: log₅(x³/y)'
                ],
                hint: 'Power dulu, kemudian bahagi'
              },
              {
                q: 'log₂(a) + log₂(b) - log₂(c)',
                a: 'log₂(ab/c)',
                steps: [
                  'Product: log₂(a) + log₂(b) = log₂(ab)',
                  'Quotient: log₂(ab) - log₂(c) = log₂(ab/c)'
                ],
                hint: 'Combine step by step'
              }
            ];
            return algebraicProblems[Math.floor(Math.random() * algebraicProblems.length)];
          } else {
            const mixedProblems = [
              {
                q: '2log₂(2x) + log₂(4)',
                a: 'log₂(16x²)',
                steps: [
                  'Power Law: 2log₂(2x) = log₂((2x)²) = log₂(4x²)',
                  'Product: log₂(4x²) + log₂(4) = log₂(16x²)'
                ],
                hint: 'Power dulu, then product'
              },
              {
                q: 'log(100x) - log(10)',
                a: 'log(10x)',
                steps: [
                  'Quotient Law: log(100x÷10) = log(10x)',
                  'Atau: 2 + log(x) - 1 = 1 + log(x)'
                ],
                hint: '100x ÷ 10 = 10x'
              },
              {
                q: 'log₃(27) + log₃(x) - log₃(3)',
                a: 'log₃(9x)',
                steps: [
                  'Product: log₃(27) + log₃(x) = log₃(27x)',
                  'Quotient: log₃(27x) - log₃(3) = log₃(9x)',
                  'Atau: 3 + log₃(x) - 1 = 2 + log₃(x)'
                ],
                hint: 'Combine then simplify'
              }
            ];
            return mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
          }
          
        case 'difficult':
          if (type === 'numeric') {
            const numericProblems = [
              {
                q: '2log₂(8) + 3log₂(2) - log₂(32)',
                a: 'log₂(16)',
                steps: [
                  'Guna Power Law: 2log₂(8) = log₂(8²) = log₂(64)',
                  '3log₂(2) = log₂(2³) = log₂(8)',
                  'log₂(64) + log₂(8) = log₂(512)',
                  'log₂(512) - log₂(32) = log₂(512/32) = log₂(16)',
                  'Jawapan: log₂(16) atau 4'
                ],
                hint: 'Convert semua power law dulu, kemudian combine'
              },
              {
                q: 'log(1000) - 2log(10) + log(100)',
                a: 'log(1000)',
                steps: [
                  'Evaluate: 3 - 2(1) + 2',
                  '3 - 2 + 2 = 3',
                  'Atau: log(1000) - log(100) + log(100) = log(1000)'
                ],
                hint: 'Boleh evaluate terus atau expand'
              },
              {
                q: '3log₅(5) + 2log₅(25) - log₅(625)',
                a: 'log₅(5)',
                steps: [
                  '3(1) + 2(2) - 4 = 3 + 4 - 4 = 3 = log₅(125)',
                  'Atau full expansion menggunakan laws'
                ],
                hint: 'Evaluate values terus'
              }
            ];
            return numericProblems[Math.floor(Math.random() * numericProblems.length)];
          } else if (type === 'algebraic') {
            const algebraicProblems = [
              {
                q: '2log(x) + log(y) - log(x)',
                a: 'log(xy)',
                steps: [
                  'Kumpul log(x): 2log(x) - log(x) = log(x)',
                  'log(x) + log(y)',
                  'Guna Product Law: log(xy)',
                  'Jawapan: log(xy)'
                ],
                hint: 'Kumpul terms yang sama dulu'
              },
              {
                q: 'log₃(x²) + log₃(y) - log₃(xy)',
                a: 'log₃(x)',
                steps: [
                  'Guna Product Law: log₃(x²) + log₃(y) = log₃(x²y)',
                  'log₃(x²y) - log₃(xy) = log₃(x²y/xy)',
                  'Simplify: x²y/xy = x',
                  'Jawapan: log₃(x)'
                ],
                hint: 'Combine dulu, kemudian simplify fraction'
              },
              {
                q: '3log₂(a) - 2log₂(b) + log₂(c)',
                a: 'log₂(a³c/b²)',
                steps: [
                  'Power: 3log₂(a) = log₂(a³), 2log₂(b) = log₂(b²)',
                  'log₂(a³) - log₂(b²) + log₂(c)',
                  'Quotient: log₂(a³/b²) + log₂(c)',
                  'Product: log₂(a³c/b²)'
                ],
                hint: 'Power → Quotient → Product'
              }
            ];
            return algebraicProblems[Math.floor(Math.random() * algebraicProblems.length)];
          } else {
            const mixedProblems = [
              {
                q: '2log₂(4x) + log₂(8) - 3log₂(2)',
                a: 'log₂(16x²)',
                steps: [
                  'Power: 2log₂(4x) = log₂(16x²), 3log₂(2) = log₂(8)',
                  'Product: log₂(16x²) + log₂(8) = log₂(128x²)',
                  'Quotient: log₂(128x²) - log₂(8) = log₂(16x²)'
                ],
                hint: 'Full expansion step by step'
              },
              {
                q: 'log(100x²) - 2log(10x) + log(x)',
                a: 'log(x)',
                steps: [
                  'Power: 2log(10x) = log((10x)²) = log(100x²)',
                  'log(100x²) - log(100x²) + log(x) = log(x)'
                ],
                hint: 'Convert power, then simplify'
              },
              {
                q: '3log₃(3x) - log₃(27) - 2log₃(x)',
                a: 'log₃(x)',
                steps: [
                  'Power: 3log₃(3x) = log₃((3x)³) = log₃(27x³)',
                  '2log₃(x) = log₃(x²)',
                  'log₃(27x³) - log₃(27) - log₃(x²)',
                  'Simplify: log₃(x³) - log₃(x²) = log₃(x)'
                ],
                hint: 'Banyak steps, slow and steady'
              }
            ];
            return mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
          }
      }
    };

    const generateExpandExercise = (level) => {
      const questionTypes = ['numeric', 'algebraic', 'mixed'];
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      switch(level) {
        case 'easy':
          if (type === 'numeric') {
            const numericProblems = [
              {
                q: 'log₂(8)',
                a: '3log₂(2)',
                steps: [
                  'Tukar 8 = 2³',
                  'log₂(2³)',
                  'Guna Power Law: log₂(2³) = 3log₂(2)',
                  '3(1) = 3'
                ],
                hint: 'Cari base yang sama dengan value'
              },
              {
                q: 'log(100)',
                a: '2log(10)',
                steps: [
                  'Tukar 100 = 10²',
                  'log(10²) = 2log(10)',
                  'Atau evaluate terus: 2'
                ],
                hint: '100 = 10²'
              },
              {
                q: 'log₃(27)',
                a: '3log₃(3)',
                steps: [
                  '27 = 3³',
                  'log₃(3³) = 3log₃(3) = 3(1) = 3'
                ],
                hint: '27 = 3³'
              }
            ];
            return numericProblems[Math.floor(Math.random() * numericProblems.length)];
          } else if (type === 'algebraic') {
            const algebraicProblems = [
              {
                q: 'log(xy)',
                a: 'log(x) + log(y)',
                steps: [
                  'Product Law: log(xy) = log(x) + log(y)'
                ],
                hint: 'Expand menggunakan Product Law'
              },
              {
                q: 'log₂(a/b)',
                a: 'log₂(a) - log₂(b)',
                steps: [
                  'Quotient Law: log₂(a/b) = log₂(a) - log₂(b)'
                ],
                hint: 'Bahagi → Tolak'
              },
              {
                q: 'log(x³)',
                a: '3log(x)',
                steps: [
                  'Power Law: log(x³) = 3log(x)'
                ],
                hint: 'Power keluar depan'
              }
            ];
            return algebraicProblems[Math.floor(Math.random() * algebraicProblems.length)];
          } else {
            const mixedProblems = [
              {
                q: 'log(2x)',
                a: 'log(2) + log(x)',
                steps: [
                  'Product Law: log(2×x) = log(2) + log(x)'
                ],
                hint: '2x adalah 2 × x'
              },
              {
                q: 'log₅(x/5)',
                a: 'log₅(x) - log₅(5)',
                steps: [
                  'Quotient Law: log₅(x/5) = log₅(x) - log₅(5)',
                  'Boleh simplify: log₅(x) - 1'
                ],
                hint: 'Bahagi → Tolak'
              },
              {
                q: 'log₃(9x)',
                a: 'log₃(9) + log₃(x)',
                steps: [
                  'Product Law: log₃(9×x) = log₃(9) + log₃(x)',
                  'Boleh evaluate: 2 + log₃(x)'
                ],
                hint: '9x = 9 × x'
              }
            ];
            return mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
          }
          
        case 'medium':
          if (type === 'numeric') {
            const numericProblems = [
              {
                q: 'log₂(16/4)',
                a: 'log₂(16) - log₂(4)',
                steps: [
                  'Quotient Law: log₂(16) - log₂(4)',
                  'Evaluate: 4 - 2 = 2'
                ],
                hint: 'Bahagi = Tolak'
              },
              {
                q: 'log(1000)',
                a: '3log(10)',
                steps: [
                  '1000 = 10³',
                  'log(10³) = 3log(10) = 3'
                ],
                hint: '1000 = 10³'
              },
              {
                q: 'log₅(125/25)',
                a: 'log₅(125) - log₅(25)',
                steps: [
                  'Quotient: log₅(125) - log₅(25)',
                  'Evaluate: 3 - 2 = 1'
                ],
                hint: 'Expand quotient'
              }
            ];
            return numericProblems[Math.floor(Math.random() * numericProblems.length)];
          } else if (type === 'algebraic') {
            const algebraicProblems = [
              {
                q: 'log(x²y)',
                a: '2log(x) + log(y)',
                steps: [
                  'Product Law: log(x²) + log(y)',
                  'Power Law: 2log(x) + log(y)'
                ],
                hint: 'Product law dulu, then power'
              },
              {
                q: 'log₅(x³/y)',
                a: '3log₅(x) - log₅(y)',
                steps: [
                  'Quotient: log₅(x³) - log₅(y)',
                  'Power: 3log₅(x) - log₅(y)'
                ],
                hint: 'Quotient then power'
              },
              {
                q: 'log₂(ab²)',
                a: 'log₂(a) + 2log₂(b)',
                steps: [
                  'Product: log₂(a) + log₂(b²)',
                  'Power: log₂(a) + 2log₂(b)'
                ],
                hint: 'Product then power'
              }
            ];
            return algebraicProblems[Math.floor(Math.random() * algebraicProblems.length)];
          } else {
            const mixedProblems = [
              {
                q: 'log(8x³)',
                a: 'log(8) + 3log(x)',
                steps: [
                  'Product: log(8) + log(x³)',
                  'Power: log(8) + 3log(x)',
                  'Evaluate: 0.903 + 3log(x)'
                ],
                hint: 'Product then power'
              },
              {
                q: 'log₃(27x²)',
                a: 'log₃(27) + 2log₃(x)',
                steps: [
                  'Product: log₃(27) + log₃(x²)',
                  'Power: log₃(27) + 2log₃(x)',
                  'Evaluate: 3 + 2log₃(x)'
                ],
                hint: '27 = 3³'
              },
              {
                q: 'log₂(16/x)',
                a: 'log₂(16) - log₂(x)',
                steps: [
                  'Quotient: log₂(16) - log₂(x)',
                  'Evaluate: 4 - log₂(x)'
                ],
                hint: '16 = 2⁴'
              }
            ];
            return mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
          }
          
        case 'difficult':
          if (type === 'numeric') {
            const numericProblems = [
              {
                q: 'log₂(64/8)',
                a: 'log₂(64) - log₂(8)',
                steps: [
                  'Quotient: log₂(64) - log₂(8)',
                  'Evaluate: 6 - 3 = 3',
                  'Or simplify: 64/8 = 8 = 2³ = 3'
                ],
                hint: 'Expand atau simplify first'
              },
              {
                q: 'log(10000/100)',
                a: 'log(10000) - log(100)',
                steps: [
                  'Quotient: log(10000) - log(100)',
                  '4 - 2 = 2',
                  'Or: 10000/100 = 100 = 10²'
                ],
                hint: 'Multiple approaches'
              },
              {
                q: 'log₅(625/125)',
                a: 'log₅(625) - log₅(125)',
                steps: [
                  '625 = 5⁴, 125 = 5³',
                  '4 - 3 = 1',
                  'Or: 625/125 = 5'
                ],
                hint: 'Break into powers'
              }
            ];
            return numericProblems[Math.floor(Math.random() * numericProblems.length)];
          } else if (type === 'algebraic') {
            const algebraicProblems = [
              {
                q: 'log(x²y³/z)',
                a: '2log(x) + 3log(y) - log(z)',
                steps: [
                  'Quotient: log(x²y³) - log(z)',
                  'Product: log(x²) + log(y³) - log(z)',
                  'Power: 2log(x) + 3log(y) - log(z)'
                ],
                hint: 'Full expansion'
              },
              {
                q: 'log₃(a²b/c³)',
                a: '2log₃(a) + log₃(b) - 3log₃(c)',
                steps: [
                  'Quotient: log₃(a²b) - log₃(c³)',
                  'Product: log₃(a²) + log₃(b) - log₃(c³)',
                  'Power: 2log₃(a) + log₃(b) - 3log₃(c)'
                ],
                hint: 'Quotient → Product → Power'
              },
              {
                q: 'log₂(x⁴/y²z)',
                a: '4log₂(x) - 2log₂(y) - log₂(z)',
                steps: [
                  'Quotient: log₂(x⁴) - log₂(y²z)',
                  'Product: log₂(x⁴) - [log₂(y²) + log₂(z)]',
                  'Power: 4log₂(x) - 2log₂(y) - log₂(z)'
                ],
                hint: 'Watch the brackets'
              }
            ];
            return algebraicProblems[Math.floor(Math.random() * algebraicProblems.length)];
          } else {
            const mixedProblems = [
              {
                q: 'log₂(32x²/8y)',
                a: 'log₂(32) - log₂(8) + 2log₂(x) - log₂(y)',
                steps: [
                  'Quotient: log₂(32x²) - log₂(8y)',
                  'Product: [log₂(32) + log₂(x²)] - [log₂(8) + log₂(y)]',
                  'Power: log₂(32) + 2log₂(x) - log₂(8) - log₂(y)',
                  'Simplify: 5 + 2log₂(x) - 3 - log₂(y)',
                  'Final: 2 + 2log₂(x) - log₂(y)'
                ],
                hint: 'Full expansion then simplify numbers'
              },
              {
                q: 'log₃(81xâ´/27y²)',
                a: '4log₃(x) - 2log₃(y) + 1',
                steps: [
                  'Quotient: log₃(81xâ´) - log₃(27y²)',
                  'Product: [log₃(81) + log₃(xâ´)] - [log₃(27) + log₃(y²)]',
                  'Power: 4 + 4log₃(x) - 3 - 2log₃(y)',
                  'Final: 1 + 4log₃(x) - 2log₃(y)'
                ],
                hint: '81 = 3⁴, 27 = 3³'
              },
              {
                q: 'log(1000x³/100y)',
                a: '3log(x) - log(y) + 1',
                steps: [
                  'Quotient: log(1000x³) - log(100y)',
                  'Product: [log(1000) + log(x³)] - [log(100) + log(y)]',
                  'Power: 3 + 3log(x) - 2 - log(y)',
                  'Final: 1 + 3log(x) - log(y)'
                ],
                hint: 'Common log simplification'
              }
            ];
            return mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
          }
      }
    };

    const generateFindValueExercise = (level) => {
      const questionTypes = ['numeric', 'algebraic', 'mixed'];
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      switch(level) {
        case 'easy':
          if (type === 'numeric') {
            const numericProblems = [
              {
                q: 'Jika log₂(3) = 1.585, cari log₂(9)',
                given: 'log₂(3) = 1.585',
                find: 'log₂(9)',
                a: '3.170',
                steps: [
                  'Tukar 9 = 3²',
                  'log₂(9) = log₂(3²)',
                  'Power Law: 2log₂(3)',
                  '2(1.585) = 3.170'
                ],
                hint: '9 = 3²'
              },
              {
                q: 'Jika log(2) = 0.301, cari log(4)',
                given: 'log(2) = 0.301',
                find: 'log(4)',
                a: '0.602',
                steps: [
                  '4 = 2²',
                  'log(4) = log(2²) = 2log(2)',
                  '2(0.301) = 0.602'
                ],
                hint: '4 = 2²'
              },
              {
                q: 'Jika log₅(2) = 0.431, cari log₅(8)',
                given: 'log₅(2) = 0.431',
                find: 'log₅(8)',
                a: '1.293',
                steps: [
                  '8 = 2³',
                  'log₅(8) = log₅(2³) = 3log₅(2)',
                  '3(0.431) = 1.293'
                ],
                hint: '8 = 2³'
              }
            ];
            return numericProblems[Math.floor(Math.random() * numericProblems.length)];
          } else if (type === 'algebraic') {
            const algebraicProblems = [
              {
                q: 'Jika log(x) = 2, cari log(x²)',
                given: 'log(x) = 2',
                find: 'log(x²)',
                a: '4',
                steps: [
                  'Power Law: log(x²) = 2log(x)',
                  '2(2) = 4'
                ],
                hint: 'Power Law'
              },
              {
                q: 'Jika log₃(y) = 1.5, cari log₃(y³)',
                given: 'log₃(y) = 1.5',
                find: 'log₃(y³)',
                a: '4.5',
                steps: [
                  'Power Law: 3log₃(y)',
                  '3(1.5) = 4.5'
                ],
                hint: 'Multiply dengan power'
              },
              {
                q: 'Jika log₂(a) = 3, cari log₂(a⁴)',
                given: 'log₂(a) = 3',
                find: 'log₂(a⁴)',
                a: '12',
                steps: [
                  'Power Law: 4log₂(a)',
                  '4(3) = 12'
                ],
                hint: 'Power becomes coefficient'
              }
            ];
            return algebraicProblems[Math.floor(Math.random() * algebraicProblems.length)];
          } else {
            const mixedProblems = [
              {
                q: 'Jika log₂(3) = 1.585, cari log₂(6)',
                given: 'log₂(3) = 1.585',
                find: 'log₂(6)',
                a: '2.585',
                steps: [
                  '6 = 2 × 3',
                  'log₂(6) = log₂(2) + log₂(3)',
                  '1 + 1.585 = 2.585'
                ],
                hint: '6 = 2 × 3'
              },
              {
                q: 'Jika log(x) = 2, cari log(10x)',
                given: 'log(x) = 2',
                find: 'log(10x)',
                a: '3',
                steps: [
                  'Product: log(10) + log(x)',
                  '1 + 2 = 3'
                ],
                hint: '10x = 10 × x'
              },
              {
                q: 'Jika log₃(5) = 1.465, cari log₃(15)',
                given: 'log₃(5) = 1.465',
                find: 'log₃(15)',
                a: '2.465',
                steps: [
                  '15 = 3 × 5',
                  'log₃(15) = log₃(3) + log₃(5)',
                  '1 + 1.465 = 2.465'
                ],
                hint: '15 = 3 × 5'
              }
            ];
            return mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
          }
          
        case 'medium':
          if (type === 'numeric') {
            const numericProblems = [
              {
                q: 'Jika log₂(3) = 1.585, cari log₂(12)',
                given: 'log₂(3) = 1.585',
                find: 'log₂(12)',
                a: '3.585',
                steps: [
                  '12 = 4 × 3 = 2² × 3',
                  'log₂(12) = log₂(2²) + log₂(3)',
                  '2 + 1.585 = 3.585'
                ],
                hint: 'Factorize 12'
              },
              {
                q: 'Jika log(2) = 0.301 dan log(3) = 0.477, cari log(6)',
                given: 'log(2) = 0.301, log(3) = 0.477',
                find: 'log(6)',
                a: '0.778',
                steps: [
                  '6 = 2 × 3',
                  'log(6) = log(2) + log(3)',
                  '0.301 + 0.477 = 0.778'
                ],
                hint: '6 = 2 × 3'
              },
              {
                q: 'Jika log₅(2) = 0.431 dan log₅(3) = 0.683, cari log₅(6)',
                given: 'log₅(2) = 0.431, log₅(3) = 0.683',
                find: 'log₅(6)',
                a: '1.114',
                steps: [
                  '6 = 2 × 3',
                  'log₅(6) = log₅(2) + log₅(3)',
                  '0.431 + 0.683 = 1.114'
                ],
                hint: 'Product Law'
              }
            ];
            return numericProblems[Math.floor(Math.random() * numericProblems.length)];
          } else if (type === 'algebraic') {
            const algebraicProblems = [
              {
                q: 'Jika log(x) = 3 dan log(y) = 2, cari log(xy)',
                given: 'log(x) = 3, log(y) = 2',
                find: 'log(xy)',
                a: '5',
                steps: [
                  'Product Law: log(x) + log(y)',
                  '3 + 2 = 5'
                ],
                hint: 'Tambah values'
              },
              {
                q: 'Jika log₃(a) = 2 dan log₃(b) = 1, cari log₃(a²b)',
                given: 'log₃(a) = 2, log₃(b) = 1',
                find: 'log₃(a²b)',
                a: '5',
                steps: [
                  'Product: log₃(a²) + log₃(b)',
                  'Power: 2log₃(a) + log₃(b)',
                  '2(2) + 1 = 5'
                ],
                hint: 'Product then Power'
              },
              {
                q: 'Jika log(x) = 4, cari log(x/100)',
                given: 'log(x) = 4',
                find: 'log(x/100)',
                a: '2',
                steps: [
                  'Quotient: log(x) - log(100)',
                  '4 - 2 = 2'
                ],
                hint: 'log(100) = 2'
              }
            ];
            return algebraicProblems[Math.floor(Math.random() * algebraicProblems.length)];
          } else {
            const mixedProblems = [
              {
                q: 'Jika log₂(5) = 2.322, cari log₂(20)',
                given: 'log₂(5) = 2.322',
                find: 'log₂(20)',
                a: '4.322',
                steps: [
                  '20 = 4 × 5 = 2² × 5',
                  'log₂(20) = log₂(2²) + log₂(5)',
                  '2 + 2.322 = 4.322'
                ],
                hint: '20 = 4 × 5'
              },
              {
                q: 'Jika log(x) = 2, cari log(100x²)',
                given: 'log(x) = 2',
                find: 'log(100x²)',
                a: '6',
                steps: [
                  'Product: log(100) + log(x²)',
                  'Power: 2 + 2log(x)',
                  '2 + 2(2) = 6'
                ],
                hint: 'Product then Power'
              },
              {
                q: 'Jika log₃(7) = 1.771, cari log₃(21)',
                given: 'log₃(7) = 1.771',
                find: 'log₃(21)',
                a: '2.771',
                steps: [
                  '21 = 3 × 7',
                  'log₃(21) = log₃(3) + log₃(7)',
                  '1 + 1.771 = 2.771'
                ],
                hint: '21 = 3 × 7'
              }
            ];
            return mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
          }
          
        case 'difficult':
          if (type === 'numeric') {
            const numericProblems = [
              {
                q: 'Jika log₂(3) = 1.585 dan log₂(5) = 2.322, cari log₂(15)',
                given: 'log₂(3) = 1.585, log₂(5) = 2.322',
                find: 'log₂(15)',
                a: '3.907',
                steps: [
                  '15 = 3 × 5',
                  'log₂(15) = log₂(3) + log₂(5)',
                  '1.585 + 2.322 = 3.907'
                ],
                hint: 'Simple product'
              },
              {
                q: 'Jika log(2) = 0.301 dan log(3) = 0.477, cari log(18)',
                given: 'log(2) = 0.301, log(3) = 0.477',
                find: 'log(18)',
                a: '1.255',
                steps: [
                  '18 = 2 × 9 = 2 × 3²',
                  'log(18) = log(2) + log(3²)',
                  'log(2) + 2log(3)',
                  '0.301 + 2(0.477) = 1.255'
                ],
                hint: '18 = 2 × 3²'
              },
              {
                q: 'Jika log₅(2) = 0.431 dan log₅(3) = 0.683, cari log₅(72)',
                given: 'log₅(2) = 0.431, log₅(3) = 0.683',
                find: 'log₅(72)',
                a: '2.659',
                steps: [
                  '72 = 8 × 9 = 2³ × 3²',
                  'log₅(72) = log₅(2³) + log₅(3²)',
                  '3log₅(2) + 2log₅(3)',
                  '3(0.431) + 2(0.683)',
                  '1.293 + 1.366 = 2.659'
                ],
                hint: '72 = 2³ × 3²'
              }
            ];
            return numericProblems[Math.floor(Math.random() * numericProblems.length)];
          } else if (type === 'algebraic') {
            const algebraicProblems = [
              {
                q: 'Jika log(x) = 3 dan log(y) = 2, cari log(x²/y³)',
                given: 'log(x) = 3, log(y) = 2',
                find: 'log(x²/y³)',
                a: '0',
                steps: [
                  'Quotient: log(x²) - log(y³)',
                  'Power: 2log(x) - 3log(y)',
                  '2(3) - 3(2) = 6 - 6 = 0'
                ],
                hint: 'Quotient then Power'
              },
              {
                q: 'Jika log₃(a) = 2 dan log₃(b) = 3, cari log₃(a³/b²)',
                given: 'log₃(a) = 2, log₃(b) = 3',
                find: 'log₃(a³/b²)',
                a: '0',
                steps: [
                  'Quotient: log₃(a³) - log₃(b²)',
                  'Power: 3log₃(a) - 2log₃(b)',
                  '3(2) - 2(3) = 6 - 6 = 0'
                ],
                hint: 'Powers cancel out'
              },
              {
                q: 'Jika log(x) = 5 dan log(y) = 3, cari log(√x/y²)',
                given: 'log(x) = 5, log(y) = 3',
                find: 'log(√x/y²)',
                a: '-3.5',
                steps: [
                  '√x = x^(1/2)',
                  'Quotient: log(x^(1/2)) - log(y²)',
                  'Power: (1/2)log(x) - 2log(y)',
                  '(1/2)(5) - 2(3) = 2.5 - 6 = -3.5'
                ],
                hint: '√x = x^(1/2)'
              }
            ];
            return algebraicProblems[Math.floor(Math.random() * algebraicProblems.length)];
          } else {
            const mixedProblems = [
              {
                q: 'Jika log₂(3) = 1.585, cari log₂(24)',
                given: 'log₂(3) = 1.585',
                find: 'log₂(24)',
                a: '4.585',
                steps: [
                  '24 = 8 × 3 = 2³ × 3',
                  'log₂(24) = log₂(2³) + log₂(3)',
                  '3 + 1.585 = 4.585'
                ],
                hint: '24 = 8 × 3'
              },
              {
                q: 'Jika log(x) = 3 dan log(2) = 0.301, cari log(2x²)',
                given: 'log(x) = 3, log(2) = 0.301',
                find: 'log(2x²)',
                a: '6.301',
                steps: [
                  'Product: log(2) + log(x²)',
                  'Power: log(2) + 2log(x)',
                  '0.301 + 2(3) = 6.301'
                ],
                hint: 'Product and Power'
              },
              {
                q: 'Jika log₃(5) = 1.465 dan log₃(2) = 0.631, cari log₃(50)',
                given: 'log₃(5) = 1.465, log₃(2) = 0.631',
                find: 'log₃(50)',
                a: '3.561',
                steps: [
                  '50 = 2 × 25 = 2 × 5²',
                  'log₃(50) = log₃(2) + log₃(5²)',
                  'log₃(2) + 2log₃(5)',
                  '0.631 + 2(1.465) = 3.561'
                ],
                hint: '50 = 2 × 5²'
              }
            ];
            return mixedProblems[Math.floor(Math.random() * mixedProblems.length)];
          }
      }
    };

    const generateQuestion = () => {
      let question;
      switch(exerciseType) {
        case 'simplify':
          question = generateSimplifyExercise(difficulty);
          break;
        case 'expand':
          question = generateExpandExercise(difficulty);
          break;
        case 'findvalue':
          question = generateFindValueExercise(difficulty);
          break;
      }
      setCurrentQuestion(question);
      setUserInput('');
      setShowAnswer(false);
    };

    const checkUserAnswer = () => {
      if (!currentQuestion) return;
      
      const userClean = userInput.toLowerCase().replace(/\s/g, '');
      const answerClean = currentQuestion.a.toLowerCase().replace(/\s/g, '');
      const isCorrect = userClean === answerClean;
      
      setScore({
        correct: isCorrect ? score.correct + 1 : score.correct,
        total: score.total + 1
      });
      
      setShowAnswer(true);
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Target className="w-8 h-8" />
            Interactive Practice Exercises
          </h2>
          <p className="text-lg opacity-90">Simplify • Expand • Find Value (WITHOUT Calculator)</p>
          <p className="text-sm opacity-80 mt-2">✨ Mix of Numbers, Algebra & Combined Questions</p>
        </div>

        {/* Exercise Type Selection */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-300">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Pilih Jenis Exercise:</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <button
              onClick={() => setExerciseType('simplify')}
              className={`p-4 rounded-xl font-bold transition-all ${
                exerciseType === 'simplify'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <div className="text-3xl mb-2">📝</div>
              SIMPLIFY
              <div className="text-xs mt-1 opacity-80">Guna laws untuk ringkaskan</div>
            </button>
            
            <button
              onClick={() => setExerciseType('expand')}
              className={`p-4 rounded-xl font-bold transition-all ${
                exerciseType === 'expand'
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg scale-105'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              <div className="text-3xl mb-2">📖</div>
              EXPAND
              <div className="text-xs mt-1 opacity-80">Pecahkan kepada parts</div>
            </button>
            
            <button
              onClick={() => setExerciseType('findvalue')}
              className={`p-4 rounded-xl font-bold transition-all ${
                exerciseType === 'findvalue'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                  : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
              }`}
            >
              <div className="text-3xl mb-2">🎯</div>
              FIND VALUE
              <div className="text-xs mt-1 opacity-80">Guna given values</div>
            </button>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-indigo-300">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Pilih Tahap Kesukaran:</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setDifficulty('easy')}
              className={`py-4 px-6 rounded-xl font-bold transition-all ${
                difficulty === 'easy'
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              🟢 MUDAH
            </button>
            <button
              onClick={() => setDifficulty('medium')}
              className={`py-4 px-6 rounded-xl font-bold transition-all ${
                difficulty === 'medium'
                  ? 'bg-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              🟡 SEDERHANA
            </button>
            <button
              onClick={() => setDifficulty('difficult')}
              className={`py-4 px-6 rounded-xl font-bold transition-all ${
                difficulty === 'difficult'
                  ? 'bg-red-500 text-white shadow-lg scale-105'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              🔴 SUKAR
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateQuestion}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-6 h-6" />
          Generate Soalan Baru
        </button>

        {/* Question Display */}
        {currentQuestion && (
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  exerciseType === 'simplify' ? 'bg-blue-100 text-blue-700' :
                  exerciseType === 'expand' ? 'bg-green-100 text-green-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {exerciseType === 'simplify' ? 'SIMPLIFY' : 
                   exerciseType === 'expand' ? 'EXPAND' : 'FIND VALUE'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {difficulty === 'easy' ? 'MUDAH' : 
                   difficulty === 'medium' ? 'SEDERHANA' : 'SUKAR'}
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mb-4 border-2 border-purple-200">
              {currentQuestion.given && (
                <div className="bg-yellow-100 p-3 rounded-lg mb-3 border-2 border-yellow-300">
                  <p className="text-sm font-bold text-yellow-800 mb-1">Given:</p>
                  <p className="text-lg font-mono text-yellow-900">{currentQuestion.given}</p>
                </div>
              )}
              <p className="text-xl font-bold text-gray-800 mb-2">
                {exerciseType === 'findvalue' ? 'Soalan:' : 'Ringkaskan:'}
              </p>
              <p className="text-3xl font-mono text-purple-700 text-center py-3">
                {currentQuestion.q}
              </p>
            </div>

            {/* Hint */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4 border-2 border-blue-200">
              <p className="text-sm font-bold text-blue-700 mb-1 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Hint:
              </p>
              <p className="text-gray-700">{currentQuestion.hint}</p>
            </div>

            {/* Answer Input */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Jawapan Kamu:</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkUserAnswer()}
                  placeholder="Taip jawapan di sini..."
                  className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-lg text-xl font-mono focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
                <button
                  onClick={checkUserAnswer}
                  className="bg-purple-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-600 transition-all"
                >
                  Semak
                </button>
              </div>
            </div>

            {/* Show Answer Button */}
            {!showAnswer && (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Tunjuk Jawapan & Working
              </button>
            )}

            {/* Answer & Working */}
            {showAnswer && (
              <div className="space-y-4">
                {/* Correct Answer */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl border-2 border-green-300">
                  <p className="text-sm font-bold text-green-700 mb-2">✓ Jawapan Yang Betul:</p>
                  <p className="text-3xl font-mono text-green-700 text-center font-bold">
                    {currentQuestion.a}
                  </p>
                </div>

                {/* Working Steps */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-300">
                  <p className="text-lg font-bold text-blue-700 mb-3">📝 Langkah Penyelesaian:</p>
                  <div className="space-y-3">
                    {currentQuestion.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1 bg-white p-3 rounded-lg">
                          <p className="text-gray-700">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Feedback */}
                {userInput && (
                  <div className={`p-4 rounded-xl border-2 ${
                    userInput.toLowerCase().replace(/\s/g, '') === currentQuestion.a.toLowerCase().replace(/\s/g, '')
                      ? 'bg-green-100 border-green-400'
                      : 'bg-orange-100 border-orange-400'
                  }`}>
                    <p className={`font-bold text-lg ${
                      userInput.toLowerCase().replace(/\s/g, '') === currentQuestion.a.toLowerCase().replace(/\s/g, '')
                        ? 'text-green-700'
                        : 'text-orange-700'
                    }`}>
                      {userInput.toLowerCase().replace(/\s/g, '') === currentQuestion.a.toLowerCase().replace(/\s/g, '')
                        ? '🎉 Betul! Tahniah!'
                        : '❌ Tidak tepat. Cuba lagi!'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Score Display */}
        {score.total > 0 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-6 rounded-xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold mb-1">🏆 Your Score</p>
                <p className="text-4xl font-bold">{score.correct} / {score.total}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold mb-1">Accuracy</p>
                <p className="text-4xl font-bold">
                  {Math.round((score.correct / score.total) * 100)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-300">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📚 Panduan:</h3>
          <div className="space-y-2 text-gray-700">
            <p><strong>SIMPLIFY:</strong> Guna laws untuk combine dan ringkaskan expression</p>
            <p><strong>EXPAND:</strong> Pecahkan log kepada parts menggunakan laws</p>
            <p><strong>FIND VALUE:</strong> Kira nilai menggunakan given values (tanpa calculator)</p>
            <p className="text-sm text-purple-600 font-bold mt-3">
              ✨ Each question randomly includes: Numbers only, Algebra only, or Mix of both!
            </p>
            <p className="text-sm text-gray-600">
              💡 Tips: Klik "Tunjuk Jawapan & Working" untuk belajar step-by-step
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Tab Navigation
  const tabs = [
    { id: 'definition', name: 'Definition', icon: BookOpen, component: DefinitionTab },
    { id: 'laws', name: 'Laws', icon: Brain, component: LawsTab },
    { id: 'exercises', name: 'Interactive Practice', icon: Target, component: ExercisesTab },
    { id: 'calculator', name: 'Calculator', icon: Calculator, component: CalculatorTab },
    { id: 'common', name: 'Common & Natural', icon: Zap, component: CommonNaturalTab },
    { id: 'errors', name: 'Common Errors', icon: AlertTriangle, component: ErrorsTab }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || DefinitionTab;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 md:p-8 rounded-3xl shadow-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            📊 Logarithms Complete Guide
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Definition • Laws • Interactive Practice • Calculator • Common/Natural • Errors
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-102'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        <ActiveComponent />
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <p className="text-gray-600 text-sm">
            ✨ Complete Logarithms Learning Guide | Simplify • Expand • Find Value | Easy → Medium → Difficult
          </p>
          <p className="text-purple-600 text-xs font-bold mt-1">
            🎯 Mix of Numbers, Algebra & Combined Questions for Better Practice!
          </p>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default LogarithmsLearningApp;