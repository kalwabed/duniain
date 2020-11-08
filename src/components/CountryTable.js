import Link from 'next/link'
import { useState } from 'react'

const orderBy = (countries, value, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1))
  }
  if (direction === 'desc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1))
  }
  return countries
}

const SortArrow = ({ direction }) => {
  if (!direction) {
    return ''
  }
  if (direction === 'desc') {
    return (
      <div className="heading-arrow">
        <svg height="18" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
          <g
            fill="none"
            fill-rule="evenodd"
            stroke="#2a2e3b"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(6 4)"
          >
            <path
              d="m7.328 6.67.001 5.658-5.658-.001"
              transform="matrix(-.70710678 .70710678 .70710678 .70710678 .965201 -.399799)"
            />
            <path d="m4.5.5v13" />
          </g>
        </svg>
      </div>
    )
  } else {
    return (
      <div className="heading-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 21">
          <g
            fill="none"
            fill-rule="evenodd"
            stroke="#2A2E3B"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="translate(6 3)"
          >
            <polyline points="7.324 1.661 7.324 7.318 1.647 7.339" transform="scale(1 -1) rotate(45 15.35 0)" />
            <line x1="4.5" x2="4.5" y1=".5" y2="13.5" />
          </g>
        </svg>
      </div>
    )
  }
}

const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState()
  const [value, setValue] = useState()

  const orderedCountries = orderBy(countries, value, direction)

  const switchDirection = () => {
    if (!direction) setDirection('desc')
    else if (direction === 'desc') setDirection('asc')
    else setDirection(null)
  }

  const setValueAndDirection = value => {
    switchDirection()
    setValue(value)
  }

  return (
    <div>
      <div className="heading">
        <div className="heading-flag"></div>

        <button className="heading-name" onClick={() => setValueAndDirection('name')}>
          <div>Name</div>
          {value == 'name' && <SortArrow direction={direction} />}
        </button>

        <button className="heading-population" onClick={() => setValueAndDirection('population')}>
          <div>Population</div>
          {value == 'population' && <SortArrow direction={direction} />}
        </button>

        <button className="heading-area" onClick={() => setValueAndDirection('area')}>
          <div>
            Area (km<sup style={{ fontSize: '0.5rem' }}>2</sup>)
          </div>
          {value == 'area' && <SortArrow direction={direction} />}
        </button>

        <button className="heading-gini" onClick={() => setValueAndDirection('gini')}>
          <div>Gini</div>
          {value == 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map(country => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <a className="row">
            <div className="c-flag">
              <img src={country.flag} alt={country.name} />
            </div>
            <div className="c-name">{country.name}</div>
            <div className="c-population">{country.population}</div>
            <div className="c-area">{country.area || 0}</div>
            <div className="c-gini">{country.gini || 0}%</div>
          </a>
        </Link>
      ))}

      <style jsx>{`
        .heading {
          display: flex;
          padding: 20px;
        }

        .heading button {
          border: none;
          background-color: transparent;
          outline: none;
          cursor: pointer;
        }
        .heading-flag {
          flex: 1;
          margin-right: 16px;
        }
        .heading-name,
        .heading-population,
        .heading-area,
        .heading-gini {
          flex: 4;
          color: var(--text-secondary);
          font-weight: 500;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .heading-arrow {
          color: var(--primary-color);

          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 2px;
        }

        .heading-name {
          justify-content: flex-start;
        }

        .row {
          display: flex;
          padding: 20px;
          text-align: center;

          background-color: var(--background-color-light);
          border-radius: 0px;
          margin-bottom: 16px;
          box-shadow: var(--box-shadow);
          font-weight: 500;

          transition: transform 200ms ease-in-out, box-shadow 200ms ease-in-out;
        }

        .row:hover {
          transform: translateY(-4px);
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
        }

        .c-name {
          flex: 4;
          text-align: left;
        }
        .c-population {
          flex: 4;
        }
        .c-area {
          flex: 4;
        }
        .c-gini {
          flex: 4;
        }
        .c-flag {
          flex: 1;
          margin-right: 16px;
        }

        .c-flag img {
          width: 100%;
          border-radius: 2px;
        }

        @media screen and (max-width: 720px) {
          .heading-area,
          .heading-gini,
          .heading-flag,
          .c-area,
          .c-gini,
          .c-flag {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default CountryTable
