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
  const [yearUniv, setYearUniv] = useState(2024);
  const [yearProv, setYearProv] = useState(2024);
  const [lang, setLang] = useState('en');
  const t = texts[lang];

  // filter data by selected year
  const uniData  = universities.filter(u => u.year === yearUniv);
  const provData = provinces.filter(p => p.year === yearProv);

  return (
    <>
      <Header lang={lang} setLang={setLang} t={t} />

      <main className="container">
        <p className="description">{t.description}</p>
        <div className="controls">
          <label>
            {t.selectYear} ({t.univChartTitle}):
            <select value={yearUniv} onChange={e => setYearUniv(+e.target.value)}>
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
              <XAxis
  dataKey="name"
  tickFormatter={name => t.univLabels[name]}
/>
              <YAxis />
              <Tooltip formatter={val => new Intl.NumberFormat(lang).format(val)} labelFormatter={label => t.univLabels[label]} />
              <Legend formatter={key => t[key]} />
              <Bar dataKey="local" name={t.local} fill="#4f6ef7" />
              <Bar dataKey="intl"  name={t.intl}  fill="#f76e4f" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Year selector for provinces */}
        <div className="controls">
          <label>
            {t.selectYear} ({t.provChartTitle}):
            <select value={yearProv} onChange={e => setYearProv(+e.target.value)}>
              {[2022, 2023, 2024].map(y =>
                <option key={y} value={y}>{y}</option>
              )}
            </select>
          </label>
        </div>

        {/* Chart 2: Radar Chart for Provinces */}
        <section className="chart-section">
          <h2>{t.provChartTitle}</h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={provData}>
              <PolarGrid gridType="circle" stroke="#e0e0e0" strokeWidth={1} />
              <PolarAngleAxis dataKey="name" tickFormatter={name => t.provLabels[name]} tick={{fill:'#666', fontSize: 12}} axisLine={false} />
              <PolarRadiusAxis angle={90}
                domain={[0, Math.max(...provData.map(d=>Math.max(d.local, d.intl))) * 1.1]}
                tickCount={4}
                tick={{fill:'#999', fontSize: 10}}
                axisLine={false}
                tickLine={false} 
              />
              <Radar name={t.local} dataKey="local"
                stroke="#4f6ef7" strokeWidth={2} fill="#4f6ef7" fillOpacity={0.6}
              />
              <Radar name={t.intl} dataKey="intl"
                stroke="#f76e4f" strokeWidth={2} fill="#f76e4f" fillOpacity={0.6}
              />
              <Tooltip formatter={val => new Intl.NumberFormat(lang).format(val)} labelFormatter={label => t.provLabels[label]} />
              <Legend formatter={key => t[key]} verticalAlign="bottom" />
            </RadarChart>
          </ResponsiveContainer>
        </section>
      </main>
    </>
  );
}

export default App;
