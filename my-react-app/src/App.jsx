import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

import Header         from './components/Header';
import { universities } from './data/universities';
import { provinces }    from './data/provinces';
import { texts }        from './i18n';
import './App.css';

function App() {
  const [year, setYear] = useState(2024);
  const [lang, setLang] = useState('en');
  const t = texts[lang];

  // filter data by selected year
  const uniData  = universities.filter(u => u.year === year);
  const provData = provinces.   filter(p => p.year === year);

  return (
    <>
      <Header lang={lang} setLang={setLang} t={t} />

      <main className="container">
        <p className="description">{t.description}</p>

        <div className="controls">
          <label>
            {t.selectYear}:
            <select value={year} onChange={e => setYear(+e.target.value)}>
              {[2022, 2023, 2024].map(y =>
                <option key={y} value={y}>{y}</option>
              )}
            </select>
          </label>
        </div>

        {/* Chart 1: Bar Chart for Universities */}
        <section className="chart-section">
          <h2>{t.univChartTitle}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={uniData} margin={{ top:20, right:30, bottom:20 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={val => new Intl.NumberFormat(lang).format(val)} />
              <Legend formatter={key => t[key]} />
              <Bar dataKey="local" name="local" fill="#4f6ef7" />
              <Bar dataKey="intl"  name="intl"  fill="#f76e4f" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Chart 2: Radar Chart for Provinces */}
        <section className="chart-section">
          <h2>{t.provChartTitle}</h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={provData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30}
                domain={[0, Math.max(...provData.map(d=>Math.max(d.local, d.intl))) * 1.1]}
              />
              <Radar name="local" dataKey="local"
                stroke="#4f6ef7" fill="#4f6ef7" fillOpacity={0.3}
              />
              <Radar name="intl" dataKey="intl"
                stroke="#f76e4f" fill="#f76e4f" fillOpacity={0.3}
              />
              <Tooltip formatter={val => new Intl.NumberFormat(lang).format(val)} />
              <Legend formatter={key => t[key]} verticalAlign="bottom" />
            </RadarChart>
          </ResponsiveContainer>
        </section>
      </main>
    </>
  );
}

export default App;
