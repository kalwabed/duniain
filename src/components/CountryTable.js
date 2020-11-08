import Link from 'next/link'
import { useState } from 'react'
import { comma } from 'number-magic'

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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.0001 3.67157L13.0001 3.67157L13.0001 16.4999L16.2426 13.2574L17.6568 14.6716L12 20.3284L6.34314 14.6716L7.75735 13.2574L11.0001 16.5001L11.0001 3.67157Z"
            fill="currentColor"
          />
        </svg>
      </div>
    )
  } else {
    return (
      <div className="heading-arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.6568 8.96219L16.2393 10.3731L12.9843 7.10285L12.9706 20.7079L10.9706 20.7059L10.9843 7.13806L7.75404 10.3532L6.34314 8.93572L12.0132 3.29211L17.6568 8.96219Z"
            fill="currentColor"
          />
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
            <div className="c-population">{comma(country.population)}</div>
            <div className="c-area">{comma(country.area) || 0}</div>
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
